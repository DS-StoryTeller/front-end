import React, { useState } from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Logo from '../../../../assets/images/logo.png';
import Config from '../../../config.js';
import OkModal from '../../../components/common/OkModal.js';
import { styles } from './styles';

const Signin = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [checkPW, setCheckPW] = useState('');
  const [user, setUser] = useState('');
  const [isUsernameVerified, setIsUsernameVerified] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalMessage, setModalMessage] = useState('');

  const handleSignup = async () => {
    if (password !== checkPW) {
      showModal('비밀번호 오류', '비밀번호가 일치하지 않습니다.');
      return;
    }

    if (!isUsernameVerified) {
      showModal('아이디 확인 필요', '아이디 중복 확인을 해주세요.');
      return;
    }

    if (!isEmailVerified) {
      showModal('이메일 인증 필요', '이메일 인증을 해주세요.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('username', user);
      formData.append('password', password);
      formData.append('email', email);
      formData.append('role', 'ROLE_USER');

      const response = await fetch(`${Config.API_BASE_URL}/register`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        showModal('환영합니다!', '회원가입이 성공적으로 완료되었습니다.');
        setTimeout(() => {
          setModalVisible(false);
          navigation.navigate('Login');
        }, 2000);
      } else {
        showModal('가입 실패', data.message || '회원가입에 실패했습니다.');
      }
    } catch (error) {
      console.error(error);
      showModal('오류 발생', '회원가입 중 오류가 발생했습니다.');
    }
  };

  const handleEmailVerificationRequest = async () => {
    try {
      const response = await fetch(
        `${Config.API_BASE_URL}/emails/verification-requests`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        },
      );

      const data = await response.json();

      if (response.ok) {
        showModal('이메일 발송 완료', '인증 이메일이 성공적으로 발송되었습니다.');
      } else {
        showModal('발송 실패', data.message || '인증 이메일 발송에 실패했습니다.');
      }
    } catch (error) {
      console.error(error);
      showModal('오류 발생', '인증 이메일 요청 중 오류가 발생했습니다.');
    }
  };

  const handleEmailVerificationCheck = async () => {
    try {
      const response = await fetch(
        `${Config.API_BASE_URL}/emails/verifications`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, authCode: code }),
        },
      );

      const data = await response.json();

      if (response.ok) {
        if (data.data.authResult) {
          setIsEmailVerified(true);
          showModal('이메일 인증 성공', '이메일 인증이 성공적으로 확인되었습니다.');
        } else {
          showModal('이메일 인증 실패', '인증번호가 일치하지 않습니다.');
        }
      } else {
        showModal('이메일 인증 실패', data.message || '이메일 인증 확인에 실패했습니다.');
      }
    } catch (error) {
      console.error(error);
      showModal('이메일 인증 실패', '이메일 인증 확인 중 오류가 발생했습니다.');
    }
  };

  const handleUsernameVerification = async () => {
    try {
      const response = await fetch(
        `${Config.API_BASE_URL}/username/verifications`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username: user }),
        },
      );

      const data = await response.json();

      if (response.ok) {
        if (data.data.authResult) {
          setIsUsernameVerified(true);
          showModal('아이디 인증 성공', '이 아이디는 사용이 가능합니다. \n이제 다른 정보를 입력해 주세요.');
        } else {
          showModal('아이디 인증 실패', '이 아이디는 이미 사용 중입니다.\n다른 아이디를 시도해 주세요.');
        }
      } else {
        showModal('아이디 인증 실패', data.message || '아이디 중복 확인 중 문제가 발생했어요.\n다시 시도해 주세요.');
      }
    } catch (error) {
      showModal('아이디 인증 실패', '아이디 중복 확인 중 오류가 발생했어요.\n다시 시도해 주세요.');
    } finally {
      setModalVisible(true);
    }
  };

  const showModal = (title, message) => {
    setModalTitle(title);
    setModalMessage(message);
    setModalVisible(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={styles.scrollViewContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.contentWrapper}>
            <Image source={Logo} style={styles.logo} />
            <View style={styles.bigBox}>
              <View style={styles.textBox}>
                <Text style={styles.titleText}>
                  <Text style={styles.titleApp}>StoryTeller</Text>에
                </Text>
                <Text style={styles.titleText}>오신것을 환영합니다</Text>
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.subTitle}>사용자 아이디</Text>
                <View style={styles.shortInputContainer}>
                  <TextInput
                    placeholder="아이디를 입력해주세요"
                    value={user}
                    onChangeText={text => setUser(text)}
                    style={styles.inputShort}
                  />
                  <TouchableOpacity
                    style={styles.emailButton}
                    onPress={handleUsernameVerification}
                  >
                    <Text style={styles.emailButtonText}>중복 확인</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.subTitle}>이메일</Text>
                <View style={styles.shortInputContainer}>
                  <TextInput
                    placeholder="example@naver.com"
                    value={email}
                    onChangeText={text => setEmail(text)}
                    style={styles.inputShort}
                  />
                  <TouchableOpacity
                    style={styles.emailButton}
                    onPress={handleEmailVerificationRequest}
                  >
                    <Text style={styles.emailButtonText}>인증하기</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.shortInputContainer}>
                  <TextInput
                    placeholder="인증번호를 입력해주세요"
                    value={code}
                    onChangeText={text => setCode(text)}
                    style={styles.inputShort}
                  />
                  <TouchableOpacity
                    style={styles.emailButton}
                    onPress={handleEmailVerificationCheck}
                  >
                    <Text style={styles.emailButtonText}>인증 확인</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.subTitle}>비밀번호</Text>
                <TextInput
                  placeholder="비밀번호를 입력해주세요"
                  value={password}
                  onChangeText={text => setPassword(text)}
                  style={styles.input}
                  secureTextEntry={true}
                />
                <TextInput
                  placeholder="비밀번호를 확인해주세요"
                  value={checkPW}
                  onChangeText={text => setCheckPW(text)}
                  style={styles.input}
                  secureTextEntry={true}
                />
              </View>

              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={handleSignup}>
                  <Text style={styles.buttonText}>회원가입</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>

        <OkModal
          isVisible={modalVisible}
          onClose={() => setModalVisible(false)}
          title={modalTitle}
          message={modalMessage}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Signin;
