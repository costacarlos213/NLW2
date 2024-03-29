import React from 'react'
import whatsappIcon from '../../assets/images/icons/whatsapp.svg'
import './styles.css'
import api from '../../services/api'

export interface Teacher {
    user_id: Number;
    name: string;
    subject: string;
    avatar: string;
    cost: Number;
    bio: string;
    whatsapp: string;
}
interface TeacherItemProps {
    teacher: Teacher;
}

const TeacherItem: React.FunctionComponent<TeacherItemProps> = ({teacher}) => {
    
    const link = "https://wa.me/" + teacher.whatsapp

    function createNewConnection() {
        api.post('connections', {
            user_id: teacher.user_id
        })
    }
    
    return (
        <article className="teacher-item">
                <header>
                    <img src={teacher.avatar} alt={teacher.name} />
                    <div>
                        <strong> {teacher.name} </strong>
                        <span> {teacher.subject} </span>
                    </div>
                </header>
                    <p>
                        {teacher.bio}
                    </p>
                <footer>
                    <p>
                        Preço/hora
                            <strong>R$ {teacher.cost}</strong>
                    </p>
                    <button type="button" onClick={createNewConnection}>
                        <img src={whatsappIcon} alt="whatsapp" />
                            <a href={link}>
                                Entrar em contato
                            </a>
                        </button>
                </footer>
            </article>
    )
}

export default TeacherItem