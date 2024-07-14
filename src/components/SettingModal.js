import { View, Text, StyleSheet, Modal, Button, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import Ionic from 'react-native-vector-icons/Ionicons';
import SpeedFilter from './SpeedFilter';
import SizeFilter from './SizeFilter';

const SettingModal = ({ isVisible, onClose, handleSizeFilter, profileId, bookId, initialSize }) => {
    const [speed, setSpeed] = useState("1.0배속");
    const [size, setSize] = useState(initialSize);

    const handleSpeedFilter = (speed) => {
        setSpeed(speed);
    }
    
    const handleSizeFilterLocal = (size) => {
        setSize(size);
        handleSizeFilter(size); // 부모 컴포넌트로 전달
    }
    
    
    useEffect(() => {
        setSpeed("1.0배속");
    }, []);

    useEffect(() => {
        setSize(initialSize);
    }, [initialSize]);

    return (
        <Modal
            animationType="slide"
            visible={isVisible}
            transparent={true}
        >
            <View style={styles.modalView}>
                <View style={styles.modalTitle}>
                    <View style={styles.IconTitle}>
                        <View><Ionic name="settings" size={21} color='black' /></View>
                        <Text style={styles.modalTextStyle}>설정</Text>
                    </View>
                    <TouchableOpacity onPress={onClose} style={styles.close}>
                        <Ionic name="close" size={21} color='black' />
                    </TouchableOpacity>
                </View>
                <View style={styles.buttonContainer}>
                    <Text style={styles.subtitle}>재생 속도</Text>
                    <View style={styles.buttonGroup}>
                        <SpeedFilter handleSpeedFilter={handleSpeedFilter} />
                    </View>
                </View>
                <View style={styles.buttonContainer}>
                    <Text style={styles.subtitle}>글자 크기</Text>
                    <View style={styles.buttonGroup}>
                        <SizeFilter handleSizeFilter={handleSizeFilterLocal} profileId={profileId} bookId={bookId} initialSize={size} />
                    </View>
                </View>
            </View>
            
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalTitle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
        width: '100%',
        paddingHorizontal: 20,
    },
    modalView: {
        width: '40%',
        height: '40%',
        backgroundColor: "white",
        borderRadius: 20,
        padding: 15,
        position: 'absolute',
        top: '28%',
        left: '30%',
    },
    IconTitle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },

    modalTextStyle: {
        paddingLeft: 2,
        color: 'black',
        fontSize: 20,
    },
    close: {
        justifyContent: 'center',
    },
    buttonContainer: {
        justifyContent: 'center',
        marginTop: 7,
    },
    subtitle: {
        textAlign: 'center',
        fontSize: 17,
        color: 'black',
    },
    buttonGroup: {
        flexDirection: 'row',
        margin: 10,
        justifyContent: 'space-around',
        alignItems: 'center',
    },
  
});
export default SettingModal
