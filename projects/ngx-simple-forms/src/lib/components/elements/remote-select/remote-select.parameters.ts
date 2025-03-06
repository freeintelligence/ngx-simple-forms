export type RemoteSelectOption = {
  value?: string | number;
  description: string;
};

export interface RemoteSelectParametersServiceKeys {
  value: string;
  description: string;
}

export interface RemoteSelectParameters {
  label?: string;
  placeholder?: string;
  defaultOptions?: RemoteSelectOption[];
  service: {
    url: () => string;
    method: 'GET' | 'POST' | 'PUT' | 'DELETE';
    body?: () => unknown;
    keys?: RemoteSelectParametersServiceKeys;
  };
}
