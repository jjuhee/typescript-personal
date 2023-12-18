import React from "react";
import InputForm from "./components/InputForm";
import TodoList from "./components/TodoList";
import styled from "styled-components";

function App() {
  return (
    <MainContainer>
      <InputForm />
      <TodoList isDone={false} />
      <TodoList isDone={true} />
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
