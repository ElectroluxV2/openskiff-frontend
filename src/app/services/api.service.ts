import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ModelEntity, Page, PagedResponse } from "./api.interface";
import { firstValueFrom, Observable } from "rxjs";

const BASE = 'http://localhost:8080';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) { }

  public getAll<T extends ModelEntity>(name: string, page: Page): Observable<PagedResponse<T>> {
    return this.http.post<PagedResponse<T>>(`${BASE}/${name}/getAll`, page);
  }

  public get<T extends ModelEntity>(name: string, item: T): Observable<PagedResponse<T>> {
    return this.http.post<PagedResponse<T>>(`${BASE}/${name}/get`, item.id);
  }

  async save<T extends ModelEntity>(name: string, item: T) {
    return await firstValueFrom(this.http.post(`${BASE}/${name}/save`, item));
  }

  async delete<T extends ModelEntity>(name: string, item: T) {
    return await firstValueFrom(this.http.post(`${BASE}/${name}/delete`, item.id));
  }
}
