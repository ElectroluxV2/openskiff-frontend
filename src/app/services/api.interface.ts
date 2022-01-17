import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";

export interface Club {
  clubId: number;
  shortName: string;
  fullName: string;
}

export interface Penalty {
  regattaId: number;
  raceNumber: number;
  sailNumber: string;
  abbreviation: string;
}

export interface Place {
  placeId: number;
  location: string;
  name: string;
}

export interface Race {
  regattaId: number;
  raceNumber: number;
}

export interface RacesFinishLineList {
  regattaId: number;
  raceNumber: number;
  sailNumber: string;
  place: number;
}

export interface Regatta {
  regattaId: number;
  placeId: number;
  exclusions: number;
  beginDate: Date;
  endDate: Date;
  name: string;
}

export interface Result {
  regattaId: number;
  exclusions: number;
  sailorId: number;
  sailNumber: number;
  raceNumber: number;
  place: number;
  abbreviation: string;
  points: number;
  minPoint: number;
  totalPoints: number;
}

export interface ResultsAbbreviation {
  shortName: string;
  fullName: string;
}

export interface SailingNumbersAssociatedToSailor {
  sailorId: number;
  regattaId: number;
  sailNumber: string;
}

export interface Sailor {
  sailorId: number;
  sex: string;
  birthDate: Date;
  givenName: string;
  familyName: string;
}

export interface StartingList {
  regattaId: number;
  sailorId: number;
  clubId: number;
}

export interface YearCategory {
  category: string;
  youngerThan: number;
}


export class Page {
  size: number;
  totalElements: number;
  totalPages: number;
  number: number;
  activeSort: string;
  directionSort: string;

  constructor(paginator: MatPaginator, sort: MatSort) {
    this.size = paginator.pageSize;
    this.totalElements = 0;
    this.totalPages = 0;
    this.number = paginator.pageIndex;
    this.activeSort = sort.active;
    this.directionSort = sort.direction;
  }
}

export interface PagedResponse<T> {
  page: Page;
  items: T[];
}
