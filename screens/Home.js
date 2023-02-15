import {
  Image,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Platform,
  StatusBar,
} from "react-native";
import TodoList from "../components/TodoList";
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { hideCompletedReducer, setTodosReducer } from "../features/todosSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
import Constants from "expo-constants";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";

export default function Home() {
  Notifications.setNotificationHandler({
    handleNotification: (async = () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    })),
  });
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const todos = useSelector((state) => state.todos.todos);
  const getTodos = async () => {
    try {
      const todosStorage = await AsyncStorage.getItem("@Todos");
      console.log(todosStorage, "storage");
      if (todosStorage !== null) {
        const todosData = JSON.parse(todosStorage);
        const todoDataFiltered = await todosData.filter((todo) => {
          return moment(todo.hour).isSameOrAfter(moment(), "day");
        });
        console.log(todoDataFiltered, "filtro");
        if (todoDataFiltered !== null) {
          await AsyncStorage.setItem(
            "@todos",
            JSON.stringify(todoDataFiltered)
          );
          dispatch(setTodosReducer(todoDataFiltered));
          console.log("we delete some passed todos");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  const [isHidden, setHidden] = useState(false);
  const [token, setToken] = useState("");
  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => setToken(token));
    getTodos();
  }, []);
  const handleHidePress = async () => {
    if (isHidden) {
      setHidden(false);
      const todos = await AsyncStorage.getItem("@Todos");
      if (todos !== null) {
        dispatch(setTodosReducer(JSON.parse(todos)));
      }
      return;
    } else {
      setHidden(true);
      dispatch(hideCompletedReducer());
    }
  };
  const registerForPushNotificationsAsync = async () => {
    let token;
    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification");
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
    } else {
      return;
    }
    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250],
        lightColor: "#ff231f7c",
      });
    }
    return token;
  };
  const todayTodos = todos.filter((todos) =>
    moment(todos.hour).isSame(moment(), "day")
  );
  const tomorrowTodos = todos.filter((todos) =>
    moment(todos.hour).isAfter(moment(), "day")
  );
  return (
    <View style={styles.container}>
      <StatusBar barStyle={"dark-content"} backgroundColor={"#fff"} />
      {todos.length === 0 ? (
        <Text>No tienes ningun todo</Text>
      ) : (
        <View>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Image
              style={styles.pic}
              source={{
                uri: "https://i.pinimg.com/236x/08/9b/5a/089b5aee55ee68c537466e798b0ae3f1.jpg",
              }}
            />
          </TouchableOpacity>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text style={styles.title}>Today</Text>
            <TouchableOpacity onPress={handleHidePress}>
              <Text style={{ color: "#3478f6" }}>
                {isHidden ? "Show Completed" : "Hide Completed"}
              </Text>
            </TouchableOpacity>
          </View>
          <TodoList todoData={todayTodos} />
          <Text style={styles.title}>Tomorrow</Text>
          <TodoList todoData={tomorrowTodos} />
        </View>
      )}
      <TouchableOpacity
        onPress={() => navigation.navigate("Add")}
        style={styles.button}
      >
        <Text style={styles.plus}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 15,
  },
  pic: {
    width: 50,
    height: 50,
    borderRadius: 21,
    alignSelf: "flex-end",
  },
  title: {
    fontSize: 34,
    fontWeight: "bold",
    marginBottom: 30,
    marginTop: 10,
  },
  button: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#000",
    position: "absolute",
    bottom: 50,
    right: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
  },
  plus: {
    fontSize: 40,
    color: "#fff",
    position: "absolute",
    top: -8,
    left: 10,
  },
});
