import Box from "@/components/Box";
import Text from "@/components/Text";
import theme from "@/theme";
import { HeaderNavVariant, headerNavVariants } from "./HeaderNavVariants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useRouter } from "expo-router";
import { Bell, ChevronLeft, User } from "lucide-react-native";
import { useEffect, useState } from "react";
import {
  TouchableOpacity,
  useColorScheme,
  View,
  ViewStyle,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { spacing } = theme;

interface HeaderNavProps {
  variant?: HeaderNavVariant;
  title?: string;
  headerNavContainerStyle?: ViewStyle;
  isBackButtonEnforced?: boolean;
}

export default function HeaderNav({
  variant,
  title,
  headerNavContainerStyle,
  isBackButtonEnforced = false,
}: HeaderNavProps) {
  const colorScheme = useColorScheme();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const router = useRouter();
  const [userRole, setUserRole] = useState<string | null>(null);
  const [activeRoute, setActiveRoute] = useState<string>("");

  const resolvedVariant: HeaderNavVariant =
    variant ?? (colorScheme === "dark" ? "darkBase" : "defaults");
  const config = headerNavVariants[resolvedVariant];

  const canGoBack = navigation.canGoBack();
  const showBackButton = canGoBack || isBackButtonEnforced;

  useEffect(() => {
    AsyncStorage.getItem("userRole").then((role: string | null) =>
      setUserRole(role),
    );
  }, []);

  useEffect(() => {
    const state = navigation.getState?.();
    if (state) {
      const route = state.routes[state.index];
      setActiveRoute(route?.name ?? "");
    }
    const unsubscribe = navigation.addListener?.("state", (e: any) => {
      const current = e.data?.state;
      if (current) {
        const route = current.routes[current.index];
        setActiveRoute(route?.name ?? "");
      }
    });
    return unsubscribe;
  }, [navigation]);

  const isNotificationsActive = activeRoute === "notifications";
  const isMenuActive = activeRoute === `${userRole}/menu`;

  const handleBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  const handleNotifications = () => {
    router.push("/notifications" as any);
  };

  const handleMenu = () => {
    if (userRole) {
      router.push(`/${userRole}/menu` as any);
    }
  };

  const showRightIcons = !!userRole && config.leftIcons;

  return (
    <View
      style={[
        {
          backgroundColor: config.backgroundColor,
          paddingHorizontal: spacing.l,
          paddingBottom: spacing.m,
          paddingTop: insets.top + 12,
          flexDirection: "row",
          alignItems: "center",
        },
        headerNavContainerStyle,
      ]}
    >
      {/* Left side: back button */}
      <Box flex={1} flexDirection="row" alignItems="center">
        {showBackButton && (
          <TouchableOpacity onPress={handleBack} activeOpacity={0.7}>
            <View
              style={{
                backgroundColor: config.iconBackground,
                width: 36,
                height: 36,
                borderRadius: 18,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ChevronLeft
                size={20}
                strokeWidth={2.5}
                color={config.iconColor}
              />
            </View>
          </TouchableOpacity>
        )}
      </Box>

      {title ? (
        <Box
          position="absolute"
          style={{
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            alignItems: "center",
            justifyContent: "center",
            paddingTop: insets.top + 12,
            paddingBottom: spacing.m,
          }}
          pointerEvents="none"
        >
          <Text
            variant="subheader"
            style={{
              fontFamily: "PlusJakartaSans-SemiBold",
              fontSize: 20,
              color: config.titleColor,
            }}
          >
            {title}
          </Text>
        </Box>
      ) : null}

      {showRightIcons && (
        <Box flexDirection="row" alignItems="center" gap="s">
          <TouchableOpacity onPress={handleNotifications} activeOpacity={0.7}>
            <View
              style={{
                backgroundColor: config.iconBackground,
                width: 36,
                height: 36,
                borderRadius: 18,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Bell
                size={18}
                strokeWidth={2}
                color={
                  isNotificationsActive ? config.activeColor : config.iconColor
                }
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleMenu} activeOpacity={0.7}>
            <View
              style={{
                backgroundColor: config.iconBackground,
                width: 36,
                height: 36,
                borderRadius: 18,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <User
                size={18}
                strokeWidth={2}
                color={isMenuActive ? config.activeColor : config.iconColor}
              />
            </View>
          </TouchableOpacity>
        </Box>
      )}
    </View>
  );
}
