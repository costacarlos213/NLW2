import React from 'react'
import { View, ImageBackground, Text } from 'react-native'
import styles from './styles'
import giveClassesBgImg from '../../assets/images/give-classes-background.png'
import { RectButton } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'

export default function GiveClasses () {
    
    const { goBack } = useNavigation()
    
    function handleNavigateBack () {
        goBack()
    }

    return (
        <View style={styles.container}>
            <ImageBackground 
                resizeMode="contain" 
                source={giveClassesBgImg} 
                style={styles.content}
            >
                <Text style={styles.title}>Quer ser um Proffy?</Text>
                <Text style={styles.desc}>Para começar você precisa se cadastrar como professor em nossa plataforma web</Text>
            </ImageBackground>
            
            <RectButton onPress={handleNavigateBack} style={styles.okButton}>
                <Text style={styles.okButtonText}>Tudo Bem!</Text>
            </RectButton>
        </View>
    )
}