import React, { useRef, useEffect } from 'react';
import { View, Text, Modal, Animated, TouchableOpacity, StyleSheet, Dimensions, Image, TouchableWithoutFeedback } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const { height, width } = Dimensions.get('window');

const VoiceInputModal = ({ visible, onClose, message }) => {
    const slideAnim = useRef(new Animated.Value(height)).current;

    useEffect(() => {
        if (visible) {
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }).start();
        } else {
            Animated.timing(slideAnim, {
                toValue: height,
                duration: 300,
                useNativeDriver: true,
            }).start();
        }
    }, [visible, slideAnim]);

    const handleOverlayPress = () => {
        // 모달 창 외부를 터치했을 때 아무 작업도 하지 않도록 빈 함수로 처리
    };

    return (
        <Modal transparent visible={visible} animationType="none">
            <TouchableWithoutFeedback onPress={handleOverlayPress}>
                <View style={styles.overlay}>
                    <Animated.View style={[styles.modalContainer, { transform: [{ translateY: slideAnim }] }]}>
                        <View style={styles.modalContent}>
                            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                                <Text style={styles.closeButtonText}>X</Text>
                            </TouchableOpacity>
                            <View style={styles.textContainer}>
                                <Text style={styles.boldText}>{message}</Text>
                                <Text style={styles.lightText}>주변 소음이 들리지 않도록 해주세요</Text>
                            </View>
                            <View style={styles.imageContainer}>
                                <Image source={require('../../assets/images/Wave.png')} style={styles.image} />
                            </View>
                            <LinearGradient
                                colors={['#2170CD', '#8FA0E8']}
                                start={{ x: 0, y: 0.5 }}
                                end={{ x: 1, y: 0.5 }}
                                style={styles.gradientButton}
                            >
                                <TouchableOpacity onPress={() => {}} style={styles.roundButton}>
                                    <Image source={require('../../assets/images/voice.png')} style={styles.voiceImage} />
                                </TouchableOpacity>
                            </LinearGradient>
                        </View>
                    </Animated.View>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    modalContainer: {
        width: width,
        height: '50%',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    modalContent: {
        width: '100%',
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
        padding: 20,
        alignItems: 'center',
    },
    textContainer: {
        marginTop: 20,
        marginBottom: 10,
        alignItems: 'center',
    },
    boldText: {
        fontSize: 35,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 5,
    },
    lightText: {
        fontSize: 30,
        fontWeight: '300',
        textAlign: 'center',
    },
    closeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        padding: 10,
    },
    closeButtonText: {
        color: 'black',
        fontSize: 24,
        fontWeight: 'bold',
    },
    imageContainer: {
        width: '100%',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: 255,
        marginTop: 10,
    },
    gradientButton: {
        width: 80,
        height: 80,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 30,
        left: '50%',
        marginLeft: -40,
    },
    roundButton: {
        width: '100%',
        height: '100%',
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    voiceImage: {
        width: 50,
        height: 50,
    },
});

export default VoiceInputModal;
