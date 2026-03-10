import Box from "@/components/Box";
import Text from "@/components/Text";
import Button from "@/components/ui/Button/Button";
import TextField from "@/components/ui/TextField/TextField";
import theme from "@/theme";
import { signUpSchema } from "@/utils/validationSchemas";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Goal } from "lucide-react-native";
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
      await signUpSchema.validate(
        { name, email, password, confirmPassword },
        { abortEarly: false },
      );
      setNameError("");
      setEmailError("");
      setPasswordError("");
      setConfirmPasswordError("");
      setLoading(true);
      // TODO: Implement Cognito sign-up logic here
      console.log("Sign up with:", { name, email, password });
      setTimeout(() => {
        setLoading(false);
        // Navigate to verification screen or main app
      }, 1500);
    } catch (error) {
      if (error instanceof ValidationError) {
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
              Crea tu cuenta
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
              Unete a la comunidad de ahorradores.
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

          <Box flex={1} />

          {/* Sign In Link */}
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
              ¿Ya tienes cuenta?{" "}
            </Text>
            <Text
              variant="body"
              color="primary"
              style={{ fontSize: 14, fontFamily: "PlusJakartaSans-Bold" }}
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
