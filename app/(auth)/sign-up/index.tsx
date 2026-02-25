import Box from "@/components/Box";
import Text from "@/components/Text";
import Button from "@/components/ui/Button/Button";
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
    value: string,
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
        { abortEarly: false },
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
              Crear Cuenta
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
              Únete a Pidki y comienza a conectar
            </Text>
          </Box>

          {/* Name Field */}
          <TextField
            label="Nombre Completo"
            placeholder="Ingresa tu nombre completo"
            value={name}
            onChangeText={(text) => {
              setName(text);
              if (nameError) validateField("name", text);
            }}
            onBlur={() => validateField("name", name)}
            error={nameError}
            autoCapitalize="words"
            autoComplete="name"
            variant="transparent"
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
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
            variant="transparent"
          />

          {/* Password Field */}
          <TextField
            label="Contraseña"
            placeholder="Crea una contraseña"
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              if (passwordError) validateField("password", text);
              if (confirmPassword)
                validateField("confirmPassword", confirmPassword);
            }}
            onBlur={() => validateField("password", password)}
            error={passwordError}
            secureTextEntry
            autoCapitalize="none"
            variant="transparent"
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
            secureTextEntry
            autoCapitalize="none"
            variant="transparent"
          />

          {/* Sign Up Button */}
          <Box marginTop="m" marginBottom="m">
            <Button
              variant="primary"
              size="large"
              fullWidth
              onPress={handleSignUp}
              loading={loading}
              disabled={
                loading || !name || !email || !password || !confirmPassword
              }
            >
              Crear Cuenta
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
              o regístrate con
            </Text>
            <Box
              flex={1}
              height={1}
              style={{ backgroundColor: "rgba(102, 123, 171, 0.5)" }}
            />
          </Box>*/}

          {/* Social Auth Buttons 
          <Box gap="m" marginBottom="m">
            <SocialAuthButton provider="google" onPress={handleGoogleSignUp} />
            <SocialAuthButton provider="apple" onPress={handleAppleSignUp} />
          </Box>

          <Box flex={1} />*/}

          {/* Sign In Link */}
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
              ¿Ya tienes cuenta?{" "}
            </Text>
            <Text
              variant="body"
              color="primary"
              style={{
                fontSize: 14,
                fontFamily: "PlusJakartaSans-Bold",
              }}
              onPress={() => router.push("/(auth)/sign-in")}
            >
              Iniciar Sesión
            </Text>
          </Box>
        </Box>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
