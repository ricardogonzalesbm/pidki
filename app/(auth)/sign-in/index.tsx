import Box from "@/components/Box";
import Text from "@/components/Text";
import Button from "@/components/ui/Button/Button";
import TextField from "@/components/ui/TextField/TextField";
import theme from "@/theme";
import { signInSchema } from "@/utils/validationSchemas";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Goal } from "lucide-react-native";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { ValidationError } from "yup";

export default function SignInScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);

  const validateField = async (field: "email" | "password", value: string) => {
    try {
      await signInSchema.validateAt(field, { email, password, [field]: value });
      if (field === "email") setEmailError("");
      if (field === "password") setPasswordError("");
      return true;
    } catch (error) {
      if (error instanceof ValidationError) {
        if (field === "email") setEmailError(error.message);
        if (field === "password") setPasswordError(error.message);
      }
      return false;
    }
  };

  const handleSignIn = async () => {
    try {
      await signInSchema.validate({ email, password }, { abortEarly: false });
      setEmailError("");
      setPasswordError("");
      setLoading(true);
      // TODO: Implement Cognito sign-in logic here
      console.log("Sign in with:", { email, password });
      setTimeout(() => {
        setLoading(false);
        router.replace("/(borrower)/(tabs)");
      }, 1500);
    } catch (error) {
      if (error instanceof ValidationError) {
        error.inner.forEach((err) => {
          if (err.path === "email") setEmailError(err.message);
          if (err.path === "password") setPasswordError(err.message);
        });
      }
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1, backgroundColor: "#18233a" }}
    >
      <ScrollView
        style={{ flex: 1, backgroundColor: "#F3F4F6" }}
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <StatusBar style="dark" />
        {/* Layer 1: mainBackground with logo */}
        <Box
          backgroundColor="mainBackground"
          alignItems="center"
          paddingTop="xl"
          paddingBottom="xl"
          style={{ paddingTop: 72 }}
        >
          <Goal size={100} color={theme.colors.darkPrimary} strokeWidth={1.5} />
          <Text variant="header" marginTop="s">
            P i d k i
          </Text>
        </Box>

        {/* Layer 2: darkNavyBlue form */}
        <Box
          flex={1}
          backgroundColor="darkNavyBlue"
          padding="l"
          style={{ borderTopLeftRadius: 28, borderTopRightRadius: 28 }}
        >
          {/* Header */}
          <Box paddingBottom="xl">
            <Text variant="bodyBold" color="white" style={{ fontSize: 28 }}>
              Bienvenido de nuevo
            </Text>
            <Text
              variant="body"
              color="secondary"
              style={{
                fontSize: 14,
                fontFamily: "PlusJakartaSans-Regular",
                marginTop: 4,
              }}
            >
              Inicia sesión para continuar
            </Text>
          </Box>

          {/* Email Field */}
          <TextField
            label="Email"
            placeholder="Ingresa tu email"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              if (emailError) validateField("email", text);
            }}
            onBlur={() => validateField("email", email)}
            error={emailError}
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
            variant="transparent"
          />

          {/* Password Field */}
          <TextField
            label="Contraseña"
            placeholder="Ingresa tu contraseña"
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              if (passwordError) validateField("password", text);
            }}
            onBlur={() => validateField("password", password)}
            error={passwordError}
            secureTextEntry
            autoCapitalize="none"
            variant="transparent"
          />

          {/* Forgot Password Link */}
          <Box alignItems="flex-end" marginTop="s" marginBottom="l">
            <Text
              variant="body"
              color="primary"
              style={{ fontFamily: "PlusJakartaSans-Medium", fontSize: 14 }}
            >
              ¿Olvidaste tu contraseña?
            </Text>
          </Box>

          {/* Sign In Button */}
          <Box marginBottom="m">
            <Button
              variant="primary"
              size="large"
              fullWidth
              onPress={handleSignIn}
              loading={loading}
              disabled={loading || !email || !password}
            >
              Iniciar Sesión
            </Button>
          </Box>

          <Box flex={1} />

          {/* Sign Up Link */}
          <Box
            flexDirection="row"
            justifyContent="center"
            paddingTop="xl"
            paddingBottom="m"
          >
            <Text
              variant="body"
              color="secondary"
              style={{ fontSize: 14, fontFamily: "PlusJakartaSans-Regular" }}
            >
              ¿No tienes cuenta?{" "}
            </Text>
            <Text
              variant="body"
              color="primary"
              style={{ fontSize: 14, fontFamily: "PlusJakartaSans-Bold" }}
              onPress={() => router.push("/(auth)/sign-up")}
            >
              Regístrate
            </Text>
          </Box>
        </Box>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
