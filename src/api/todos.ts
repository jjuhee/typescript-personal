import axios from "axios";
import { TodoType } from "../types/types";
export const SERVER_URL = "http://localhost:3001/todos"; //인스턴스로!!g

// 모든 todos를 가져오는 api
const getTodos = async (): Promise<TodoType[]> => {
  const response = await axios.get(SERVER_URL);
  return response.data;
};

const addTodo = async (newTodo: TodoType) => {
  await axios.post(SERVER_URL, newTodo);
};

const deleteTodo = async (id: string) => {
  await axios.delete(`${SERVER_URL}/${id}`);
};

const switchTodo = async (payload: { id: string; isDone: boolean }) => {
  await axios.patch(`${SERVER_URL}/${payload.id}`, { isDone: payload.isDone });
};

export { getTodos, addTodo, deleteTodo, switchTodo };
