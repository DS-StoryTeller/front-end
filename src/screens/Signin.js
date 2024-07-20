import React, { useState } from 'react'
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Image, Button,Alert } from "react-native"
import { SafeAreaView } from 'react-native-safe-area-context'
import Logo from '../../assets/images/logo.png';


const Signin = ({ navigation }) => {
    const [email, setEmail] = useState('')
    const [code, setCode] = useState('')
    const [password, setPassword] = useState('')
    const [checkPW, setCheckPW] = useState('')
    const [user, setUser] = useState('')

    const handleSignup = async () => {
        if (password !== checkPW) {
            Alert.alert('오류', '비밀번호가 일치하지 않습니다');
            return;
        }

        try {
            const formData = new FormData();
            formData.append('username', user);
            formData.append('password', password);
            formData.append('email', email);
            formData.append('role', 'ROLE_USER');

            const response = await fetch('http://192.168.219.102:8080/register', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            if (response.ok) {
                Alert.alert('성공', '회원가입이 완료되었습니다');
                navigation.navigate('Login');
            } else {
                Alert.alert('오류', data.message || '회원가입에 실패했습니다');
            }
        } catch (error) {
            console.error(error);
            Alert.alert('오류', '회원가입 중 오류가 발생했습니다');
        }
    };


    return (
        <SafeAreaView style={styles.container}>
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
                    <Text style={styles.subTitle}>사용자 아이디</Text>
                    <View style={styles.shortInputContainer}>
                    <TextInput
                        placeholder='아이디를 입력해주세요'
                        value={user}
                        onChangeText={text => setUser(text)}
                        style={styles.inputShort}
                    />
                    <TouchableOpacity
                        style={styles.emailButton}
                    >
                        <Text style={styles.emailButtonText}>중복 확인</Text>
                    </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.subTitle}>이메일</Text>
                    <View style={styles.shortInputContainer}>
                        <TextInput
                            placeholder='example@naver.com'
                            value={email}
                            onChangeText={text => setEmail(text)}
                            style={styles.inputShort}
                        />
                        <TouchableOpacity
                            style={styles.emailButton}
                        >
                            <Text style={styles.emailButtonText}>인증하기</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.shortInputContainer}>
                    <TextInput
                        placeholder='인증번호를 입력해주세요'
                        value={code}
                        onChangeText={text => setCode(text)}
                        style={styles.inputShort}
                    />
                    <TouchableOpacity
                        style={styles.emailButton}
                    >
                        <Text style={styles.emailButtonText}>인증 확인</Text>
                    </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.subTitle}>비밀번호</Text>
                    <TextInput
                        placeholder='비밀번호를 입력해주세요'
                        value={password}
                        onChangeText={text => setPassword(text)}
                        style={styles.input}
                    />
                    <View style={styles.shortInputContainer}>
                    <TextInput
                        placeholder='비밀번호를 확인해주세요'
                        value={checkPW}
                        onChangeText={text => setCheckPW(text)}
                        style={styles.inputShort}
                    />
                    <TouchableOpacity
                        style={styles.emailButton}
                    >
                        <Text style={styles.emailButtonText}>일치 확인</Text>
                    </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleSignup}
                    >
                        <Text style={styles.buttonText}>회원가입</Text>
                    </TouchableOpacity>
                </View>
            </View>
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
        width: '8%',
        height: '15%',
        margin: 5,
    },
    bigBox: {
        width: '35%',
        height: '80%',
        backgroundColor: 'white',
        borderRadius: 30,
        padding: 10,
        alignItems: 'center',
    },
    inputContainer: {
        width: '85%',
        marginTop: 10,
    },
    shortInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    inputShort: {
        width: '75%',
        marginTop: 5,
        marginRight: 5,
        height: 40,
        padding: 10,
        backgroundColor: '#F2F2EF',
        borderRadius: 13,
        fontSize: 15,
    },
    emailButton: {
        width: '23%',
        height: 40,
        marginTop: 5,
        backgroundColor: '#4E5A8C',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    emailButtonText: {
        color: 'white',
        fontSize: 15,
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
        marginBottom: 5,
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
        marginTop: 10,
        alignItems: 'center',
    },
    button: {
        marginTop: 10,
        width: '100%',
        height: 50,
        backgroundColor: '#4E5A8C',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 20,
    },
    subTitle: {
        color: '#393939',
        fontSize: 15,
    }
});



export default Signin