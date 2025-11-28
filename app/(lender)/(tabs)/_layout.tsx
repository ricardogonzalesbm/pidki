import { Tabs } from 'expo-router';

export default function LenderTabsLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Marketplace',
          tabBarLabel: 'Marketplace',
        }}
      />
      <Tabs.Screen
        name="my-activity"
        options={{
          title: 'My Activity',
          tabBarLabel: 'Activity',
        }}
      />
      <Tabs.Screen
        name="wallet"
        options={{
          title: 'Wallet',
          tabBarLabel: 'Wallet',
        }}
      />
      <Tabs.Screen
        name="support"
        options={{
          title: 'Support',
          tabBarLabel: 'Support',
        }}
      />
    </Tabs>
  );
}
