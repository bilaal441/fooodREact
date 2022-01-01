import {useCallback, useReducer} from "react";

const inialState = {
  error: null,
  isLoading: false,
};

const UpdateState = (err, isloading) => {
  return {
    error: err,
    isLoading: isloading,
  };
};

const requestReducer = (state, action) => {
  if (action.type === "LOADING") return UpdateState(state.error, true);

  if (action.type === "LOADING_OFF") return UpdateState(state.error, false);
  // return {error: state.error, isLoading: false};
  if (action.type === "ERORR_ACCURED")
    return UpdateState(action.payLoad.val, state.isLoading);

  return state;
};

const useHttp = () => {
  const [requestState, dispatch] = useReducer(requestReducer, inialState);
  const SendRequest = useCallback(async (requestConfig, applyData) => {
    dispatch({
      type: "LOADING",
    });

    try {
      const res = await fetch(requestConfig.url, {
        method: requestConfig?.method ?? "GET",
        headers: requestConfig?.headers ?? {},
        body: JSON.stringify(requestConfig?.body) ?? null,
      });
      console.log(res);

      if (!res.ok) {
        throw new Error("Request failed!");
      }

      const data = await res.json();

      applyData(data);
    } catch (err) {
      dispatch({
        type: "ERORR_ACCURED",
        payLoad: {
          val: err.message || "Something went wrong!",
        },
      });
    }

    dispatch({
      type: "LOADING_OFF",
    });
  }, []);

  return {
    error: requestState.error,
    isLoading: requestState.isLoading,
    SendRequest,
  };
};

export default useHttp;
