import React, { useState, useEffect, useRef } from 'react'
import { StyleSheet, Text, ImageBackground, View, TouchableOpacity, Alert, Animated, Modal, Button } from "react-native"
import { SafeAreaView } from 'react-native-safe-area-context'
import { useFocusEffect } from '@react-navigation/native';
import Page1 from '../../assets/images/page1.png';
import Ionic from 'react-native-vector-icons/Ionicons';
import ProgressBar from '../components/ProgressBar';
import SettingModal from '../components/SettingModal';
import YesNoModal from '../components/YesNoModal';
import NextStep from '../components/NextStep';
import BookBg from '../../assets/images/bookBg.png';
import fetchWithAuth from '../api/fetchWithAuth.js';
import Tts from 'react-native-tts';
import Config from '../config.js';

const BookRead = ({ navigation }) => {
    const [title, setTitle] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPageCount, setTotalPageCount] = useState(0);
    const [bookText, setBookText] = useState('');
    const [coverImage, setCoverImage] = useState('');
    const [pageImage, setPageImage] = useState('');
    const [fontSize, setFontSize] = useState(18);

    const profileId = 2;
    const bookId = 2;
    const initialSize = fontSize === 14 ? "작게" : fontSize === 18 ? "기본" : "크게";

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


    // 모르는 단어 조희
    const [wordMeaning, setWordMeaning] = useState('');
    const [isWordModalVisible, setIsWordModalVisible] = useState(false);

    const handleWordClick = async (word) => {
        const cleanedWord = word.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "").trim();
        try {
            const response = await fetchWithAuth(`https://backend-api.com/word-meaning?word=${cleanedWord}`);
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

    // 페이지 세부정보 조회
    const fetchPageDetails = async (pageNumber) => {
        try {
            const response = await fetchWithAuth(`/pages/detail?profileId=${profileId}&bookId=${bookId}&pageNum=${pageNumber}`);

            const result = await response.json();

            console.log('Page details response:', result);

            if (response.status === 200) {
                const pageData = result.data;
                setBookText(pageData.content);
                setPageImage(pageData.image);
                setHighlightedWords((pageData.unknownWords || []).map(word => ({ word: word.unknownWord, id: word.unknownWordId }))); // 페이지에 포함된 모르는 단어들을 하이라이트 표시
                setCurrentPage(pageNumber);  
            } else {
                Alert.alert('Error', 'Failed to retrieve page details');
            }
        } catch (error) {
            console.error('Error fetching page details:', error); 
            Alert.alert('Error', 'Failed to fetch page details');
        }
    };

    // 책 세부정보 조회
    const fetchBookDetails = async () => {
        try {
            const response = await fetchWithAuth(`/books/detail?profileId=${profileId}&bookId=${bookId}`);
            const result = await response.json();
            console.log('Book details response:', result); 

            if (response.status === 200) {
                setTitle(result.data.title);
                setTotalPageCount(result.data.totalPageCount);
                const initialPage = result.data.currentPage + 1;
                setCurrentPage(initialPage);
                fetchPageDetails(initialPage);
            } else {
                Alert.alert('Error', 'Failed to retrieve book details');
            }
        } catch (error) {
            console.error('Error fetching book details:', error); 
            Alert.alert('Error', 'Failed to fetch book details');
        }
    };

    useEffect(() => {
        fetchBookDetails();
    }, []);

    useEffect(() => {
        // TTS 초기 설정
        Tts.setDefaultLanguage('en-US');
        Tts.setDefaultRate(0.5); // 속도 조정
        Tts.setDefaultPitch(1.0); // 피치 조정

        Tts.voices().then(voices => {
            const voice = voices.find(v => v.language === 'en-US' && v.name.includes('female'));
            if (voice) {
                Tts.setDefaultVoice(voice.id);
            }
        });

        // 음성이 끝났을 때 이벤트 리스너 추가
        const handleFinish = () => {
            showNextStep();
        };

        Tts.addEventListener('tts-finish', handleFinish);

        return () => {
            Tts.removeEventListener('tts-finish', handleFinish);
        };
    }, []);

    useEffect(() => {
        if (bookText) {
            Tts.speak(bookText);
        }
    }, [bookText]);

    const showNextStep = () => {
        setNextStepVisible(true);
        startBlinking();
    };

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

    const goNextStep = () => {
        const nextPage = currentPage + 1;
        if (nextPage <= totalPageCount) {
            fetchPageDetails(nextPage);
        } else {
            navigation.navigate('Quiz');
        }
    };

    // 하이라이트 기능
    const [highlightedWord, setHighlightedWord] = useState(null);
    const [highlightModalVisible, setHighlightModalVisible] = useState(false);
    const [highlightedWords, setHighlightedWords] = useState([]);
    const [highlightModalPosition, setHighlightModalPosition] = useState({ top: 0, left: 0 });

    const handleLongPress = (word, event) => {
        const cleanedWord = word.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "").trim();
        const { pageY, pageX } = event.nativeEvent;
        setHighlightedWord(cleanedWord);
        setHighlightModalPosition({ top: pageY - 57, left: pageX - 75 }); // 단어 위치 위로 모달 배치
        setHighlightModalVisible(true);
    };

    const confirmHighlight = async () => {
        try {
            const response = await fetchWithAuth(`/unknownwords/create?profileId=${profileId}&bookId=${bookId}&pageNum=${currentPage}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    unknownWord: highlightedWord,
                    position: highlightedWords.length + 1
                })
            });

            if (response.status !== 200) {
                Alert.alert('Error', '단어 저장 실패');
            } else {
                const result = await response.json();
                console.log(result); // 저장된 단어 결과 확인
                const newHighlightedWord = { word: highlightedWord, id: result.data.unknownwordId };
                setHighlightedWords(prev => [
                    ...prev,
                    newHighlightedWord
                ]);
                setHighlightModalVisible(false);
            }
        } catch (error) {
            Alert.alert('Error', '단어 저장 실패');
        }
    };

    
    const cancelHighlight = async () => {
        const highlightedWordObj = highlightedWords.find(item => item.word === highlightedWord);
    
        if (highlightedWordObj) {
            try {
                console.log('Deleting word with id:', highlightedWordObj.id); // 삭제할 단어 ID 확인
                const response = await fetchWithAuth(`/unknownwords/delete/${highlightedWordObj.id}`, {
                    method: 'DELETE',
                });
    
                if (response.status !== 200) {
                    const result = await response.json();
                    console.log('Delete response error:', result); // 에러 응답 확인
                    Alert.alert('Error', '단어 삭제 실패');
                } else {
                    console.log(await response.json()); // 응답 결과 확인
                    setHighlightedWords(prev => prev.filter(item => item.word !== highlightedWord));
                    setHighlightedWord(null);
                    setHighlightModalVisible(false);
                }
            } catch (error) {
                console.error('Error deleting word:', error); // 에러 로그 추가
                Alert.alert('Error', '단어 삭제 실패');
            }
        } else {
            setHighlightedWord(null);
            setHighlightModalVisible(false);
        }
    };
    
    

 const renderWord = (word, index) => {
        const cleanedWord = word.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "").trim();
        const highlightedWordObj = highlightedWords.find(item => item.word === cleanedWord);
        const isHighlighted = !!highlightedWordObj;

        if (cleanedWord === '') {
            return <Text key={index} style={[styles.bookText, { fontSize }]}>{word}</Text>;
        }
        return (
            <TouchableOpacity
                key={index}
                onPress={() => handleWordClick(cleanedWord)}
                onLongPress={(event) => handleLongPress(cleanedWord, event)}
            >
                <Text style={[styles.bookText, { fontSize }, isHighlighted && styles.highlightedText]}>{word}</Text>
            </TouchableOpacity>
        );
    };

    const closeHighlightModal = () => {
        setHighlightModalVisible(false);
        setHighlightedWord(null);
    };
    
    const handleModalBackgroundPress = () => {
        closeHighlightModal();
    };

    const words = bookText.split(/(\s+)/);

    const handleSizeFilter = (fontSizeValue) => {
        switch (fontSizeValue) {
            case "SMALL":
                setFontSize(14);
                break;
            case "MEDIUM":
                setFontSize(18);
                break;
            case "LARGE":
                setFontSize(22);
                break;
            default:
                setFontSize(18);
        }
    };

   

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
                            buttonText2={"취소"}
                            profileId={profileId}
                            bookId={bookId}
                            currentPage={currentPage + 1} />
                        <TouchableOpacity style={styles.icon} onPress={openSettingModal} >
                            <Ionic name="settings" size={35} color="white" />
                        </TouchableOpacity>
                        <SettingModal isVisible={isSettingModalVisible} onClose={closeSettingModal} handleSizeFilter={handleSizeFilter} profileId={profileId} bookId={bookId} initialSize={initialSize} />
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
                        <NextStep goNextStep={goNextStep} />
                    </>
                )}
                {totalPageCount > 0 && currentPage >= 0 && (
                    <ProgressBar pages={totalPageCount.toString()} now={(currentPage-1).toString()} />
                )}
                <Modal
                    visible={highlightModalVisible}
                    transparent={true}
                    animationType="fade"
                    onRequestClose={cancelHighlight}
                >
                    <TouchableOpacity
                        activeOpacity={1} 
                        onPress={handleModalBackgroundPress}
                        style={styles.modalBackground}
                    >
                        <View style={[styles.highlightModal, highlightModalPosition]}>
                            <View style={styles.highlightModalButtons}>
                                <TouchableOpacity onPress={confirmHighlight}>
                                    <Text style={styles.highlightModalText}>하이라이트</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={cancelHighlight}>
                                    <Text style={styles.highlightModalText}>취소</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </TouchableOpacity>
                </Modal>
                
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
    },
    highlightedText: {
        backgroundColor: 'yellow',
    },
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    highlightModal: {
        position: 'absolute',
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
    },
    highlightModalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    highlightModalText: {
        paddingHorizontal: 10,
    },

})
export default BookRead