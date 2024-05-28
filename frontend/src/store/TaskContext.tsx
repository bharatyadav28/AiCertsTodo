import { createContext } from "react";

import { taskType } from "../utils/interfaces";

interface contextTypes {
  tasks: taskType[] | [];
  fetchTasks: () => void;
  isFetching: boolean;
  error: string;
  setError: (error: string) => void;
}

export const TasksContext = createContext<contextTypes>({
  tasks: [],
  fetchTasks: () => {},
  isFetching: false,
  error: "",
  setError: (error: string) => {},
});
