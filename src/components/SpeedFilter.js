import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState, useEffect } from 'react'
import fetchWithAuth from '../api/fetchWithAuth.js'; 

const SpeedFilter = ({handleSpeedFilter, profileId, bookId }) => {
    let buttons = ["0.5배속", "0.75배속", "1.0배속", "1.25배속", "1.5배속"];
    const [btnActive, setBtnActive] = useState("1.0배속");

    useEffect(() => {
        setBtnActive("1.0배속");
    }, []);

    const toggleActive = async (speed) => {
        setBtnActive(speed);
        handleSpeedFilter(speed);

        let readingSpeedValue;
        switch (speed) {
            case "0.5배속":
                readingSpeedValue = "SLOW";
                break;
            case "0.75배속":
                readingSpeedValue = "SLIGHTLY_SLOW";
                break;
            case "1.0배속":
                readingSpeedValue = "NORMAL";
                break;
            case "1.25배속":
                readingSpeedValue = "SLIGHTLY_FAST";
                break;
            case "1.5배속":
                readingSpeedValue = "FAST";
                break;
            default:
                readingSpeedValue = "NORMAL";
        }

       try {
            const response = await fetchWithAuth(`/settings/update?profileId=${profileId}&bookId=${bookId}`, {
                method: 'PUT',
                headers: { 
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    readingSpeed: readingSpeedValue,
                })
            });

            const responseData = await response.json();
                console.log('Response data:', responseData);

            if (response.status !== 200) {
                Alert.alert('Error', '속도 설정 저장 실패');
            }
        } catch (error) {
            Alert.alert('Error', '속도 설정 저장 중 오류 발생');
        }
    }

    return (
        <View style={styles.container}>
            {buttons.map((item, idx) => (
                <TouchableOpacity
                    key={idx}
                    onPress={() => toggleActive(item)}
                    style={[styles.button, btnActive === item && styles.activeButton]}
                >
                    <Text style={[styles.buttonText, btnActive === item && styles.activeButtonText]}>{item}</Text>
                </TouchableOpacity>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    button: {
        padding: 7,
        borderWidth: 1,
        borderColor: '#000',
        backgroundColor: '#fff',
    },
    buttonText: {
        color: '#000',
    },
    activeButton: {
        backgroundColor: '#F8BD66',
    },
    activeButtonText: {
        color: '#000',
    },
})

export default SpeedFilter