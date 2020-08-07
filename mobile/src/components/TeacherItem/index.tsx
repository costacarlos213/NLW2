import React, { useState } from 'react'
import { View, Image, Text, Linking } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import styles from './styles'
import { RectButton } from 'react-native-gesture-handler'
import heartOutlineIcon from '../../assets/images/icons/heart-outline.png'
import unfavoriteIcon from '../../assets/images/icons/unfavorite.png'
import whatasappIcon from '../../assets/images/icons/whatsapp.png' 
import api from '../../services/api'

export interface Teacher {
    user_id: number,
    subject: string;
    cost: number;
    avatar: string;
    whatsapp: string;
    bio: string; 
    name: string;
}

interface TeacherProps {
    teacher: Teacher;
    favorited: boolean;
}

const TeacherItem: React.FunctionComponent<TeacherProps> = ({teacher, favorited}) => {
    const [isFavorited, setIsFavorited] = useState(favorited)

    async function handleToggleFavorited () {
        const favorites = await AsyncStorage.getItem('favorites')
        let favoritesArray: Array<Teacher> = []

        if(isFavorited) {
            const favoriteIndex = favoritesArray.findIndex((teacherItem: Teacher) => {
                return teacherItem.user_id === teacher.user_id
            })
            favoritesArray.splice(favoriteIndex, 1)
            setIsFavorited(false)
        } else {
            if (favorites) {
                favoritesArray = JSON.parse(favorites)
            }
            favoritesArray.push(teacher)
            setIsFavorited(true)
        }
        await AsyncStorage.setItem('favorites', JSON.stringify(favoritesArray))
    }
    
    async function handleCreateNewConnection() {
        try {
            console.log(teacher.user_id)
            api.post('connections', {
                user_id: teacher.user_id
            })
            Linking.openURL(`whatsapp://send?phone=${teacher.whatsapp}`)
        } catch(err) {
            console.log(err)
        }
    }
    
    return (
        <View style={styles.container}>
            <View style={styles.profile}>
                <Image
                    style={styles.avatar}
                    source={{uri: teacher.avatar}}
                />

                <View style={styles.profileInfo}>
                    <Text style={styles.name}>{teacher.name}</Text>
                    <Text style={styles.subject}>{teacher.subject}</Text>
                </View>
            </View>
            
            <Text style={styles.bio}>
                    {teacher.bio}
            </Text>

            <View style={styles.footer}>
                <Text style={styles.price}>
                    Preço/Hora {'   '}
                    <Text style={styles.priceValue}> R$ {teacher.cost} </Text>
                </Text>
                <View style={styles.buttonContainer}>
                    <RectButton 
                        onPress={handleToggleFavorited}
                        style={[
                            styles.favoriteButton, 
                            isFavorited ? styles.favorited : {}
                        ]}
                    >
                        {isFavorited ? <Image source={unfavoriteIcon} /> : <Image source={heartOutlineIcon} />}
                    </RectButton>
                    <RectButton style={styles.contactButton} onPress={handleCreateNewConnection}>
                        <Image source={whatasappIcon} />
                        <Text style={styles.contactButtonText}> Entrar em contato </Text>
                    </RectButton>
                </View>
            </View>
        </View>
    )
}

export default TeacherItem