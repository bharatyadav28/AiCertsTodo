import { useState } from "react";

const useInput = (validationFun) => {
  const [input, setInput] = useState("");
  const [inputTouched, setInputTouched] = useState(false);

  const inputIsValid = validationFun(input);
  const inputHasError = !inputIsValid && inputTouched;

  const inputChangeHandler = (events) => {
    setInput(events.target.value);
  };

  const inputBlurHandler = (events) => {
    setInputTouched(true);
  };

  return {
    input,
    setInput,
    inputTouched,
    setInputTouched,
    inputIsValid,
    inputHasError,
    inputChangeHandler,
    inputBlurHandler,
  };
};

export default useInput;
