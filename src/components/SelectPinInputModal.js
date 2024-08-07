import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from 'react-native';

const SelectPinInputModal = ({ visible, onClose }) => {
  const [pin, setPin] = useState(['', '', '', '']);
  const [selectedInput, setSelectedInput] = useState(null);
  const [error, setError] = useState('');
  const inputRefs = useRef([]);

  const correctPin = '0000'; // 올바른 PIN 번호

  const handlePinChange = (index, value) => {
    let newPin = [...pin];
    newPin[index] = value;
    setPin(newPin);

    // Move to next input if value is not empty and it's not the last input
    if (value && index < pin.length - 1) {
      inputRefs.current[index + 1].focus();
    }

    // Check if all inputs are filled
    if (newPin.every(digit => digit.length > 0)) {
      // Check if the entered PIN is correct
      if (newPin.join('') === correctPin) {
        setError(''); // Clear error message
        onClose(); // Close the modal or perform desired action
      } else {
        setError('PIN 번호가 틀렸습니다. 다시 입력해주세요.'); // Set error message
        setPin(['', '', '', '']); // Clear the PIN inputs
        if (inputRefs.current[0]) {
          inputRefs.current[0].focus(); // Focus on the first input
        }
      }
    }
  };

  useEffect(() => {
    // Reset PIN input and focus on the first input when modal is opened
    if (visible) {
      setPin(['', '', '', '']);
      setError(''); // Clear any existing error message
      if (inputRefs.current[0]) {
        inputRefs.current[0].focus();
      }
    }
  }, [visible]);

  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>X</Text>
          </TouchableOpacity>
          <Text style={styles.modalHeader}>
            {error || '이 프로필을 선택하려면 PIN 번호를 입력하세요.'}
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

export default SelectPinInputModal;
