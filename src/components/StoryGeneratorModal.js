import React, {useRef, useEffect} from 'react';
import {
  View,
  Modal,
  Animated,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
  Text,
  TouchableWithoutFeedback,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const {height, width} = Dimensions.get('window');

const StoryGeneratorModal = ({
  visible,
  onClose,
  prompt,
  fetchWithAuth,
  profileId,
}) => {
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

  const createStory = async () => {
    try {
      const response = await fetchWithAuth(
        `/books/create?profileId=${profileId}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({prompt}),
        },
      );
      if (response.ok) {
        console.log('Story created successfully');
        onClose();
      } else {
        console.error('Error creating story:', response.statusText);
      }
    } catch (error) {
      console.error('Error creating story:', error);
    }
  };

  return (
    <Modal transparent visible={visible} animationType="none">
      <TouchableWithoutFeedback onPress={handleOverlayPress}>
        <View style={styles.overlay}>
          <Animated.View
            style={[
              styles.modalContainer,
              {transform: [{translateY: slideAnim}]},
            ]}>
            <View style={styles.modalContent}>
              <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>X</Text>
              </TouchableOpacity>
              <View style={styles.textContainer}>
                <Text style={styles.boldText}>{prompt}</Text>
                <Text style={styles.lightText}>
                  해당 주제로 동화를 만들까요?
                </Text>
              </View>
              <View style={styles.buttonContainer}>
                <LinearGradient
                  colors={['#2170CD', '#8FA0E8']}
                  start={{x: 0, y: 0.5}}
                  end={{x: 1, y: 0.5}}
                  style={styles.gradientButton}>
                  <TouchableOpacity
                    onPress={createStory}
                    style={styles.roundButton}>
                    <Image
                      source={require('../../assets/images/polygon.png')}
                      style={styles.buttonImage}
                    />
                  </TouchableOpacity>
                </LinearGradient>
              </View>
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
    height: '51%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalContent: {
    width: '100%',
    height: '115%',
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: -2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    padding: 20,
    alignItems: 'center',
  },
  textContainer: {
    marginTop: 40,
    marginBottom: 20,
    alignItems: 'center',
  },
  boldText: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 15,
  },
  lightText: {
    fontSize: 30,
    fontWeight: '300',
    textAlign: 'center',
    lineHeight: 40,
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 60,
  },
  gradientButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  roundButton: {
    width: '100%',
    height: '100%',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonImage: {
    width: 30,
    height: 40,
    resizeMode: 'contain',
  },
});

export default StoryGeneratorModal;
