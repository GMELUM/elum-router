import { FC, HTMLAttributes, useEffect } from "react";
import { getter } from "elum-state/react";
import { ACTIVE_APP, ACTIVE_VIEW } from "../atoms";
import { backPage, swapApp } from "../../react";

interface IRouter extends HTMLAttributes<HTMLDivElement> {
  app?: string
  branch: string;
};

const Router: FC<IRouter> = ({
  app = "web",
  branch,
  children
}) => {

  if (!getter(ACTIVE_VIEW) || !getter(ACTIVE_APP)) {
    swapApp(app || "app", { view: branch })
  }

  useEffect(() => {
    window.addEventListener("popstate", () => backPage());
    if (window.location.protocol !== "file:") {
      window.history.pushState(undefined, "");
    }
  }, []);

  return children

}

export default Router;