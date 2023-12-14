import React from "react";
import { TodoType } from "../types/types";
import styled from "styled-components";

interface TodosProps {
  todos: TodoType[];
  setTodos: React.Dispatch<React.SetStateAction<TodoType[]>>;
  isDone: boolean;
}

function TodoList({ todos, setTodos, isDone }: TodosProps) {
  const doneCheckHandler = (id: string) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) return { ...todo, isDone: !isDone };
      else return todo;
    });
    setTodos(newTodos);
  };

  const deleteHandler = (id: string) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };

  return (
    <div>
      <Title>{!isDone ? "TodoList" : "DoneList"}</Title>
      <TodoListContainer>
        {todos
          .filter((todo) => todo.isDone === isDone)
          .map((todo) => {
            return (
              <>
                <StyledUl>
                  <li>{todo.title}</li>
                  <li>{todo.content}</li>
                  <div>
                    <button onClick={() => doneCheckHandler(todo.id)}>
                      {!isDone ? "Done🧡" : "Cancle💔"}
                    </button>
                    <button onClick={() => deleteHandler(todo.id)}>
                      Delete❌
                    </button>
                  </div>
                </StyledUl>
              </>
            );
          })}
      </TodoListContainer>
    </div>
  );
}

export default TodoList;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
  margin: 10px;
`;
const TodoListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 10px;
  & li:nth-child(1) {
    font-size: 1.2rem;
    font-weight: 600;
    margin-bottom: 5px;
  }
  & li:nth-child(2) {
    font-size: 1rem;
  }
  & div {
    margin-top: auto;
    margin-left: auto;
  }
  & button {
    margin-left: 10px;
  }
`;

const StyledUl = styled.ul`
  display: flex;
  flex-direction: column;

  width: 300px;
  height: 100px;
  border: 1px solid black;
  padding: 10px;
  margin-left: 10px;
  margin-bottom: 10px;
`;
