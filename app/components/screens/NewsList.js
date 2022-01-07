import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import News from "../News";

const NewsList = () => {
    return (
        <>
            <SafeAreaView style={{flex: 1}}>
                <News/>
            </SafeAreaView>
        </>

    );
};

const styles = StyleSheet.create({
    container: {},
});

export default NewsList;
