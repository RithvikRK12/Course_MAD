import React from 'react';
import { StyleSheet, Image, Text, View, TouchableOpacity, FlatList } from 'react-native';

export default function CourseList({ courseList }) {
  return (
    <View style={{ marginTop: 15 }}>
      <Text style={{ fontFamily: 'outfit-bold', fontSize: 25 }}>Courses</Text>

      <FlatList
        data={courseList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>{item?.courseTitle}</Text>
          </View>
        )}
      />
    </View>
  );
}
