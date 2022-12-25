import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { updateTodoReducer } from "../features/todosSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Checkbox({ id, text, isCompleted, isToday, hour }) {
  const dispatch = useDispatch();
  const listTodos = useSelector((state) => state.todos.todos);
  const handleCheckbox = () => {
    try {
      dispatch(updateTodoReducer({ id, isCompleted }));
      AsyncStorage.setItem('@Todos', JSON.stringify(
        listTodos.map(todo => {
          if(todo.id === id) {
            return {...todo, isCompleted: !todo.isCompleted};
          }
          return todo;
        }
      )));
      console.log("todo saved correctrly");
    } catch (error) {
      console.log(error);
    }
  };
  return isToday ? (
    <TouchableOpacity
      onPress={handleCheckbox}
      style={isCompleted ? styles.checked : styles.unChecked}
    >
      {isCompleted && <Entypo name="check" size={16} color="#fafafa" />}
    </TouchableOpacity>
  ) : (
    <View style={styles.isToday} />
  );
}

const styles = StyleSheet.create({
  checked: {
    width: 20,
    height: 20,
    marginRight: 13,
    borderRadius: 6,
    backgroundColor: "#262626",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  unChecked: {
    width: 20,
    height: 20,
    marginRight: 13,
    borderWidth: 2,
    borderRadius: 6,
    backgroundColor: "#fff",
    borderColor: "#e8e8e8",
    marginLeft: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 9,
  },
  isToday: {
    width: 10,
    height: 10,
    marginHorizontal: 10,
    borderRadius: 10,
    backgroundColor: "#262626",
    marginRight: 13,
    marginLeft: 15,
  },
});
