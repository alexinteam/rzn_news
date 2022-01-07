import React from 'react';
import { View, StyleSheet } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from '../screens/Home';
import NewsDetail from '../screens/NewsDetail';
import NewsList from '../screens/NewsList';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function StackNewsNavigation() {
    return (
        <Stack.Navigator headerMode="screen">
            <Stack.Screen name='NewsList' component={NewsList} options={{ headerShown: false }} />
            <Stack.Screen name='NewsDetail' component={NewsDetail} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}

function StackPublicationNavigation() {
    return (
        <Stack.Navigator>
            <Stack.Screen name='NewsList' component={NewsList} />
            <Stack.Screen name='NewsDetail' component={NewsDetail} />
        </Stack.Navigator>
    );
}

function StackHomeNavigation() {
    return (
        <Stack.Navigator>
            <Stack.Screen name='Back' component={Home} options={{ headerShown: false }} />
            <Stack.Screen name='NewsDetail' component={NewsDetail}  options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}

const AppNavigator = () => {
  return (
      <Drawer.Navigator
          initialRouteName="Home"
      >
          <Drawer.Screen name="Home"
                         component={StackHomeNavigation}
                         screenOptions={{headerShown:false}}
                         options={{
                              headerShown: false,
                              headerStyle: {
                                  backgroundColor: '#eeb378',
                              },
                          }}
          />
          <Drawer.Screen name="News"
                         component={StackNewsNavigation}
                         screenOptions={{headerShown:false}}
                         options={{
                               headerShown: false,
                               headerStyle: {
                                   backgroundColor: '#eeb378',
                               },
                           }}

          />
          <Drawer.Screen name="Publications" component={StackPublicationNavigation} />
      </Drawer.Navigator>
  );
};


const styles = StyleSheet.create({
  container: {},
});

export default AppNavigator;
