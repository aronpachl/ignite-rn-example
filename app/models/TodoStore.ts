import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { Todo, TodoModel, TodoSnapshotIn } from "app/models/Todo"

export const TodoStoreModel = types
  .model("TodoStore")
  .props({
    todos: types.array(TodoModel),
  })
  .actions((self) => ({
    add(todo: TodoSnapshotIn) {
      self.todos.push(todo)
    },
    remove(todo: Todo) {
      self.todos.remove(todo)
    },
  }))

export interface TodoStore extends Instance<typeof TodoStoreModel> {}
export interface TodoStoreSnapshotIn extends SnapshotIn<typeof TodoStoreModel> {}
export interface TodoStoreSnapshotOut extends SnapshotOut<typeof TodoStoreModel> {}
