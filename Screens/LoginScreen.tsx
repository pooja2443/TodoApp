import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from "react-native";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Toast from 'react-native-toast-message';
import { ToastConfigParams } from 'react-native-toast-message';
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useDispatch } from 'react-redux';
import EmailInput from "@/components/EmailInput/EmailInput";
import useTheme from "@/hooks/useTheme";
import { setDarkMode } from "@/Redux/Slice/uiSlice";
import { RootStackParamList } from "@/Types/types";

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
}

const LoginScreen = ({ navigation }: Props) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [checked, setChecked] = useState<boolean>(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  
  const dispatch = useDispatch();
  const { isDarkMode, theme, toggleTheme } = useTheme();

  const toastConfig = {
    customToast: ({ text1 }: ToastConfigParams<any>) => (
      <View style={{
        padding: 16,
        backgroundColor: theme.toastBackground,
        borderRadius: 8,
        marginBottom: 40,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      }}>
        <Text style={{
          color: theme.toastText,
          fontSize: 14,
          textAlign: 'center',
        }}>{text1}</Text>
      </View>
    )
  } as const;

  const emailValidation = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  const passValidation = (password: string): boolean => (password.length >= 6);

  const showToast = (message: string) => {
    Toast.show({
      type: 'customToast',
      text1: message,
      position: "bottom",
      visibilityTime: 2000,
    });
  }

  const handleSignIn = () => {
    if (!email && !password) {
      showToast('Please fill all fields');
    }
    else if(!passValidation(password) && !emailValidation(email)){
      showToast("Please enter correct email and password");
    }
    else if (!email) {
      showToast("Please enter email");
    }
    else if (!emailValidation(email)) {
      showToast("Invalid Email");
    }
    else if (!password) {
      showToast("Please enter password");
    }
    else if (!passValidation(password)) {
      showToast("Invalid Password");
    }
    else {
      showToast("Sign in successful");
      
      // Update dark mode in Redux store
      dispatch(setDarkMode(isDarkMode));

      setEmail('');
      setPassword('');

      // Navigate to the TaskList screen (About)
      navigation.navigate("About", {
        userEmail: email,
        isDarkMode: isDarkMode
      });
    }
  }

  const toggleDarkMode = () => {
    dispatch(setDarkMode(!isDarkMode));
  }

  return (
    <>
      <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
        <View style={styles.headerContainer}>
          <Text style={[styles.title, { color: theme.textColor }]}>Welcome To SaleSwift</Text>
          <TouchableOpacity
            style={styles.themeToggle}
            onPress={toggleDarkMode}>
            <FontAwesome name={isDarkMode ? "sun-o" : "moon-o"} size={24} color={theme.textColor} />
          </TouchableOpacity>
        </View>
        <View style={styles.subTitle}>
          <Text style={{ color: theme.secondaryText }}>Create an account and discover</Text>
          <Text style={{ color: theme.secondaryText }}>products anywhere you go</Text>
        </View>

        {/* Email Input component */}
        <EmailInput
          email={email}
          setEmail={setEmail}
          theme={theme}
        />

        <View style={styles.inputContainer}>
          <Text style={[styles.label, { color: theme.textColor }]}>Password</Text>
          <View style={[styles.passwordContainer, { borderColor: theme.borderColor, backgroundColor: theme.inputBackground }]}>
            <TextInput
              style={[styles.passwordInput, { borderColor: theme.borderColor, backgroundColor: theme.inputBackground, color: theme.textColor }]}
              value={password}
              placeholder="Password"
              placeholderTextColor={theme.secondaryText}
              onChangeText={setPassword}
              secureTextEntry={!isPasswordVisible}
            />
            <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
              <FontAwesome name={isPasswordVisible ? "eye" : "eye-slash"} size={18} color={theme.textColor}></FontAwesome>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.rememberContainer}>
          <TouchableOpacity
            style={styles.checkBoxContainer}
            onPress={() => setChecked(!checked)}
          >
            <View style={[styles.checkBox, { borderColor: theme.borderColor, backgroundColor: theme.inputBackground }, checked && styles.checked]}>
              {checked && <Text><FontAwesome name="check" size={18} color="#fff"></FontAwesome></Text>}
            </View>
            <Text style={{ color: theme.textColor }}>Remember me</Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Text style={[styles.forgot, { color: theme.linkColor }]}>Forgot Password</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: theme.buttonBackground }]}
          onPress={handleSignIn}>
          <Text style={[styles.buttonText, { color: theme.buttonText }]}>Sign in</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={[styles.orText, { color: theme.secondaryText }]}>or sign up with</Text>
        </TouchableOpacity>

        <View style={styles.socialContainer}>
          <TouchableOpacity style={[styles.socialButton, { borderColor: theme.borderColor }]}>
            <Image
              source={{ uri: 'https://i.postimg.cc/DyYxPx0j/googl-icon1.jpg' }}
              style={styles.socialIcon}
            />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.socialButton, { borderColor: theme.borderColor }]}>
            <Image
              source={{ uri: 'https://i.postimg.cc/mkMvW70W/facebook.png' }}
              style={styles.socialIcon}
            />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.socialButton, { borderColor: theme.borderColor }]}>
            <Image
              source={{ uri: 'https://i.postimg.cc/VsnZ1q75/apple1.png' }}
              style={styles.socialIcon}
            />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.socialButton, { borderColor: theme.borderColor }]}>
            <Image
              source={{ uri: 'https://i.postimg.cc/KjQR1dnb/logo1.png' }}
              style={styles.socialIcon}
            />
          </TouchableOpacity>
        </View>

        <View>
          <Text style={[styles.termsText, { color: theme.secondaryText }]}>By signing up you can acknowledge and agree to event.com
            <TouchableOpacity><Text style={[styles.link, { color: theme.linkColor }]}> General Terms of use </Text></TouchableOpacity>
            <Text style={{ color: theme.secondaryText }}>and </Text>
            <TouchableOpacity><Text style={[styles.link, { color: theme.linkColor }]}>Privacy Policy</Text></TouchableOpacity>
          </Text>
        </View>
      </View>
      <Toast config={toastConfig} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    marginTop: 0
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    marginTop: 15
  },
  themeToggle: {
    padding: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
    marginTop: 15
  },
  subTitle: {
    fontSize: 16,
    marginBottom: 30,
    color: "#666"
  },
  inputContainer: {
    marginBottom: 20
  },
  label: {
    fontSize: 16,
    marginBottom: 8
  },
  passwordContainer: {
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 12,
    paddingRight: 40
  },
  eyeIcon: {
    position: 'absolute',
    right: 12,
  },
  forgot: {
    color: "#3366ff"
  },
  rememberContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20
  },
  checkBoxContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 2
  },
  checkBox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#ddd",
    marginRight: 8,
    justifyContent: "center",
  },
  checked: {
    backgroundColor: "#000",
  },
  button: {
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  orText: {
    textAlign: "center",
    marginBottom: 20,
  },
  socialContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
    gap: 20,
  },
  socialButton: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden"
  },
  socialIcon: {
    width: 40,
    height: 40,
  },
  termsText: {
    textAlign: "center",
    marginBottom: 20,
  },
  link: {
    textDecorationLine: "underline",
  },
});

export default LoginScreen;