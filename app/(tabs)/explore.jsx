import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import * as Animatable from 'react-native-animatable';

export default function Explore() {
  const Button = ({ label, onPress }) => (
    <Animatable.View animation="fadeInUp" delay={300} style={styles.buttonContainer}>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>{label}</Text>
      </TouchableOpacity>
    </Animatable.View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Text style={styles.heading}>Discover Learning</Text>

      <Button label="📚 Course Explore" onPress={() => alert('Course Explore')} />
      <Button label="⭐ User Reviews" onPress={() => alert('User Reviews')} />
      <Button label="👁️ Most Viewed" onPress={() => alert('Most Viewed')} />
      <Button label="❤️ Most Liked" onPress={() => alert('Most Liked')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e1e2f',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  heading: {
    fontSize: 30,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 40,
  },
  buttonContainer: {
    width: '100%',
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#3e64ff',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '600',
  },
});
