import Box from "@/components/Box";
import Text from "@/components/Text";

export default function ContentZ() {
  return (
    <Box gap="s">
      <Text variant="body" color="textSecondary">
        Set your desired interest rate.
      </Text>
      <Box
        backgroundColor="gray100"
        borderRadius={10}
        padding="m"
      >
        <Text variant="body" color="textSecondary">
          [Interest rate input — coming soon]
        </Text>
      </Box>
    </Box>
  );
}
