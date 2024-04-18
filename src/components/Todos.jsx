import { useDispatch, useSelector } from "react-redux";
import { addTodo, fetchTodos, removeTodo } from "../redux/todoSlice";
import { useEffect, useState } from "react";

export default function Todos() {
  const dispatch = useDispatch();
  const [todo, setTodo] = useState("");

  useEffect(() => {
    dispatch(fetchTodos());
  }, []);

  const todosState = useSelector((state) => {
    return state.todoReducer;
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
          {todosState && todosState.isLoading == false ? (
            todosState.todos.map((todoDetails) => {
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
            })
          ) : (
            <p>Loading...........</p>
          )}
        </ul>
      </div>
    </div>
  );
}
