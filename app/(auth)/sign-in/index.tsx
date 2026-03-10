import Box from "@/components/Box";
import Text from "@/components/Text";
import Button from "@/components/ui/Button/Button";
import TextField from "@/components/ui/TextField/TextField";
import { signInSchema } from "@/utils/validationSchemas";
import { useRouter } from "expo-router";
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
      // Validate all fields
      await signInSchema.validate({ email, password }, { abortEarly: false });

      // Clear any existing errors
      setEmailError("");
      setPasswordError("");

      setLoading(true);
      // TODO: Implement Cognito sign-in logic here
      console.log("Sign in with:", { email, password });

      // Simulate API call
      setTimeout(() => {
        setLoading(false);
        router.replace("/(lender)/(tabs)");
      }, 1500);
    } catch (error) {
      if (error instanceof ValidationError) {
        // Set errors for all invalid fields
        error.inner.forEach((err) => {
          if (err.path === "email") setEmailError(err.message);
          if (err.path === "password") setPasswordError(err.message);
        });
      }
    }
  };

  const handleGoogleSignIn = () => {
    // TODO: Implement Google sign-in with Cognito
    console.log("Google sign-in");
  };

  const handleAppleSignIn = () => {
    // TODO: Implement Apple sign-in with Cognito
    console.log("Apple sign-in");
  };

  const handleFacebookSignIn = () => {
    // TODO: Implement Facebook sign-in with Cognito
    console.log("Facebook sign-in");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <Box
          flex={1}
          backgroundColor="black"
          padding="l"
          justifyContent="center"
        >
          {/* Header */}
          <Box width="100%" paddingBottom="xl" paddingTop="xl">
            <Text
              variant="header"
              style={{
                fontSize: 30,
                fontFamily: "PlusJakartaSans-Bold",
                color: "#bdcae7",
                letterSpacing: -0.5,
                marginBottom: 8,
              }}
            >
              Bienvenido de nuevo
            </Text>
            <Text
              variant="body"
              style={{
                fontSize: 16,
                fontFamily: "PlusJakartaSans-Regular",
                color: "#667bab",
                marginBottom: 16,
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

          {/* Divider 
          <Box flexDirection="row" alignItems="center" marginVertical="m">
            <Box
              flex={1}
              height={1}
              style={{ backgroundColor: "rgba(102, 123, 171, 0.5)" }}
            />
            <Text
              variant="caption"
              marginHorizontal="m"
              style={{ color: "#667bab", fontSize: 14 }}
            >
              o continuar con
            </Text>
            <Box
              flex={1}
              height={1}
              style={{ backgroundColor: "rgba(102, 123, 171, 0.5)" }}
            />
          </Box>*/}

          {/* Social Auth Buttons
          <Box gap="m" marginBottom="m">
            <SocialAuthButton provider="google" onPress={handleGoogleSignIn} />
            <SocialAuthButton provider="apple" onPress={handleAppleSignIn} />
          </Box> */}

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
              style={{
                color: "#667bab",
                fontSize: 14,
                fontFamily: "PlusJakartaSans-Regular",
              }}
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
