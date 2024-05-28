import React, { useState, useEffect } from "react";
import { RxUpdate as UpdateIcon } from "react-icons/rx";
import { useContext } from "react";
import { toast } from "react-toastify";

import Modal from "./Modal";
import TaskForm from "./TaskForm";
import { taskType } from "../utils/interfaces";
import useHttp from "../hooks/use-http";
import { TasksContext } from "../store/TaskContext";

interface propsTypes {
  task: taskType;
}

const UpdateTask: React.FC<propsTypes> = ({ task }) => {
  const [showModal, setShowModal] = useState(false);
  const { isLoading: isSubmitting, error, dbConnect, setError } = useHttp();
  const { fetchTasks } = useContext(TasksContext);

  const handleUpdateTask = async (updatedTask: taskType) => {
    const postRequest = (data: any) => {
      handleCloseModal();
      fetchTasks();
    };

    if (updatedTask) {
      await dbConnect(
        {
          method: "PUT",
          url: `http://localhost:4000/api/v1/tasks/${updatedTask.id}`,
          headers: {
            "Content-Type": "application/json",
          },
          body: updatedTask,
        },
        postRequest
      );
    }
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    if (error) {
      toast.error(<strong>{error}</strong>);

      setError("");
    }
  }, [error]);

  return (
    <>
      {showModal && (
        <Modal onClose={handleCloseModal}>
          <TaskForm
            onSubmit={handleUpdateTask}
            isSubmitting={isSubmitting}
            taskData={task}
          />
        </Modal>
      )}
      <button onClick={handleOpenModal}>
        <UpdateIcon size={20} className="font-extrabold" />
      </button>
    </>
  );
};
export default UpdateTask;
