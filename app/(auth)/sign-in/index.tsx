import SignInPixelArt from "@/assets/images/SignInPixelArt";
import Box from "@/components/Box";
import Text from "@/components/Text";
import Button from "@/components/ui/Button/Button";
import SocialAuthButton from "@/components/ui/SocialAuthButton/SocialAuthButton";
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
        // Navigate to main app after successful sign-in
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
        <Box flex={1} backgroundColor="mainBackground">
          {/* Pixel Art Illustration with White Background */}
          <Box
            backgroundColor="primary"
            paddingVertical="xl"
            alignItems="center"
          >
            <SignInPixelArt width={240} height={180} />
          </Box>

          {/* Form Section with Primary Background */}
          <Box
            flex={1}
            backgroundColor="primary"
            padding="l"
            style={{
              borderTopLeftRadius: 24,
              borderTopRightRadius: 24,
              marginTop: -20,
            }}
          >
            {/* Header */}
            <Text variant="header" marginBottom="s" color="primary">
              Bienvenido
            </Text>
            <Text
              variant="body"
              color="secondary"
              marginBottom="xl"
              style={{ opacity: 0.8 }}
            >
              Inicia sesión para continuar en Pidki
            </Text>

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
              icon="Mail"
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
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
              icon="Lock"
              secureTextEntry
              autoCapitalize="none"
            />

            {/* Forgot Password Link */}
            <Box alignItems="flex-end" marginBottom="l">
              <Text
                variant="body"
                color="cyan"
                style={{ fontFamily: "PlusJakartaSans-Medium" }}
              >
                ¿Olvidaste tu contraseña?
              </Text>
            </Box>

            {/* Sign In Button */}
            <Button
              variant="cyan"
              size="large"
              fullWidth
              onPress={handleSignIn}
              loading={loading}
              disabled={loading || !email || !password}
            >
              Iniciar Sesión
            </Button>

            {/* Divider */}
            <Box flexDirection="row" alignItems="center" marginVertical="l">
              <Box flex={1} height={1} backgroundColor="border" />
              <Text
                variant="caption"
                marginHorizontal="m"
                color="textSecondary"
              >
                o continuar con
              </Text>
              <Box flex={1} height={1} backgroundColor="border" />
            </Box>

            {/* Social Auth Buttons */}
            <Box flexDirection="row" justifyContent="center" gap="l">
              <SocialAuthButton
                provider="google"
                onPress={handleGoogleSignIn}
                variant="circle"
              />
              <SocialAuthButton
                provider="apple"
                onPress={handleAppleSignIn}
                variant="circle"
              />
              <SocialAuthButton
                provider="facebook"
                onPress={handleFacebookSignIn}
                variant="circle"
              />
            </Box>

            {/* Sign Up Link */}
            <Box
              flexDirection="row"
              justifyContent="center"
              marginTop="xl"
              marginBottom="l"
            >
              <Text variant="body" color="white" style={{ opacity: 0.8, fontFamily: "PlusJakartaSans-Regular" }}>
                ¿No tienes cuenta?{" "}
              </Text>
              <Text
                variant="body"
                color="white"
                style={{ fontFamily: "PlusJakartaSans-SemiBold" }}
                onPress={() => router.push("/(auth)/sign-up")}
              >
                Regístrate
              </Text>
            </Box>
          </Box>
        </Box>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
