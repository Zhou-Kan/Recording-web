import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View, Dimensions, Button, TouchableOpacity, KeyboardAvoidingView, TextInput } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Alert, ToastAndroid } from 'react-native'
import * as firestore from "../firebase/firestore";
import eventBus from '../utils/eventbus';

export default function App({ navigation, route }) {
  const [calories, setCalories] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    (async () => {

    })()
  }, []);

  const submit = async () => {
    if (calories == "" || isNaN(calories)) {
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
    eventBus.emit('refreshHome', {})
    eventBus.emit('refreshHome2', {})
    navigation.goBack();
  }
  const reset = async () => {
    setCalories("");
    setDescription("");
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
      <KeyboardAvoidingView behavior="padding" enabled>

        <View style={{ paddingTop: 30, paddingHorizontal: 20 }}>

          <View style={{}}>
            <View style={styles.row}>
              <Text style={styles.label}>Calories</Text>
              <TextInput style={styles.input} value={calories} onChangeText={(text) => {
                setCalories(text);
              }}></TextInput>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Description</Text>
              <TextInput style={styles.input2} textAlignVertical='top' numberOfLines={5} value={description} onChangeText={(text) => {
                setDescription(text);
              }}></TextInput>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
      <View style={{ justifyContent: "center", alignItems: "center", flexDirection: "row" }}>
        <TouchableOpacity style={{ marginRight: 10 }} onPress={() => {
          reset();
        }}>
          <View style={styles.button}>
            <Text style={{ fontSize: 17, color: "#fff" }}>Reset</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {
          submit();
        }}>
          <View style={styles.button}>
            <Text style={{ fontSize: 17, color: "#fff" }}>Submit</Text>
          </View>
        </TouchableOpacity>
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