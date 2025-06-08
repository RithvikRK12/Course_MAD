import {View,Text} from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'

export default function Tablayout()
{
    return (
        <Tabs screenOptions={{
            headerShown:false
        }}>
            <Tabs.Screen name="home" 
            options={{
                tabBarIcon:({color,size})=><Ionicons name="home-outline" size={24} color="color" />,
                tabBarLabel:'Home'
            }}
            />
            <Tabs.Screen name="explore" 
            options={{
                tabBarIcon:({color,size})=><Ionicons name="search-outline" size={24} color="color" />,
                tabBarLabel:'Explore'
            }}
            />
            <Tabs.Screen name="progress" 
            options={{
                tabBarIcon:({color,size})=><Ionicons name="analytics-outline" size={24} color="color" />,
                tabBarLabel:'Progress'
            }}
            />
            <Tabs.Screen name="profile" 
            options={{
                tabBarIcon:({color,size})=><Ionicons name="person-circle-outline" size={24} color="color" />,
                tabBarLabel:'Profile'
            }}
            />


        </Tabs>
    )
}