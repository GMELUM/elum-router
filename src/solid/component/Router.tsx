import { Component, onMount } from "solid-js";
import { JSX } from "solid-js/jsx-runtime";
import { getter } from "elum-state/solid";

import nextPage from "../actions/nextPage";
import backPage from "../actions/backPage";

import {
  ACTIVE_APP,
  ACTIVE_VIEW
} from "../atoms";
import swapApp from "../actions/swapApp";

interface Router extends JSX.HTMLAttributes<HTMLDivElement> {
  app?: string;
  branch: string;
}

const Router: Component<Router> = (props) => {

  if (!getter(ACTIVE_APP) || !getter(ACTIVE_VIEW)) {
    swapApp(props.app || "app", { view: props.branch })
  }

  onMount(() => {
    window.addEventListener("popstate", () => backPage());
    if (window.location.protocol !== "file:") {
      window.history.pushState(undefined, "");
    }
  })

  return props.children;
}

export default Router;
