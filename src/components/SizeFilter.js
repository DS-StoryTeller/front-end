import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState, useEffect } from 'react'

const SizeFilter = ({handleSizeFilter}) => {
    let buttons = ["작게", "기본", "크게"];
    const [btnActive, setBtnActive] = useState("작게");

    useEffect(() => {
        setBtnActive("기본");
    }, []);

    const toggleActive = (size) => {
        setBtnActive(size);
        handleSizeFilter(size);
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
        width: '45%',
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