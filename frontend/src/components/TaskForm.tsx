import { useEffect, useState } from "react";

import useInput from "../hooks/use-input";
import { taskType } from "../utils/interfaces";
import { isThreeChars, isSevenChars, isNotEmpty } from "../utils/validators";

interface propsType {
  onSubmit: (data: any) => void;
  isSubmitting: Boolean;
  taskData?: taskType;
}

export default function TaskForm({
  onSubmit,
  isSubmitting,
  taskData,
}: propsType) {
  const [selectedValue, setSelectedValue] = useState<string>("");

  const {
    input: title,
    setInput: setTitle,
    setInputTouched: setTitleTouched,
    inputIsValid: titleIsValid,
    inputHasError: titleHasError,
    inputChangeHandler: titleChangeHandler,
    inputBlurHandler: titleBlurHandler,
  } = useInput(isThreeChars);

  const {
    input: description,
    setInput: setDescription,
    setInputTouched: setDescriptionTouched,
    inputIsValid: descriptionIsValid,
    inputHasError: descriptionHasError,
    inputChangeHandler: descriptionChangeHandler,
    inputBlurHandler: descriptionBlurHandler,
  } = useInput(isSevenChars);

  const {
    input: date,
    setInput: setDate,
    setInputTouched: setDateTouched,
    inputIsValid: dateIsValid,
    inputHasError: dateHasError,
    inputChangeHandler: dateChangeHandler,
    inputBlurHandler: dateBlurHandler,
  } = useInput(isNotEmpty);

  const handleStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let submittedData = {
      title,
      description,
      dueDate: date,
      status: selectedValue,
      id: taskData?.id || null,
    };

    setTitle("");
    setDescription("");
    setDate("");
    setSelectedValue("");

    setTitleTouched(false);
    setDescriptionTouched(false);
    setDateTouched(false);
    onSubmit(submittedData);
  };

  const isFormValid = titleIsValid && descriptionIsValid && dateIsValid;

  useEffect(() => {
    if (taskData) {
      setTitle(taskData.title);
      setDescription(taskData.description);
      setDate(taskData.dueDate);
      setSelectedValue(taskData.status);
    }
  }, [taskData, setTitle, setDescription, setDate]);

  return (
    <form onSubmit={handleFormSubmit}>
      <div className="form-fields">
        <label htmlFor="title" className="form-label">
          Title
        </label>
        <input
          type="text"
          name="title"
          id="title"
          value={title}
          onChange={titleChangeHandler}
          onBlur={titleBlurHandler}
          className="inputs"
        />
        {titleHasError && <p className="input-error">Title is not valid.</p>}
      </div>
      <div className="form-fields">
        <label htmlFor="description" className="form-label">
          Description
        </label>
        <textarea
          //   type="text"
          name="description"
          id="description"
          value={description}
          onChange={descriptionChangeHandler}
          onBlur={descriptionBlurHandler}
          className="inputs"
        />
        {descriptionHasError && (
          <p className="input-error">Description is not valid.</p>
        )}
      </div>

      {taskData && (
        <div className=" flex flex-row gap-3 my-3">
          <div className="flex gap-1 items-center">
            <input
              type="radio"
              id="complete"
              name="status"
              value={"complete"}
              checked={selectedValue === "complete"}
              onChange={handleStatusChange}
            />
            <label htmlFor="complete" className="form-label">
              complete
            </label>
          </div>
          <div className="flex gap-1 items-center">
            <input
              type="radio"
              id="in-complete"
              name="status"
              value={"incomplete"}
              checked={selectedValue === "incomplete"}
              onChange={handleStatusChange}
            />
            <label htmlFor="in-complete" className="form-label">
              incomplete
            </label>
          </div>
        </div>
      )}

      <div className="form-fields">
        <label htmlFor="date" className="form-label">
          Due Date
        </label>
        <input
          type="date"
          value={date}
          name="date"
          id="date"
          className="inputs"
          onChange={dateChangeHandler}
          onBlur={dateBlurHandler}
        />
        {dateHasError && <p className="input-error">Due Date is not valid.</p>}
      </div>

      <input
        type="submit"
        value={`${isSubmitting ? "Submitting..." : "Submit"}`}
        disabled={!isFormValid}
        className=" w-full cursor-pointer rounded-md border bg-black px-4 py-4 text-white hover:bg-orange-600 disabled:cursor-not-allowed   "
      />
    </form>
  );
}
