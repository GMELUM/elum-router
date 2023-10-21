import { getter } from "elum-state/solid"
import { ACTIVE_CALLBACK } from "../atoms"

const callback = <T = any>(data: T) => {
  const func = getter(ACTIVE_CALLBACK);
  if (!func || typeof func !== "function") {
    console.warn("There is no function for callback")
    return;
  }
  func(data);
}

export default callback;
