import React from "react";
import { FlatList} from "react-native";
import Todo from "./Todo";

export default function TodoList ({todoData}) {
  return (
    <FlatList
      data={todoData}
      keyExtractor={(item)=> item.id.toString()}
      renderItem={({item})=> <Todo {...item}/>}
    />
  )
}