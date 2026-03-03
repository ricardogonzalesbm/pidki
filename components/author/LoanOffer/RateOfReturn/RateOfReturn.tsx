import Box from "@/components/Box";
import Text from "@/components/Text";
import RangeSlider from "@/components/ui/RangeSlider/RangeSlider";
import {
  DefaultMaxInterestRate,
  DefaultMinInterestRate,
} from "@/utils/constants";
import { useState } from "react";

export const RateOfReturn = () => {
  const [interest, setInterest] = useState(12);
  return (
    <Box gap="m">
      <Text variant="body" color="textSecondary">
        Interes propuesto
      </Text>

      <Text
        variant="header"
        style={{
          fontSize: 28,
          fontFamily: "PlusJakartaSans-Bold",
          textAlign: "center",
        }}
      >
        {`${interest}%`}
      </Text>

      <RangeSlider
        value={interest}
        sliderRange={{
          min: DefaultMinInterestRate,
          max: DefaultMaxInterestRate,
        }}
        increment={1}
        leftText={`${DefaultMinInterestRate}%`}
        rightText={`${DefaultMaxInterestRate}%`}
        onChange={setInterest}
      />
    </Box>
  );
};
