import React, { useState } from "react";
import "./App.css";
import InputField from "./components/InputField";
import { Todos } from "./common/Types";
import { BsTrash3 } from "react-icons/bs";
import { MdDone } from "react-icons/md";

const App: React.FC = (): JSX.Element => {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todos[]>([]);

  const addTodos: (e: React.FormEvent<EventTarget>) => void = (e) => {
    e.preventDefault();

    if (todo) {
      setTodos([
        ...todos,
        {
          name: todo,
          id: Math.random(),
          isDone: false,
        },
      ]);
    }
  };

  const updateTodo: (action: string, todoId: number) => void = (
    action,
    todoId
  ) => {
    if (action === "delete") {
    } else {
      setTodos((todos) => {
        return todos.map((todo) => {
          if (todo.id == todoId) todo.isDone = true;

          return todo;
        });
      });
    }
  };
  console.log(todos);
  return (
    <div className="App">
      <span className="heading">Taskify</span>
      <InputField todo={todo} setTodo={setTodo} addTodos={addTodos} />
      <hr />
      <ul className="todo__lists">
        {todos.map((todo) => (
          <li className="todo_list" key={todo.id}>
            <p className={todo.isDone == true ? "is__done" : ""}>{todo.name}</p>
            <div className="icons">
              <BsTrash3
                className="trash"
                onClick={() => updateTodo("delete", todo.id)}
              />
              <MdDone
                className="done"
                onClick={() => updateTodo("done", todo.id)}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
