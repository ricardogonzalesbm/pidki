import { ScrollView } from 'react-native';
import Box from '@/components/Box';
import Text from '@/components/Text';
import Button from '@/components/ui/Button/Button';
import IconButton from '@/components/ui/IconButton/IconButton';
import Card from '@/components/ui/Card/Card';
import LoanReasons from '@/components/ui/LoanReasons/LoanReasons';

export default function HomeScreen() {
  return (
    <ScrollView style={{ flex: 1 }}>
      <Box flex={1} backgroundColor="mainBackground" padding="m">
        <Text variant="header" marginBottom="l">
          Component Examples
        </Text>

        <Text variant="header" marginTop="l" marginBottom="l">
          Card Examples
        </Text>

        <Box gap="m" marginBottom="xl">
          <Card
            totalPayback={1000}
            interestRate={10}
            monthlyPayment={500}
            paymentPeriodMonths={2}
            validThrough="Jul 8, 2025"
            badgeText="New"
            onAccept={() => console.log('Accepted offer')}
          />

          <Card
            totalPayback={2000}
            interestRate={8.5}
            monthlyPayment={1000}
            paymentPeriodMonths={2}
            validThrough="Jul 15, 2025"
            onAccept={() => console.log('Accepted offer')}
          />
        </Box>

        <Text variant="subheader" marginTop="l" marginBottom="m">
          Variants
        </Text>
        <Box gap="m">
          <Button variant="primary" onPress={() => console.log('Primary')}>
            Primary Button
          </Button>
          <Button variant="secondary" onPress={() => console.log('Secondary')}>
            Secondary Button
          </Button>
          <Button variant="tertiary" onPress={() => console.log('Tertiary')}>
            Tertiary Button
          </Button>
          <Button variant="danger" onPress={() => console.log('Danger')}>
            Danger Button
          </Button>
          <Button variant="warning" onPress={() => console.log('Warning')}>
            Warning Button
          </Button>
        </Box>

        <Text variant="subheader" marginTop="l" marginBottom="m">
          Sizes
        </Text>
        <Box gap="m">
          <Button size="small" onPress={() => console.log('Small')}>
            Small Button
          </Button>
          <Button size="medium" onPress={() => console.log('Medium')}>
            Medium Button
          </Button>
          <Button size="large" onPress={() => console.log('Large')}>
            Large Button
          </Button>
        </Box>

        <Text variant="subheader" marginTop="l" marginBottom="m">
          With Icons
        </Text>
        <Box gap="m">
          <Button icon="Wallet" iconPosition="left" onPress={() => console.log('Icon Left')}>
            Wallet
          </Button>
          <Button icon="CreditCard" iconPosition="right" variant="secondary" onPress={() => console.log('Icon Right')}>
            Credit Card
          </Button>
          <Button icon="DollarSign" variant="tertiary" onPress={() => console.log('Money')}>
            Request Loan
          </Button>
        </Box>

        <Text variant="subheader" marginTop="l" marginBottom="m">
          States
        </Text>
        <Box gap="m">
          <Button disabled onPress={() => console.log('Disabled')}>
            Disabled Button
          </Button>
          <Button loading onPress={() => console.log('Loading')}>
            Loading Button
          </Button>
          <Button fullWidth variant="primary" onPress={() => console.log('Full Width')}>
            Full Width Button
          </Button>
        </Box>

        <Text variant="header" marginTop="xl" marginBottom="l">
          LoanReasons Examples
        </Text>

        <Box marginBottom="xl">
          <LoanReasons
            onSelectReason={(reason) => console.log('Selected reason:', reason)}
          />
        </Box>

        <Text variant="header" marginTop="xl" marginBottom="l">
          IconButton Examples
        </Text>

        <Text variant="subheader" marginTop="l" marginBottom="m">
          Variants
        </Text>
        <Box flexDirection="row" gap="m" flexWrap="wrap">
          <IconButton icon="Heart" variant="primary" onPress={() => console.log('Heart')} />
          <IconButton icon="Star" variant="secondary" onPress={() => console.log('Star')} />
          <IconButton icon="Settings" variant="tertiary" onPress={() => console.log('Settings')} />
          <IconButton icon="Trash2" variant="danger" onPress={() => console.log('Trash')} />
          <IconButton icon="TriangleAlert" variant="warning" onPress={() => console.log('Alert')} />
        </Box>

        <Text variant="subheader" marginTop="l" marginBottom="m">
          Sizes
        </Text>
        <Box flexDirection="row" gap="m" alignItems="center">
          <IconButton icon="Bell" size="small" onPress={() => console.log('Small')} />
          <IconButton icon="Bell" size="medium" onPress={() => console.log('Medium')} />
          <IconButton icon="Bell" size="large" onPress={() => console.log('Large')} />
        </Box>

        <Text variant="subheader" marginTop="l" marginBottom="m">
          Common Use Cases
        </Text>
        <Box flexDirection="row" gap="m" flexWrap="wrap">
          <IconButton icon="Search" variant="primary" onPress={() => console.log('Search')} />
          <IconButton icon="ListFilter" variant="secondary" onPress={() => console.log('Filter')} />
          <IconButton icon="Share2" variant="tertiary" onPress={() => console.log('Share')} />
          <IconButton icon="Pencil" variant="secondary" onPress={() => console.log('Edit')} />
          <IconButton icon="EllipsisVertical" variant="tertiary" onPress={() => console.log('More')} />
          <IconButton icon="X" variant="danger" onPress={() => console.log('Close')} />
        </Box>

        <Text variant="subheader" marginTop="l" marginBottom="m">
          States
        </Text>
        <Box flexDirection="row" gap="m" alignItems="center">
          <IconButton icon="Heart" disabled onPress={() => console.log('Disabled')} />
          <IconButton icon="Star" loading onPress={() => console.log('Loading')} />
        </Box>
      </Box>
    </ScrollView>
  );
}
