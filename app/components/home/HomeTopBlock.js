import React from 'react';
import { View, StyleSheet, Text, TouchableWithoutFeedback } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {MaterialIcons} from "@expo/vector-icons";
import {useNavigation} from "@react-navigation/native";



const HomeTopBlock = () => {
    const navigation = useNavigation();

    return (
        <TouchableWithoutFeedback>
            <LinearGradient  style={[styles.container]} colors={['#eeb378', '#ff9000']}>
                <MaterialIcons
                    name='menu'
                    size={25}
                    color='white'
                    onPress={() => navigation.openDrawer()}
                    style={{marginTop:50,marginLeft:30}}
                />
                <View style={[styles.weather]}>
                    <Text> 18C </Text>
                </View>
                <View style={[styles.row]}>
                    <View style={[styles.box]}>
                        <Text> $ 74.29 </Text>
                    </View>
                    <View style={[styles.box]}>
                        <Text> € 74.29 </Text>
                    </View>
                </View>
            </LinearGradient>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 300,
        overflow: 'hidden',
        backgroundColor: '#fff',
        // marginVertical: 15
        marginBottom:15
    },
    weather: {
        height:200,
        justifyContent: "center",
        alignItems: "center"
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start' // if you want to fill rows left to right
    },
    box: {
        width: '50%',
        justifyContent: "center",
        alignItems: "center"
    }
});

export default HomeTopBlock;