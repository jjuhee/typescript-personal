import React, { useState } from "react";
import InputForm from "./components/InputForm";
import TodoList from "./components/TodoList";
import { v4 as uuidv4 } from "uuid";
import type { TodoType } from "./types/types";
import styled from "styled-components";

function App() {
  const [todos, setTodos] = useState<TodoType[]>([]);

  return (
    <MainContainer>
      <InputForm />
      <TodoList todos={todos} setTodos={setTodos} isDone={false} />
      <TodoList todos={todos} setTodos={setTodos} isDone={true} />
    </MainContainer>
  );
}

export default App;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 1200px;
  min-width: 800px;
  margin: 30px auto;
  background-color: #ffc0cb74;
`;
