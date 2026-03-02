import Box from "@/components/Box";
import Text from "@/components/Text";
import theme from "@/theme";
import { ChevronLeft } from "lucide-react-native";
import { TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { colors } = theme;

type ScreenHeaderVariant = "primary" | "black" | "white";

interface VariantConfig {
  backgroundColor: string;
  iconBackground: string;
  iconColor: string;
  titleColor: string;
  subtitleColor: string;
}

const variantConfig: Record<ScreenHeaderVariant, VariantConfig> = {
  primary: {
    backgroundColor: colors.primary,
    iconBackground: "rgba(255, 255, 255, 0.35)",
    iconColor: colors.darkNavyBlue,
    titleColor: colors.darkNavyBlue,
    subtitleColor: "rgba(24, 35, 58, 0.6)",
  },
  black: {
    backgroundColor: colors.darkNavyBlue,
    iconBackground: "rgba(255, 255, 255, 0.15)",
    iconColor: colors.primary,
    titleColor: colors.white,
    subtitleColor: colors.gray300,
  },
  white: {
    backgroundColor: colors.white,
    iconBackground: colors.gray100,
    iconColor: colors.gray900,
    titleColor: colors.gray900,
    subtitleColor: colors.gray700,
  },
};

interface ScreenHeaderProps {
  title: string;
  subtitle?: string;
  onBack: () => void;
  variant?: ScreenHeaderVariant;
}

export default function ScreenHeader({
  title,
  subtitle,
  onBack,
  variant = "white",
}: ScreenHeaderProps) {
  const insets = useSafeAreaInsets();
  const config = variantConfig[variant];

  return (
    <View
      style={{
        backgroundColor: config.backgroundColor,
        paddingHorizontal: theme.spacing.l,
        paddingBottom: theme.spacing.l,
        paddingTop: insets.top + 16,
        flexDirection: "row",
        alignItems: "center",
        gap: theme.spacing.m,
      }}
    >
      <TouchableOpacity onPress={onBack} activeOpacity={0.7}>
        <View
          style={{
            backgroundColor: config.iconBackground,
            width: 40,
            height: 40,
            borderRadius: 40,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ChevronLeft size={20} strokeWidth={2.5} color={config.iconColor} />
        </View>
      </TouchableOpacity>

      <Box flex={1}>
        <Text
          variant="subheader"
          style={{
            fontFamily: "PlusJakartaSans-Bold",
            fontSize: 20,
            color: config.titleColor,
          }}
        >
          {title}
        </Text>
        {subtitle ? (
          <Text
            variant="caption"
            marginTop="xs"
            style={{ color: config.subtitleColor }}
          >
            {subtitle}
          </Text>
        ) : null}
      </Box>
    </View>
  );
}
