import * as React from "react";
import {
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Alert,
} from "react-native";

import { Text, View } from "../../components/Themed";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";
import { FontAwesome } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { postRegisterNT } from "../../api/LoginApis";

export default function SignUpScreen({ navigation }) {
  const [sex, setSex] = React.useState(0);
  const [data, setData] = React.useState({
    username: "",
    password: "",
    confirmPassword: "",
    diachi: "",
    email: "",
    // gioitinh: "",
    ho: "",
    ten: "",
    sdt: "",
    check_textInputChange: false,
    secureTextEntry: true,
    confirm_secureTextEntry: true,
  });

  const handleSubmit = () => {
    // Alert.alert("Submit Info", JSON.stringify(data), [{ text: "ok" }]);
    if (
      !data.username ||
      !data.email ||
      !data.ho ||
      !data.password ||
      !data.sdt ||
      !data.ten ||
      !data.username
    ) {
      Alert.alert("Submit Info", "Invalid data!", [{ text: "ok" }]);
      return;
    }

    if (
      data.sdt.length !== 10
    ) {
      Alert.alert("Submit Info", "Invalid Phone number! (10 numbers)", [{ text: "ok" }]);
      return;
    }

    const params = {
      diachi: data.diachi,
      email: data.email,
      gioitinh: sex,
      ho: data.ho,
      password: data.password,
      sdt: data.sdt,
      ten: data.ten,
      username: data.username,
    };

    postRegisterNT(params)
      .then((res) => {
        // console.log(res);
        Alert.alert("Submit Info", "Success!", [{ text: "ok" }]);
      })
      .catch((e) => {
        // Alert.alert("Submit Info", e+"", [{ text: "ok" }]);
        // console.log(params);
        Alert.alert("Submit Info", "Cannot Sign up!", [{ text: "ok" }]);
      });
  };

  const textInputChange = (val: any) => {
    if (val.length !== 0) {
      setData({
        ...data,
        username: val,
        check_textInputChange: true,
      });
    } else {
      setData({
        ...data,
        username: val,
        check_textInputChange: false,
      });
    }
  };

  const handlePasswordChange = (val: any) => {
    setData({
      ...data,
      password: val,
    });
  };

  const handleConfirmPasswordChange = (val: any) => {
    setData({
      ...data,
      confirmPassword: val,
    });
  };

  const handleAddressChange = (val: any) => {
    setData({
      ...data,
      diachi: val,
    });
  };

  const handleEmailChange = (val: any) => {
    setData({
      ...data,
      email: val,
    });
  };

  // const handleSexChange = (val: any) => {
  //   setData({
  //     ...data,
  //     gioitinh: val,
  //   });
  // };

  const handleHoChange = (val: any) => {
    setData({
      ...data,
      ho: val,
    });
  };

  const handleTenChange = (val: any) => {
    setData({
      ...data,
      ten: val,
    });
  };

  const handleSDTChange = (val: any) => {
    setData({
      ...data,
      sdt: val,
    });
  };

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  const updateConfirmSecureTextEntry = () => {
    setData({
      ...data,
      confirm_secureTextEntry: !data.confirm_secureTextEntry,
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#009387" barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.text_header}>Register Account!</Text>
      </View>
      <Animatable.View animation="fadeInUpBig" style={styles.footer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.text_footer}>Username</Text>
          <View style={styles.action}>
            <FontAwesome name="user-o" color="#05375a" size={20} />
            <TextInput
              placeholder="Your Username"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => {
                textInputChange(val);
              }}
            />
            {data.check_textInputChange ? (
              <Animatable.View animation="bounceIn">
                <Feather name="check-circle" color="green" size={16} />
              </Animatable.View>
            ) : null}
          </View>

          <Text style={[styles.text_footer, { marginTop: 15 }]}>Password</Text>
          <View style={styles.action}>
            <FontAwesome name="lock" color="#05375a" size={20} />
            <TextInput
              placeholder="Your Password"
              secureTextEntry={data.secureTextEntry ? true : false}
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => handlePasswordChange(val)}
            />
            <TouchableOpacity onPress={updateSecureTextEntry}>
              {data.secureTextEntry ? (
                <Feather name="eye-off" color="grey" size={16} />
              ) : (
                <Feather name="eye" color="green" size={16} />
              )}
            </TouchableOpacity>
          </View>
          {/* <Text style={[styles.text_footer, { marginTop: 15 }]}>
            Confirm Password
          </Text>
          <View style={styles.action}>
            <FontAwesome name="lock" color="#05375a" size={20} />
            <TextInput
              placeholder="Confirm Your Password"
              secureTextEntry={data.secureTextEntry ? true : false}
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => handleConfirmPasswordChange(val)}
            />
            {/* <TouchableOpacity onPress={updateConfirmSecureTextEntry}>
              {data.confirm_secureTextEntry ? (
                <Feather name="eye-off" color="grey" size={16} />
              ) : (
                <Feather name="eye" color="green" size={16} />
              )}
            </TouchableOpacity> */}
          {/* </View>  */}

          <Text style={styles.text_footer}>Last Name</Text>
          <View style={styles.action}>
            <FontAwesome name="user-o" color="#05375a" size={20} />
            <TextInput
              placeholder="Last Name"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => {
                handleHoChange(val);
              }}
            />
          </View>
          <Text style={styles.text_footer}>First Name</Text>
          <View style={styles.action}>
            <FontAwesome name="user-o" color="#05375a" size={20} />
            <TextInput
              placeholder="First Name"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => {
                handleTenChange(val);
              }}
            />
          </View>
          <Text style={styles.text_footer}>Sex</Text>
          <View style={styles.action}>
            <FontAwesome name="user-o" color="#05375a" size={20} />
            {/* <TextInput
              placeholder="Sex"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => {
                handleSexChange(val);
              }}
            /> */}
            <Picker
              style={styles.textInput}
              numberOfLines={5}
              selectedValue={sex}
              onValueChange={(itemValue, itemIndex) => setSex(itemValue)}
            >
              <Picker.Item label="Male" value={0} />
              <Picker.Item label="Female" value={1} />
            </Picker>
          </View>
          <Text style={styles.text_footer}>Email</Text>
          <View style={styles.action}>
            <FontAwesome name="user-o" color="#05375a" size={20} />
            <TextInput
            keyboardType="email-address"
              placeholder="Your email"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => {
                handleEmailChange(val);
              }}
            />
          </View>
          <Text style={styles.text_footer}>Phone</Text>
          <View style={styles.action}>
            <FontAwesome name="user-o" color="#05375a" size={20} />
            <TextInput
              placeholder="Your Phone"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => {
                handleSDTChange(val);
              }}
            />
          </View>
          <Text style={styles.text_footer}>Address</Text>
          <View style={styles.action}>
            <FontAwesome name="user-o" color="#05375a" size={20} />
            <TextInput
              placeholder="Your Address"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => {
                handleAddressChange(val);
              }}
            />
          </View>

          <View style={styles.button}>
            <TouchableOpacity onPress={handleSubmit} style={{ width: "100%" }}>
              <LinearGradient
                colors={["#08d4c4", "#01ab9d"]}
                style={styles.signIn}
              >
                <Text style={[styles.textSign, { color: "#fff" }]}>
                  Sign Up
                </Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={[
                styles.signIn,
                {
                  borderColor: "#009387",
                  borderWidth: 1,
                  marginTop: 15,
                },
              ]}
            >
              <Text
                style={[
                  styles.textSign,
                  {
                    color: "#009387",
                  },
                ]}
              >
                Sign In
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Animatable.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#009387",
  },
  header: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 50,
    backgroundColor: "#009387",
  },
  footer: {
    flex: 3,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_header: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 30,
  },
  text_footer: {
    color: "#05375a",
    fontSize: 18,
    marginTop: 20,
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#FF0000",
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : 0,
    paddingLeft: 10,
    color: "#05375a",
  },
  errorMsg: {
    color: "#FF0000",
    fontSize: 14,
  },
  button: {
    alignItems: "center",
    marginTop: 50,
  },
  signIn: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
