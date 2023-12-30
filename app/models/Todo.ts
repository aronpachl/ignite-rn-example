import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"

export const TodoModel = types
  .model("Todo")
  .props({
    id: types.identifier,
    title: types.string,
    done: types.boolean,
  })
  .actions((self) => ({
    toggle() {
      self.done = !self.done
    },
  }))

export interface Todo extends Instance<typeof TodoModel> {}
export interface TodoSnapshotOut extends SnapshotOut<typeof TodoModel> {}
export interface TodoSnapshotIn extends SnapshotIn<typeof TodoModel> {}
