import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import Title from '../common/Title';
import Subtitle from '../common/Subtitle';

const FlatCard = ({ item, onPress }) => {
  const { imageUrl600x400, title, subTitle } = item;
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.container}>
        <Image source={{ uri: imageUrl600x400 }} style={styles.image} />
        <View style={styles.contentContainer}>
          <Title>{title}</Title>
          <Subtitle>{subTitle}</Subtitle>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 10,
    height: 80,
  },
  image: {
    flex: 0.35,
    height: '100%',
  },
  contentContainer: {
    flex: 0.65,
    paddingHorizontal: 5,
  },
});

export default FlatCard;
