import Box from "@/components/Box";
import Text from "@/components/Text";
import { Theme } from "@/theme";
import { useTheme } from "@shopify/restyle";
import React from "react";

interface ScoreProps {
  score: number;
}

export default function Score({ score }: ScoreProps) {
  const theme = useTheme<Theme>();

  return (
    <Box
      backgroundColor="buttonPrimary"
      borderRadius={50}
      paddingVertical="m"
      paddingHorizontal="l"
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
      style={{
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 8,
      }}
    >
      <Box flex={1}>
        <Text
          variant="subheader"
          style={{
            fontFamily: "Quicksand-Bold",
            fontSize: 20,
            color: theme.colors.buttonPrimaryText,
          }}
        >
          Mi Pidki Score
        </Text>
      </Box>

      <Box
        width={80}
        height={80}
        borderRadius={40}
        backgroundColor="fourty"
        alignItems="center"
        justifyContent="center"
        marginLeft="m"
      >
        <Text
          variant="header"
          style={{
            fontSize: 36,
            fontFamily: "Quicksand-Bold",
            color: theme.colors.buttonPrimary,
          }}
        >
          {score}
        </Text>
      </Box>
    </Box>
  );
}
