import Box from "@/components/Box";
import Text from "@/components/Text";

export default function ContentX() {
  return (
    <Box gap="s">
      <Text variant="body" color="textSecondary">
        Enter your name to get started.
      </Text>
      <Box
        backgroundColor="gray100"
        borderRadius={10}
        padding="m"
      >
        <Text variant="body" color="textSecondary">
          [Name input — coming soon]
        </Text>
      </Box>
    </Box>
  );
}
