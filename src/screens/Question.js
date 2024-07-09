import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import VoiceInputModal from '../components/VoiceInputModal'; // 모달 컴포넌트 import

const Question = () => {
    const [modalVisible, setModalVisible] = useState(false);

    const openModal = () => {
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    return (
        <View style={styles.container}>
            <View style={styles.quizBox}>
                <Text style={styles.quizText}>Q.만약 토비가 다른 동물 친구를 만났다면,{'\n'}그 동물은 무엇이었을까요?
                {'\n'}그 동물과 토비는 어떤 모험을 떠날 수 있었을까요?</Text>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={openModal} style={styles.button}>
                    <LinearGradient
                        colors={['#FF8C43', '#F8C683']}
                        style={styles.gradient}
                        start={{x: 0, y: 0}}
                        end={{x: 1, y: 0}}
                    >
                        <Image
                            source={require('../../assets/images/microphone.png')}
                            style={styles.icon}
                            resizeMode="contain"
                        />
                    </LinearGradient>
                </TouchableOpacity>
            </View>
            <VoiceInputModal visible={modalVisible} onClose={closeModal} message="정답을 말해주세요" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FBF7EC', // Quiz와 동일한 배경색
    },
    quizBox: {
        width: 1000,
        height: 400, // 버튼 아래로 내리기 위해 높이 조정
        backgroundColor: 'white',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        marginBottom: 10, // 버튼 아래 여백 추가
    },
    quizText: {
        fontSize: 38, // 기존보다 크게
        fontWeight: 'bold', // 굵게
        marginBottom: 20,
        textAlign: 'center',
    },
    buttonContainer: {
        flexDirection: 'row', // 가로로 정렬
        justifyContent: 'center', // 가운데 정렬
        alignItems: 'center', // 중앙 정렬
        marginTop: 20, // 버튼과 quizBox 사이 간격 추가
    },
    button: {
        width: 120, // 버튼 너비
        height: 120, // 버튼 높이
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 60, // 원 모양의 버튼을 위해 반지름을 넓게 설정
    },
    gradient: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 60, // 그라데이션도 반지름을 넓게 설정하여 원형 유지
    },
    icon: {
        width: 60, // 아이콘의 너비
        height: 60, // 아이콘의 높이
    },
});

export default Question;
