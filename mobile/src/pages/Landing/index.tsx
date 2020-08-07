import React, { useState, useEffect } from 'react'
import {View, Image, Text} from 'react-native'
import styles from './styles'
import {RectButton} from 'react-native-gesture-handler'
import landingImg from '../../assets/images/landing.png'
import studyIcon from '../../assets/images/icons/study.png'
import giveClassesIcon from '../../assets/images/icons/give-classes.png'
import heartIcon from '../../assets/images/icons/heart.png'
import {useNavigation, useFocusEffect} from '@react-navigation/native'
import api from '../../services/api'

export default function Landing() {
    const {navigate} = useNavigation()
    const [totalConnections, setTotalConnections] = useState(0)

    useFocusEffect(() => {
        api.get('connections').then(resp => {
            const { total } = resp.data

            setTotalConnections(total)
        }).catch(err => console.log(err))
    })

    function handleNavigateToStudyPages(){
        navigate('Study')
    }

    function handleNavigateToGiveClassesPages() {
        navigate('GiveClasses')
    }
    
    return (
        <View style={styles.container}>
             <Image source={landingImg} style={styles.banner}/>
             <Text style={styles.title}>
                 Seja bem-vindo, {'\n'}
                 <Text style={styles.titleBold}>O que deseja fazer?</Text>
             </Text>
             <View style={styles.buttonsContainer}>
                <RectButton style={[styles.button, styles.buttonPrimary]} onPress={handleNavigateToStudyPages}> 
                    <Image source={studyIcon} />
                    <Text style={styles.buttonText}> Estudar </Text>
                </RectButton>

                <RectButton style={[styles.button, styles.buttonSecondary]} onPress={handleNavigateToGiveClassesPages}> 
                    <Image source={giveClassesIcon} />
                    <Text style={styles.buttonText}> Dar aulas </Text>
                </RectButton>
             </View>

             <Text style={styles.totalConnections}>
                 Total de {totalConnections} conexões já realizadas {' '}
                 <Image source={heartIcon} />
             </Text>
        </View>
    )
}
