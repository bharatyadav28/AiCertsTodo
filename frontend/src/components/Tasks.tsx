import React from "react";

import { taskType } from "../utils/interfaces";
import TaskItem from "./TaskItem";

interface propsTypes {
  tasks: taskType[];
}

const Tasks: React.FC<propsTypes> = ({ tasks }) => {
  const noTasks = tasks?.length === 0;

  return (
    <>
      {noTasks && (
        <div className="flex justify-center my-4 text-bold text-lg">
          No task found !
        </div>
      )}
      {!noTasks && (
        <div className="flex flex-col mt-2">
          {tasks?.map((task) => {
            if (task.status === "incomplete") {
              return <TaskItem key={task.id} task={task} />;
            }
            return null;
          })}

          {tasks?.map((task) => {
            if (task.status === "complete") {
              return <TaskItem key={task.id} task={task} />;
            }
            return null;
          })}
        </div>
      )}
    </>
  );
};

export default Tasks;
