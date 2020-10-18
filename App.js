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
import {fetchData} from './utils/apiUtil';

const App: () => React$Node = () => {
  const [page, setPage] = useState(1);
  const [isEnd, setEnd] = useState(false);
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetchData(page, articles, setArticles, setEnd);
  }, []);

  const loadMoreData = () => {
    fetchData(page + 1, articles, setArticles, setEnd);
  };

  const handleScrollBottom = () => {
    if (!isEnd) {
      setPage((page) => page + 1);
      loadMoreData();
    }
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
          onEndReached={handleScrollBottom}
          ListFooterComponent={!isEnd && <ListFooter />}
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
      Constants.screenHeight -
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
