import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { MODEl_ENTITIES, ModelEntity, NotifyPacket, Page, PagedResponse } from "./api.interface";
import { firstValueFrom, map, Observable } from "rxjs";

const BASE = 'http://localhost:8080';
const WS = 'ws://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private webSocketConnection?: WebSocket;
  public tableChangeNotifier: EventEmitter<NotifyPacket> = new EventEmitter<NotifyPacket>();

  constructor(private http: HttpClient) {
    this.webSocketConnection = new WebSocket(WS);
    this.handleConnection();
  }

  private handleConnection(): void {
    this.webSocketConnection ||= new WebSocket(WS);

    this.webSocketConnection.onopen = () => {
      console.info('Connected to WebSocket server');
    }

    this.webSocketConnection.onmessage = ({data}) => {
      const packet = JSON.parse(data) as NotifyPacket;
      this.tableChangeNotifier.emit(packet);
    };

    this.webSocketConnection.onclose = event => {
      console.warn(`Connection unexpectedly closed: #${event.code} ${event.reason.length !== 0 ? ', reason: ' + event.reason : ''}. Reconnecting in 1 second.`);
      // Reconnect
      setTimeout(this.handleConnection.bind(this), 1000);
      delete this.webSocketConnection;
    };

    this.webSocketConnection.onerror = event => {
      console.warn(`An error occurred in socket!`);
      event.stopImmediatePropagation();
    };
  }

  public getAll<T extends ModelEntity>(name: string, page: Page): Observable<PagedResponse<T>> {
    return this.http.post<PagedResponse<T>>(`${BASE}/${name}/getAll`, page).pipe(map(pagedResponse => {
      pagedResponse.items = pagedResponse.items.map(item => new MODEl_ENTITIES[name](item));
      return pagedResponse;
    }));
  }

  public get<T extends ModelEntity>(name: string, item: T): Observable<T> {
    return this.http.post<T>(`${BASE}/${name}/get`, item.id).pipe(map(item => new MODEl_ENTITIES[name](item)));
  }

  async save<T extends ModelEntity>(name: string, item: T) {
    return await firstValueFrom(this.http.post(`${BASE}/${name}/save`, item));
  }

  async delete<T extends ModelEntity>(name: string, item: T) {
    return await firstValueFrom(this.http.post(`${BASE}/${name}/delete`, item.id));
  }
}
