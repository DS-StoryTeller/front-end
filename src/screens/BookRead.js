import React, { useState } from 'react'
import { StyleSheet, Text, ImageBackground, View, TouchableOpacity, Alert } from "react-native"
import { SafeAreaView } from 'react-native-safe-area-context'
import Page1 from '../../assets/images/page1.png';
import Ionic from 'react-native-vector-icons/Ionicons';
import ProgressBar from '../components/ProgressBar';

const BookRead = () => {
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');

    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground source={Page1} style={styles.page}>

                <View style={styles.titleBox}>
                    <View style={styles.iconBox}>
                        <TouchableOpacity style={styles.icon} onPress={() => Alert('')} >
                            <Ionic name="home" size={35} color="white" />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.icon} onPress={() => Alert('')} >
                            <Ionic name="settings" size={35} color="white" />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.bookTitle}>Unveiling the Enchanted Cave</Text>
                </View>

                <View style={styles.textBox}>
                    <Text style={styles.bookText}>
                        Once upon a time, in the quaint village of Willowbrook, there lived a young girl named Eunseo. Eunseo was known for her adventurous spirit and her love for exploring the enchanted forests that surrounded her home.
                        {"\n"}One bright morning, as Eunseo ventured deeper into the woods than she had ever gone before, she stumbled upon a mysterious cave hidden beneath the thick foliage.
                    </Text>
                </View>
                <ProgressBar pages={'13'} now={'4'}/>
            </ImageBackground>
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
    page: {
        width: '100%',
        height: '100%',
    },

    titleBox: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'baseline',
        margin: 15,
    },
    bookTitle: {
        fontSize: 35,
        fontWeight: 'bold',
        color: '#FFFFFF',
        margin: (0, 'auto'),
    },
    iconBox: {
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'baseline',
        paddingLeft: 10,
    },
    icon: {
        marginTop: 13,
    },
    textBox: {
        width: '50%',
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        justifyContent: 'center',
        position: 'absolute',
        top: '20%',
        left: '45%',
        borderRadius: 10,
        padding: 10,

    },
    bookText: {
        fontSize: 17,
        color: '#000000',
        textAlign: 'center',
        lineHeight: 20,
    },

})
export default BookRead