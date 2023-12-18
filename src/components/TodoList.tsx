import React, { useEffect } from "react";
import { TodoType } from "../types/types";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../redux/app/hooks";
import { deleteTodo, setTodos, toggleDone } from "../redux/modules/todos";
import axios from "axios";

export const SERVER_URL = "http://localhost:3001/todos"; //어디다가 선언하는게 좋을까

interface TodosProps {
  isDone: boolean;
}

function TodoList({ isDone }: TodosProps) {
  const todos = useAppSelector((state) => state.todos);
  const dispatch = useAppDispatch();

  const fetchTodos = async () => {
    // TODO: try-catch
    const { data } = await axios.get(SERVER_URL);
    dispatch(setTodos(data));
  };

  const doneCheckHandler = async (id: string) => {
    await axios.patch(`${SERVER_URL}/${id}`, { isDone: !isDone });
    dispatch(toggleDone(id));
  };

  const deleteHandler = async (id: string) => {
    await axios.delete(`${SERVER_URL}/${id}`);
    dispatch(deleteTodo(id));
  };

  useEffect(() => {
    fetchTodos();
  }, []);

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
