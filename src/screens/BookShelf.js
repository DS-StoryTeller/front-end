import React, { useState } from 'react';
import { Image, View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import VoiceInputModal from '../components/VoiceInputModal';

const books = Array.from({ length: 12 }, (_, index) => ({
  id: String(index),
  imageUrl: require('../../assets/images/book.png'), // 임시 이미지
}));

const BookShelf = () => {
  const [selected, setSelected] = useState('ALL');
  const [modalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const handleBookPress = (bookId) => {
    // 책 클릭 시 처리할 함수
    console.log(`Book with ID ${bookId} pressed`);
  };

  const renderShelf = (shelfIndex) => {
    const booksForShelf = books.slice(shelfIndex * 4, (shelfIndex + 1) * 4);

    return (
      <View key={shelfIndex} style={styles.shelfContainer}>
        <Image
          source={require('../../assets/images/shelf.png')}
          style={styles.shelf}
        />
        {booksForShelf.map((book, index) => (
          <TouchableOpacity
            key={book.id}
            onPress={() => handleBookPress(book.id)}
            style={[
              styles.bookButton,
              { left: 355 + index * 160 }, // 책 위치 조정
            ]}
          >
            <Image
              source={book.imageUrl}
              style={styles.bookImage}
            />
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const numberOfShelves = Math.ceil(books.length / 4);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.radioContainer}>
        <RadioButton
          title="ALL"
          selected={selected === 'ALL'}
          onPress={() => setSelected('ALL')}
          style={styles.radioButtonAll}
          textStyle={styles.radioButtonTextAll}
        />
        <RadioButton
          title="FAVORITE"
          selected={selected === 'FAVORITE'}
          onPress={() => setSelected('FAVORITE')}
          style={styles.radioButtonFavorite}
          textStyle={styles.radioButtonTextFavorite}
        />
        <RadioButton
          title="READING"
          selected={selected === 'READING'}
          onPress={() => setSelected('READING')}
          style={styles.radioButtonReading}
          textStyle={styles.radioButtonTextReading}
        />
      </View>
      <View style={styles.shelfWrapper}>
        {Array.from({ length: numberOfShelves }).map((_, index) =>
          renderShelf(index),
        )}
      </View>
      <TouchableOpacity style={styles.squareButton}>
        <Image
          source={require('../../assets/images/temp_profile_pic.png')}
          style={styles.squareButtonImage}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.roundButton} onPress={toggleModal}>
        <LinearGradient
          colors={['#2170CD', '#8FA0E8']}
          style={styles.roundButtonGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <Image
            source={require('../../assets/images/drawing.png')}
            style={styles.roundButtonImage}
          />
        </LinearGradient>
      </TouchableOpacity>
      <VoiceInputModal
        visible={modalVisible}
        onClose={toggleModal}
        message="동화를 만들고 싶은 주제를 말해주세요"
      />
    </SafeAreaView>
  );
};

const RadioButton = ({ title, selected, onPress, style, textStyle }) => (
  <TouchableOpacity onPress={onPress} style={[styles.radioButton, style]}>
    {selected ? (
      <LinearGradient
        colors={['#F8C683', '#FF8C43']}
        style={[styles.radioButtonGradient, styles.selected, style]}
      >
        <Text
          style={[
            styles.radioButtonText,
            styles.radioButtonTextSelected,
            textStyle,
          ]}
        >
          {title}
        </Text>
      </LinearGradient>
    ) : (
      <View style={[styles.radioButtonGradient, style]}>
        <Text style={[styles.radioButtonText, textStyle]}>{title}</Text>
      </View>
    )}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 30,
    backgroundColor: '#fff',
  },
  radioContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '50%',
    marginBottom: 25,
    paddingTop: 10,
  },
  radioButton: {
    flex: 1,
    marginHorizontal: 10,
    paddingVertical: 12,
    alignItems: 'center',
  },
  radioButtonAll: {
    marginRight: -35,
    paddingHorizontal: 15,
    width: 90,
    height: 45,
  },
  radioButtonFavorite: {
    marginLeft: -25,
    paddingHorizontal: 15,
    width: 180,
    height: 45,
  },
  radioButtonReading: {
    marginLeft: -65,
    paddingHorizontal: 15,
    width: 170,
    height: 45,
  },
  radioButtonGradient: {
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selected: {
    borderWidth: 0,
    borderColor: '#FF8C43',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  radioButtonText: {
    color: '#C3C3C3',
    fontWeight: 'bold',
    fontSize: 30,
  },
  radioButtonTextAll: {},
  radioButtonTextFavorite: {},
  radioButtonTextReading: {},
  radioButtonTextSelected: {
    color: '#000',
  },
  shelfWrapper: {
    flex: 1,
    justifyContent: 'flex-start',
    width: '100%',
    marginTop: 100,
  },
  shelfContainer: {
    width: '100%',
    marginBottom: 70,
    position: 'relative',
  },
  shelf: {
    width: '100%',
    height: 100,
    resizeMode: 'contain',
    top: 20,
  },
  bookButton: {
    position: 'absolute',
    top: -68,
  },
  bookImage: {
    width: 140,
    height: 130,
    resizeMode: 'contain',
  },
  squareButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    width: 110,
    height: 110,
    borderRadius: 30,
    backgroundColor: '#EFEFEF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  squareButtonImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    borderRadius: 30,
  },
  roundButton: {
    position: 'absolute',
    bottom: 5,
    alignSelf: 'center',
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  roundButtonGradient: {
    width: '100%',
    height: '100%',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  roundButtonImage: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
});

export default BookShelf;
