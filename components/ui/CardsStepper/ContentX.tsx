import Box from "@/components/Box";
import Text from "@/components/Text";
import RangeSlider from "@/components/ui/RangeSlider/RangeSlider";
import { useState } from "react";

export default function ContentX() {
  const [amount, setAmount] = useState(5000);

  const formatCurrency = (val: number) =>
    `$${val.toLocaleString("es-MX")}`;

  return (
    <Box gap="m">
      <Text variant="body" color="textSecondary">
        ¿Cuánto dinero quieres prestar?
      </Text>

      <Text
        variant="header"
        style={{ fontSize: 28, fontFamily: "PlusJakartaSans-Bold" }}
      >
        {formatCurrency(amount)}
      </Text>

      <RangeSlider
        value={amount}
        sliderRange={{ min: 1000, max: 50000 }}
        increment={500}
        leftText="$1,000"
        rightText="$50,000"
        onChange={setAmount}
      />
    </Box>
  );
}
