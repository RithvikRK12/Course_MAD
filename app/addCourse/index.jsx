import { View, Text, StyleSheet, Pressable, Alert } from 'react-native';
import React, { useContext, useState } from 'react';
import Colors from '../../constant/Colors';
import { TextInput } from 'react-native';
import Button from '../../components/shared/button';
import { GenerateTopicsAIResponse, GenerateCourseAIResponse } from '../../config/AiModel';
import Prompt from '../../constant/Prompt';
import { db } from './../../config/firebaseConfig';
import { UserDetailContext } from '@/context/UserDetailContext';
import { useRouter } from 'expo-router';
import { doc, setDoc } from 'firebase/firestore';

export default function AddCourse() {
  const [loading, setLoading] = useState(false);
  const [userInput, setUserInput] = useState('');
  const { UserDetail } = useContext(UserDetailContext);
  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopics] = useState([]);
  const router = useRouter();

  const onGenerateTopic = async () => {
    if (!userInput.trim()) {
      Alert.alert("Input Required", "Please enter what you want to learn.");
      return;
    }

    setLoading(true);
    try {
      const PROMPT = userInput + Prompt.IDEA;
      const aiResp = await GenerateTopicsAIResponse(PROMPT);

      let responseText = await aiResp.response.text();
      responseText = responseText.replace(/```json|```/g, '').trim();

      const parsed = JSON.parse(responseText);
      const topicList = Array.isArray(parsed) ? parsed : parsed.course_titles;

      setTopics(topicList || []);
    } catch (err) {
      console.error("Generate Topic Error:", err);
      Alert.alert("Error", err.message || "Failed to generate topics.");
    } finally {
      setLoading(false);
    }
  };

  const onTopicSelect = (topic) => {
    setSelectedTopics(prev =>
      prev.includes(topic)
        ? prev.filter(item => item !== topic)
        : [...prev, topic]
    );
  };

  const isTopicSelected = (topic) => selectedTopic.includes(topic);

  const onGenerateCourse = async () => {
    if (selectedTopic.length === 0) {
      Alert.alert("No Topics Selected", "Please select at least one topic.");
      return;
    }

    setLoading(true);
    try {
      const PROMPT = selectedTopic.join(", ") + Prompt.COURSE;
      console.log("Final Prompt Sent to AI:", PROMPT);

      const aiResp = await GenerateCourseAIResponse(PROMPT);
      let responseText = await aiResp.response.text();
      responseText = responseText.replace(/```json|```/g, '').trim();

      const start = responseText.indexOf('{');
      const end = responseText.lastIndexOf('}');
      if (start === -1 || end === -1) {
        throw new Error("Invalid JSON format from AI.");
      }

      const jsonSlice = responseText.slice(start, end + 1);
      const parsedCourse = JSON.parse(jsonSlice);

      const safeData = JSON.parse(JSON.stringify(parsedCourse)); // ✅ ensure Firestore-safe

      await setDoc(doc(db, 'Courses', Date.now().toString()), {
        ...safeData,
        createdOn: new Date(),
        createdBy: UserDetail?.email || 'unknown',
      });

      Alert.alert("Success", "Course saved to Firebase.");
      router.push('/(tabs)/home');
    } catch (err) {
      console.error("Generate Course Error:", err);
      Alert.alert("Error", err.message || "Failed to generate course.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Create New Course</Text>
      <Text style={styles.subheading}>What do you want to learn today</Text>
      <Text style={styles.description}>
        What course do you want to create (e.g., Learn Python, Digital Marketing, 10th Science, etc...)
      </Text>

      <TextInput
        placeholder="(e.g., Learn Python)"
        style={styles.textInput}
        numberOfLines={3}
        multiline
        value={userInput}
        onChangeText={setUserInput}
      />

      <Button text="Generate topic" type="outline" onPress={onGenerateTopic} loading={loading} />

      {topics.length > 0 && (
        <View style={styles.topicsContainer}>
          <Text style={styles.topicPrompt}>Select topics to include in the course:</Text>
          <View style={styles.topicList}>
            {topics.map((item, index) => (
              <Pressable key={index} onPress={() => onTopicSelect(item)}>
                <Text style={[styles.topicButton, isTopicSelected(item) && styles.selectedTopic]}>
                  {item}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>
      )}

      {selectedTopic.length > 0 && (
        <Button text="Generate course" onPress={onGenerateCourse} loading={loading} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 25,
    backgroundColor: Colors.WHITE,
    flex: 1,
  },
  heading: {
    fontFamily: 'outfit-bold',
    fontSize: 30,
  },
  subheading: {
    fontFamily: 'outfit',
    fontSize: 30,
  },
  description: {
    fontFamily: 'outfit',
    fontSize: 20,
    marginTop: 8,
    color: Colors.GRAY,
  },
  textInput: {
    padding: 15,
    borderWidth: 1,
    borderRadius: 15,
    height: 100,
    marginTop: 10,
    fontSize: 18,
    textAlignVertical: 'top',
  },
  topicsContainer: {
    marginTop: 15,
    marginBottom: 9,
  },
  topicPrompt: {
    fontFamily: 'outfit',
    fontSize: 20,
  },
  topicList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 6,
    rowGap: 10,
    columnGap: 10,
  },
  topicButton: {
    padding: 7,
    borderWidth: 0.4,
    borderRadius: 99,
    paddingHorizontal: 15,
    color: Colors.PRIMARY,
  },
  selectedTopic: {
    backgroundColor: Colors.PRIMARY,
    color: Colors.WHITE,
  },
});
