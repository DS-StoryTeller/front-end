import React, { useState } from 'react'
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Image, Button } from "react-native"
import { SafeAreaView } from 'react-native-safe-area-context'
import Logo from '../../assets/images/logo.png';


const Signin = ({ navigation }) => {
    const [email, setEmail] = useState('')
    const [code, setCode] = useState('')
    const [password, setPassword] = useState('')
    const [checkPW, setCheckPW] = useState('')
    const [user, setUser] = useState('')

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
                    <View style={styles.EmailContainer}>
                    <TextInput
                        placeholder='example@naver.com'
                        value={email}
                        onChangeText={text => setEmail(text)}
                        style={styles.inputEmail}
                    />
                    <TouchableOpacity
                        style={styles.emailButton}
                    >
                        <Text style={styles.emailButtonText}>인증하기</Text>
                    </TouchableOpacity>
                    </View>
                    <TextInput
                        placeholder='인증번호를 입력해주세요'
                        value={code}
                        onChangeText={text => setCode(text)}
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
                    <TextInput
                        placeholder='비밀번호를 확인해주세요'
                        value={checkPW}
                        onChangeText={text => setCheckPW(text)}
                        style={styles.input}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.subTitle}>사용자 이름</Text>
                    <TextInput
                        placeholder='이름을 입력해주세요'
                        value={user}
                        onChangeText={text => setUser(text)}
                        style={styles.input}
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => navigation.navigate('Login')}
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
    EmailContainer: {
        flexDirection: 'row',
        alignItems: 'center', 
    },
    inputEmail: {
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