type Sector<T = any> = {
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
}

type ParamsData = string | number | boolean | Record<string, any> | any[];

interface NextPageOptions extends Sector {
  view: string,
  clear: boolean;
}

export {
  type Sector,
  type NOTIFY,
  type ParamsData,
  type NextPageOptions
}