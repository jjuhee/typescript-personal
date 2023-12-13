import React, { FormEvent, useState } from "react";
import { TodoType } from "../types/types";
import { v4 as uuidv4 } from "uuid";

interface TodosProp {
  todos: TodoType[];
  setTodos: React.Dispatch<React.SetStateAction<TodoType[]>>;
}

function InputForm({ todos, setTodos }: TodosProp) {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const addTodoHandler = (event: FormEvent) => {
    event.preventDefault();
    const newTodo: TodoType = {
      id: uuidv4(),
      title,
      content,
      isDone: false,
    };
    setTodos((prev) => [...todos, newTodo]);
    setTitle("");
    setContent("");
  };

  return (
    <form onSubmit={addTodoHandler}>
      <label>Title : </label>
      <input
        type="text"
        value={title}
        placeholder="제목을 써주세요"
        onChange={(e) => setTitle(e.target.value)}
      />
      <label>Content : </label>
      <input
        type="text"
        value={content}
        placeholder="내용을 써주세요"
        onChange={(e) => setContent(e.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  );
}

export default InputForm;
