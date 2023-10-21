import { getter } from "elum-state/solid"
import { ACTIVE_CALLBACK } from "../atoms"

const callback = <T = any>(data: T) => {
  const func = getter(ACTIVE_CALLBACK);
  if (!func?.c || typeof func?.c !== "function") {
    console.warn("There is no function for callback")
    return;
  }
  func.c(data);
}

export default callback;
