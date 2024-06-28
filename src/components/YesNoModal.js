import { View, Text, StyleSheet, Modal, Button, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import YesNoButton from './YesNoButton';
import { useNavigation } from '@react-navigation/native';


const YesNoModal = ({ isVisible, onClose, linkTo, title, subtitle, buttonText1, buttonText2}) => {
    const navigation = useNavigation();

    const handleButtonClick = () => {
        if (buttonText1 === "중단하기") {
            navigation.reset({
                index: 0,
                routes: [{ name: linkTo }],
            });
        } else if (buttonText1 === "삭제") {
            // 프로필 삭제루트 적으면 됨(도나)
        }
      };

    return (
        <Modal
            animationType="slide"
            visible={isVisible}
            transparent={true}
        >
            <View style={styles.modalView}>
                <View style={styles.modalTitle}>
                    <Text style={styles.modalTextStyle}>{title}</Text>
                </View>
                <View style={styles.subtitle}>
                    <Text style={styles.subtitleText}>{subtitle}</Text>
                </View>
                <View style={styles.buttonContainer}>
                <YesNoButton text={buttonText1} onPress={handleButtonClick} />
                <YesNoButton text={buttonText2} onPress={onClose} />
           </View>
            </View>
           
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalTitle: {
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 13,
        width: '100%',
    },
    modalView: {
        width: '45%',
        height: '45%',
        backgroundColor: "white",
        borderRadius: 20,
        padding: 15,
        position: 'absolute',
        top: '23%',
        left: '27.5%',
    },
    

    modalTextStyle: {
        color: 'black',
        fontSize: 25,
    },

    subtitle: {
        margin: 6,
    },
    subtitleText: {
        textAlign: 'center',
        fontSize: 17,
        color: 'black',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 35,
    }
    
  
});

export default YesNoModal