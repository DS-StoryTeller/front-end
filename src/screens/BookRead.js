import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, ImageBackground, View, TouchableOpacity, Alert } from "react-native"
import { SafeAreaView } from 'react-native-safe-area-context'
import { useFocusEffect } from '@react-navigation/native';
import Page1 from '../../assets/images/page1.png';
import Ionic from 'react-native-vector-icons/Ionicons';
import ProgressBar from '../components/ProgressBar';
import SettingModal from '../components/SettingModal';
import YesNoModal from '../components/YesNoModal';
import NextStep from '../components/NextStep';

const BookRead = ({ navigation }) => {
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    
    const [isSettingModalVisible, setIsSettingModalVisible] = useState(false);
    const [isYesNoModalVisible, setIsYesNoModalVisible] = useState(false);

    const openSettingModal = () => {
        setIsSettingModalVisible(true);
    };

    const closeSettingModal = () => {
        setIsSettingModalVisible(false);
    };

    const openYesNoModal = () => {
        setIsYesNoModalVisible(true);
    };

    const closeYesNoModal = () => {
        setIsYesNoModalVisible(false);
    };

    const [nextStepVisible, setNextStepVisible] = useState(false);
    const [timer, setTimer] = useState(null); // 타이머 상태 추가

    useFocusEffect(
        React.useCallback(() => {
            setNextStepVisible(false); // 상태 초기화
            if (timer) {
                clearTimeout(timer); // 기존 타이머 클리어
            }
            const newTimer = setTimeout(() => {
                setNextStepVisible(true);
            }, 3000); // 10초 후에 nextStepVisible 상태를 true로 변경

            setTimer(newTimer); // 타이머 상태 업데이트

            return () => {
                clearTimeout(newTimer); // 언마운트 시 타이머 클리어
            };
        }, [navigation])
    );

    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground source={Page1} style={styles.page}>

                <View style={styles.titleBox}>
                    <View style={styles.iconBox}>
                        <TouchableOpacity style={styles.icon}  onPress={openYesNoModal} >
                            <Ionic name="home" size={35} color="white" />
                        </TouchableOpacity>
                        <YesNoModal isVisible={isYesNoModalVisible} onClose={closeYesNoModal} 
                            title={"정말 중단하시겠습니까?"} 
                            subtitle={`다시 동화를 읽을 때 \n 현재 페이지부터 읽으실 수 있습니다.`}
                            buttonText1={"중단하기"}
                            linkTo={'BookShelf'}
                            buttonText2={"취소"}/>
                        <TouchableOpacity style={styles.icon} onPress={openSettingModal} >
                            <Ionic name="settings" size={35} color="white" />
                        </TouchableOpacity>
                        <SettingModal isVisible={isSettingModalVisible} onClose={closeSettingModal} />
                    </View>
                    <Text style={styles.bookTitle}>Unveiling the Enchanted Cave</Text>
                </View>

                <View style={styles.textBox}>
                    <Text style={styles.bookText}>
                        Once upon a time, in the quaint village of Willowbrook, there lived a young girl named Eunseo. Eunseo was known for her adventurous spirit and her love for exploring the enchanted forests that surrounded her home.
                        {"\n"}One bright morning, as Eunseo ventured deeper into the woods than she had ever gone before, she stumbled upon a mysterious cave hidden beneath the thick foliage.
                    </Text>
                </View>
                <ProgressBar pages={'13'} now={'4'}/>
                {nextStepVisible && <NextStep />}
            </ImageBackground>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FBF7EC',
        alignItems: 'center',
        justifyContent: 'center',
    },
    page: {
        width: '100%',
        height: '100%',
    },

    titleBox: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'baseline',
        margin: 15,
    },
    bookTitle: {
        fontSize: 35,
        fontWeight: 'bold',
        color: '#FFFFFF',
        margin: (0, 'auto'),
    },
    iconBox: {
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'baseline',
        paddingLeft: 10,
    },
    icon: {
        marginTop: 13,
    },
    textBox: {
        width: '50%',
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        justifyContent: 'center',
        position: 'absolute',
        top: '20%',
        left: '45%',
        borderRadius: 10,
        padding: 10,

    },
    bookText: {
        fontSize: 17,
        color: '#000000',
        textAlign: 'center',
        lineHeight: 20,
    },

})
export default BookRead