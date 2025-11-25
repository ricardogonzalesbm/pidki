import Box from "@/components/Box";
import Text from "@/components/Text";
import Button from "@/components/ui/Button/Button";
import Card from "@/components/ui/Card/Card";
import HeroCard from "@/components/ui/HeroCard/HeroCard";
import IconButton from "@/components/ui/IconButton/IconButton";
import LoanReasons from "@/components/ui/LoanReasons/LoanReasons";
import ProgressBar from "@/components/ui/ProgressBar/ProgressBar";
import Score from "@/components/ui/Score/Score";
import Select from "@/components/ui/Select/Select";
import { useState } from "react";
import { ScrollView } from "react-native";

export default function HomeScreen() {
  const [selectedCountry, setSelectedCountry] = useState<string>();
  const [selectedPeriod, setSelectedPeriod] = useState<string>();

  const countryOptions = [
    { label: "Perú", value: "peru" },
    { label: "Argentina", value: "argentina" },
    { label: "Chile", value: "chile" },
    { label: "Colombia", value: "colombia" },
    { label: "México", value: "mexico" },
  ];

  const periodOptions = [
    { label: "1 mes", value: "1" },
    { label: "3 meses", value: "3" },
    { label: "6 meses", value: "6" },
    { label: "12 meses", value: "12" },
    { label: "24 meses", value: "24" },
  ];

  return (
    <ScrollView style={{ flex: 1 }}>
      <Box flex={1} backgroundColor="mainBackground">
        <Text
          variant="header"
          marginTop="l"
          marginBottom="l"
          paddingHorizontal="m"
        >
          HeroCard
        </Text>

        <Box gap="xl" marginBottom="xl">
          <HeroCard
            variant="A"
            icon="Rocket"
            title="Welcome to Pidki"
            description="Get instant loans with competitive rates and flexible payment terms"
            ctaText="Get Started"
            onCtaPress={() => console.log("Hero A pressed")}
          />

          <HeroCard
            variant="B"
            description="Experience the fastest loan approval process in the market"
            ctaText="Learn More"
            onCtaPress={() => console.log("Hero B pressed")}
          />

          <HeroCard
            variant="C"
            title="Your Financial Partner"
            description="We're here to help you achieve your financial goals with smart lending solutions"
            ctaText="Explore Options"
            onCtaPress={() => console.log("Hero C pressed")}
          />

          <HeroCard
            variant="D"
            emoji="💰"
            title="Quick Cash"
            description="Get approved in minutes and receive funds in your account today"
            ctaText="Apply Now"
            onCtaPress={() => console.log("Hero D pressed")}
          />

          <HeroCard
            variant="E"
            icon="BadgeCheck"
            title="Verified & Secure"
            description="Bank-level security to protect your personal and financial information"
            ctaText="View Details"
            onCtaPress={() => console.log("Hero E pressed")}
          />

          <HeroCard
            variant="F"
            description="Complete your profile"
            title="Almost There!"
            progress={65}
            ctaText="Continue"
            onCtaPress={() => console.log("Hero F pressed")}
          />
        </Box>

        <Box paddingHorizontal="m">
          <Text variant="header" marginTop="l" marginBottom="l">
            Card
          </Text>

          <Box gap="m" marginBottom="xl">
            <Card
              totalPayback={1000}
              interestRate={10}
              monthlyPayment={500}
              paymentPeriodMonths={2}
              validThrough="Jul 8, 2025"
              badgeText="New"
              onAccept={() => console.log("Accepted offer")}
            />

            <Card
              totalPayback={2000}
              interestRate={8.5}
              monthlyPayment={1000}
              paymentPeriodMonths={2}
              validThrough="Jul 15, 2025"
              onAccept={() => console.log("Accepted offer")}
            />
          </Box>

          <Text variant="subheader" marginTop="l" marginBottom="m">
            Variants
          </Text>
          <Box gap="m">
            <Button variant="primary" onPress={() => console.log("Primary")}>
              Primary Button
            </Button>
            <Button
              variant="secondary"
              onPress={() => console.log("Secondary")}
            >
              Secondary Button
            </Button>
            <Button variant="tertiary" onPress={() => console.log("Tertiary")}>
              Tertiary Button
            </Button>
            <Button variant="fourty" onPress={() => console.log("fourty")}>
              Fourty Button
            </Button>
            <Button variant="outline" onPress={() => console.log("outline")}>
              Outline Button
            </Button>
            <Button variant="danger" onPress={() => console.log("Danger")}>
              Danger Button
            </Button>
            <Button variant="warning" onPress={() => console.log("Warning")}>
              Warning Button
            </Button>
          </Box>

          <Text variant="subheader" marginTop="l" marginBottom="m">
            Sizes
          </Text>
          <Box gap="m">
            <Button size="small" onPress={() => console.log("Small")}>
              Small Button
            </Button>
            <Button size="medium" onPress={() => console.log("Medium")}>
              Medium Button
            </Button>
            <Button size="large" onPress={() => console.log("Large")}>
              Large Button
            </Button>
          </Box>

          <Text variant="subheader" marginTop="l" marginBottom="m">
            With Icons
          </Text>
          <Box gap="m">
            <Button
              icon="Wallet"
              iconPosition="left"
              onPress={() => console.log("Icon Left")}
            >
              Wallet
            </Button>
            <Button
              icon="CreditCard"
              iconPosition="right"
              variant="secondary"
              onPress={() => console.log("Icon Right")}
            >
              Credit Card
            </Button>
            <Button
              icon="DollarSign"
              variant="tertiary"
              onPress={() => console.log("Money")}
            >
              Request Loan
            </Button>
          </Box>

          <Text variant="subheader" marginTop="l" marginBottom="m">
            States
          </Text>
          <Box gap="m">
            <Button disabled onPress={() => console.log("Disabled")}>
              Disabled Button
            </Button>
            <Button loading onPress={() => console.log("Loading")}>
              Loading Button
            </Button>
            <Button
              fullWidth
              variant="primary"
              onPress={() => console.log("Full Width")}
            >
              Full Width Button
            </Button>
          </Box>

          <Text variant="header" marginTop="xl" marginBottom="l">
            Score
          </Text>

          <Box marginBottom="xl">
            <Score score={90} />
          </Box>

          <Text variant="header" marginTop="xl" marginBottom="l">
            ProgressBar
          </Text>

          <Box gap="m" marginBottom="xl">
            <ProgressBar progress={75} label="Completion" />
            <ProgressBar progress={45} label="Profile" />
            <ProgressBar progress={90} label="Documents" />
            <ProgressBar progress={30} />
          </Box>

          <Text variant="header" marginTop="xl" marginBottom="l">
            Select
          </Text>

          <Box gap="m" marginBottom="xl">
            <Select
              label="País"
              options={countryOptions}
              value={selectedCountry}
              onSelect={setSelectedCountry}
              placeholder="Selecciona un país"
            />
            <Select
              label="Período de pago"
              options={periodOptions}
              value={selectedPeriod}
              onSelect={setSelectedPeriod}
              placeholder="Selecciona un período"
            />
          </Box>

          <Text variant="header" marginTop="xl" marginBottom="l">
            LoanReasons
          </Text>

          <Box marginBottom="xl">
            <LoanReasons
              onSelectReason={(reason) =>
                console.log("Selected reason:", reason)
              }
            />
          </Box>

          <Text variant="header" marginTop="xl" marginBottom="l">
            IconButton
          </Text>

          <Text variant="subheader" marginTop="l" marginBottom="m">
            Variants
          </Text>
          <Box flexDirection="row" gap="m" flexWrap="wrap">
            <IconButton
              icon="Heart"
              variant="primary"
              onPress={() => console.log("Heart")}
            />
            <IconButton
              icon="Star"
              variant="secondary"
              onPress={() => console.log("Star")}
            />
            <IconButton
              icon="Settings"
              variant="tertiary"
              onPress={() => console.log("Settings")}
            />
            <IconButton
              icon="Settings"
              variant="fourty"
              onPress={() => console.log("fourty")}
            />
            <IconButton
              icon="Settings"
              variant="outline"
              onPress={() => console.log("outline")}
            />

            <IconButton
              icon="Trash2"
              variant="danger"
              onPress={() => console.log("Trash")}
            />
            <IconButton
              icon="TriangleAlert"
              variant="warning"
              onPress={() => console.log("Alert")}
            />
          </Box>

          <Text variant="subheader" marginTop="l" marginBottom="m">
            Sizes
          </Text>
          <Box flexDirection="row" gap="m" alignItems="center">
            <IconButton
              icon="Bell"
              size="small"
              onPress={() => console.log("Small")}
            />
            <IconButton
              icon="Bell"
              size="medium"
              onPress={() => console.log("Medium")}
            />
            <IconButton
              icon="Bell"
              size="large"
              onPress={() => console.log("Large")}
            />
          </Box>

          <Text variant="subheader" marginTop="l" marginBottom="m">
            Common Use Cases
          </Text>
          <Box flexDirection="row" gap="m" flexWrap="wrap">
            <IconButton
              icon="Search"
              variant="primary"
              onPress={() => console.log("Search")}
            />
            <IconButton
              icon="ListFilter"
              variant="secondary"
              onPress={() => console.log("Filter")}
            />
            <IconButton
              icon="Share2"
              variant="tertiary"
              onPress={() => console.log("Share")}
            />
            <IconButton
              icon="Pencil"
              variant="secondary"
              onPress={() => console.log("Edit")}
            />
            <IconButton
              icon="EllipsisVertical"
              variant="tertiary"
              onPress={() => console.log("More")}
            />
            <IconButton
              icon="X"
              variant="danger"
              onPress={() => console.log("Close")}
            />
          </Box>

          <Text variant="subheader" marginTop="l" marginBottom="m">
            States
          </Text>
          <Box flexDirection="row" gap="m" alignItems="center">
            <IconButton
              icon="Heart"
              disabled
              onPress={() => console.log("Disabled")}
            />
            <IconButton
              icon="Star"
              loading
              onPress={() => console.log("Loading")}
            />
          </Box>
        </Box>
      </Box>
    </ScrollView>
  );
}
