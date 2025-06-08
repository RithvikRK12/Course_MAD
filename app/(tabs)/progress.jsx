import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import * as Progress from 'react-native-progress';

export default function ProgressScreen() {
  const [progressData, setProgressData] = useState([
    { id: 1, title: 'Python Django Course', progress: 0.6 },
    { id: 2, title: 'AeroHydraulics Modelling Course', progress: 0.3 },
    { id: 3, title: 'Spanish Lang Expert Course', progress: 0.8 },
  ]);

  const increaseProgress = (id) => {
    setProgressData(prev =>
      prev.map(course =>
        course.id === id
          ? { ...course, progress: Math.min(course.progress + 0.1, 1) }
          : course
      )
    );
  };

  const resetProgress = (id) => {
    setProgressData(prev =>
      prev.map(course =>
        course.id === id
          ? { ...course, progress: 0 }
          : course
      )
    );
  };

  const cancelSubscription = (title) => {
    alert(`Subscription for "${title}" cancelled.`);
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#f9fafb' }} contentContainerStyle={{ padding: 20 }}>
      <Text style={{
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#1f2937'
      }}>
        Your Learning Progress
      </Text>

      {progressData.map(course => (
        <View
          key={course.id}
          style={{
            backgroundColor: '#ffffff',
            borderRadius: 12,
            padding: 16,
            marginBottom: 20,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 3
          }}
        >
          <Text style={{
            fontSize: 18,
            fontWeight: '600',
            marginBottom: 10,
            color: '#111827'
          }}>{course.title}</Text>

          <Progress.Bar
            progress={course.progress}
            width={null}
            height={14}
            color="#6366f1"
            unfilledColor="#e5e7eb"
            borderColor="#e5e7eb"
            borderRadius={8}
          />

          <Text style={{
            marginTop: 8,
            fontSize: 14,
            color: '#4b5563'
          }}>
            {Math.round(course.progress * 100)}% completed
          </Text>

          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 15
          }}>
            <TouchableOpacity onPress={() => increaseProgress(course.id)} style={{
              backgroundColor: '#2563eb',
              paddingVertical: 8,
              paddingHorizontal: 14,
              borderRadius: 8
            }}>
              <Text style={{ color: '#fff', fontSize: 13 }}>Track</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => alert('Live tracking started...')} style={{
              backgroundColor: '#10b981',
              paddingVertical: 8,
              paddingHorizontal: 14,
              borderRadius: 8
            }}>
              <Text style={{ color: '#fff', fontSize: 13 }}>Live Progress</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => resetProgress(course.id)} style={{
              backgroundColor: '#f59e0b',
              paddingVertical: 8,
              paddingHorizontal: 14,
              borderRadius: 8
            }}>
              <Text style={{ color: '#fff', fontSize: 13 }}>Reset</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => cancelSubscription(course.title)} style={{
              backgroundColor: '#ef4444',
              paddingVertical: 8,
              paddingHorizontal: 14,
              borderRadius: 8
            }}>
              <Text style={{ color: '#fff', fontSize: 13 }}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

