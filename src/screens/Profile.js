import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import axios from 'axios';
import AddProfileModal from '../components/AddProfileModal';
import PinInputModal from '../components/PinInputModal';

const Profile = () => {
  const [isChangingProfile, setIsChangingProfile] = useState(false);
  const [isAddProfileModalVisible, setIsAddProfileModalVisible] =
    useState(false);
  const [isPinInputModalVisible, setIsPinInputModalVisible] = useState(false);
  const [selectedProfileIndex, setSelectedProfileIndex] = useState(null); // 선택된 프로필 인덱스
  const [profiles, setProfiles] = useState(['프로필1', '프로필2']); // 예시 프로필 데이터

  const renderProfiles = () => {
    return profiles.map((profile, index) => (
      <View key={index} style={styles.profileContainer}>
        <TouchableOpacity
          style={[
            styles.profileButton,
            isChangingProfile &&
              selectedProfileIndex !== index &&
              styles.profileButtonInactive,
            isChangingProfile &&
              selectedProfileIndex === index &&
              styles.profileButtonActive,
          ]}
          onPress={() => {
            setIsPinInputModalVisible(true);
            setSelectedProfileIndex(index);
          }}>
          <Image
            source={require('../../assets/images/temp_profile_pic.png')}
            style={styles.profileImage}
          />
          {isChangingProfile && selectedProfileIndex === index && (
            <View style={styles.overlay}>
              <Image
                source={require('../../assets/images/pen.png')}
                style={styles.profilepenIcon}
              />
            </View>
          )}
        </TouchableOpacity>
        <Text style={styles.profileText}>{profile}</Text>
      </View>
    ));
  };

  const changeProfileText = () => {
    setIsChangingProfile(!isChangingProfile);
    setSelectedProfileIndex(null); // 프로필 관리 모드에서는 선택된 프로필 인덱스 초기화
  };

  const addProfile = async profileData => {
    try {
      const response = await axios.post(
        'http://192.168.35.124/profiles',
        profileData,
      );
      setProfiles([...profiles, response.data.name]); // 서버로부터 받은 프로필 이름 추가
    } catch (error) {
      Alert.alert(
        '프로필 생성 오류',
        '프로필을 생성하는 동안 오류가 발생했습니다.',
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>
        {isChangingProfile
          ? '관리할 프로필을 골라주세요'
          : '프로필을 선택해주세요'}
      </Text>
      <View style={styles.profilesContainer}>
        {renderProfiles()}
        {!isChangingProfile && (
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => setIsAddProfileModalVisible(true)}>
            <Text style={styles.plus}>+</Text>
          </TouchableOpacity>
        )}
      </View>
      <TouchableOpacity
        style={[
          styles.changeProfileButton,
          {borderColor: '#393939', borderWidth: 2},
        ]}
        onPress={changeProfileText}>
        <Image
          source={require('../../assets/images/pen.png')}
          style={styles.penIcon}
        />
        <Text
          style={[
            styles.changeProfileButtonText,
            {color: '#393939', marginLeft: 10},
          ]}>
          프로필 관리
        </Text>
      </TouchableOpacity>
      <AddProfileModal
        visible={isAddProfileModalVisible}
        onClose={() => setIsAddProfileModalVisible(false)}
        onSave={addProfile}
      />
      <PinInputModal
        visible={isPinInputModalVisible}
        onClose={() => setIsPinInputModalVisible(false)}
        modalHeaderText={
          isChangingProfile
            ? '이 프로필을 관리하려면 PIN 번호를 입력하세요.'
            : '이 프로필을 선택하려면 PIN 번호를 입력하세요.'
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  header: {
    fontSize: 37,
    marginBottom: 50,
    marginTop: 160,
    color: '#393939',
    fontWeight: '800',
  },
  profilesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginTop: 30,
  },
  profileContainer: {
    alignItems: 'center',
    margin: 10,
  },
  profileButton: {
    width: 150,
    height: 150,
    backgroundColor: 'lightblue',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  profileButtonActive: {
    opacity: 0.6,
  },
  profileButtonInactive: {
    opacity: 0.4,
  },
  profileImage: {
    width: '110%',
    height: '114%',
    resizeMode: 'cover',
  },
  profileText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    textAlign: 'center',
    marginTop: 5,
  },
  addButton: {
    width: 150,
    height: 150,
    backgroundColor: '#FCAE59',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  plus: {
    fontSize: 110,
    fontWeight: 'bold',
    color: '#FF8B42',
    textAlign: 'center',
  },
  changeProfileButton: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    backgroundColor: 'transparent',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  changeProfileButtonText: {
    fontSize: 18,
    fontWeight: '900',
  },
  penIcon: {
    width: 24,
    height: 24,
    tintColor: '#393939',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profilepenIcon: {
    width: 70,
    height: 70,
    tintColor: '#FFFFFF',
  },
});

export default Profile;
