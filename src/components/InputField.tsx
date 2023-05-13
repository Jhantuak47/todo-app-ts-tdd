import React, { useRef } from "react";
import "./style.css";

interface Props {
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  addTodos: (e: React.FormEvent<EventTarget>) => void;
}
const InputField: React.FC<Props> = ({ todo, setTodo, addTodos }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <form className="input">
      <input
        ref={inputRef}
        className="input__box"
        type="text"
        name="task"
        id="task"
        placeholder="Enter a task."
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
      <button
        className="input_submit"
        type="submit"
        onClick={(e) => {
          addTodos(e);
          inputRef.current?.blur();
        }}
      >
        Go
      </button>
    </form>
  );
};

export default InputField;
