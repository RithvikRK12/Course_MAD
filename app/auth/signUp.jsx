import { View, Text, Image, TextInput, StyleSheet, TouchableOpacity, Pressable } from 'react-native';
import React, { useContext, useState } from 'react';
import Colors from '@/constant/Colors';
import { useRouter } from 'expo-router';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '@/config/firebaseConfig';
import { UserDetailContext } from '@/context/UserDetailContext';

export default function SignUp() {
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {UserDetail,setUserDetail}=useContext(UserDetailContext)

  // Save user to Firestore
  const SaveUser = async(user) => {
    const data = {
      name: fullName,
      email: email,
      member: false,
      uid: user?.uid
    }
    await setDoc(doc(db, 'users', email), data)

    setUserDetail(data);
  };

  // Create new account
  const CreateNewAccount = async() => {
    try {
      const resp = await createUserWithEmailAndPassword(auth, email, password);
      const user = resp.user;
      console.log(user);
      await SaveUser(user);
    } catch (e) {
      console.log('Error');
    }
  };
     

  return (
    <View
      style={{
        display: 'flex',
        alignItems: 'center',
        paddingTop: 100,
        flex: 1,
        backgroundColor: Colors.WHITE,
        padding: 30,
      }}
    >
      <Image
        source={require('./../../assets/images/logo.png')}
        style={{
          width: 200,
          height: 200,
        }}
      />
      <Text
        style={{
          fontSize: 30,
          fontFamily: 'outfit-bold',
        }}
      >
        Create New Account
      </Text>
      <TextInput
        placeholder="Full name"
        onChangeText={(value) => setFullName(value)}
        style={styles.textinput}
      />
      <TextInput
        placeholder="Email"
        onChangeText={(value) => setEmail(value)}
        style={styles.textinput}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={(value) => setPassword(value)}
        style={styles.textinput}
      />
      <TouchableOpacity
        onPress={CreateNewAccount}
        style={{
          borderRadius: 10,
          padding: 15,
          marginTop: 25,
          width: '100%',
          backgroundColor: Colors.PRIMARY,
        }}
      >
        <Text
          style={{
            fontFamily: 'outfit',
            fontSize: 20,
            color: Colors.WHITE,
            textAlign: 'center',
          }}
        >
          Create Account
        </Text>
      </TouchableOpacity>
      <View
        style={{
          display: 'flex',
          gap: 5,
          flexDirection: 'row',
          marginTop: 20,
        }}
      >
        <Text style={{color: Colors.PRIMARY, fontFamily: 'outfit-bold' }}>Already Have An Account?</Text>
        <Pressable onPress={() => router.push('/auth/signIn')}>
          <Text style={{ color: Colors.WPINK, fontFamily: 'outfit-bold' }}>Sign In Here</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  textinput: {
    borderWidth: 1,
    width: '100%',
    padding: 15,
    fontSize: 18,
    borderRadius: 8,
    marginTop: 30,
  },
});