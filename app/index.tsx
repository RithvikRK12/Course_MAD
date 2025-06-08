import { StyleSheet,Image,Text, View,TouchableOpacity } from "react-native";
import colors from './../constant/Colors'
import { useRouter } from "expo-router";
import { onAuthStateChanged } from 'firebase/auth'
import {auth, db} from './../config/firebaseConfig'
import { UserDetailContext } from '@/context/UserDetailContext';
import {getDoc, doc } from "firebase/firestore";
import React, { useContext, useState } from 'react';

export default function Index() {
  
  const router=useRouter();
  const {UserDetail,setUserDetail}=useContext(UserDetailContext)

  onAuthStateChanged(auth, async(user)=>{
      if(user && user.email)
      {
        console.log(user);
        const result = await getDoc(doc(db,'users',user.email));
        setUserDetail(result.data())
        router.replace('/(tabs)/home')
      }
  })


  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.WHITE
      }}
    >
      <Image source={require('./../assets/images/landing.png')}
      style={{
        width:'100%',
        height: 300,
        marginTop: 50
      }}
      />
      <View style={{
        padding:25,
        backgroundColor: colors.PRIMARY,
        height:'100%',
        borderTopLeftRadius: 35,
        borderTopRightRadius: 35,
        marginTop:20
      }}>
        <Text style={{
          fontSize:35,
          fontWeight: "bold",
          textAlign: "center"
          }}> Welcome to Braniacs</Text>
        <Text style={{
          fontSize:20,
          textAlign:"center",
          marginTop: 60,
          fontWeight: "bold",
          fontFamily: "outfit-bold"
        }}>The Smarter Way to Learn and Practice:</Text>
        <Text style={{
          fontSize:20,
          textAlign:"center",
          marginTop: 5
        }}>Transform your ideas into educational content effortlessly with AI!</Text>
        <TouchableOpacity style={styles.button}
          onPress={() => router.push('/auth/signUp')}
        >
          <Text style={[styles.buttonText,{color:colors.PRIMARY}]}>Get Started</Text>
        </TouchableOpacity> 
        
        <TouchableOpacity style={[styles.button,{backgroundColor:colors.PRIMARY,borderWidth:1,borderColor:colors.WHITE}]}
          onPress={() => router.push('/auth/signIn')}
        >
          <Text style={styles.buttonText}>Already have an Account</Text>
        </TouchableOpacity> 
      </View>
    </View>

  );
}

const styles = StyleSheet.create ({
  button:
  {
    padding: 20,
    backgroundColor:colors.WHITE,
    marginTop:20,
    borderRadius:10
  },
  buttonText:
  {
    textAlign: "center",
    fontSize: 18
  }
})
