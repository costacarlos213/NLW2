import {Request, Response, response} from 'express'
import convertHourToMinute from "../utils/convertHourToMinute"
import db from '../database/connection'

interface ScheduleItem {
    weekDay: number,
    from: string,
    to: string
}

export default class ClassesController {
    async index(req: Request, res: Response) {
        try {
            
            const filters = req.query
            
            if(!filters.weekDay || !filters.subject || !filters.time) {
                return res.status(400).json({
                    error: 'Missing params'
                })
            }
        
            const subject = filters.subject as string
            const weekDay = filters.weekDay as string
            const time = filters.time as string

            const timeInMinutes = convertHourToMinute(time)

            const classes = await db('classes') // Select all classes with the teacher information
                .whereExists(function() {
                    // The craze sign (``) is required
                    this.select('schedules.*')
                        .from('schedules') // Select all schedules
                        .whereRaw('`schedules`.`class_id` = `classes`.`id`')  //Select only the schedules for a specific class at a time
                        .whereRaw('`schedules`.`weekDay` = ??', [Number(weekDay)]) //Filters by weekDay
                        .whereRaw('`schedules`.`from` <= ??', [timeInMinutes]) //Filters by the initial time
                        .whereRaw('`schedules`.`to` > ??', [timeInMinutes]) // Filters by the final time
                })
                .where('classes.subject', '=', subject)
                .join('users', 'users.id', '=', 'classes.user_id')
                .select(['classes.*', 'users.*'])

            return res.json(classes)
        } catch (err) {
            console.log(err)
            return res.status(400).json({msg: "The Aplication encountered an error in CLASS CONTROLLER INDEX METHOD"})   
        }
    }
    
    async create(req: Request, res: Response) {
        const {
            name,
            avatar,
            whatsapp,
            bio,
            cost,
            subject,
            schedule
        } = req.body

        const transaction = await db.transaction() // trx its the same as transaction
        try {
            const newUserId = await transaction('users').insert({
                name,
                avatar,
                whatsapp,
                bio,
            })

            const user_id = newUserId[0]
            const newClassId = await transaction('classes').insert({
                subject,
                cost,
                user_id
            })

            const class_id = newClassId[0]
            const classSchedule = schedule.map((scheduleItem: ScheduleItem) => {
                return {
                    class_id,
                    weekDay: scheduleItem.weekDay,
                    from: convertHourToMinute(scheduleItem.from),
                    to: convertHourToMinute(scheduleItem.to)
                }
            })

            await transaction('schedules').insert(classSchedule)
            await transaction.commit()

            return res.status(201).send()

        } catch (err) {
            await transaction.rollback()

            return res.status(400).json({
                error: "The aplication encountered an error while creating a new class"
            })
        }
    }
}   