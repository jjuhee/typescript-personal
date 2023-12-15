import React, { FormEvent, useState } from "react";
import { TodoType } from "../types/types";
import { v4 as uuidv4 } from "uuid";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../redux/app/hooks";
import { addTodo, selectTodo } from "../redux/modules/todos";
import axios from "axios";
import { SERVER_URL } from "./TodoList";

function InputForm() {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const dispatch = useAppDispatch();

  const addTodoHandler = async (event: FormEvent) => {
    event.preventDefault();
    if (title === "" || content === "") {
      alert("제목과 내용을 입력하세요");
      return;
    }
    const newTodo: TodoType = {
      id: uuidv4(),
      title,
      content,
      isDone: false,
    };

    // TODO: try-catch
    await axios.post(SERVER_URL, newTodo);
    dispatch(addTodo(newTodo));
    setTitle("");
    setContent("");
  };

  return (
    <StyledForm onSubmit={addTodoHandler}>
      <div>
        <label>Title : </label>
        <input
          type="text"
          value={title}
          placeholder="제목을 써주세요"
          maxLength={14}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <span></span>
      <div>
        <label>Content : </label>
        <input
          type="text"
          value={content}
          placeholder="내용을 써주세요"
          maxLength={30}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <button type="submit">Submit</button>
    </StyledForm>
  );
}

export default InputForm;

const StyledForm = styled.form`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 100px;
  background-color: antiquewhite;
  padding: 10px;
  font-size: 1.2rem;
  font-weight: 600;

  * {
    height: 30px;
  }

  & div {
    margin-right: 10px;
  }
`;
