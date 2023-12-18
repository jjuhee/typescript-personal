import React from "react";
import styled from "styled-components";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { deleteTodo, getTodos, switchTodo } from "../api/todos";

interface TodosProps {
  isDone: boolean;
}

function TodoList({ isDone }: TodosProps) {
  const { isLoading, isError, data: todos } = useQuery("todos", getTodos);

  const queryClient = useQueryClient();

  const switchMutation = useMutation(switchTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
    },
    onError: (error) => {
      console.log(error);
      alert("서버에러 발생!💢");
    },
  });
  const deleteMutation = useMutation(deleteTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
    },
    onError: (error) => {
      console.log(error);
      alert("서버에러 발생!💢");
    },
  });

  const doneCheckHandler = async (id: string, isDone: boolean) => {
    const payload = {
      id,
      isDone: !isDone,
    };
    switchMutation.mutate(payload);
  };

  const deleteHandler = async (id: string) => {
    deleteMutation.mutate(id);
  };

  return (
    <div>
      <Title>{!isDone ? "TodoList" : "DoneList"}</Title>
      <TodoListContainer>
        {isLoading && <p>Loading...</p>}
        {isError && <p> data를 가져오지 못했습니다...(-.-)(_ _)</p>}
        {todos
          ?.filter((todo) => todo.isDone === isDone)
          ?.map((todo) => {
            return (
              <>
                <StyledUl key={todo.id}>
                  <li>{todo.title}</li>
                  <li>{todo.content}</li>
                  <div>
                    <button
                      onClick={() => doneCheckHandler(todo.id, todo.isDone)}
                    >
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
