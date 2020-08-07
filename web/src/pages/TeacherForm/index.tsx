import React, { useState, FormEvent } from 'react';
import {useHistory} from 'react-router-dom'
import PageHeader from '../../components/PageHeader';
import './styles.css'
import Input from '../../components/Input';
import warningIcon from '../../assets/images/icons/warning.svg'
import Textarea from '../../components/Textarea';
import Select from '../../components/Select';
import api from '../../services/api';

function TeacherForm() {
    const history = useHistory()
    
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

    const [name, setName] = useState('')
    const [avatar, setAvatar] = useState('')
    const [whatsapp, setNumber] = useState('')
    const [bio, setBio] = useState('')
    const [cost, setCost] = useState('')
    const [subject, setSubject] = useState('')

    const [scheduleItems, setScheduleItem] = useState([
        {weekDay: 0, from: '', to: ''}
    ])

    function addNewScheduleItem() {
        setScheduleItem([
            ...scheduleItems,
            {weekDay: 0, from: '', to: ''}
        ])
    }

    function setScheduleItemValue(position: Number, field: string, value: string)  {
        const newArray = scheduleItems.map((scheduleItem, index) => {
            if (index === position) {
                return {...scheduleItem, [field]: value}
            }

            return scheduleItem
        })

        setScheduleItem(newArray)
    }

    function handleCreateNewClass(e: FormEvent) {
        e.preventDefault()

        api.post('classes', {
            name,
            bio,
            avatar,
            whatsapp,
            cost: Number(cost),
            subject,
            schedule: scheduleItems
        }).then(() => {
            alert('cadastrado')
            history.push('/')
        }).catch((err) => {
            alert('erro no cadastro')
        })
    }

    return(
        <div id="page-teacher-form" className="container">
            <PageHeader 
                title="Que incrível que você quer dar aulas!"
                desc="O primeiro passo é preencher esse formulário de inscrição"
            />
            <main>
                <form onSubmit={handleCreateNewClass}>
                    <fieldset>
                        <legend>Seus dados</legend>
                        <Input 
                            name="name" 
                            title="Nome Completo" 
                            value={name}
                            onChange={(e) => {setName(e.target.value)}}
                        />
                        
                        <Input 
                            name="Avatar" 
                            title="Avatar" 
                            value={avatar}
                            onChange={(e) => {setAvatar(e.target.value)}}
                        />

                        <Input 
                            name="whatsapp" 
                            title="Telefone" 
                            value={whatsapp}
                            onChange={(e) => {setNumber(e.target.value)}}
                        />

                        <Textarea 
                            name="bio" 
                            title="Biografia"
                            value={bio}
                            onChange={(e) => {setBio(e.target.value)}}
                        />

                    </fieldset>
                    <fieldset>
                        <legend>Sobre a aula </legend>
                        
                        <Select 
                            title="Matéria"
                            name="subject"
                            options={options}
                            value={subject}
                            onChange={e => {setSubject(e.target.value)}}
                        />
                        
                        <Input 
                            name="cost" 
                            title="Valor da aula" 
                            value={cost}
                            onChange={(e) => {setCost(e.target.value)}}
                        />
                    </fieldset>
                    <fieldset>
                        <legend>
                            Horários Disponíveis
                            <button type="button" onClick={addNewScheduleItem}>
                                + Novo horário
                            </button>
                        </legend>
                        
                            {scheduleItems.map((scheduleItem, index) => {
                                return(
                                    <div key={scheduleItem.weekDay} className="schedule-item">
                                        <Select 
                                            title="Dia da Semana" 
                                            name="weekDay"
                                            options={options2}
                                            value={scheduleItem.weekDay}
                                            onChange={e => {setScheduleItemValue(index, 'weekDay', e.target.value)}}
                                        />
                                        <Input 
                                            name="from" 
                                            title="Das" 
                                            type="time" 
                                            value={scheduleItem.from}
                                            onChange={e => {setScheduleItemValue(index, 'from', e.target.value)}}
                                        />
                                        <Input 
                                            name="to" 
                                            title="Até" 
                                            type="time" 
                                            value={scheduleItem.to}
                                            onChange={e => {setScheduleItemValue(index, 'to', e.target.value)}}
                                        />
                                    </div>
                                )
                            })}
                    </fieldset>
                    <footer>
                        <p>
                            <img src={warningIcon} alt="Aviso Importante" />
                            Preencha todos os dados
                        </p>
                        <button type="submit">
                            Salvar Cadastro
                        </button>
                    </footer>
                </form>
            </main>
        </div>
    )
}

export default TeacherForm