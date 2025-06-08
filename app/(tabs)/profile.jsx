import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Dimensions,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function ProfileScreen() {
  const MENU = [
    { key: 'account',   label: 'Account Details', icon: 'person-outline' },
    { key: 'history',   label: 'History',         icon: 'time-outline' },
    { key: 'wallet',    label: 'Wallet',          icon: 'wallet-outline' },
    { key: 'purchases', label: 'Purchases',       icon: 'cart-outline' },
    { key: 'settings',  label: 'Settings',        icon: 'settings-outline' },
  ];

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={{
        alignItems: 'center',
        paddingVertical: 40,
        borderBottomWidth: 1,
        borderColor: '#eee',
      }}>
        <Ionicons name="person-circle-outline" size={100} color="#ccc" />
        <Text style={{
          marginTop: 10,
          fontSize: 20,
          fontWeight: '600',
          color: '#333',
        }}>
          Your Name
        </Text>
        <Text style={{
          marginTop: 4,
          fontSize: 14,
          color: '#666',
        }}>
          youremail@example.com
        </Text>
      </View>

      <View style={{ paddingVertical: 20 }}>
        {MENU.map(item => (
          <TouchableOpacity
            key={item.key}
            activeOpacity={0.6}
            onPress={() => alert(item.label)}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: 15,
              paddingHorizontal: 20,
            }}
          >
            <Ionicons name={item.icon} size={24} color="#555" />
            <Text style={{
              flex: 1,
              marginLeft: 20,
              fontSize: 16,
              color: '#333',
            }}>
              {item.label}
            </Text>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}
