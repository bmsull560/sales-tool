// Custom type declarations to fix TypeScript errors

// GeoJSON
declare module 'geojson' {
  export interface GeoJsonObject {
    type: string;
    bbox?: number[];
    coordinates?: any[];
    properties?: any;
  }
}

// Phoenix
declare module 'phoenix' {
  export class Socket {
    constructor(endPoint: string, opts?: any);
    connect(): void;
    disconnect(): void;
    channel(topic: string, params?: any): Channel;
  }
  
  export class Channel {
    join(): Push;
    leave(): Push;
    push(event: string, payload?: any): Push;
    on(event: string, callback: Function): void;
  }
  
  export class Push {
    receive(status: string, callback: Function): Push;
  }
}
