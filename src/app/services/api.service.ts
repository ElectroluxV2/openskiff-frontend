import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Club, Page, PagedResponse } from "./api.interface";
import { firstValueFrom, Observable } from "rxjs";

const BASE = 'http://localhost:8080';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) { }

  public getClubs(page: Page): Observable<PagedResponse<Club>> {
    return this.http.post<PagedResponse<Club>>(`${BASE}/clubs/`, page);
  }

  async saveClub(club: Club) {
    return await firstValueFrom(this.http.post(`${BASE}/clubs/save`, club));
  }

  async deleteClub(club: Club) {
    return await firstValueFrom(this.http.delete(`${BASE}/clubs/${club.clubId}`));
  }
}
