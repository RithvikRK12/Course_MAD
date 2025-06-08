import {View,Text,Image,TextInput,StyleSheet, TouchableOpacity, Pressable, ToastAndroid} from 'react-native'
import React, { useContext, useState } from 'react';
import Colors from '@/constant/Colors';
import { useRouter } from 'expo-router';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { getDoc,doc, setDoc } from 'firebase/firestore';
import { auth, db } from '@/config/firebaseConfig';
import { UserDetailContext } from '@/context/UserDetailContext';
import { ActivityIndicator, circle} from 'react-native';


export default function SignIn(){
      const router = useRouter();
      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');
      const {UserDetail,setUserDetail}=useContext(UserDetailContext)
      const [loading,setLoading] = useState(false)

      const CreateNewAccount = async() => {
        try {
          const resp = await createUserWithEmailAndPassword(auth, email, password);
          const user = resp.user;
          console.log(user);
          await SaveUser(user);
        } catch (e) {
          console.log('Error');
        }
      }

      const onSignInClick=()=>{
            setLoading(true)
            signInWithEmailAndPassword(auth,email,password)
            .then(async(resp) => {
                const user = resp.user
                console.log(user)
                await getUserDetail();
                setLoading(false);
                router.replace('/(tabs)/home')
            }).catch(e=>{
                console.log(e)
                setLoading(false);
                ToastAndroid.show("Incorrect Email or Password",ToastAndroid.BOTTOM)
            })
      }

      const getUserDetail=async()=>{
          const result = await getDoc(doc(db,'users',email));
          console.log(result.data())
          setUserDetail(result.data())
      }

    
    return(
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
            Welcome Back
          </Text>

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
            onPress={onSignInClick}
            disabled = {loading}
            style={{
              borderRadius: 10,
              padding: 15,
              marginTop: 25,
              width: '100%',
              backgroundColor: Colors.PRIMARY,
            }}
          >
            {!loading? <Text
              style={{
                fontFamily: 'outfit',
                fontSize: 20,
                color: Colors.WHITE,
                textAlign: 'center',
              }}
            >
              Sign In
            </Text>:
            <ActivityIndicator size = {'large'} color={Colors.WHITE}/>
            }

          </TouchableOpacity>
          <View
            style={{
              display: 'flex',
              gap: 5,
              flexDirection: 'row',
              marginTop: 20,
            }}
          >
            <Text style={{ fontFamily: 'outfit' }}>Don't Have An Account?</Text>
            <Pressable onPress={() => router.push('/auth/signUp')}>
              <Text style={{ color: Colors.WPINK, fontFamily: 'outfit-bold' }}>Create new Here</Text>
            </Pressable>
          </View>
        </View>
    )
}
const styles = StyleSheet.create({
    textinput:
    {
        borderWidth:1,
        width:'100%',
        padding:15,
        fontSize:18,
        borderRadius:8,
        marginTop:30
    }
})