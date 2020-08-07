import React, { useState, FormEvent } from 'react';
import './styles.css'
import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import Input from '../../components/Input';
import Select from '../../components/Select';
import api from '../../services/api';

function TeacherList() {
    function searchTeachers(e: FormEvent) {
        e.preventDefault();
        console.log({
            subject,
            weekDay,
            time
        })
        if (!subject || !weekDay || !time) {
            return
        }
        api.get('classes', {
            params: {
                subject,
                weekDay,
                time
            }
        }).then(resp => {   
            setTeachers(resp.data)
        }).catch(err => console.log(err))
    }
    
    const options = [
        {value: "História", label: "História"},
        {value: "Matemática", label: "Matemática"},
        {value: "Ciência", label: "Ciência"},
        {value: "Português", label: "Português"},
    ]
    const options2 = [
        {value: "0", label: "Domingo"},
        {value: "1", label: "Segunda-Feira"},
        {value: "2", label: "Terça-Feira"},
        {value: "3", label: "Quarta-Feira"},
        {value: "4", label: "Quinta-Feira"},
        {value: "5", label: "Sexta-Feira"},
        {value: "6", label: "Sábado"},
    ]

    const [subject, setSubject] = useState('')
    const [weekDay, setWeekDay] = useState('')
    const [time, setTime] = useState('')
    const [teachers, setTeachers] = useState([])


    return (
        <div id="page-teacher-list" className="container">
            <PageHeader title="Estes são os proffys disponíveis">
                <form id="search-teachers" onSubmit={searchTeachers}>
                    <Select 
                        title="Matéria"
                        name="subject"
                        options={options}
                        value={subject}
                        onChange={(e) => {setSubject(e.target.value)}}
                        onBlur={searchTeachers}
                    />
                    <Select 
                        title="Dia da Semana" 
                        name="weekDay"
                        options={options2}
                        value={weekDay}
                        onChange={(e) => {setWeekDay(e.target.value)}}
                        onBlur={searchTeachers}
                    />
                    <Input 
                        title="Horário" 
                        name="time" 
                        type="time"
                        value={time}
                        onChange={(e) => {setTime(e.target.value)}}
                        onBlur={searchTeachers}
                    />
                </form>
            </PageHeader>
            <main>
                {teachers.map((teacher: Teacher) => {
                    return (
                        <TeacherItem 
                            teacher={teacher}
                        />
                    )
                })}
            </main>
        </div>
    )
}

export default TeacherList