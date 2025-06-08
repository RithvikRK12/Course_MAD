import React, { useContext, useState, useEffect } from 'react';
import { Platform, View, Text, StyleSheet, FlatList } from 'react-native';
import Header from '../../components/home/header';
import NoCourse from '../../components/home/noCourse';
import CourseProgress from '../../components/home/courseProgress';
import PracticeSection from '../../components/home/practiceSection';
import CourseList from '../../components/home/courseList';
import Colors from './../../constant/Colors';
import { db } from './../../config/firebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { UserDetailContext } from '../../context/UserDetailContext';

export default function Home() {
  const { UserDetail } = useContext(UserDetailContext);
  const [courseList, setCourseList] = useState([]);

  useEffect(() => {
    if (UserDetail && UserDetail.email) {
      fetchCourses();
    }
  }, [UserDetail]);

  const fetchCourses = async () => {
    try {
      console.log('Fetching courses for:', UserDetail.email);
      const q = query(collection(db, 'Courses'), where('createdBy', '==', UserDetail.email));
      const querySnapshot = await getDocs(q);
      const courses = [];

      querySnapshot.forEach((doc) => {
        const courseData = { id: doc.id, ...doc.data() };
        courses.push(courseData);
      });

      console.log('Fetched courses:\n', JSON.stringify(courses, null, 2)); // ✅ better logging
      setCourseList(courses);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  return (
    <FlatList
      data={[]} // Only used for ListHeaderComponent
      ListHeaderComponent={
        <View style={styles.container}>
          <Header />
          {courseList.length === 0 ? (
            <NoCourse />
          ) : (
            <View>
              <CourseProgress CourseList={courseList} />
              <PracticeSection />
              <CourseList CourseList={courseList} />
            </View>
          )}
        </View>
      }
      keyExtractor={(item, index) => index.toString()}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: Platform.OS === 'ios' || Platform.OS === 'web' ? 45 : 20,
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
});
