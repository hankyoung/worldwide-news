/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  StatusBar,
  FlatList,
  View,
} from 'react-native';
import Article from './components/Article';
import Colors from './components/Colors';
import Constants from './components/Constants';

const pageSize = 10;

const App: () => React$Node = () => {
  const [page, setPage] = useState(1);
  const [isEnd, setEnd] = useState(false);
  const [articles, setArticles] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const fetchData = async () => {
    console.log(`fetching data, page number: ${page}`);
    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?sources=bbc-news,cbc-news,nbc-news,fox-news,mtv-news=&page=${page}&pageSize=${pageSize}&apiKey=48dec07403fe43efbbb1ccae07b1c4c9`,
    );
    const jsonData = await response.json();

    if (jsonData.articles.length == pageSize) {
      setPage(page + 1);
      setArticles([...articles, ...jsonData.articles]);
    } else {
      setEnd(true);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (!refresh) return;
    fetchData();
  }, [refresh]);

  const _onEndReach = () => {
    if (isEnd) return;
    setTimeout(fetchData, 500);
  };

  const _onRefresh = () => {
    resetState();
    setRefresh(true);
    setTimeout(() => {
      setRefresh(false);
    }, 500);
  };

  const resetState = () => {
    setPage(1);
    setArticles([]);
    setEnd(false);
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Worldwide News</Text>
        </View>
        <FlatList
          style={styles.flatList}
          showsVerticalScrollIndicator={false}
          data={articles}
          renderItem={({item}) => <Article item={item} />}
          keyExtractor={(item) => item.title}
          onEndReached={_onEndReach}
          ListFooterComponent={!isEnd && <ListFooter />}
          refreshing={refresh}
          onRefresh={_onRefresh}
        />
      </SafeAreaView>
    </>
  );
};

const ListFooter = () => {
  return (
    <View style={styles.footer}>
      <Text style={styles.footerLabel}>Loading</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    padding: Constants.screenPadding,
  },
  header: {
    height: Constants.headerHeight,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.secondaryColor,
  },
  flatList: {
    height:
      Constants.screen.height -
      StatusBar.currentHeight -
      Constants.screenPadding -
      Constants.headerHeight,
  },
  footer: {
    backgroundColor: Colors.secondaryColor,
    height: 40,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerLabel: {
    color: Colors.primaryLightColor,
    fontSize: 18,
  },
});

export default App;
