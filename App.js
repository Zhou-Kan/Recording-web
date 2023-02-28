import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { GlobalColors } from './constants/styles';
import { Ionicons } from '@expo/vector-icons';

import Entries from './screens/Entries';
import AddEntry from './screens/AddEntry';
import EditEntry from './screens/EditEntry';
import WarnEntries from './screens/WarnEntries';


import { SimpleLineIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

import React from 'react';
const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

function Overview({ navigation }) {
  return (
    <BottomTabs.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: { backgroundColor: GlobalColors.colors.slateblue },
        headerTintColor: 'white',
        tabBarStyle: { backgroundColor: GlobalColors.colors.slateblue },
        tabBarActiveTintColor: GlobalColors.colors.gold,

      })}
    >
      <BottomTabs.Screen
        name="Entries"
        component={Entries}
        options={{
          title: 'All Entries',
          tabBarLabel: 'All Entries',
          tabBarIcon: ({ color, size }) => (
            <SimpleLineIcons name="cup" size={24} color={color} />
          ),
          headerRight: ({ tintColor }) => (
            <Ionicons name="add" size={24} style={{ marginRight: 15 }} color="white" onPress={() => {
              navigation.navigate('AddEntry');
            }}
            />
          )
        }}
      />

      <BottomTabs.Screen
        name="Over-limit Entries"
        component={WarnEntries}
        options={{
          title: 'Over-limit Entries',
          tabBarLabel: 'Over-limit Entries',
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="exclamation" size={24} color={color} />
          )
        }}
      />
    </BottomTabs.Navigator>
  );
}

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: GlobalColors.colors.slateblue },
            headerTintColor: 'white'
          }}
        >
          <Stack.Screen
            name="Overview"
            component={Overview}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="AddEntry"
            component={AddEntry}
            options={{ headerShown: true, headerTitle: "Add An Entry", headerTitleAlign: "center", headerBackTitle: "Back" }}
          />
          <Stack.Screen
            name="EditEntry"
            component={EditEntry}
            options={{ headerShown: true, headerTitle: "Edit Entry", headerTitleAlign: "center", headerBackTitle: "Back" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
