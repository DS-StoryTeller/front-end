import { View, Text, StyleSheet, Modal, Alert } from 'react-native'
import React from 'react'
import YesNoButton from './YesNoButton';
import { useNavigation } from '@react-navigation/native';


const YesNoModal = ({ isVisible, onClose, linkTo, title, subtitle, buttonText1, buttonText2, profileId, bookId, currentPage }) => {
    const navigation = useNavigation();


    const handleButtonClick = async () => {
        if (buttonText1 === "중단하기") {
            try {
                const response = await fetch(`http://192.168.219.102:8080/books/current?profileId=${profileId}&bookId=${bookId}&currentPage=${currentPage}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'access': 'eyJhbGciOiJIUzI1NiJ9.eyJhdXRoZW50aWNhdGlvbk1ldGhvZCI6ImxvY2FsIiwiY2F0ZWdvcnkiOiJhY2Nlc3MiLCJ1c2VyS2V5IjoicHlvdW5hbmkiLCJyb2xlIjoiUk9MRV9VU0VSIiwiaWF0IjoxNzIxMjE4MDQ1LCJleHAiOjE3MjEzMDQ0NDV9.AMvk7NF-Kn_6HgRltk99vsz5oTHjfpBDKAbzR34x1zI'
                    },
                });

                if (response.status === 200) {
                    // 페이지 저장이 성공적으로 완료되었을 때 BookShelf 페이지로 이동
                    navigation.reset({
                        index: 0,
                        routes: [{ name: linkTo }],
                    });

                } else {
                    Alert.alert('Error', 'Failed to save current page');
                }
            } catch (error) {
                Alert.alert('Error', 'Failed to save current page');
            }
        } else if (buttonText1 === "삭제") {
            // 삭제 기능 추가 필요 - 도나
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
        width: '40%',
        height: '40%',
        backgroundColor: "white",
        borderRadius: 20,
        padding: 15,
        position: 'absolute',
        top: '28%',
        left: '30%',
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