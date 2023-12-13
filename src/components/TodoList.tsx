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
      <h1>{!isDone ? "TodoList" : "DoneList"}</h1>
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

const StyledUl = styled.ul`
  display: flex;
  flex-direction: column;

  max-width: 300px;
  min-width: 200px;
  border: 1px solid black;
`;
const TodoListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
