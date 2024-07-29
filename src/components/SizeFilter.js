import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import fetchWithAuth from '../api/fetchWithAuth.js'; 

const SizeFilter = ({handleSizeFilter, profileId, bookId, initialSize }) => {
    let buttons = ["작게", "기본", "크게"];
    const [btnActive, setBtnActive] = useState(initialSize);

    useEffect(() => {
        setBtnActive(initialSize);
    }, [initialSize]);

    const getFontSizeValue = (size) => {
        switch (size) {
            case "작게":
                return "SMALL";
            case "기본":
                return "MEDIUM";
            case "크게":
                return "LARGE";
            default:
                return "MEDIUM";
        }
    }

    const toggleActive = async (size) => {
       const fontSizeValue = getFontSizeValue(size);
        setBtnActive(size);
        handleSizeFilter(fontSizeValue); 

        try {
            const response = await fetchWithAuth(`http://172.30.1.5:8080/settings/update?profileId=${profileId}&bookId=${bookId}`, {
                method: 'PUT',
                headers: { 
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    fontSize: fontSizeValue,
                })
            });

            if (response.status !== 200) { 
                Alert.alert('Error', 'Failed to update settings');
                const result = await response.json();
                console.log(result); // 응답 결과 확인
            } else {
                const result = await response.json();
                console.log(result); // 응답 결과 확인
            }
        } catch (error) {
            Alert.alert('Error', 'Failed to update settings');
            console.error(error);
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
        paddingVertical: 6,
        paddingHorizontal: 16,
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

export default SizeFilter