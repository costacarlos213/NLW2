import express from 'express'
import ClassesController from './controllers/classesControler'
import ConnectionController from './controllers/connectionsContoller'

const routes = express.Router()

const classesControler = new ClassesController()
routes.post('/classes', classesControler.create)
routes.get('/classes', classesControler.index)

const connectionsController = new ConnectionController()
routes.post('/connections', connectionsController.create)
routes.get('/connections', connectionsController.index)

export default routes
