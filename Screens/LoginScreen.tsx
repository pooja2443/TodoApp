import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from "react-native";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { ToastConfigParams } from 'react-native-toast-message';
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useDispatch, useSelector } from 'react-redux';
import EmailInput from "@/components/EmailInput";
import PasswordInput from "@/components/commonPassInput";
import CommonButton from "@/components/commonButton";
import useTheme from "@/hooks/useTheme";
import { setDarkMode } from "@/Redux/Slice/uiSlice";
import { RootStackParamList } from "@/Types/types";
import { signInUser } from "@/Redux/Thunks/authThunk";
import { RootState } from "@/Redux/Store/store";
import { Toast, createToastConfig, showToast } from "@/utility/toastUtility";

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
  const { isLoading, error, isAuthenticated } = useSelector((state:RootState) => state.auth);

  useEffect(() => {
    if(isAuthenticated){
      showToast("Signin successful");

      setEmail('');

      setPassword('');
      navigation.navigate("About",{
        userEmail: email,
        isDarkMode: isDarkMode
      })
    }
  })

  const toastConfig = createToastConfig(theme)

  const emailValidation = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  const passValidation = (password: string): boolean => (password.length >= 6);


  const handleSignIn = async () => {
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
      dispatch(signInUser({ email, password }) as any);
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

        <PasswordInput
          password={password}
          setPassword={setPassword}
          theme={theme}
        />

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

        <CommonButton
            onPress={handleSignIn}
            title="Sign In"
            theme={theme}
            style={styles.button}
            loading={isLoading}
          />

          <View style={styles.registerLinkContainer}>
            <View style={styles.line} />
            <Text style={styles.memberText}>or continue with</Text>
            <View style={styles.line} />
          </View>

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

        <View style={styles.registerLinkContainer}>
            <View>
              <Text style={[styles.memberText, { color: theme.secondaryText }]}>
              Not registered? 
              </Text>
             </View>
            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text 
              style={[styles.registerNowText, { color: theme.linkColor }]}
            > Register now</Text>
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
    marginBottom: 10,
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
  registerLinkContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  registerText: {
    fontSize: 16,
  },
  registerNowText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: -10
  },
  memberText: {
    padding: 10
  },
  line: {
    width: 50,
    height: 1,
    backgroundColor: '#aaa',
  },
});

export default LoginScreen;