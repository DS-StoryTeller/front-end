// src/components/VoiceInputModal.js
import React, { useRef, useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  Modal,
  Animated,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
  TouchableWithoutFeedback,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Voice from '@react-native-voice/voice';
import VoiceInputErrorModal from './VoiceInputErrorModal';
import StoryGeneratorModal from './StoryGeneratorModal';

const { height, width } = Dimensions.get('window');

const VoiceInputModal = ({
  visible,
  onClose,
  message,
  profileId,
  fetchWithAuth,
  refreshBooks,
}) => {
  const slideAnim = useRef(new Animated.Value(height)).current;
  const [isRecording, setIsRecording] = useState(false);
  const [transcribedText, setTranscribedText] = useState('');
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showStoryGeneratorModal, setShowStoryGeneratorModal] = useState(false);

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

  const requestMicrophonePermission = async () => {
    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          {
            title: '마이크 사용 권한 요청',
            message: '이 앱이 마이크에 접근하려고 합니다.',
            buttonNeutral: '나중에',
            buttonNegative: '거부',
            buttonPositive: '허용',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Microphone permission granted');
        } else {
          console.log('Microphone permission denied');
        }
      }
    } catch (error) {
      console.error('Error requesting microphone permission:', error);
    }
  };

  useEffect(() => {
    requestMicrophonePermission();
  }, []);

  const onSpeechResults = useCallback(
    event => {
      const text = event.value[0];
      setTranscribedText(text);
      setIsRecording(false);
      setShowStoryGeneratorModal(true);
      onClose();
    },
    [onClose],
  );

  const onSpeechError = useCallback(() => {
    setShowErrorModal(true);
    setIsRecording(false);
    onClose();
  }, [onClose]);

  const startRecording = async () => {
    setIsRecording(true);
    try {
      await Voice.start('ko-KR');
    } catch (error) {
      console.error('Error starting voice recognition:', error);
    }
  };

  const handleOverlayPress = () => {
    // 음성 입력 중지
  };

  useEffect(() => {
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechError = onSpeechError;
    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, [onSpeechResults, onSpeechError]);

  return (
    <>
      <Modal transparent visible={visible} animationType="none">
        <TouchableWithoutFeedback onPress={handleOverlayPress}>
          <View style={styles.overlay}>
            <Animated.View
              style={[
                styles.modalContainer,
                { transform: [{ translateY: slideAnim }] },
              ]}
            >
              <View style={styles.modalContent}>
                <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                  <Text style={styles.closeButtonText}>X</Text>
                </TouchableOpacity>
                <View style={styles.textContainer}>
                  <Text style={styles.boldText}>{message}</Text>
                  <Text style={styles.lightText}>
                    주변 소음이 들리지 않도록 해주세요
                  </Text>
                </View>
                <View style={styles.imageContainer}>
                  <Image
                    source={require('../../../assets/images/Wave.png')}
                    style={styles.image}
                  />
                </View>
                <LinearGradient
                  colors={['#2170CD', '#8FA0E8']}
                  start={{ x: 0, y: 0.5 }}
                  end={{ x: 1, y: 0.5 }}
                  style={styles.gradientButton}
                >
                  <TouchableOpacity
                    onPress={startRecording}
                    style={styles.roundButton}
                  >
                    <Image
                      source={require('../../../assets/images/voice.png')}
                      style={styles.voiceImage}
                    />
                  </TouchableOpacity>
                </LinearGradient>
              </View>
            </Animated.View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      <VoiceInputErrorModal
        visible={showErrorModal}
        onClose={() => setShowErrorModal(false)}
        onKeyboardInput={() => {
          // 키보드 입력 모드로 전환
          setShowErrorModal(false);
          // 여기에 키보드 입력 모드 로직 추가
        }}
        onRetry={() => {
          // 음성 입력 모드로 전환
          setShowErrorModal(false);
          setIsRecording(true);
          startRecording();
        }}
      />
      <StoryGeneratorModal
        visible={showStoryGeneratorModal}
        onClose={() => setShowStoryGeneratorModal(false)}
        prompt={transcribedText}
        profileId={profileId}
        fetchWithAuth={fetchWithAuth}
        refreshBooks={refreshBooks}
      />
    </>
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
    fontFamily: 'TAEBAEKfont',
  },
  lightText: {
    fontSize: 30,
    fontWeight: '300',
    textAlign: 'center',
    fontFamily: 'TAEBAEKmilkyway',
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
