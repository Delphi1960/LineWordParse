import React, {useState} from 'react';
import {
  Button,
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import RNFS from 'react-native-fs';
import {WordListType} from './data.type';
import {WordsList} from './data/nouns_ru';
// import {WordsListАrray} from './data/words';
import {WordsSetArray} from './data/wordsSet';

function setUniqueWords(arrayWords: WordListType[]): WordListType[] {
  //  Получить только уникальные слова и отсортировать их по алфавиту
  const uniqueWords: string[] = arrayWords
    .map(item => item.word)
    .filter((word, index, array) => array.indexOf(word) === index)
    .sort();

  // Ограничить слова 8 символами
  const truncatedWords: string[] = uniqueWords.map(word => word.slice(0, 8));

  // Создать новый массив объектов только с уникальными словами и ограниченными символами
  const uniqueWordsListArray = truncatedWords
    .map(word => arrayWords.find(item => item.word === word))
    .filter((item): item is WordListType => item !== undefined); // Удаление возможных undefined

  return uniqueWordsListArray;
}

function saveFile(arrayWords: WordListType[]) {
  const filePath = RNFS.DocumentDirectoryPath + '/wordsSet1.ts';

  // Преобразуйте newWordsSet в строку JSON
  const dataToWrite = JSON.stringify(arrayWords);

  RNFS.writeFile(filePath, dataToWrite, 'utf8')
    .then(() => {
      console.log('Файл успешно записан');
    })
    .catch(error => {
      console.error('Ошибка записи файла:', error);
    });
}

type ItemProps = {title: string; hint: string};

const Item = ({title, hint}: ItemProps) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.hint}>{hint}</Text>
  </View>
);
export default function ParsFile() {
  const [state, setstate] = useState<WordListType[]>([]);

  const handlePress = () => {
    let start = Date.now();
    // console.log(`Было ${WordsListАrray.length} слов`);
    // console.log(`Было ${WordsList.length} слов`);
    console.log(`New ${WordsSetArray.length} слов`);
    // console.log(`Old ${WordsList.length} слов`);

    // объединить два массива
    // const combinedArray: WordListType[] = [...WordsListАrray, ...WordsList];
    // setstate(combinedArray);
    // console.log(`Слил два массива ${combinedArray.length} слов`);

    //  Получить только уникальные слова
    // const cleanedWords = setUniqueWords(WordsSetArray);

    //Удалить элементы у которых word заканчивается на "ЫЙ" ВОЙ ИТЬСЯ ИТЬ ЁНОК
    // АТЬ, ЯТЬ, ИТЬ, ЕТЬ, ТИ, ТЬСЯ, УТЬ, ЕЧЬ
    // const cleanedWords1:WordListType[] = WordsSetArray.filter(
    //   item => !item.word.endsWith('АТЬ'),
    // );

    const endingsRegex = /(АТЬ|ЯТЬ|ИТЬ|ЕТЬ|ЁНОК|ТИ|ОЙ|ТЬСЯ|УТЬ|ЕЧЬ)$/;

    const cleanedWords = WordsSetArray.filter(
      item => !endingsRegex.test(item.word),
    );

    // const cleanedWords5 = cleanedWords.filter(
    //   item => !item.word.startsWith('-'),
    // );

    // Удаление подстроки "II прил." и всего после нее в свойстве hint для каждого элемента массива
    // const cleanedWordsSetArray = WordsSetArray.map(item => ({
    //   ...item,
    //   hint: item.hint.replace(/II прил\..*$/, '').trim(), // Удаление подстроки и пробелов в начале и конце строки
    // }));

    // Удаление подстроки "II" и всего после нее в свойстве hint для каждого элемента массива
    // const cleanedWordsSetArray = WordsSetArray.map(item => ({
    //   ...item,
    //   hint: item.hint.replace(/11 прил\..*$/, '').trim(), // Удаление подстроки и пробелов в начале и конце строки
    // }));

    // console.log(RNFS.DocumentDirectoryPath);
    console.log(`Стало ${cleanedWords.length} слов`);

    // saveFile()
    saveFile(cleanedWords);

    console.log(`Время :${(Date.now() - start) / 1000} sec`);
  };

  return (
    <View style={styles.container}>
      <Text>ПАРСИНГ</Text>
      <Button onPress={handlePress} title="Start" />

      <FlatList
        data={state}
        renderItem={({item}) => <Item title={item.word} hint={item.hint} />}
        keyExtractor={item => item.word}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 10,
    marginVertical: 4,
    marginHorizontal: 5,
  },
  title: {
    fontSize: 18,
  },
  hint: {
    fontSize: 14,
  },
});
