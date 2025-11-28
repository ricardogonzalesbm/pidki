import { Tabs } from 'expo-router';

export default function BorrowerTabsLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarLabel: 'Home',
        }}
      />
      <Tabs.Screen
        name="loan"
        options={{
          title: 'Loan',
          tabBarLabel: 'Loan',
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
