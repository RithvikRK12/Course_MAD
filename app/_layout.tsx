import { Stack } from "expo-router";
import {useFonts} from "expo-font";
import {UserDetailContext} from "./../context/UserDetailContext"
import {useState} from "react";

export default function RootLayout() {

  useFonts({
    'outfit':require('./../assets/fonts/Outfit-Regular.ttf'),
    'outfit-bold':require('./../assets/fonts/Outfit-Bold.ttf')
  })
  const [UserDetail,setUserDetail]=useState();
  return(
    <UserDetailContext.Provider value={{UserDetail,setUserDetail}}>
    <Stack screenOptions={{headerShown: false}}>

    </Stack>
    </UserDetailContext.Provider>
  )
}