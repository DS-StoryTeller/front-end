import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Modal,
  Platform,
  FlatList,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import YesNoModal from '../components/YesNoModal'; // Import YesNoModal

const AddProfileModal = ({ visible, onClose }) => {
  const [name, setName] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [pin, setPin] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [date, setDate] = useState(new Date());
  const [showProfilePicModal, setShowProfilePicModal] = useState(false);
  const [selectedProfilePic, setSelectedProfilePic] = useState(null);
  const [profilePictures, setProfilePictures] = useState([]);

  const [isYesNoModalVisible, setIsYesNoModalVisible] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === 'ios');
    setDate(currentDate);

    let tempDate = new Date(currentDate);
    let fDate = `${tempDate.getFullYear()}-${tempDate.getMonth() + 1}-${tempDate.getDate()}`;
    setBirthdate(fDate);
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  const handleProfilePicSelect = pic => {
    setSelectedProfilePic(pic);
    setShowProfilePicModal(false);
  };

  // Mock function to simulate fetching images from backend
  const fetchProfilePictures = async () => {
    // Replace this with your backend fetch logic
    const fetchedPictures = new Array(12).fill(null).map((_, index) => ({
      id: index.toString(),
      uri: require('../../assets/images/temp_profile_pic.png'), // Replace with different images if available
    }));
    setProfilePictures(fetchedPictures);
  };

  useEffect(() => {
    fetchProfilePictures();
  }, []);

  const handleClose = () => {
    setIsYesNoModalVisible(true);
  };

  const closeYesNoModal = () => {
    setIsYesNoModalVisible(false);
  };

  const handleYes = () => {
    setIsYesNoModalVisible(false);
    onClose(); // Close the AddProfileModal if user confirms
  };

  return (
    <>
      {/* AddProfileModal */}
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
            <Text style={styles.modalHeader}>프로필 만들기</Text>
            <Image
              source={
                selectedProfilePic ||
                require('../../assets/images/temp_profile_pic.png')
              }
              style={styles.profileImage}
            />
            <TouchableOpacity onPress={() => setShowProfilePicModal(true)}>
              <Text style={styles.changeText}>변경</Text>
            </TouchableOpacity>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                value={name}
                placeholder="이름"
                placeholderTextColor="#FF8B42"
                onChangeText={text => setName(text)}
              />
            </View>
            <TouchableOpacity
              onPress={showDatepicker}
              style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                value={birthdate}
                placeholder="생년월일"
                placeholderTextColor="#FF8B42"
                editable={false}
              />
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                value={date}
                mode="date"
                display="default"
                onChange={onChange}
              />
            )}
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                value={pin}
                placeholder="PIN"
                placeholderTextColor="#FF8B42"
                secureTextEntry={true}
                onChangeText={text => setPin(text)}
              />
            </View>
            <TouchableOpacity style={styles.saveButton} onPress={onClose}>
              <Image
                source={require('../../assets/images/save.png')}
                style={styles.saveIcon}
              />
              <Text style={styles.saveButtonText}>프로필 저장</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* ProfilePicModal */}
      <Modal
        transparent={true}
        animationType="slide"
        visible={showProfilePicModal}
        onRequestClose={() => setShowProfilePicModal(false)}>
        <View style={styles.profilePicModalContainer}>
          <View style={styles.profilePicModalContent}>
            <Text style={styles.profilePicModalHeader}>
              프로필을 골라주세요
            </Text>
            <FlatList
              data={profilePictures}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.profilePicItem}
                  onPress={() => handleProfilePicSelect(item.uri)}>
                  <Image source={item.uri} style={styles.profilePic} />
                </TouchableOpacity>
              )}
              numColumns={4}
              keyExtractor={item => item.id}
              contentContainerStyle={styles.profilePicListContainer}
            />
          </View>
        </View>
      </Modal>

      {/* YesNoModal */}
      <YesNoModal
        isVisible={isYesNoModalVisible}
        onClose={closeYesNoModal}
        title={'정말 나가시겠습니까?'}
        subtitle={`나가시면 작성하신 프로필의 정보는 \n 저장되지 않습니다.`}
        buttonText1={'확인'}
        buttonText2={'취소'}
        onConfirm={handleYes}
      />
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
  inputWrapper: {
    width: '25%',
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    fontWeight: '900',
    fontSize: 17,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 10,
    color: '#FF8B42',
    height: '125%',
  },
  saveButton: {
    backgroundColor: '#F8C784',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#393939',
    marginTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
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
  profilePicModalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  profilePicModalContent: {
    width: '90%',
    backgroundColor: '#FBF7EC',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  profilePicModalHeader: {
    top: 60,
    fontSize: 35,
    fontWeight: '900',
    color: '#393939',
    marginBottom: 20,
  },
  profilePicItem: {
    left: 85,
    top: 80,
    width: '20%',
    aspectRatio: 1,
    padding: 5,
  },
  profilePic: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
});

export default AddProfileModal;
