import { getter } from "elum-state/solid";
import { ParamsData } from "../../types";
import { ACTIVE_PARAMS } from "../atoms";
import { createStore } from "solid-js/store";

const getParams = <T extends Record<string, ParamsData>>(): T => {
  const [params] = createStore(getter(ACTIVE_PARAMS))
  return params as T;
};

export default getParams;