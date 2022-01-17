import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Club } from "./api.interface";
import { firstValueFrom } from "rxjs";

const BASE = 'http://localhost:8080';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) { }

  public async getClubs(): Promise<Club[]> {
    return await firstValueFrom(this.http.get<Club[]>(`${BASE}/clubs/`));
  }

  async saveClub(club: Club) {
    return await firstValueFrom(this.http.post(`${BASE}/clubs/save`, club));
  }

  async deleteClub(club: Club) {
    return await firstValueFrom(this.http.delete(`${BASE}/clubs/${club.clubId}`));
  }
}
