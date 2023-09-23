import { setter } from "elum-state/solid";
import {
  ACTIVE_APP,
  ACTIVE_MODAL,
  ACTIVE_PANEL,
  ACTIVE_PARAMS,
  ACTIVE_POPOUT,
  ACTIVE_VIEW,
  context,
  defaultSector
} from "../atoms";
import { NextPageOptions } from "../../types";

const swapApp = (app: string, options: Partial<NextPageOptions>) => {

  if (!context[app]) {
    context[app] = { __snapshot: [Object.assign(defaultSector, options)] };
  };

  const sector = context[app].__snapshot[0];

  setter(ACTIVE_APP, app);
  setter(ACTIVE_VIEW, sector.view || options.view);
  setter(ACTIVE_PANEL, sector.panel || options.panel);
  setter(ACTIVE_MODAL, sector.modal || options.modal);
  setter(ACTIVE_POPOUT, sector.popout || options.popout);
  setter(ACTIVE_PARAMS, sector.params || options.params);

}

export default swapApp;
