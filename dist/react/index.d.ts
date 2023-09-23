import * as elum_state_react from 'elum-state/react';
import { FC, HTMLAttributes } from 'react';

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

declare const useParams: <T extends Record<string, ParamsData>>() => T;

declare const listAtom: {
    app: elum_state_react.GlobalAtom<string>;
    view: elum_state_react.GlobalAtom<string>;
    panel: elum_state_react.GlobalAtom<string>;
    modal: elum_state_react.GlobalAtom<string>;
    popout: elum_state_react.GlobalAtom<string>;
};
declare const useRouter: (atom: keyof typeof listAtom) => string;

type UseNotify = () => {
    type?: string;
    params: Record<string, ParamsData>;
};
declare const useNotify: UseNotify;

interface IRouter extends HTMLAttributes<HTMLDivElement> {
    app?: string;
    branch: string;
}
declare const Router: FC<IRouter>;

declare const ACTIVE_APP: elum_state_react.GlobalAtom<string>;
declare const ACTIVE_VIEW: elum_state_react.GlobalAtom<string>;
declare const ACTIVE_PANEL: elum_state_react.GlobalAtom<string>;
declare const ACTIVE_MODAL: elum_state_react.GlobalAtom<string>;
declare const ACTIVE_POPOUT: elum_state_react.GlobalAtom<string>;
declare const ACTIVE_NOTIFY: elum_state_react.GlobalAtom<NOTIFY>;
declare const ACTIVE_PARAMS: elum_state_react.GlobalAtom<Record<string, ParamsData>>;

export { ACTIVE_APP, ACTIVE_MODAL, ACTIVE_NOTIFY, ACTIVE_PANEL, ACTIVE_PARAMS, ACTIVE_POPOUT, ACTIVE_VIEW, Router, backPage, hideNotify, nextPage, showNotify, swapApp, useNotify, useParams, useRouter };
