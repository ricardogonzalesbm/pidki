import Box from "@/components/Box";
import Text from "@/components/Text";
import LoanReasons, { LoanReasonType } from "@/components/ui/LoanReasons/LoanReasons";
import { useCardsStepper } from "@/components/ui/CardsStepper/CardsStepperContext";
import { useEffect, useState } from "react";

const Reason = () => {
  const { updatePayload } = useCardsStepper();
  const [selectedReason, setSelectedReason] = useState<LoanReasonType | undefined>();

  useEffect(() => {
    if (selectedReason) updatePayload({ reason: selectedReason });
  }, [selectedReason]);

  return (
    <Box gap="m" paddingBottom="m">
      <Text
        variant="body"
        color="textSecondary"
        style={{ lineHeight: 24, textAlign: "center" }}
      >
        ¿Cuál es el motivo de tu préstamo?
      </Text>

      <LoanReasons
        selectedReason={selectedReason}
        onSelectReason={setSelectedReason}
      />
    </Box>
  );
};

export default Reason;
