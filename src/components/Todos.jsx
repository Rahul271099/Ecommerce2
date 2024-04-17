import { useDispatch, useSelector } from "react-redux";
import { addTodo, removeTodo } from "../redux/todoSlice";
import { useState } from "react";

export default function Todos() {
  const dispatch = useDispatch();
  const [todo, setTodo] = useState("");

  const todos = useSelector((state) => {
    return state.todoReducer.todos;
  });

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div>
        <h1>Todos</h1>
      </div>

      <div>
        <textarea
          type="text"
          value={todo}
          placeholder="Enter task todo"
          onChange={(event) => {
            setTodo(event.target.value);
          }}
        ></textarea>
        <br />
        <button
          onClick={() => {
            dispatch(
              addTodo({
                id: Date.now(),
                todo: todo,
              })
            );
            setTodo("");
          }}
        >
          Add
        </button>

        <ul>
          {todos.map((todoDetails) => {
            return (
              <>
                <li key={todoDetails.id}>{todoDetails.todo}</li>
                <button
                  onClick={() => {
                    dispatch(removeTodo(todoDetails.id));
                  }}
                >
                  Delete
                </button>
              </>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
