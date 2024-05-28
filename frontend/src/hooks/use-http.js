import { useState } from "react";
import { useCallback } from "react";

// Submit and retreive data drom database
const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const dbConnect = useCallback(async (requiredConfig, postRequest) => {
    setIsLoading(true);

    try {
      const response = await fetch(requiredConfig.url, {
        method: requiredConfig.method ? requiredConfig.method : "GET",
        headers: requiredConfig.headers ? requiredConfig.headers : {},
        body: requiredConfig.body ? JSON.stringify(requiredConfig.body) : null,
      });

      if (!response.ok) {
        const error = await response.json();
        const errorMsg = error.message;

        throw new Error(errorMsg);
      }

      const data = await response.json();
      postRequest(data);
    } catch (error) {
      let message = "An error occurred";
      if (error instanceof Error) {
        message = error.message;
      }

      setError(message);
    }

    setIsLoading(false);
  }, []);

  return {
    isLoading,
    error,
    dbConnect,
    setError,
  };
};

export default useHttp;
