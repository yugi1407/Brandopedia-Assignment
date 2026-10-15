import React from 'react';
import { createBottomTabNavigator } from 'expo-router/js-tabs';
import { Ionicons } from '@expo/vector-icons';

import Dashboard from '../dashboard';
import Discover from '../discover';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#0B7A75',
        tabBarInactiveTintColor: '#555',
        tabBarStyle: { height: 62, paddingTop: 8, backgroundColor: '#fff' },
        tabBarIcon: ({ focused, color }) => {
          const name =
            route.name === 'Home'
              ? focused ? 'home' : 'home-outline'
              : focused ? 'search' : 'search-outline';
          return <Ionicons name={name} size={26} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={Dashboard} />
      <Tab.Screen name="Search" component={Discover} />
    </Tab.Navigator>
  );
}