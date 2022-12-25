import { Image, StyleSheet, View, Text, TouchableOpacity } from "react-native";
import TodoList from "../components/TodoList";
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { useSelector,useDispatch } from "react-redux";
import {hideCompletedReducer, setTodosReducer} from "../features/todosSlice"
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function Home() {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const todos = useSelector((state)=>state.todos.todos)
  console.log(todos , "home")
  const getTodos = async () => {
    try {
      const todosStorage = await AsyncStorage.getItem("@Todos")
      console.log(todosStorage, "storage")
      if( todosStorage !== null){
        dispatch(setTodosReducer(JSON.parse(todosStorage)))
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(()=>{
    getTodos()
  },[])
/*   const [localData, setLocalData] = useState(
    todos.sort((a, b) => {
      return a.isCompleted - b.isCompleted;
    })
  ); */
  const [isHidden, setHidden] = useState(false)
  const handleHidePress = () => {
/*     if(isHidden){
      setHidden(false)
      setLocalData(todos.sort((a, b) => {
        return a.isCompleted - b.isCompleted;
      }))
      return
    }else{
      setHidden(true)
      setLocalData(localData.filter((e)=> !e.isCompleted))
    } */
  }
  return (
    <View style={styles.container}>
      <Image
        style={styles.pic}
        source={{
          uri: "https://i.pinimg.com/236x/08/9b/5a/089b5aee55ee68c537466e798b0ae3f1.jpg",
        }}
      />
      <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
        <Text style={styles.title}>Today</Text>
        <TouchableOpacity onPress={handleHidePress}>
          <Text style={{ color: "#3478f6" }}>{isHidden ? "Show Completed": "Hide Completed"}</Text>
        </TouchableOpacity>
      </View>
      <TodoList todoData={todos?.filter((e) => e.isToday)} />
      <Text style={styles.title}>Tomorrow</Text>
      <TodoList todoData={todos?.filter((e) => e.isToday === false)} />
      <TouchableOpacity onPress={()=> navigation.navigate("Add")} style={styles.button}>
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
    width: 42,
    height: 42,
    borderRadius: 21,
    alignSelf: "flex-end",
  },
  title: {
    fontSize: 34,
    fontWeight: "bold",
    marginBottom: 30,
    marginTop: 10,
  },
  button : {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#000",
    position: "absolute",
    bottom: 50,
    right: 20,
    shadowColor:"#000",
    shadowOffset: {
      width:0,
      height: 2,
    },
    shadowOpacity: .5,
    shadowRadius: 5,
    elevation: 5,
  },
  plus: {
    fontSize: 40,
    color: "#fff",
    position: "absolute",
    top: -8,
    left: 10,
  }
});
