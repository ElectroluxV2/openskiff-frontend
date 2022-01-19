import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";

export interface ModelEntity {
  get id(): any;
  get ids(): string;
  [key: string]: any;
}

export class Club implements ModelEntity {
  clubId?: number;
  shortName?: string;
  fullName?: string;

  constructor(init?: Partial<Club>) {
    Object.assign(this, init);
  }

  get id() {
    return this.clubId;
  }

  get ids() {
    return `${this.clubId}`;
  }
}

export class Penalty implements ModelEntity {
  regattaId?: number;
  raceNumber?: number;
  sailNumber?: string;
  abbreviation?: string;

  constructor(init?: Partial<Penalty>) {
    Object.assign(this, init);
  }

  get id() {
    return {
      regattaId: this.regattaId,
      raceNumber: this.raceNumber,
      sailNumber: this.sailNumber
    };
  }

  get ids() {
    return `${this.regattaId}|${this.raceNumber}|${this.sailNumber}`;
  }
}

export class Place implements ModelEntity {
  placeId?: number;
  location?: string;
  name?: string;

  constructor(init?: Partial<Place>) {
    Object.assign(this, init);
  }

  get id() {
    return this.placeId;
  }

  get ids() {
    return `${this.placeId}`;
  }
}

export class Race implements ModelEntity {
  regattaId?: number;
  raceNumber?: number;

  constructor(init?: Partial<Race>) {
    Object.assign(this, init);
  }

  get id() {
    return {
      regattaId: this.regattaId,
      raceNumber: this.raceNumber
    };
  }

  get ids() {
    return `${this.regattaId}|${this.raceNumber}}`;
  }
}

export class RacesFinishLineList implements ModelEntity {
  regattaId?: number;
  raceNumber?: number;
  sailNumber?: string;
  place?: number;

  constructor(init?: Partial<RacesFinishLineList>) {
    Object.assign(this, init);
  }

  get id() {
    return {
      regattaId: this.regattaId,
      raceNumber: this.raceNumber,
      sailNumber: this.sailNumber
    };
  }

  get ids() {
    return `${this.regattaId}|${this.raceNumber}|${this.sailNumber}`;
  }
}

export class Regatta implements ModelEntity {
  regattaId?: number;
  placeId?: number;
  exclusions?: number;
  beginDate?: Date;
  endDate?: Date;
  name?: string;

  constructor(init?: Partial<Regatta>) {
    Object.assign(this, init);
  }

  get id() {
    return this.regattaId;
  }

  get ids() {
    return `${this.regattaId}`;
  }
}

export class Result implements ModelEntity {
  regattaId?: number;
  exclusions?: number;
  sailorId?: number;
  sailNumber?: number;
  raceNumber?: number;
  place?: number;
  abbreviation?: string;
  points?: number;
  minPoint?: number;
  totalPoints?: number;

  constructor(init?: Partial<Result>) {
    Object.assign(this, init);
  }

  get id() {
    return {
      regattaId: this.regattaId,
      raceNumber: this.raceNumber,
      sailNumber: this.sailNumber
    };
  }

  get ids() {
    return `${this.regattaId}|${this.raceNumber}|${this.sailNumber}`;
  }
}

export class ResultsAbbreviation implements ModelEntity {
  shortName?: string;
  fullName?: string;

  constructor(init?: Partial<ResultsAbbreviation>) {
    Object.assign(this, init);
  }

  get id() {
    return this.shortName;
  }

  get ids() {
    return `${this.shortName}`;
  }
}

export class SailingNumbersAssociatedToSailor implements ModelEntity {
  sailorId?: number;
  regattaId?: number;
  sailNumber?: string;

  constructor(init?: Partial<SailingNumbersAssociatedToSailor>) {
    Object.assign(this, init);
  }

  get id() {
    return {
      sailorId: this.sailorId,
      regattaId: this.regattaId,
      sailNumber: this.sailNumber
    };
  }

  get ids() {
    return `${this.sailorId}|${this.regattaId}|${this.sailNumber}`;
  }
}

export class Sailor implements ModelEntity {
  sailorId?: number;
  sex?: string;
  birthDate?: Date;
  givenName?: string;
  familyName?: string;

  constructor(init?: Partial<Sailor>) {
    Object.assign(this, init);
  }

  get id() {
    return this.sailorId;
  }

  get ids() {
    return `${this.sailorId}`;
  }
}

export class StartingList implements ModelEntity {
  regattaId?: number;
  sailorId?: number;
  clubId?: number;

  constructor(init?: Partial<StartingList>) {
    Object.assign(this, init);
  }

  get id() {
    return {
      regattaId: this.regattaId,
      sailorId: this.sailorId
    };
  }

  get ids() {
    return `${this.regattaId}|${this.sailorId}|${this.clubId}`;
  }
}

export class YearCategory implements ModelEntity {
  category?: string;
  youngerThan?: number;

  constructor(init?: Partial<YearCategory>) {
    Object.assign(this, init);
  }

  get id() {
    return this.category;
  }

  get ids() {
    return `${this.category}`;
  }
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

export interface NotifyPacket {
  table: string;
}

type Class = { new(...args: any[]): any; };
export const MODEl_ENTITIES: { [key: string]: Class } = {
  'Club': Club,
  'Penalty': Penalty,
  'Place': Place,
  'Race': Race,
  'RacesFinishLineList': RacesFinishLineList,
  'Regatta': Regatta,
  'ResultsAbbreviation': ResultsAbbreviation,
  'SailingNumbersAssociatedToSailor': SailingNumbersAssociatedToSailor,
  'Sailor': Sailor,
  'StartingList': StartingList,
  'YearCategory': YearCategory
}
