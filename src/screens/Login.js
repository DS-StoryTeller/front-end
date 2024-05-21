import React, { useState } from 'react'
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Image, Button } from "react-native"
import { SafeAreaView } from 'react-native-safe-area-context'
import Logo from '../../assets/images/logo.png';

const Login = ({ navigation }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

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
                    <Text style={styles.subTitle}>이메일</Text>
                    <TextInput
                        placeholder='example@naver.com'
                        value={email}
                        onChangeText={text => setEmail(text)}
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
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.button}
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
                        <Text style={styles.socialButtonText}>카카오로 로그인하기</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.socialButton}
                    >
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
        height: '70%',
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
    },
    socialButtonText: {
        color: '#393939',
        fontSize: 15,
    },
    signInContainer: {
        marginTop: 10,
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
    }
});

export default Login

