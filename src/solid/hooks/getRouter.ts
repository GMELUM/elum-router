import { globalSignal } from "elum-state/solid";
import {
  ACTIVE_MODAL,
  ACTIVE_PANEL,
  ACTIVE_POPOUT,
  ACTIVE_VIEW
} from "../atoms";
import { Accessor } from "solid-js";

const listAtom = {
  view: ACTIVE_VIEW,
  panel: ACTIVE_PANEL,
  modal: ACTIVE_MODAL,
  popout: ACTIVE_POPOUT
}

const getRouter = (atom: keyof typeof listAtom): Accessor<string> => {
  const [value] = globalSignal(listAtom[atom]);
  return value
};

export default getRouter;
