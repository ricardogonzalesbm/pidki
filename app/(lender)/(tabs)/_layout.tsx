import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { Platform } from "react-native";

export default function LenderTabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#FFFFFF",
        tabBarInactiveTintColor: "#9CA3AF",
        tabBarStyle: {
          position: "absolute",
          bottom: 25,
          elevation: 0,
          backgroundColor: "rgba(24, 35, 58, 0.9)",
          borderRadius: 30,
          height: 70,
          paddingBottom: 10,
          paddingTop: 10,
          borderTopWidth: 0,
          ...Platform.select({
            ios: {
              backgroundColor: "rgba(24, 35, 58, 0.9)",
              left: 20,
              right: 20,
              marginHorizontal: 20,
            },
            android: {
              backgroundColor: "rgba(24, 35, 58, 0.95)",
              left: 20,
              right: 20,
              marginHorizontal: 20,
            },
            web: {
              left: 35,
              right: 35,
            },
          }),
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontFamily: "Quicksand-Medium",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Market",
          tabBarLabel: "Market",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="storefront" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="my-activity"
        options={{
          title: "My Activity",
          tabBarLabel: "Activity",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="list" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="wallet"
        options={{
          title: "Wallet",
          tabBarLabel: "Wallet",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="wallet" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="support"
        options={{
          title: "Support",
          tabBarLabel: "Support",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="help-circle" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
