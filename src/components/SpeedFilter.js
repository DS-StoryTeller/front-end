import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState, useEffect } from 'react'

const SpeedFilter = ({handleSpeedFilter}) => {
    let buttons = ["0.5배속", "0.75배속", "1.0배속", "1.25배속", "1.5배속"];
    const [btnActive, setBtnActive] = useState("1.0배속");

    useEffect(() => {
        setBtnActive("1.0배속");
    }, []);

    const toggleActive = (speed) => {
        setBtnActive(speed);
        handleSpeedFilter(speed);
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
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '80%',
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