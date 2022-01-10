import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  StyleSheet,
  Image,
  View,
  Text,
  Dimensions,
  ImageBackground,
  Button
} from 'react-native';
import { IconButton, Colors } from 'react-native-paper';
import RenderHtml from 'react-native-render-html';
import { AntDesign } from '@expo/vector-icons';

import newsApi from '../../api/newsApi';
import HorizotalList from '../lists/HorizotalList';
import Close from '../common/Close';
import { useNavigation } from '@react-navigation/native';
import ActivityIndicator from '../common/ActivityIndicator';
import { SliderBox } from "react-native-image-slider-box";

const { width, height } = Dimensions.get('window');

const NewsDetail = ({ route }) => {
  const [news, setNews] = useState({});
  const [galleries, setGalleries] = useState([]);
  const [relatedNews, setRelatedNews] = useState([]);
  const { id: postId } = route.params.item;
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  const fetchPost = async id => {
    setLoading(true);
    const result = await newsApi.getSingle(id);
    if(result.gallery && result.gallery.list && result.gallery.list.length) {
      let galleriesLocal = []
      for await (let galleryItem of result.gallery.list) {
        galleriesLocal.push(galleryItem.url);
      }
      setGalleries(galleriesLocal)
    }
    setNews(result);
    setLoading(false);
  };

  // const fetchRelatedPosts = async category => {
  //   const result = await newsApi.getByCategory(postCategory, 6);
  //   setRelatedNews(result.filter(item => item.id !== postId));
  //   setLoading(false);
  // };
  const fetchRelatedPosts = async () => {
    const result = await newsApi.getAllNews();
    setRelatedNews(result.filter(item => item.id !== postId));
    setLoading(false);
  };

  useEffect(() => {
    fetchPost(postId);
    fetchRelatedPosts();
  }, []);


  const { title, text, imageUrl600x400 } = news;
  const source = { html: text };
  return (
    <>
      <ActivityIndicator vigit initsible={loading} />
      <ScrollView style={styles.container}>
        <View>
          <ImageBackground style={styles.image} source={{uri: imageUrl600x400 }} resizeMode="cover">
            <AntDesign
                name='left'
                size={25}
                color='red'
                onPress={() => navigation.goBack()}
                style={{marginTop:50,marginLeft:30}}
            />
          </ImageBackground>
        </View>
        {/*<Image style={styles.image} source={{ uri: imageUrl600x400 }} />*/}
        <View style={styles.contentContainer}>
          <Text style={styles.title}>{title}</Text>
          <RenderHtml style={styles.content} source={source} />
        </View>
        <SliderBox
            images={galleries}
            sliderBoxHeight={200}
            onCurrentImagePressed={index => console.warn(`image ${galleries[index]} pressed`)}
            dotColor="#FFEE58"
            inactiveDotColor="#90A4AE"
            paginationBoxVerticalPadding={20}
            autoplay
            circleLoop
        />
        <View style={styles.relatedPostContainer}>
          <HorizotalList data={relatedNews} title='Related Posts' />
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {},
  image: {
    width: width,
    height: height / 3,
  },
  contentContainer: {
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  content: {
    fontSize: 16,
    color: '#4e4d4d',
  },
  relatedPostContainer: {
    padding: 10,
  },
});

export default NewsDetail;
