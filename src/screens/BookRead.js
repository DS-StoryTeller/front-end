import React, { useState, useEffect, useRef } from 'react'
import { StyleSheet, Text, ImageBackground, View, TouchableOpacity, Alert,  Animated, Modal } from "react-native"
import { SafeAreaView } from 'react-native-safe-area-context'
import { useFocusEffect } from '@react-navigation/native';
import Page1 from '../../assets/images/page1.png';
import Ionic from 'react-native-vector-icons/Ionicons';
import ProgressBar from '../components/ProgressBar';
import SettingModal from '../components/SettingModal';
import YesNoModal from '../components/YesNoModal';
import NextStep from '../components/NextStep';
import BookBg from '../../assets/images/bookBg.png';

const BookRead = ({ navigation }) => {
    const [title, setTitle] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPageCount, setTotalPageCount] = useState(0);
    const [bookText, setBookText] = useState('');
    const [coverImage, setCoverImage] = useState('');
    const [pageImage, setPageImage] = useState('');

    // 모달창
    const [isSettingModalVisible, setIsSettingModalVisible] = useState(false);
    const [isYesNoModalVisible, setIsYesNoModalVisible] = useState(false);

    const openSettingModal = () => {
        setIsSettingModalVisible(true);
    };

    const closeSettingModal = () => {
        setIsSettingModalVisible(false);
    };

    const openYesNoModal = () => {
        setIsYesNoModalVisible(true);
    };

    const closeYesNoModal = () => {
        setIsYesNoModalVisible(false);
    };

    // nextStep 버튼
    const [nextStepVisible, setNextStepVisible] = useState(false);
    const [timer, setTimer] = useState(null); // 타이머 상태 추가


    useFocusEffect(
        React.useCallback(() => {
            setNextStepVisible(false); // 상태 초기화
            if (timer) {
                clearTimeout(timer); // 기존 타이머 클리어
            }
            const newTimer = setTimeout(() => {
                setNextStepVisible(true);
                startBlinking();
            }, 3000); // 3초 후에 nextStepVisible 상태를 true로 변경

            setTimer(newTimer); // 타이머 상태 업데이트

            return () => {
                clearTimeout(newTimer); // 언마운트 시 타이머 클리어
                blinkAnim.stopAnimation();
            };
        }, [navigation])
    );

    // 모르는 단어 조희
    const [wordMeaning, setWordMeaning] = useState('');
    const [isWordModalVisible, setIsWordModalVisible] = useState(false);

    const handleWordClick = async (word) => {
        try {
            const response = await fetch(`https://your-backend-api.com/word-meaning?word=${word}`);
            const data = await response.json();
            setWordMeaning(data.meaning);
            setIsWordModalVisible(true);
        } catch (error) {
            Alert.alert('Error', 'Failed to fetch the word meaning');
        }
    };

    const closeWordModal = () => {
        setIsWordModalVisible(false);
        setWordMeaning('');
    };


    // 단어 클릭 메세지 깜빡거림
    const blinkAnim = useRef(new Animated.Value(1)).current;

    const startBlinking = () => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(blinkAnim, {
                    toValue: 0,
                    duration: 500,
                    useNativeDriver: true,
                }),
                Animated.timing(blinkAnim, {
                    toValue: 1,
                    duration: 500,
                    useNativeDriver: true,
                }),
            ]),
        ).start();
    };

    useEffect(() => {
        const fetchBookDetails = async () => {
            try {
                const response = await fetch('http://192.168.219.102:8080/books/detail?profileId=1&bookId=1', {
                    headers: {
                        'access': 'eyJhbGciOiJIUzI1NiJ9.eyJhdXRoZW50aWNhdGlvbk1ldGhvZCI6InNlbGYiLCJjYXRlZ29yeSI6ImFjY2VzcyIsInVzZXJuYW1lIjoicHlvdW5hbmkiLCJyb2xlIjoiUk9MRV9VU0VSIiwiaWF0IjoxNzIwODM4MDI1LCJleHAiOjE3MjA5MjQ0MjV9.8tTUNayEusGSzpphFKipxMZvSYcMexSL8k9Bzmm8FpI'
                    }
                });
                const result = await response.json();
    
                if (result.status === 200) {
                    const bookData = result.data;
                    setTitle(bookData.title);
                    setCurrentPage(bookData.currentPage);
                    setTotalPageCount(bookData.totalPageCount);
                    setCoverImage(bookData.coverImage);
                    if (bookData.pages && bookData.pages.length > 0) {
                        const currentPageData = bookData.pages[bookData.currentPage];
                        setBookText(currentPageData.content);
                        setPageImage(currentPageData.image);
                    }
                } else {
                    Alert.alert('Error', 'Failed to retrieve book details');
                }
            } catch (error) {
                Alert.alert('Error', 'Failed to fetch book details');
            }
        };
        fetchBookDetails();
    }, []);
    
    // 페이지 갱신
    const fetchPageDetails = async (pageNumber) => {
        try {
            const response = await fetch(`http://192.168.219.102:8080/books/detail?profileId=1&bookId=1&page=${pageNumber}`, {
                headers: {
                    'access': 'eyJhbGciOiJIUzI1NiJ9.eyJhdXRoZW50aWNhdGlvbk1ldGhvZCI6InNlbGYiLCJjYXRlZ29yeSI6ImFjY2VzcyIsInVzZXJuYW1lIjoicHlvdW5hbmkiLCJyb2xlIjoiUk9MRV9VU0VSIiwiaWF0IjoxNzIwODM4MDI1LCJleHAiOjE3MjA5MjQ0MjV9.8tTUNayEusGSzpphFKipxMZvSYcMexSL8k9Bzmm8FpI'
                }
            });
    
            const result = await response.json();
            if (result.status === 200) {
                const pageData = result.data.pages[pageNumber];
                setBookText(pageData.content);
                setPageImage(pageData.image);
                setCurrentPage(pageNumber);
            } else {
                Alert.alert('Error', 'Failed to retrieve page details');
            }
        } catch (error) {
            Alert.alert('Error', 'Failed to fetch page details');
        }
    };

    const goNextStep = () => {
        const nextPage = currentPage + 1;
        if (nextPage < totalPageCount) {
            fetchPageDetails(nextPage);
        } else {
            navigation.navigate('Quiz')
        }
    };

    const renderWord = (word, index) => {
        if (word.trim() === '') {
            return <Text key={index} style={styles.bookText}>{word}</Text>;
        }
        return (
            <TouchableOpacity key={index} onPress={() => handleWordClick(word.trim())}>
                <Text style={styles.bookText}>{word}</Text>
            </TouchableOpacity>
        );
    };

    const words = bookText.split(/(\s+)/);

    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground source={BookBg} >
                <ImageBackground source={Page1} style={styles.page}>
                    <View style={styles.iconBox}>
                        <TouchableOpacity style={styles.icon} onPress={openYesNoModal} >
                            <Ionic name="home" size={35} color="white" />
                        </TouchableOpacity>
                        <YesNoModal isVisible={isYesNoModalVisible} onClose={closeYesNoModal}
                            title={"정말 중단하시겠습니까?"}
                            subtitle={`다시 동화를 읽을 때 \n 현재 페이지부터 읽으실 수 있습니다.`}
                            buttonText1={"중단하기"}
                            linkTo={'BookShelf'}
                            buttonText2={"취소"} />
                        <TouchableOpacity style={styles.icon} onPress={openSettingModal} >
                            <Ionic name="settings" size={35} color="white" />
                        </TouchableOpacity>
                        <SettingModal isVisible={isSettingModalVisible} onClose={closeSettingModal} />
                    </View>
                    
                </ImageBackground>

                <View style={styles.textBox}>
                    <View style={styles.titleBox}>
                        <Text style={styles.bookTitle}>{title}</Text>
                    </View>
                    <View style={styles.bookTextContainer}>
                        {words.map((word, index) => renderWord(word, index))}
                    </View>
                </View>

                {nextStepVisible && (
                    <>
                         <Animated.View style={[styles.wordBox, { opacity: blinkAnim }]}>
                    <Text style={styles.wordText}>Click on a word {"\n"} you don't know</Text>
                </Animated.View>
                        <NextStep goNextStep={goNextStep}/>
                    </>
                )}
                 {totalPageCount > 0 && currentPage >= 0 && (
                    <ProgressBar pages={totalPageCount.toString()} now={currentPage.toString()} />
                )}
                {/*             
                <Modal
                    visible={isWordModalVisible}
                    transparent={true}
                    animationType="slide"
                    onRequestClose={closeWordModal}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalText}>{wordMeaning}</Text>
                            <TouchableOpacity onPress={closeWordModal}>
                                <Text style={styles.closeButton}>Close</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal> */}
            </ImageBackground>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FBF7EC',
    },
    page: {
        width: '70.5%',
        height: '100%',
    },

    titleBox: {
        marginBottom: 30,
    },
    textBox: {
        width: '35%',
        justifyContent: 'center',
        position: 'absolute',
        top: '3%',
        left: '57%',
        borderRadius: 10,
        padding: 10,

    },
     bookTextContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    bookTitle: {
        fontSize: 38,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center',
    },
    iconBox: {
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'baseline',
        margin: 20,
    },
    icon: {
        marginTop: 13,
    },

    bookText: {
        fontSize: 18,
        color: '#000000',
        textAlign: 'center',
        lineHeight: 30,
    },
    wordBox: {
        width: 130,
        height: 70,
        position: 'absolute',
        bottom: '10%',
        left: '80%',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: 'rgba(78,90,140,0.8)', 
        borderStyle: 'solid',
        justifyContent: 'center',
    },
    wordText: {
        textAlign: 'center',
        fontSize: 18,
        color: 'rgba(78,90,140,0.8)',
    }
    // modalContainer: {
    //     flex: 1,
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     backgroundColor: 'rgba(0,0,0,0.5)',
    // },
    // modalContent: {
    //     width: '80%',
    //     padding: 20,
    //     backgroundColor: 'white',
    //     borderRadius: 10,
    //     alignItems: 'center',
    // },
    // modalText: {
    //     fontSize: 20,
    //     marginBottom: 20,
    // },
    // closeButton: {
    //     fontSize: 18,
    //     color: '#0000EE',
    // },

})
export default BookRead