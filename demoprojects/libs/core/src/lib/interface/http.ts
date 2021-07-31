import { HttpHeaders, HttpParams } from '@angular/common/http';

export enum Observe  {
  BODY='body',
  EVENTS='events' ,
  RESPONSE='response',
}

export enum ResponseType  {
  ARRAY_BUFFER='arraybuffer',
  BLOB='blob' ,
  JSON='json',
  TEXT='text',
}

export interface Http {
  headers?: HttpHeaders | any;
  observe?: 'body' | 'events' | 'response';
  params?:
    | HttpParams
    | {
        [param: string]:
          | string
          | number
          | boolean
          | ReadonlyArray<string | number | boolean>;
      };
  reportProgress?: boolean;
  responseType?: 'arraybuffer' | 'blob' | 'json' | 'text';
  withCredentials?: boolean;
}
