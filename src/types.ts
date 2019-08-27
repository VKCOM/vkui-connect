import {
  RequestMethodName,
  ResponseMethodName,
  AppearanceSchemeType,
  AppearanceType,
  MethodName,
  RequestMethodPropsMap,
  ResponseMethodPropsMap
} from './methods';

/** Getter of request properties of a method */
export type RequestProps<M extends RequestMethodName = RequestMethodName> = RequestMethodPropsMap[M] & {
  request_id?: number | string;
};

/** Getter of response properties of a method */
export type ResponseProps<M extends ResponseMethodName = ResponseMethodName> = ResponseMethodPropsMap[M] & {
  request_id?: number | string;
};

/** Client error data */
export type ErrorDataClientError = {
  error_code: number;
  error_reason: string;
  error_description?: string;
};

/** API error data */
export type ErrorDataAPIError = {
  error_code: number;
  error_msg: string;
  request_params: string[];
};

/** Auth error data */
export type ErrorDataAuthError = {
  error_code: number;
  error_reason: string;
  error_description?: string[];
};

export type ErrorData =
  | {
      error_type: 'client_error';
      error_data: ErrorDataClientError;
      request_id?: number | string;
    }
  | {
      error_type: 'api_error';
      error_data: ErrorDataAPIError;
      request_id?: number | string;
    }
  | {
      error_type: 'auth_error';
      error_data: ErrorDataAuthError;
      request_id?: number | string;
    };

export type VKConnectErrorEvent<T extends MethodName> = {
  detail: {
    type: T;
    data: ErrorData;
  };
};

export type VKConnectSuccessEvent<T extends ResponseMethodName> = {
  detail: {
    type: T;
    data: ResponseProps<T>;
    app_id?: string;
    scheme?: AppearanceSchemeType;
    appearance?: AppearanceType;
  };
};

/**
 * VK Connect event
 */
export type VKConnectEvent<T extends ResponseMethodName> = VKConnectErrorEvent<T> | VKConnectSuccessEvent<T>;

/**
 * The type of function that will be subscribed to VK Connect events
 */
export type SubscribeHandler = <T extends ResponseMethodName>(event: VKConnectEvent<T>) => void;

/**
 * Type of global object with VK Connect methods in Android app WebView
 */
export type AndroidBridge = Record<RequestMethodName, (serializedData: string) => void>;

/**
 * Type of global object with VK Connect methods in iOS app WebView
 */
export type IOSBridge = Record<RequestMethodName, { postMessage?: (data: any) => void }>;
