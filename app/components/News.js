import { useNavigation } from '@react-navigation/native';
import {View, FlatList, Button, SafeAreaView, StyleSheet} from "react-native";
import VerticalCard from "./cards/VerticalCard";
import React, {useEffect, useState} from "react";
import newsApi from '../api/newsApi';

export default function News() {
    const navigation = useNavigation();
    const [isFetching, setIsFetching] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [data, setData] = useState([]);
    const [categories, setCategories] = useState([
        {id:1, value: 'ryazan'},
        {id:3, value: 'world'},
        {id:4, value: 'economics-and-business'},
        {id:5, value: 'sports'},
        {id:6, value: 'creativity'},
        {id:7, value: 'society'},
        {id:8, value: 'accident'},
        {id:9, value: 'politics'},
    ]);

    useEffect(() => {
        getNews();
    }, []);

    async function getNews(){
        setIsFetching(true);

        try {
            let response = await newsApi.getAllNews();
            setData(response);
        } catch (error) {
            setError(error);
        } finally {
            setIsFetching(false);
        }
    }

    async function getNewsByCategory(category){
        setIsFetching(true);

        try {
            let response = await newsApi.getAllNewsByCategory(category);
            setData(response);
        } catch (error) {
            setError(error);
        } finally {
            setIsFetching(false);
        }
    }

    async function onLoadMore(){
        if (!isLoadingMore){
            setIsLoadingMore(true);
            try {
                let last = data[data.length-1];
                let response = await newsApi.getAllNews(last.date);
                setData([...data, ...response]);
            } catch (error) {
                alert(error.message);
            } finally {
                setIsLoadingMore(false)
            }
        }
    }

    const renderItem = ({item}) => {
        return (
            <View>
                <VerticalCard
                    item={item}
                    key={item.id}
                    onPress={() => navigation.navigate('NewsDetail', { item })}
                />
            </View>
        );
    };

    const renderCategory = ({item}) => {
        return (
            <View>
                <Button
                    title={item.value}
                    onPress={() => getNewsByCategory(item.id)}
                />
            </View>
        );
    };

    return (
            <SafeAreaView>
                <FlatList
                    horizontal={true}
                    data={categories}
                    renderItem={renderCategory}
                    keyExtractor={item => item.id}
                />
                <FlatList
                    data={data}
                    renderItem={renderItem}
                    numColumns={1}
                    initialNumToRender={10}
                    removeClippedSubviews={true}

                    onRefresh={getNews}
                    refreshing={isRefreshing}

                    onEndReached={onLoadMore}
                    onEndReachedThreshold={1}

                    contentContainerStyle={{paddingHorizontal: 8}}
                    keyExtractor={item => item.date}/>
            </SafeAreaView>
    );
}