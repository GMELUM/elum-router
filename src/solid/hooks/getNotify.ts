import { ParamsData } from "../../types";
import { ACTIVE_NOTIFY } from "../atoms";
import { globalSignal } from "elum-state/solid";

type UseNotify = () => {
  type?: string;
  params: Record<string, ParamsData>;
}

const getNotify: UseNotify = () => {
  const [data] = globalSignal(ACTIVE_NOTIFY);
  const value = data();
  if (!value) { return { type: undefined, params: {} } };
  return { type: value.type, params: value.params };
}

export default getNotify;
