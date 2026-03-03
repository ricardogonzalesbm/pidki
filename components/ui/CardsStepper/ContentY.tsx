import Box from "@/components/Box";
import Text from "@/components/Text";

export default function ContentY() {
  return (
    <Box gap="s">
      <Text variant="body" color="textSecondary">
        Select your country of residence.
      </Text>
      <Box
        backgroundColor="gray100"
        borderRadius={10}
        padding="m"
      >
        <Text variant="body" color="textSecondary">
          [Country selector — coming soon]
        </Text>
      </Box>
    </Box>
  );
}
