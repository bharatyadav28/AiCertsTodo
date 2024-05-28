import { useEffect } from "react";
import { taskType } from "../utils/interfaces";
import { useContext } from "react";
import { toast } from "react-toastify";
import {
  BsFillCheckCircleFill as FilledCheckIcon,
  BsCheckCircle as EmptyCheckIcon,
} from "react-icons/bs";

import { RiDeleteBinLine as BinIcon } from "react-icons/ri";
import useHttp from "../hooks/use-http";
import UpdateTask from "./UpdateTask";
import { TasksContext } from "../store/TaskContext";

interface propsTypes {
  task: taskType;
}

const TaskItem: React.FC<propsTypes> = ({ task }) => {
  const { isLoading: isDeleting, error, dbConnect, setError } = useHttp();
  const { fetchTasks } = useContext(TasksContext);

  const handleTaskDelete = (id: string) => {
    const postRequest = (data: any) => {
      fetchTasks();
    };

    dbConnect(
      {
        url: `http://localhost:4000/api/v1/tasks/${id}`,
        method: "DELETE",
      },
      postRequest
    );
  };
  useEffect(() => {
    if (error) {
      toast.error(<strong>{error}</strong>);

      setError("");
    }
  }, [error]);

  const isCompleted = task.status === "complete";
  return (
    <div className="grid grid-cols-12 bg-[#EEE2DF] border px-5 py-5 my-2 rounded-2xl">
      <div className="col-start-1 col-span-1 mt-1">
        {isCompleted ? (
          <FilledCheckIcon size={20} className="text-orange-500 " />
        ) : (
          <EmptyCheckIcon size={20} />
        )}
      </div>

      <div className="col-start-2  col-span-9">
        <div className="text-lg font-semibold">{task.title}</div>
        <div className="mt-2 text-md text-sm text-slate-700 pr-2">
          {task.description}
        </div>
        <div className="mt-1 font-open-sans text-sm text-slate-900">
          By {task.dueDate}
        </div>
      </div>

      <div className="col-start-11 col-span-2 flex justify-center items-center gap-4">
        <UpdateTask task={task} />

        <button
          disabled={isDeleting}
          onClick={handleTaskDelete.bind(null, task.id)}
        >
          <BinIcon size={20} />
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
