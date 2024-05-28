import React, { useState } from "react";
import { useContext } from "react";

import Modal from "./Modal";
import TaskForm from "./TaskForm";
import { newTaskType } from "../utils/interfaces";
import useHttp from "../hooks/use-http";
import { TasksContext } from "../store/TaskContext";

const AddNewTask = () => {
  const [showModal, setShowModal] = useState(false);
  const { isLoading: isSubmitting, error, dbConnect, setError } = useHttp();

  const { fetchTasks } = useContext(TasksContext);

  const handleNewTask = async (newTask: newTaskType) => {
    const postRequest = (data: any) => {
      handleCloseModal();
      fetchTasks();
    };

    if (newTask) {
      await dbConnect(
        {
          method: "POST",
          url: "http://localhost:4000/api/v1/tasks",
          headers: {
            "Content-Type": "application/json",
          },
          body: newTask,
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

  const handleAddTodo = () => {
    handleOpenModal();
  };

  return (
    <>
      {showModal && (
        <Modal onClose={handleCloseModal}>
          <TaskForm onSubmit={handleNewTask} isSubmitting={isSubmitting} />
        </Modal>
      )}
      <button
        onClick={handleAddTodo}
        className=" bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded transition cursor-pointer"
      >
        Add new task
      </button>
    </>
  );
};
export default AddNewTask;
