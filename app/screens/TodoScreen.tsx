import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { AppStackParamList, AppStackScreenProps } from "app/navigators"
import { TextStyle, View, ViewStyle } from "react-native"
import { ListItem, ListView, Screen, Text, TextField } from "app/components"
import { colors } from "app/theme"
import { CompositeScreenProps } from "@react-navigation/native"
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs"
import { DemoTabParamList } from "app/navigators/DemoNavigator"
import { useStores } from "app/models"
import { Todo } from "app/models/Todo"

type TodoScreenProps<T extends keyof DemoTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<DemoTabParamList, T>,
  AppStackScreenProps<keyof AppStackParamList>
>

export const TodoScreen: FC<TodoScreenProps<"Todo">> = observer(function TodoScreen(_props) {
  const [todoInput, setTodoInput] = React.useState("")

  const { todoStore } = useStores()

  return (
    <Screen style={$container} preset="fixed" safeAreaEdges={["top"]}>
      <Text preset={"heading"} style={$title}>
        Base Todo
      </Text>
      <TextField
        value={todoInput}
        onChangeText={setTodoInput}
        placeholder={"Add a new todo..."}
        onSubmitEditing={() => {
          todoStore.add({
            id: Math.random().toString(),
            title: todoInput,
            done: false,
          })
          setTodoInput("")
        }}
      />

      <View style={$listContentContainer}>
        <ListView<Todo>
          estimatedItemSize={177}
          data={todoStore.todos.slice()}
          renderItem={({ item, index }) => (
            <ListItem
              onPress={() => {
                item.toggle()
              }}
              onLongPress={() => todoStore.remove(item)}
              topSeparator={index > 0}
              leftIcon={item.done ? "check" : "x"}
              leftIconColor={item.done ? "green" : "red"}
            >
              <Text style={[$listItemText, item.done && $doneText]}>{item.title}</Text>
            </ListItem>
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
    </Screen>
  )
})

const $container: ViewStyle = {
  flex: 1,
  paddingHorizontal: 24,
}

const $listContentContainer: ViewStyle = {
  height: "100%",
}

const $title: TextStyle = {
  marginVertical: 24,
  textAlign: "center",
  color: colors.text,
}

const $doneText: TextStyle = {
  textDecorationLine: "line-through",
}

const $listItemText: TextStyle = {
  color: colors.text,
  fontSize: 16,
}
