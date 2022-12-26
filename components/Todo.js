import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Checkbox from "./Checkbox";
import moment from "moment";
import { MaterialIcons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { deleteTodoReducer } from "../features/todosSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function Todo({ id, text, isCompleted, isToday, hour }) {
  const [thisToday, setThisToday] = hour
    ? useState(moment(new Date(hour)).isSame(moment(), "day"))
    : useState("false");
  const [localHour, setLocalHour] = useState(new Date(hour));
  const todos = useSelector((state) => state.todos.todos);
  const dispatch = useDispatch();
  const handleDeleteTodo = async () => {
    dispatch(deleteTodoReducer(id));
    try {
      await AsyncStorage.setItem(
        "@Todos",
        JSON.stringify(todos.filter((todos) => todos.id !== id))
      );
      console.log("delete todo");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.containerText}>
        <Checkbox
          id={id}
          text={text}
          isCompleted={isCompleted}
          isToday={thisToday}
          hour={hour}
        />
        <View>
          <Text
            style={
              isCompleted
                ? [
                    styles.text,
                    { textDecorationLine: "line-through", color: "#73737330" },
                  ]
                : styles.text
            }
          >
            {text}
          </Text>
          <Text
            style={
              isCompleted
                ? [
                    styles.time,
                    { textDecorationLine: "line-through", color: "#73737330" },
                  ]
                : styles.time
            }
          >
            {moment(localHour).format("LT")}
          </Text>
        </View>
      </View>
      <TouchableOpacity onPress={handleDeleteTodo}>
        <MaterialIcons name="delete-outline" size={24} color="#73737330" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  containerText: {
    flexDirection: "row",
    alignItems: "center",
    width: "75%",
  },
  text: {
    fontSize: 15,
    fontWeight: "500",
    color: "#737373",
  },
  time: {
    fontSize: 13,
    color: "#a3a3a3",
    fontWeight: "500",
  },
});
