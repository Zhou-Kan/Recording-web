import { View, StyleSheet, TouchableOpacity, Text, Alert, Button, ScrollView, RefreshControl } from 'react-native';
import { GlobalColors } from '../constants/styles';
import { useState, useEffect } from "react";
// import { collection, onSnapshot } from 'firebase/firestore';
import { queryEntry, deleteEntry } from '../firebase/firestore';

import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import eventBus from '../utils/eventbus';

function WarnEntries({ navigation, route }) {
  const [list, setList] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    eventBus.addListener("refreshHome2", data => {
      console.log("message==", data);
      load();
    });
    load();
  }, []);

  // load data
  const load = async () => {
    let res = await queryEntry();
    console.log("res", res);

    let list = res.docs.map((snapDoc) => {
      let data = snapDoc.data();
      data = { ...data, id: snapDoc.id };
      return data;
    });
    console.log("list", list);
    setList(list.filter(item => item.calories > 500 && !item.reviewed));
    setIsRefreshing(false);
  }

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl
          refreshing={isRefreshing}

          onRefresh={() => {
            load();
          }}
          tintColor="#ff0000"
          title="Loading..."
          titleColor="#00ff00"
          colors={['#0000ff', '#ff0000', '#00ff00',]}
          progressBackgroundColor="#ffff00"
        />
      }>
      <View >

        {
          list.map((item) => {
            return <TouchableOpacity onPress={() => {
              navigation.navigate('EditEntry', {
                entry: item, refresh: () => {
                  load();
                }
              });
            }} key={item.id} style={{ backgroundColor: "#4f57c3", padding: 10, margin: 10, borderRadius: 10, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
              <Text style={{ fontSize: 20, color: "#fff" }}>{item.description}</Text>
              <View style={{ flex: 1 }}></View>
              <Ionicons name="warning" size={24} color="#ffee00" />
              <Text style={{ marginLeft: 20, color: "#000", backgroundColor: "#fff", paddingHorizontal: 10, paddingVertical: 5, borderRadius: 5 }}>{item.calories}</Text>

            </TouchableOpacity>
          })
        }
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 0,
    backgroundColor: GlobalColors.colors.mediumpurple,
    flex: 1,
  },
});

export default WarnEntries;