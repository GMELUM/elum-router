import { getter, setter } from "elum-state/react";
import equal from "../../libs/equal";

import {
  NextPageOptions,
  Sector
} from "../../types";

import {
  ACTIVE_APP,
  ACTIVE_CALLBACK,
  ACTIVE_MODAL,
  ACTIVE_PANEL,
  ACTIVE_PARAMS,
  ACTIVE_POPOUT,
  ACTIVE_VIEW,
  context,
  defaultSector
} from "../atoms";

const parts: Array<keyof Partial<NextPageOptions>> = ["popout", "modal", "panel"];

const nextPage = <T = any>(options: Partial<NextPageOptions>, callback?: (data: T) => void) => {

  if (window.location.protocol !== "file:") {
    window.history.pushState(null, "");
  };

  const currentApp = getter(ACTIVE_APP);
  const currentView = options.view || getter(ACTIVE_VIEW);

  /* Init app branch */
  if (!context[currentApp]) {
    context[currentApp] = { __snapshot: [] };
  };

  /* Init default sector in app */
  if (!context[currentApp][currentView]) {
    context[currentApp][currentView] = [defaultSector];
  };

  const lastSector = context[currentApp][currentView].length;
  const activeSector = context[currentApp][currentView][lastSector - 1];

  const sector: Sector = {
    view: currentView,
    panel: options.panel || activeSector.panel,
    modal: options.modal || activeSector.modal,
    popout: options.popout || activeSector.popout,
    stay: options.stay || defaultSector.stay,
    freeze: options.freeze || defaultSector.freeze,
    params: options.params || activeSector.params,
    callback: callback || undefined
  };

  for (let key of parts) {
    if (options[key]) { break; };
    sector[key] = defaultSector[key];
  };

  const isEqual = equal(activeSector, sector);
  if (!isEqual) {
    context[currentApp][currentView].push(sector);
  }

  context[currentApp].__snapshot = [sector];

  setter(ACTIVE_APP, currentApp);
  setter(ACTIVE_VIEW, currentView);
  setter(ACTIVE_PANEL, sector.panel);
  setter(ACTIVE_MODAL, sector.modal);
  setter(ACTIVE_POPOUT, sector.popout);
  setter(ACTIVE_PARAMS, sector.params);
  setter(ACTIVE_CALLBACK, sector.callback);

  if (options.clear && currentView !== currentView) {
    context[currentApp].__snapshot = [defaultSector];
    context[currentApp][currentView] = [defaultSector];
  };

}

export default nextPage;
