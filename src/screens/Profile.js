import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  BackHandler,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import AddProfileModal from '../components/AddProfileModal';
import SelectPinInputModal from '../components/SelectPinInputModal';
import EditPinInputModal from '../components/EditPinInputModal';
import {useAuth} from '../context/AuthContext';
import fetchWithAuth from '../api/fetchWithAuth'; // 인증된 fetch 함수

const Profile = ({navigation}) => {
  const {isLoggedIn, selectedProfile, setSelectedProfile} = useAuth();
  const [profiles, setProfiles] = useState([]);
  const [isChangingProfile, setIsChangingProfile] = useState(false);
  const [isAddProfileModalVisible, setIsAddProfileModalVisible] =
    useState(false);
  const [isPinInputModalVisible, setIsPinInputModalVisible] = useState(false);
  const [isEditPinInputModalVisible, setIsEditPinInputModalVisible] =
    useState(false);
  const [modalType, setModalType] = useState('');
  const [selectedProfileId, setSelectedProfileId] = useState(null); // 추가된 상태

  const fetchProfiles = async () => {
    try {
      const response = await fetchWithAuth(`/profiles/profileList`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({userId: 1}),
      });

      const result = await response.json();
      if (result.status === 200 && result.code === 'SUCCESS_GET_PROFILE_LIST') {
        setProfiles(result.data);
      } else {
        console.error('프로필을 가져오는 데 실패했습니다:', result.message);
      }
    } catch (error) {
      console.error('프로필을 가져오는 데 실패했습니다:', error);
    }
  };

  useEffect(() => {
    fetchProfiles();
  }, []);

  const handleAddProfileModalClose = () => {
    setIsAddProfileModalVisible(false);
    fetchProfiles(); // 프로필 목록을 다시 가져옵니다.
  };

  const handlePinCorrect = profile => {
    setSelectedProfile(profile.name); // 선택된 프로필 업데이트
    navigation.navigate('BookShelf');
  };

  const handleProfilePress = profile => {
    if (isChangingProfile) {
      setModalType('edit');
      setSelectedProfile(profile.name);
      setSelectedProfileId(profile.id); // 선택된 프로필 ID 저장
      setIsEditPinInputModalVisible(true);
    } else {
      setModalType('select');
      setSelectedProfile(profile.name);
      setSelectedProfileId(profile.id); // 선택된 프로필 ID 저장
      setIsPinInputModalVisible(true);
    }
  };

  const renderProfiles = () => {
    return profiles.map((profile, index) => (
      <View key={index} style={styles.profileContainer}>
        <TouchableOpacity
          style={[
            styles.profileButton,
            isChangingProfile && styles.profileButtonActive,
          ]}
          onPress={() => handleProfilePress(profile)}>
          <Image source={{uri: profile.imageUrl}} style={styles.profileImage} />
          {isChangingProfile && (
            <View style={styles.overlay}>
              <Image
                source={require('../../assets/images/pen.png')}
                style={styles.profilepenIcon}
              />
            </View>
          )}
        </TouchableOpacity>
        <Text style={styles.profileText}>{profile.name}</Text>
      </View>
    ));
  };

  const changeProfileText = () => {
    setIsChangingProfile(!isChangingProfile);
    setSelectedProfile(null);
  };

  const handleBackPress = useCallback(() => {
    navigation.navigate('BookShelf');
    return true;
  }, [navigation]);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackPress,
    );
    return () => backHandler.remove();
  }, [handleBackPress]);

  useEffect(() => {
    if (!isLoggedIn) {
      navigation.navigate('Login');
    }
  }, [isLoggedIn, navigation]);

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
        onClose={handleAddProfileModalClose}
      />

      <SelectPinInputModal
        visible={isPinInputModalVisible && modalType === 'select'}
        onClose={() => setIsPinInputModalVisible(false)}
        onPinCorrect={() => navigation.navigate('BookShelf')} // 수정된 부분
        profileId={selectedProfileId} // 프로필 ID를 전달
      />
      <EditPinInputModal
        visible={isEditPinInputModalVisible}
        onClose={() => setIsEditPinInputModalVisible(false)}
        onPinCorrect={() => navigation.navigate('BookShelf')}
        profileId={selectedProfileId} // 프로필 ID 전달
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBF7EC',
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
  profileImage: {
    width: '110%',
    height: '114%',
    resizeMode: 'cover',
  },
  profileText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#545454',
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
