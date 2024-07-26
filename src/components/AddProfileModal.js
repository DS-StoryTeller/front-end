import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Modal,
} from 'react-native';

const AddProfileModal = ({visible, onClose, onSave}) => {
  const [name, setName] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [pin, setPin] = useState('');

  const handleSave = () => {
    onSave({name, birthdate, pin});
    onClose();
  };

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
          <Text style={styles.modalHeader}>프로필 만들기</Text>
          <Image
            source={require('../../assets/images/temp_profile_pic.png')}
            style={styles.profileImage}
          />
          <TouchableOpacity>
            <Text style={styles.changeText}>변경</Text>
          </TouchableOpacity>
          <TextInput
            placeholder="이름"
            placeholderTextColor="#FF8B42"
            style={styles.input}
            value={name}
            onChangeText={setName}
          />
          <TextInput
            placeholder="생년월일"
            placeholderTextColor="#FF8B42"
            style={styles.input}
            value={birthdate}
            onChangeText={setBirthdate}
          />
          <TextInput
            placeholder="PIN"
            placeholderTextColor="#FF8B42"
            secureTextEntry={true}
            style={styles.input}
            value={pin}
            onChangeText={setPin}
          />
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Image
              source={require('../../assets/images/save.png')}
              style={styles.saveIcon}
            />
            <Text style={styles.saveButtonText}>프로필 저장</Text>
          </TouchableOpacity>
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
    marginBottom: 20,
  },
  profileImage: {
    width: 160,
    height: 160,
    marginBottom: 10,
  },
  changeText: {
    color: '#FF8B42',
    marginTop: -10,
    marginBottom: 20,
    fontWeight: '900',
    fontSize: 24,
  },
  input: {
    width: '25%',
    height: '10%',
    backgroundColor: '#FFFFFF',
    fontWeight: '900',
    fontSize: 17,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    color: '#FF8B42', // 입력 칸의 텍스트 색상
  },
  saveButton: {
    backgroundColor: '#F8C784',
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#393939',
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  saveIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  saveButtonText: {
    color: '#393939',
    fontWeight: 'bold',
  },
});

export default AddProfileModal;
