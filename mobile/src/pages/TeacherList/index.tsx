import React, { useState, useEffect } from 'react'
import { View, ScrollView, Text, TextInput} from 'react-native'
import { Feather } from '@expo/vector-icons'
import { BorderlessButton, RectButton } from 'react-native-gesture-handler'
import AsyncStorage from '@react-native-community/async-storage'
import styles from './styles'
import PageHeader from '../../components/PageHeader'
import TeacherItem, { Teacher } from '../../components/TeacherItem'
import api from '../../services/api'

export default function TeacherList() {
    const [isFilterVisible, setFilterVisibility] = useState(false)
    const [subject, setSubject] = useState('')
    const [weekDay, setWeekDay] = useState('')
    const [time, setTime] = useState('')
    const [teachers, setTeachers] = useState([])
    const [favorites, setfavorites] = useState<number[]>([])
    
    function handleToggleFiltersVisibility() {
        setFilterVisibility(!isFilterVisible)
    }

    function loadFavorites(){
        AsyncStorage.getItem('favorites').then(resp => {
            if(resp) {
                const favoritedTeachers = JSON.parse(resp)
                const favoritedTeachersId = favoritedTeachers.map((teacher: Teacher) => {
                    return teacher.user_id
                })

                setfavorites(favoritedTeachersId)
            }
        })
    }

    async function handleFiltersSubmit() {
        loadFavorites()
        
        try {
            const resp = await api.get('classes', {
                params: {
                    weekDay,
                    subject,
                    time
                }
            })
            setTeachers(resp.data)
        } catch (err) {
            console.log(err)
        }

        setFilterVisibility(false)
    }

    return (
        <View style={styles.container}>
            <PageHeader 
                title="Proffys Disponíveis" 
                headerRight={
                    <BorderlessButton onPress={handleToggleFiltersVisibility}>
                        <Feather name="filter" size={30} color='#FFF' />
                    </BorderlessButton>
                }
            >
                { isFilterVisible && (
                    <View style={styles.searchForm}>
                        <Text style={styles.label}>Matéria</Text>
                        <TextInput
                            style={styles.input}
                            placeholderTextColor='#c1bccc'
                            placeholder='Qual a matéria?'
                            value={subject}
                            onChangeText={text => setSubject(text)}
                        />

                        <View style={styles.inputGroup}>
                            <View style={styles.inputBlock}>
                                <Text style={styles.label}>Dia da semana</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholderTextColor='#c1bccc'
                                    placeholder='Qual o dia?'
                                    value={weekDay}
                                    onChangeText={text => setWeekDay(text)}
                                />
                            </View>
                            <View style={styles.inputBlock}>
                                <Text style={styles.label}>Horário</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholderTextColor='#c1bccc'
                                    placeholder='Que horas?'
                                    value={time}
                                    onChangeText={text => setTime(text)}
                                />
                            </View>
                        </View>
                        <RectButton style={styles.submitButton} onPress={handleFiltersSubmit}>
                            <Text style={styles.submitButtonText}> Filtrar </Text>
                        </RectButton>
                    </View>
                ) }
            </PageHeader>
            <ScrollView
                style={styles.teacherList}
                contentContainerStyle={{
                    paddingHorizontal: 16,
                    paddingBottom: 16,
                }}
            >
                {teachers.map((teacher: Teacher) => {
                    console.log(favorites)
                    
                    return (
                        <TeacherItem 
                            key={teacher.user_id}
                            teacher={teacher} 
                            favorited={favorites.includes(teacher.user_id)}
                        />
                    )
                })}
            </ScrollView>
        </View>
    )
}