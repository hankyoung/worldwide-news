import React, {useCallback} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  Linking,
  TouchableOpacity,
} from 'react-native';
import Colors from './Colors';
import Constants from './Constants';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

const ArticleConstants = {
  articleWidth: Constants.screenWidth,
  imageHeight: 80,
  imageWidth: 120,
  containerPaddingVertical: (112 - 80) / 2,
  contentWidth: Constants.screenWidth - 120 - Constants.screenPadding * 2,
  contentPadding: 12,
};

const Article = ({item}) => {
  const handlePress = useCallback(async () => {
    const supported = await Linking.canOpenURL(item.url);

    if (supported) {
      await Linking.openURL(item.url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${item.url}`);
    }
  }, [item.url]);

  return (
    <TouchableOpacity style={styles.articleContainer} onPress={handlePress}>
      <Image source={{uri: item.urlToImage}} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.contentTitle} numberOfLines={3}>
          {item.title}
        </Text>
        <Text style={styles.contentTime}>
          {formatDistanceToNow(new Date(item.publishedAt))}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  articleContainer: {
    width: ArticleConstants.articleWidth,
    height: ArticleConstants.articleHeight,
    backgroundColor: Colors.primaryColor,
    borderBottomColor: Colors.secondaryColor,
    borderBottomWidth: 1,
    flexDirection: 'row',
    paddingBottom: ArticleConstants.containerPaddingVertical,
    marginBottom: ArticleConstants.containerPaddingVertical,
  },
  image: {
    width: ArticleConstants.imageWidth,
    height: ArticleConstants.imageHeight,
    backgroundColor: Colors.secondaryLightColor,
  },
  content: {
    width: ArticleConstants.contentWidth,
    height: ArticleConstants.imageHeight,
    backgroundColor: Colors.primaryColor,
    paddingHorizontal: ArticleConstants.contentPadding,
    justifyContent: 'space-between',
  },
  contentTitle: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  contentTime: {
    fontSize: 12,
    opacity: 0.8,
  },
});

export default Article;
