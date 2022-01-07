import { useNavigation } from '@react-navigation/native';
import {View, FlatList, SafeAreaView} from "react-native";
import Title from "./common/Title";
import VerticalCard from "./cards/VerticalCard";
import React, {useEffect, useState} from "react";
import useNews from '../hooks/useNews';
import axios from 'axios';
import newsApi from '../api/newsApi';

export default function Publications() {
    const navigation = useNavigation();
    const [isFetching, setIsFetching] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [data, setData] = useState([]);

    useEffect(() => {
        getNews()
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

    return (
        <SafeAreaView>
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