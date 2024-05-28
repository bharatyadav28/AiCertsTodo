import React, { ReactNode, useEffect, useState } from "react";
import { TasksContext } from "./TaskContext";
import { toast } from "react-toastify";

import useHttp from "../hooks/use-http";
import { taskType } from "../utils/interfaces";

interface propsTypes {
  children: ReactNode;
}

export default function TaskContextProvider({ children }: propsTypes) {
  const { isLoading: isFetching, error, dbConnect, setError } = useHttp();
  const [tasks, setTasks] = useState<taskType[] | []>([]);

  const fetchTasks = async () => {
    const postRequest = (data: any) => {
      setTasks(data.tasks);
    };

    await dbConnect(
      {
        url: "http://localhost:4000/api/v1/tasks",
      },
      postRequest
    );
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    if (error) {
      toast.error(<strong>{error}</strong>);

      setError("");
    }
  }, [error]);

  return (
    <TasksContext.Provider
      value={{ tasks, fetchTasks, isFetching, error, setError }}
    >
      {children}
    </TasksContext.Provider>
  );
}
