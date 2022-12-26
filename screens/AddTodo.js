import React, { useState } from "react";
import "react-native-get-random-values";
import moment from "moment";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Switch,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { addTodoReducer } from "../features/todosSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";
import * as Notifications from "expo-notifications";
import { compose } from "redux";

export default function AddTodo() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [date, setDate] = useState(new Date());
  const [isToday, setIsToday] = useState(false);
  const [withAlert, setWithAlert] = useState(false);
  const listTodos = useSelector((state) => state.todos.todos);
  console.log(listTodos);
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDate(currentDate);
  };
  const addTodo = async () => {
    const newTodo = {
      id: Math.floor(Math.random() * 10000000),
      text: name,
      hour: isToday ? date.toISOString() : moment(date).add(1, "day"),
      isToday: isToday,
      isCompleted: false,
    };
    const parse = [...listTodos, newTodo];
    try {
      dispatch(addTodoReducer(newTodo));
      await AsyncStorage.setItem("@Todos", JSON.stringify(parse));
      console.log("succesfully");
      if (withAlert) {
        await scheduleTodoNotifications(newTodo);
      }
      navigation.goBack();
    } catch (error) {
      console.log(error, "error create");
    }
  };

  const showMode = (currentMode) => {
    DateTimePickerAndroid.open({
      value: date,
      onChange,
      mode: currentMode,
      is24Hour: false,
    });
  };
  const showTimepicker = () => {
    showMode("time");
  };
  const scheduleTodoNotifications = async (todo) => {
    const trigger = new Date(todo.hour);
    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "It's time!",
          body: todo.text,
        },
        trigger,
      });
      console.log("created")
    } catch (error) {
      alert("The notificacion failed to schedule, make sure the hour is valid");
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add task</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.inputTitle}>Name</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Task"
          placeholderTextColor="#00000030"
          onChangeText={(text) => setName(text)}
        ></TextInput>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputTitle}>Hour</Text>
        <TouchableOpacity
          style={{ flexDirection: "row" }}
          onPress={showTimepicker}
        >
          <Text style={styles.textTime}>{moment(date).format("LT")}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.switchContainer}>
        <Text style={styles.inputTitle}>Today</Text>
        <Switch value={isToday} onValueChange={(value) => setIsToday(value)} />
      </View>
      <Text style={{ color: "gray" }}>
        If you disable "Today", the task will be considered as "Tomorrow"
      </Text>
      <View style={[styles.switchContainer, { alignItems: "center" }]}>
        <View>
          <Text style={styles.inputTitle}>Alert</Text>
        </View>
        <Switch
          value={withAlert}
          onValueChange={(value) => setWithAlert(value)}
        />
      </View>
      <Text style={{ color: "gray" }}>
        You will receive an alert at the time you set for this reminder
      </Text>
      <TouchableOpacity style={styles.button} onPress={() => addTodo()}>
        <Text style={{ color: "#fff" }}>Done!</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f8fa",
    paddingHorizontal: 30,
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 30,
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
  },
  title: {
    fontSize: 34,
    fontWeight: "bold",
    marginBottom: 30,
    marginTop: 10,
  },
  inputTitle: {
    fontSize: 20,
    fontWeight: "600",
    lineHeight: 24,
  },
  textInput: {
    borderBottomColor: "00000030",
    borderBottomWidth: 1,
    width: "80%",
  },
  textTime: {
    textAlign: "center",
    borderBottomColor: "00000030",
    borderBottomWidth: 1,
    width: "92%",
  },
  button: {
    marginTop: 38,
    marginBottom: 15,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000000",
    height: 46,
    borderRadius: 11,
  },
});
