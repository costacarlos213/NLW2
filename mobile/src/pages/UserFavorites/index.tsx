import React, { useState } from 'react'
import { View, ScrollView } from 'react-native'
import styles from './styles'
import PageHeader from '../../components/PageHeader'
import TeacherItem, { Teacher } from '../../components/TeacherItem'
import AsyncStorage from '@react-native-community/async-storage'
import { useFocusEffect } from '@react-navigation/native'

export default function UserFavorites() {
    const [favorites, setfavorites] = useState([])
    
    async function loadFavorites(){
        await AsyncStorage.getItem('favorites').then(resp => {
            if(resp) {
                const favoritedTeachers = JSON.parse(resp)
                setfavorites(favoritedTeachers)
            }
        })
    }
    
    useFocusEffect(() => {
        loadFavorites()
    })

    return (
        <View style={styles.container}>
            <PageHeader title="Meus Proffys favoritos" />
            <ScrollView
                style={styles.teacherList}
                contentContainerStyle={{
                    paddingHorizontal: 16,
                    paddingBottom: 16,
                }}
            >
                {favorites.map((teacher: Teacher) => {
                    return (
                        <TeacherItem 
                            key={teacher.user_id}
                            teacher={teacher}
                            favorited
                        />
                    )
                })}
            </ScrollView>
        </View>
    )
}