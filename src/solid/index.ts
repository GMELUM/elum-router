export { default as nextPage } from "./actions/nextPage";
export { default as backPage } from "./actions/backPage";
export { default as swapApp } from "./actions/swapApp";

export { default as showNotify } from "./actions/showNotify";
export { default as hideNotify } from "./actions/hideNotify";

export { default as useParams } from "./hooks/getParams";
export { default as useRouter } from "./hooks/getRouter";
export { default as useNotify } from "./hooks/getNotify";

export { default as Router } from "./component/Router";

export {
  ACTIVE_APP,
  ACTIVE_VIEW,
  ACTIVE_PANEL,
  ACTIVE_MODAL,
  ACTIVE_POPOUT,
  ACTIVE_NOTIFY,
  ACTIVE_PARAMS,
} from "./atoms"
