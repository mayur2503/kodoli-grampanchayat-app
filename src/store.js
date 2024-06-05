import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./features/todo/todoSlice";
import userReducer from "./features/todo/userSlice";

export default configureStore({
  reducer: {
    todos: todoReducer,
    user: userReducer,
  },
});
