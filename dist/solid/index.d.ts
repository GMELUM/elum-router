import * as elum_state_solid from 'elum-state/solid';
import { Accessor, Component } from 'solid-js';
import { JSX } from 'solid-js/jsx-runtime';

type Sector = {
    panel: string;
    modal?: string;
    popout?: string;
    notify?: string;
    stay?: boolean | string;
    freeze?: boolean;
    params: Record<string, ParamsData>;
} & Record<string, any>;
type NOTIFY = {
    type: string;
    params: Record<string, ParamsData>;
    callback: (value: Omit<NOTIFY, "callback"> | PromiseLike<Omit<NOTIFY, "callback">>) => void;
};
type ParamsData = string | number | boolean | Record<string, any> | any[];
interface NextPageOptions extends Sector {
    view: string;
    clear: boolean;
}

declare const nextPage: (options: Partial<NextPageOptions>) => void;

declare const backPage: (opt?: Partial<{
    ignoreFreeze: boolean;
    toStay: boolean | string;
}>) => void;

declare const swapApp: (app: string, options: Partial<NextPageOptions>) => void;

declare function showNotify(type: string, time: number, params: Record<string, any>): Promise<Omit<NOTIFY, "callback">>;
declare function showNotify(type: string, time: number, params: Record<string, any>, callback: (value: Omit<NOTIFY, "callback">) => void): void;

declare function hideNotify(type?: string): boolean;

declare const getParams: <T extends Record<string, ParamsData>>() => T;

declare const listAtom: {
    view: elum_state_solid.GlobalAtom<string>;
    panel: elum_state_solid.GlobalAtom<string>;
    modal: elum_state_solid.GlobalAtom<string>;
    popout: elum_state_solid.GlobalAtom<string>;
};
declare const useRouter: (atom: keyof typeof listAtom) => Accessor<string>;

type UseNotify = () => {
    type?: string;
    params: Record<string, ParamsData>;
};
declare const getNotify: UseNotify;

interface Router extends JSX.HTMLAttributes<HTMLDivElement> {
    app?: string;
    branch: string;
}
declare const Router: Component<Router>;

declare const ACTIVE_APP: elum_state_solid.GlobalAtom<string>;
declare const ACTIVE_VIEW: elum_state_solid.GlobalAtom<string>;
declare const ACTIVE_PANEL: elum_state_solid.GlobalAtom<string>;
declare const ACTIVE_MODAL: elum_state_solid.GlobalAtom<string>;
declare const ACTIVE_POPOUT: elum_state_solid.GlobalAtom<string>;
declare const ACTIVE_NOTIFY: elum_state_solid.GlobalAtom<NOTIFY>;
declare const ACTIVE_PARAMS: elum_state_solid.GlobalAtom<Record<string, ParamsData>>;

export { ACTIVE_APP, ACTIVE_MODAL, ACTIVE_NOTIFY, ACTIVE_PANEL, ACTIVE_PARAMS, ACTIVE_POPOUT, ACTIVE_VIEW, Router, backPage, hideNotify, nextPage, showNotify, swapApp, getNotify as useNotify, getParams as useParams, useRouter };
