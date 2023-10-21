import { getter } from "elum-state/solid";
import { backPage, callback, nextPage, swapApp } from "../src/solid";

import {
  ACTIVE_APP,
  ACTIVE_MODAL,
  ACTIVE_PANEL,
  ACTIVE_PARAMS,
  ACTIVE_POPOUT,
  ACTIVE_VIEW,
  context
} from "../src/solid/atoms";
import showNotify from "../src/solid/actions/showNotify";
import hideNotify from "../src/solid/actions/hideNotify";

const get = () => ({
  app: getter(ACTIVE_APP),
  view: getter(ACTIVE_VIEW),
  panel: getter(ACTIVE_PANEL),
  modal: getter(ACTIVE_MODAL),
  popout: getter(ACTIVE_POPOUT),
  params: getter(ACTIVE_PARAMS)
});

const next: typeof nextPage = (input) => {
  nextPage(input)
  return get();
}

const back: typeof backPage = (input) => {
  backPage(input)
  return get();
}

const swap: typeof swapApp = (app, view) => {
  swapApp(app, view)
  return get();
}


test.each([

  /**
   * 1. Init Router
   */
  ["init", () => {
    expect(swap("app", {
      view: "home"
    })).toMatchObject({
      app: "app",
      view: "home",
      panel: "default",
      modal: undefined,
      popout: undefined,
      params: {}
    })
  }],

  /**
   * 2. First entry in router
   */
  ["first", () => {
    expect(next({
      view: "home",
      stay: "app"
    })).toMatchObject({
      app: "app",
      view: "home",
      panel: "default",
      modal: undefined,
      popout: undefined,
      params: {}
    })
  }],

  /**
   * 3. Check safe entry in router
   */
  ["check", () => {
    expect(get()).toMatchObject({
      app: "app",
      view: "home",
      panel: "default",
      modal: undefined,
      popout: undefined,
      params: {}
    })
  }],

  /**
   * 4. Write next "view" in "app" trees router
   */
  ["next_view", () => {
    expect(next({
      view: "profile"
    })).toMatchObject({
      app: "app",
      view: "profile",
      panel: "default",
      modal: undefined,
      popout: undefined,
      params: {}
    })
  }],

  /**
   * 5. Swap another "app" trees in router
   */
  ["next_app", () => {
    expect(swap("game", {
      view: "home"
    })).toMatchObject({
      app: "game",
      view: "home",
      panel: "default",
      modal: undefined,
      popout: undefined,
      params: {}
    })
  }],

  /**
   * 6. 
   */
  ["next_full_snapshot", () => {
    expect(next({
      view: "rating",
      panel: "daily",
      modal: "info",
      popout: "warning",
      params: { type: "error_get_info" }
    })).toMatchObject({
      app: "game",
      view: "rating",
      panel: "daily",
      modal: "info",
      popout: "warning",
      params: { type: "error_get_info" }
    })
  }],

  /**
   * 7. Swap to back "app" trees in router
   */
  ["next_back_app", () => {
    expect(swap("app", {}))
      .toMatchObject({
        app: "app",
        view: "profile",
        panel: "default",
        modal: undefined,
        popout: undefined,
        params: {}
      })
  }],

  /**
   * 8. 
   */
  ["next_panel&freeze", () => {
    expect(next({
      panel: "achievements",
      freeze: true
    })).toMatchObject({
      app: "app",
      view: "profile",
      panel: "achievements",
      modal: undefined,
      popout: undefined,
      params: {}
    })
  }],

  /**
   * 9. 
   */
  ["back_freeze", () => {
    expect(back())
      .toMatchObject({
        app: "app",
        view: "profile",
        panel: "achievements",
        modal: undefined,
        popout: undefined,
        params: {}
      })
  }],

  /**
   * 10. 
   */
  ["back_ignore_freeze", () => {
    expect(back({
      ignoreFreeze: true
    })).toMatchObject({
      app: "app",
      view: "profile",
      panel: "default",
      modal: undefined,
      popout: undefined,
      params: {}
    })
  }],

  /**
   * 11. 
   */
  ["back_stay", () => {
    next({
      view: "home",
      panel: "achievements"
    });
    expect(back({ toStay: "app" }))
      .toMatchObject({
        app: "app",
        view: "home",
        panel: "default",
        modal: undefined,
        popout: undefined,
        params: {}
      })
  }],

  ["set_panel", () => {
    expect(next({ panel: "settings" }))
      .toMatchObject({
        app: "app",
        view: "home",
        panel: "settings",
        modal: undefined,
        popout: undefined,
        params: {}
      })
  }],

  ["callback", () => {
    let color: string = "";
    next<string>({ modal: "picker" }, (value: string) => {
      color = value;
      expect(color).toBe("#c48e12");
    });
    callback("#c48e12");
  }],

  ["notify", () => {
    const start = Date.now();
    showNotify("buy", 1000, {}, (data) => {
      expect(data).toMatchObject({ type: "buy", params: {} });
      expect(start > Date.now() - 1100).toBe(true);
    })
  }],

  ["notify_close", () => {
    const start = Date.now();
    showNotify("buy", 0, {}, (data) => {
      expect(data).toMatchObject({ type: "buy", params: {} })
      expect(start > Date.now() - 3100).toBe(true)
    });
    setTimeout(() => { expect(hideNotify()).toBe(true); }, 3000);
  }],

])("solid_test", (_, func) => func())
