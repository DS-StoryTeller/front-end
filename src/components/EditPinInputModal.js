import React, { useState, useRef, useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import AddProfileModal from './AddProfileModal'; // 상대경로는 프로젝트 구조에 맞게 조정

const EditPinInputModal = ({ visible, onClose }) => {
  const [pin, setPin] = useState(['', '', '', '']);
  const [isAddProfileModalVisible, setIsAddProfileModalVisible] = useState(false);
  const [selectedInput, setSelectedInput] = useState(null);
  const [error, setError] = useState('');
  const inputRefs = useRef([]);

  // 올바른 PIN번호
  const correctPin = '0000';

  // PIN 변경 핸들러
  const handlePinChange = (index, value) => {
    let newPin = [...pin];
    newPin[index] = value;
    setPin(newPin);

    // 현재 값이 비어 있지 않고 마지막 입력이 아닌 경우 다음 입력으로 포커스 이동
    if (value && index < pin.length - 1) {
      inputRefs.current[index + 1].focus();
    }

    // 모든 입력이 완료된 경우 PIN을 확인
    if (newPin.every(digit => digit.length > 0)) {
      // PIN이 올바른지 확인
      if (newPin.join('') === correctPin) {
        setIsAddProfileModalVisible(true); // AddProfileModal 표시
        setError(''); // 오류 메시지 초기화
        onClose(); // PinInputModal 닫기
      } else {
        setError('PIN 번호가 틀렸습니다. 다시 입력해주세요.'); // 오류 메시지 설정
        setPin(['', '', '', '']); // PIN 상태 초기화
        inputRefs.current[0].focus(); // 첫 번째 입력 칸으로 포커스 이동
      }
    }
  };

  // 모달 닫기 핸들러
  const handleClose = useCallback(() => {
    setPin(['', '', '', '']); // PIN 상태 초기화
    setError(''); // 오류 메시지 초기화
    onClose(); // 부모 컴포넌트의 onClose 호출
  }, [onClose]);

  return (
    <>
      <Modal
        transparent={true}
        animationType="slide"
        visible={visible}
        onRequestClose={handleClose}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
              <Text style={styles.closeButtonText}>X</Text>
            </TouchableOpacity>
            <Text style={styles.modalHeader}>
              {error || '이 프로필을 관리하려면 PIN 번호를 입력하세요.'}
            </Text>
            <View style={styles.pinContainer}>
              {pin.map((digit, index) => (
                <TextInput
                  key={index}
                  ref={ref => (inputRefs.current[index] = ref)}
                  style={[
                    styles.pinInput,
                    selectedInput === index && styles.selectedPinInput,
                  ]}
                  keyboardType="numeric"
                  maxLength={1}
                  value={digit}
                  onChangeText={value => handlePinChange(index, value)}
                  onFocus={() => setSelectedInput(index)}
                  onBlur={() => setSelectedInput(null)}
                />
              ))}
            </View>
          </View>
        </View>
      </Modal>

      {/* AddProfileModal should be conditionally rendered */}
      {isAddProfileModalVisible && (
        <AddProfileModal
          visible={isAddProfileModalVisible}
          onClose={() => setIsAddProfileModalVisible(false)}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '100%',
    height: '91%',
    backgroundColor: '#F8C784',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#393939',
    fontSize: 24,
    fontWeight: 'bold',
  },
  modalHeader: {
    fontSize: 35,
    fontWeight: '900',
    color: '#393939',
    marginBottom: 100,
    marginTop: -60,
    textAlign: 'center',
  },
  pinContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '75%',
    marginTop: 0,
  },
  pinInput: {
    width: 200,
    height: 200,
    backgroundColor: '#FCAE59',
    borderRadius: 20,
    fontSize: 100,
    textAlign: 'center',
    color: '#393939',
    fontWeight: '900',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  selectedPinInput: {
    transform: [{ scale: 1.1 }],
  },
});

export default EditPinInputModal;
