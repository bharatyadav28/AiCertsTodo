import React from "react";
import { useContext } from "react";
import { BsCardList as ListIcon } from "react-icons/bs";

import Tasks from "./components/Tasks";
import AddNewTask from "./components/AddNewTask";
import { TasksContext } from "./store/TaskContext";

function App() {
  const { tasks } = useContext(TasksContext);

  return (
    <div className="flex justify-center items-center h-full my-20">
      <div className="flex flex-col w-[40rem] bg-white p-10 rounded-lg">
        <div className="font-bold text-2xl mb-5 flex align-middle">
          <h1 className="mr-2 ml-2">To-do List </h1>
          <ListIcon className="mt-1 text-orange-300" />
        </div>
        <div className="self-end">
          <AddNewTask />
        </div>
        <Tasks tasks={tasks} />
      </div>
    </div>
  );
}

export default App;
