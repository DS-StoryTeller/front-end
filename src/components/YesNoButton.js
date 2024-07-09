import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'

const YesNoButton = ({text, onPress}) => {
    return (
        <View>
            <TouchableOpacity onPress={onPress} style={styles.button}>
                <Text style={styles.buttonText}>{text}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        width: 100,
        height: 40,
        backgroundColor: '#FCA25B',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 32,
        marginHorizontal: 25,
        
    },

    buttonText: {
        fontSize: 19,
    }
})

export default YesNoButton