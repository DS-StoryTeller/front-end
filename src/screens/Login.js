import React, { useState } from 'react'
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Image, Button, Alert, ScrollView, KeyboardAvoidingView, Platform } from "react-native"
import { SafeAreaView } from 'react-native-safe-area-context'
import Logo from '../../assets/images/logo.png';
import { storeTokens, storeUser, getAccessToken, getRefreshToken } from '../utils/storage';
import Config from '../config.js';
import Kakao from '../../assets/images/kakao.png';
import Google from '../../assets/images/google.png';


const Login = ({ navigation }) => {
    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async () => {
        try {
            const formData = new FormData();
            formData.append('username', user);
            formData.append('password', password);

            const response = await fetch(`${Config.API_BASE_URL}/login`, {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            console.log('Server response:', response.status, data);

            if (response.ok) {
                const accessToken = response.headers.get('access');
                const refreshToken = response.headers.get('refresh');

                if (accessToken && refreshToken) { // 토큰 값 유효성 검사
                    await storeTokens(accessToken, refreshToken);
                    await storeUser(user);
                    Alert.alert('로그인 성공', '로그인에 성공했습니다.');

                    // 저장된 토큰 확인
                    const storedAccessToken = await getAccessToken();
                    const storedRefreshToken = await getRefreshToken();
                    console.log('Stored access token:', storedAccessToken);
                    console.log('Stored refresh token:', storedRefreshToken);


                    navigation.navigate('BookShelf');
                } else {
                    console.error('Invalid tokens:', data);
                    Alert.alert('로그인 실패', '유효한 토큰이 제공되지 않았습니다.');
                }
            } else {
                Alert.alert('로그인 실패', data.message || '로그인에 실패했습니다.');
            }
        } catch (error) {
            console.error(error);
            Alert.alert('로그인 에러', '로그인 중 오류가 발생했습니다.');
        }
    };

    const checkTokens = async () => {
        const storedAccessToken = await getAccessToken();
        const storedRefreshToken = await getRefreshToken();
        console.log('Stored access token:', storedAccessToken);
        console.log('Stored refresh token:', storedRefreshToken);
        Alert.alert('Stored Tokens', `Access Token: ${storedAccessToken}\nRefresh Token: ${storedRefreshToken}`);
    };


    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <ScrollView contentContainerStyle={styles.scrollViewContent} showsVerticalScrollIndicator={false}>
                    <View style={styles.contentWrapper}>
                        <Image source={Logo} style={styles.logo} />

                        <View style={styles.bigBox}>
                            <View style={styles.textBox}>
                                <Text style={styles.titleText}>
                                    <Text style={styles.titleApp}>StoryTeller</Text>
                                    에
                                </Text>
                                <Text style={styles.titleText}>오신것을 환영합니다</Text>
                            </View>
                            <View style={styles.inputContainer}>
                                <Text style={styles.subTitle}>아이디</Text>
                                <TextInput
                                    placeholder='아이디를 입력해주세요'
                                    value={user}
                                    onChangeText={text => setUser(text)}
                                    style={styles.input}
                                />
                            </View>
                            <View style={styles.inputContainer}>
                                <Text style={styles.subTitle}>비밀번호</Text>
                                <TextInput
                                    placeholder='비밀번호를 입력해주세요'
                                    value={password}
                                    onChangeText={text => setPassword(text)}
                                    style={styles.input}
                                    secureTextEntry={true}
                                />
                            </View>
                            <View style={styles.buttonContainer}>
                                <TouchableOpacity
                                    style={styles.button}
                                    onPress={handleLogin}
                                >
                                    <Text style={styles.buttonText}>로그인</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.orContainer}>
                                <View style={styles.orHorizontal} />
                                <View>
                                    <Text style={styles.orText}>OR</Text>
                                </View>
                                <View style={styles.orHorizontal} />
                            </View>
                            <View style={styles.socialButtonContainer}>
                                <TouchableOpacity
                                    style={styles.socialButton}
                                >
                                    <Image source={Kakao} style={styles.icon} />
                                    <Text style={styles.socialButtonText}>카카오로 로그인하기</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.socialButton}
                                >
                                    <Image source={Google} style={styles.icon} />
                                    <Text style={styles.socialButtonText}>구글로 로그인하기</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.signInContainer}>
                                <Text style={styles.signIn}>계정이 없다면?  </Text>
                                <TouchableOpacity onPress={() => navigation.navigate('Signin')}>
                                    <Text style={styles.signInBold}>회원가입</Text>
                                </TouchableOpacity>
                            </View>


                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FBF7EC',
        alignItems: 'center',
        justifyContent: 'center',
    },

    logo: {
        width: 100,
        height: 90,
        margin: 5,
    },
    bigBox: {
        width: 400,
        height: 490,
        backgroundColor: 'white',
        borderRadius: 30,
        padding: 10,
        alignItems: 'center',
    },
    inputContainer: {
        width: '85%',
        marginTop: 10,
    },
    input: {
        marginTop: 5,
        padding: 10,
        height: 40,
        backgroundColor: '#F2F2EF',
        borderRadius: 13,
        fontSize: 15,

    },
    textBox: {
        width: '90%',
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 20,
    },
    titleApp: {
        alignItems: 'left',
        fontSize: 23,
        color: '#4E5A8C'

    },
    titleText: {
        fontSize: 20,
        color: '#393939'
    },
    buttonContainer: {
        width: '85%',
        marginTop: 15,
        alignItems: 'center',
    },
    button: {
        width: '100%',
        height: 45,
        backgroundColor: '#4E5A8C',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 20,
    },
    orContainer: {
        width: '85%',
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    orHorizontal: {
        flex: 1,
        height: 1,
        backgroundColor: 'black',
    },
    orText: {
        width: 50,
        textAlign: 'center',
    },
    socialButtonContainer: {
        width: '85%',
    },
    socialButton: {
        width: '100%',
        height: 40,
        marginTop: 10,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#4E5A8C',
        flexDirection: 'row', 
    },
    icon: {
        width: 20, 
        height: 20,
        marginRight: 5, 
    },
    socialButtonText: {
        color: '#393939',
        fontSize: 15,
    },
    signInContainer: {
        marginTop: 15,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    signIn: {
        fontSize: 13,
        color: '#393939',
        textAlign: 'center'
    },
    signInBold: {
        color: '#4E5A8C',
        textDecorationLine: 'underline',
    },
    subTitle: {
        color: '#393939',
        fontSize: 15,
    },
    scrollViewContent: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    contentWrapper: {
        width: '100%',
        alignItems: 'center',
    },
});

export default Login