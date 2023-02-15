import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  StatusBar,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
function Form() {
  const navigation = useNavigation()
  return (
    <SafeAreaView style={styles.container}>
    <StatusBar barStyle={"light-content"} backgroundColor={"#000"}/>
      <View style={styles.containerTitle}>
        <Text style={styles.title}>Getting better one day at a time.</Text>
      </View>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="insert your email"
          keyboardType="text"
        />
        <TextInput
          style={styles.input}
          placeholder="insert your password"
          keyboardType="password"
        />
        <TouchableOpacity style={styles.button}>
          <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>
            create or login
          </Text>
        </TouchableOpacity>
        <Text style={styles.text}>
          Whether you have an account or not, we will start or create a new
          account automatically.
        </Text>
        <View style={styles.containerButtons}>
          <TouchableOpacity style={styles.googleButton}>
            <Image
              source={require("../assets/google.png")}
              style={{ width: 30, height: 30 }}
            />
            <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>
              Google
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("Home")}
            style={styles.googleButton}
          >
            <Text style={{ color: "white", fontSize: 18, fontWeight: "bold", padding:2 }}>
              Login as guest
            </Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.text}>
          You can also enter the app using your google account or simply
          entering as a guest
        </Text>
      </View>
      <View style={styles.containerTitle2}></View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  containerTitle: {
    paddingHorizontal: 20,
    backgroundColor: "#000",
    borderBottomLeftRadius: 50,
    shadowColor: "#000",
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 50,
  },
  containerTitle2: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "#000",
    borderTopEndRadius: 50,
    shadowColor: "#000",
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 50,
    paddingVertical: 15,
  },
  containerButtons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    width: "90%",
  },
  title: {
    fontSize: 55,
    fontWeight: "900",
    textAlign: "right",
    color: "white",
  },
  title2: {
    fontSize: 20,
    fontWeight: "500",
    color: "white",
    opacity: 0.5,
    fontStyle: "italic",
  },
  form: {
    padding: 20,
    display: "flex",
    alignItems: "center",
  },
  input: {
    borderColor: "#000",
    textAlign: "center",
    height: 40,
    width: "80%",
    margin: 12,
    borderWidth: 1,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 50,
  },
  text: {
    color: "gray",
    textAlign: "center",
    width: "95%",
    marginVertical: 20,
  },
  googleButton: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "45%",
    height: 40,
    backgroundColor: "#000",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
    borderRadius: 10,
  },
  button: {
    display: "flex",
    marginTop:10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "45%",
    height: 40,
    backgroundColor: "#000",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
    borderRadius: 10,
  },
});

export default Form;
