import Box from "@/components/Box";
import Text from "@/components/Text";
import RangeSlider from "@/components/ui/RangeSlider/RangeSlider";
import TextField from "@/components/ui/TextField/TextField";
import {
  DefaultMaxLoanAmount,
  DefaultMinLoanAmount,
} from "@/utils/constants";
import { useCardsStepper } from "@/components/ui/CardsStepper/CardsStepperContext";
import { useEffect, useState } from "react";

const formatCurrency = (val: number) =>
  `S/ ${val.toLocaleString("es-PE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

const parseCurrency = (text: string) => {
  const cleaned = text.replace(/[^0-9]/g, "");
  if (cleaned === "") return DefaultMinLoanAmount;
  return Math.min(DefaultMaxLoanAmount, Math.max(DefaultMinLoanAmount, Number(cleaned)));
};

const LoanAmount = () => {
  const { updatePayload } = useCardsStepper();
  const [amount, setAmount] = useState(DefaultMinLoanAmount);
  const [inputValue, setInputValue] = useState(formatCurrency(DefaultMinLoanAmount));

  useEffect(() => {
    updatePayload({ loanAmount: amount });
  }, [amount]);

  const handleSliderChange = (value: number) => {
    setAmount(value);
    setInputValue(formatCurrency(value));
  };

  const handleInputChange = (text: string) => {
    setInputValue(text);
  };

  const handleInputBlur = () => {
    const parsed = parseCurrency(inputValue);
    setAmount(parsed);
    setInputValue(formatCurrency(parsed));
  };

  return (
    <Box gap="m" paddingBottom="m">
      <Text
        variant="body"
        color="textSecondary"
        style={{ lineHeight: 24, textAlign: "center" }}
      >
        ¿Cuánto dinero necesitas?
      </Text>

      <Text
        variant="header"
        style={{
          fontSize: 28,
          fontFamily: "PlusJakartaSans-Bold",
          textAlign: "center",
        }}
      >
        {formatCurrency(amount)}
      </Text>

      <RangeSlider
        value={amount}
        sliderRange={{ min: DefaultMinLoanAmount, max: DefaultMaxLoanAmount }}
        increment={50}
        leftText={`S/ ${DefaultMinLoanAmount}`}
        rightText={`S/ ${DefaultMaxLoanAmount}`}
        onChange={handleSliderChange}
      />

      <TextField
        label="Monto del préstamo"
        value={inputValue}
        onChangeText={handleInputChange}
        onBlur={handleInputBlur}
        keyboardType="numeric"
        icon="DollarSign"
      />

    </Box>
  );
};

export default LoanAmount;
