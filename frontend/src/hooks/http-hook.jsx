import { useState, useEffect, useCallback, useRef } from "react";
import { toast } from "react-toastify";

export const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  // const activeHttpRequests = useRef([]);

  const sendRequest = useCallback(
    async (
      url,
      method = "GET",
      credentials = "omit",
      body = null,
      headers = {}
    ) => {
      setIsLoading(true);
      // const httpAbortCtrl = new AbortController();
      // activeHttpRequests.current.push(httpAbortCtrl);

      try {
        const response = await fetch(url, {
          method,
          body,
          credentials,
          headers
          // signal: httpAbortCtrl.signal
        });

        const responseData = await response.json();

        // activeHttpRequests.current = activeHttpRequests.current.filter(
        //   reqCtrl => reqCtrl !== httpAbortCtrl
        // );

        if (!response.ok) {
          throw new Error(responseData.message);
        }

        setIsLoading(false);
        return responseData;
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
        toast.error(err.message);
        throw err;
      }
    },
    []
  );

  const clearError = () => {
    setError(null);
  };

  // useEffect(() => {
  //   return () => {
  //     activeHttpRequests.current.forEach(abortCtrl => abortCtrl.abort());
  //   };
  // }, []);

  return { isLoading, error, sendRequest, clearError };
};
