import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View, Dimensions, Button, TouchableOpacity, KeyboardAvoidingView, TextInput } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Alert, ToastAndroid } from 'react-native'
import * as firestore from "../firebase/firestore";
import { MaterialIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import eventBus from '../utils/eventbus';

export default function App({ navigation, route }) {
  const [entry, setEntry] = useState(route.params.entry);

  useEffect(() => {
    (async () => {

    })()
  }, []);

  const submit = async () => {
    if (calories == "" || Number.isNaN(calories)) {
      Alert.alert('Invalid input!Please Check your input values');
      return;
    }

    if (description == "") {
      Alert.alert('Please Input Description!');
      return;
    }

    let res = await firestore.addEntry({
      calories,
      description
    });
    Alert.alert('Success!');
  }


  const remove = async () => {
    Alert.alert(
      '',
      `Confirm delete？`,
      [
        {
          text: 'confirm', onPress: async () => {
            let res = await firestore.deleteEntry(entry.id);
            route.params.refresh();
            Alert.alert('Success!');
            eventBus.emit('refreshHome', {})
            eventBus.emit('refreshHome2', {})
            navigation.goBack();

          }
        },
        {
          text: 'cancel', onPress: () => {

          }
        }
      ]
    )
  }
  const reviewed = async () => {
    Alert.alert(
      'Important',
      `Are you sure you want to mark this item as reviewed`,
      [
        {
          text: 'Yes', onPress: async () => {
            let res = await firestore.updateEntry(entry.id, { ...entry, reviewed: true });
            route.params.refresh();
            eventBus.emit('refreshHome', {})
            eventBus.emit('refreshHome2', {})
            Alert.alert('Success!');
            navigation.goBack();
          }
        },
        {
          text: 'No', onPress: () => {

          }
        }
      ]
    )

  }


  return (
    <View style={styles.container}>
      <StatusBar
        animated={false}
        hidden={false}
        networkActivityIndicatorVisible={false}
        showHideTransition={'fade'}
        backgroundColor='rgba(255,255,255,0)'
        translucent={true}
        barStyle={'light-content'}
      />
      <View style={{ backgroundColor: "#a7a9f3", marginHorizontal: 50, marginVertical: 50, padding: 20, borderRadius: 10, borderRadius: 10 }}>
        <Text style={{ textAlign: "center", fontSize: 18 }}>Calories:{entry.calories}</Text>
        <Text style={{ textAlign: "center", fontSize: 18 }}>Description:{entry.description}</Text>

        <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 30 }}>
          <View style={{ backgroundColor: "#555fbf", paddingHorizontal: 10, paddingVertical: 5, borderRadius: 5 }}>
            <MaterialIcons name="delete" size={24} color="white" onPress={() => {
              remove();
            }} />
          </View>
          {entry.calories >= 500 && <View style={{ backgroundColor: "#555fbf", paddingHorizontal: 10, paddingVertical: 5, borderRadius: 5, marginLeft: 20 }}>
            <Feather name="check" size={24} color="white" onPress={() => {
              reviewed();
            }} />
          </View>}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    backgroundColor: "#8987df",
  },
  bgImage: {
    width: windowWidth,
    height: windowHeight + 50,
    position: "absolute",
    top: 0,
    left: 0,
    resizeMode: "stretch",
    opacity: 0.6
  },
  headimg: {
    marginTop: 20,
    width: 80,
    height: 80,
    resizeMode: "stretch",
  },
  label: {
    width: 80
  },
  row: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  input: {
    height: 50,
    borderRadius: 5,
    color: "#333",
    width: "100%",
    paddingLeft: 10,
    backgroundColor: "#fff",
    flex: 1,
    paddingTop: 10
  },
  input2: {
    height: 100,
    borderRadius: 5,
    color: "#333",
    width: "100%",
    paddingLeft: 10,
    backgroundColor: "#fff",
    flex: 1,
    paddingTop: 10
  },
  button: {
    marginTop: 40,
    width: 100,
    backgroundColor: "#546599",
    textAlign: "center",
    borderRadius: 10,
    height: 45,
    alignItems: "center",
    justifyContent: "center"
  }
});