import SignUpPixelArt from "@/assets/images/SignUpPixelArt";
import Box from "@/components/Box";
import Text from "@/components/Text";
import Button from "@/components/ui/Button/Button";
import SocialAuthButton from "@/components/ui/SocialAuthButton/SocialAuthButton";
import TextField from "@/components/ui/TextField/TextField";
import { signUpSchema } from "@/utils/validationSchemas";
import { useRouter } from "expo-router";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { ValidationError } from "yup";

export default function SignUpScreen() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [loading, setLoading] = useState(false);

  const validateField = async (
    field: "name" | "email" | "password" | "confirmPassword",
    value: string
  ) => {
    try {
      await signUpSchema.validateAt(field, {
        name,
        email,
        password,
        confirmPassword,
        [field]: value,
      });
      if (field === "name") setNameError("");
      if (field === "email") setEmailError("");
      if (field === "password") setPasswordError("");
      if (field === "confirmPassword") setConfirmPasswordError("");
      return true;
    } catch (error) {
      if (error instanceof ValidationError) {
        if (field === "name") setNameError(error.message);
        if (field === "email") setEmailError(error.message);
        if (field === "password") setPasswordError(error.message);
        if (field === "confirmPassword") setConfirmPasswordError(error.message);
      }
      return false;
    }
  };

  const handleSignUp = async () => {
    try {
      // Validate all fields
      await signUpSchema.validate(
        { name, email, password, confirmPassword },
        { abortEarly: false }
      );

      // Clear any existing errors
      setNameError("");
      setEmailError("");
      setPasswordError("");
      setConfirmPasswordError("");

      setLoading(true);
      // TODO: Implement Cognito sign-up logic here
      console.log("Sign up with:", { name, email, password });

      // Simulate API call
      setTimeout(() => {
        setLoading(false);
        // Navigate to verification screen or main app
      }, 1500);
    } catch (error) {
      if (error instanceof ValidationError) {
        // Set errors for all invalid fields
        error.inner.forEach((err) => {
          if (err.path === "name") setNameError(err.message);
          if (err.path === "email") setEmailError(err.message);
          if (err.path === "password") setPasswordError(err.message);
          if (err.path === "confirmPassword")
            setConfirmPasswordError(err.message);
        });
      }
    }
  };

  const handleGoogleSignUp = () => {
    // TODO: Implement Google sign-up with Cognito
    console.log("Google sign-up");
  };

  const handleAppleSignUp = () => {
    // TODO: Implement Apple sign-up with Cognito
    console.log("Apple sign-up");
  };

  const handleFacebookSignUp = () => {
    // TODO: Implement Facebook sign-up with Cognito
    console.log("Facebook sign-up");
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
            <SignUpPixelArt width={240} height={180} />
          </Box>

          {/* Form Section with Primary Background */}
          <Box
            flex={1}
            backgroundColor="white"
            padding="l"
            style={{
              borderTopLeftRadius: 24,
              borderTopRightRadius: 24,
              marginTop: -20,
            }}
          >
            {/* Header */}
            <Text variant="header" marginBottom="s" color="primary">
              Crear Cuenta
            </Text>
            <Text
              variant="body"
              color="primary"
              marginBottom="l"
              style={{ opacity: 0.8 }}
            >
              Únete a Pidki y comienza a conectar
            </Text>

            {/* Name Field */}
            <TextField
              label="Nombre"
              placeholder="Ingresa tu nombre completo"
              value={name}
              onChangeText={(text) => {
                setName(text);
                if (nameError) validateField("name", text);
              }}
              onBlur={() => validateField("name", name)}
              error={nameError}
              icon="User"
              autoCapitalize="words"
              autoComplete="name"
            />

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
              placeholder="Crea una contraseña"
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                if (passwordError) validateField("password", text);
                if (confirmPassword) validateField("confirmPassword", confirmPassword);
              }}
              onBlur={() => validateField("password", password)}
              error={passwordError}
              icon="Lock"
              secureTextEntry
              autoCapitalize="none"
            />

            {/* Confirm Password Field */}
            <TextField
              label="Confirmar Contraseña"
              placeholder="Confirma tu contraseña"
              value={confirmPassword}
              onChangeText={(text) => {
                setConfirmPassword(text);
                if (confirmPasswordError) validateField("confirmPassword", text);
              }}
              onBlur={() => validateField("confirmPassword", confirmPassword)}
              error={confirmPasswordError}
              icon="Lock"
              secureTextEntry
              autoCapitalize="none"
            />

            {/* Sign Up Button */}
            <Box marginTop="m">
              <Button
                variant="tertiary"
                size="large"
                fullWidth
                onPress={handleSignUp}
                loading={loading}
                disabled={loading || !name || !email || !password || !confirmPassword}
              >
                Crear Cuenta
              </Button>
            </Box>

            {/* Divider */}
            <Box flexDirection="row" alignItems="center" marginVertical="l">
              <Box flex={1} height={1} backgroundColor="border" />
              <Text
                variant="caption"
                marginHorizontal="m"
                color="textSecondary"
              >
                o regístrate con
              </Text>
              <Box flex={1} height={1} backgroundColor="border" />
            </Box>

            {/* Social Auth Buttons */}
            <Box flexDirection="row" justifyContent="center" gap="l">
              <SocialAuthButton
                provider="google"
                onPress={handleGoogleSignUp}
                variant="circle"
              />
              <SocialAuthButton
                provider="apple"
                onPress={handleAppleSignUp}
                variant="circle"
              />
              <SocialAuthButton
                provider="facebook"
                onPress={handleFacebookSignUp}
                variant="circle"
              />
            </Box>

            {/* Sign In Link */}
            <Box
              flexDirection="row"
              justifyContent="center"
              marginTop="xl"
              marginBottom="l"
            >
              <Text variant="body" color="white" style={{ opacity: 0.8, fontFamily: "PlusJakartaSans-Regular" }}>
                ¿Ya tienes cuenta?{" "}
              </Text>
              <Text
                variant="body"
                color="white"
                style={{ fontFamily: "PlusJakartaSans-SemiBold" }}
                onPress={() => router.push("/(auth)/sign-in")}
              >
                Iniciar Sesión
              </Text>
            </Box>
          </Box>
        </Box>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
