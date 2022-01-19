import { Component } from '@angular/core';
import { from, ModelEntityColumn } from "./components/table-view/model-entity-column";
import {
  Club,
  ModelEntity,
  Penalty,
  Place,
  Race,
  RacesFinishLineList,
  Regatta, ResultsAbbreviation, SailingNumbersAssociatedToSailor,
  Sailor,
  YearCategory
} from "./services/api.interface";
import { FormBuilder, Validators } from "@angular/forms";
import { Table } from "./components/table-view/table";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public tables: Table<ModelEntity>[] = [];

  constructor(private fb: FormBuilder) {
    this.tables.push(new Table<Club>('Club', 'Clubs', from([
      {
      columnDef: 'clubId',
      header: '#',
      id: true
    }, {
      columnDef: 'shortName',
      header: 'Short Name',
      hint: 'Max 64 chars.',
      placeholder: 'MKŻ Arka',
      controlsConfig: [Validators.required, Validators.maxLength(64)]
    }, {
      columnDef: 'fullName',
      header: 'Full Name',
      hint: 'Max 256 chars.',
      placeholder: 'Miejski Klub Żeglarski Arka Gdynia',
      controlsConfig: [Validators.required, Validators.maxLength(256)]
    }]), {
      add: true,
      delete: true,
      edit: true
    }));

    this.tables.push(new Table<Sailor>('Sailor', 'Sailors', from([
      {
      columnDef: 'sailorId',
      header: '#',
      id: true
    }, {
      columnDef: 'sex',
      header: 'Sex',
      hint: 'F or M.',
      placeholder: 'M or F',
      controlsConfig: [Validators.required, Validators.pattern('/(M|F)/gm')]
    }, {
      columnDef: 'birthDate',
      header: 'Birth date',
      hint: 'Click calendar icon.',
      placeholder: '00/00/0000',
      controlsConfig: [Validators.required, Validators.pattern('/^(((0[1-9]|[12]\d|3[01])\/(0[13578]|1[02])\/((19|[2-9]\d)\d{2}))|((0[1-9]|[12]\d|30)\/(0[13456789]|1[012])\/((19|[2-9]\d)\d{2}))|((0[1-9]|1\d|2[0-8])\/02\/((19|[2-9]\d)\d{2}))|(29\/02\/((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|(([1][26]|[2468][048]|[3579][26])00))))$/g')]
    }, {
      columnDef: 'givenName',
      header: 'Given Name',
      hint: 'Max 128 chars.',
      placeholder: 'Jan',
      controlsConfig: [Validators.required, Validators.maxLength(128)]
    }, {
      columnDef: 'familyName',
      header: 'Family Name',
      hint: 'Max 128 chars.',
      placeholder: 'Dwa',
      controlsConfig: [Validators.required, Validators.maxLength(128)]
    }]), {
      add: true,
      delete: true,
      edit: true
    }));

    this.tables.push(new Table<Penalty>('Penalty', 'Penalties', from([
    {
      columnDef: 'regattaId',
      header: 'Regatta Id',
      controlsConfig: [Validators.required]
    }, {
      columnDef: 'raceNumber',
      header: 'Race number',
      controlsConfig: [Validators.required]
    }, {
      columnDef: 'sailNumber',
      header: 'Sail number',
      controlsConfig: [Validators.required]
    }, {
      columnDef: 'abbreviation',
      header: 'Abbreviation',
      controlsConfig: [Validators.required]
    }, ]), {
      add: true,
      delete: true,
      edit: true
    }));

    this.tables.push(new Table<Place>('Place', 'Places', from([
      {
        columnDef: 'placeId',
        header: '#',
        id: true
      }, {
        columnDef: 'location',
        header: 'Geolocation',
        controlsConfig: [Validators.required]
      }, {
        columnDef: 'name',
        header: 'Name',
        controlsConfig: [Validators.required]
      }]), {
      add: true,
      delete: true,
      edit: true
    }));

    this.tables.push(new Table<Race>('Race', 'Races', from([
      {
        columnDef: 'regattaId',
        header: 'Regatta Id',
        controlsConfig: [Validators.required]
      }, {
        columnDef: 'raceNumber',
        header: 'Race Number',
        controlsConfig: [Validators.required]
      }]), {
      add: true,
      delete: true,
      edit: true
    }));

    this.tables.push(new Table<RacesFinishLineList>('RacesFinishLineList', 'Races finish line lists', from([
      {
        columnDef: 'regattaId',
        header: 'Regatta Id',
        controlsConfig: [Validators.required]
      }, {
        columnDef: 'raceNumber',
        header: 'Race Number',
        controlsConfig: [Validators.required]
      }, {
        columnDef: 'sailNumber',
        header: 'Sail Number',
        controlsConfig: [Validators.required]
      }, {
        columnDef: 'place',
        header: 'Place',
        controlsConfig: [Validators.required]
      }]), {
      add: true,
      delete: true,
      edit: true
    }));

    this.tables.push(new Table<Regatta>('Regatta', 'Regattas', from([
      {
        columnDef: 'regattaId',
        header: 'Regatta Id',
        controlsConfig: [Validators.required]
      }, {
        columnDef: 'placeId',
        header: 'Place Id',
        controlsConfig: [Validators.required]
      }, {
        columnDef: 'exclusions',
        header: 'Exclusions',
        controlsConfig: [Validators.required]
      }, {
        columnDef: 'beginDate',
        header: 'Begin date',
        controlsConfig: [Validators.required]
      }, {
        columnDef: 'endDate',
        header: 'End date',
        controlsConfig: [Validators.required]
      }, {
        columnDef: 'name',
        header: 'Name',
        controlsConfig: [Validators.required]
      }]), {
      add: true,
      delete: true,
      edit: true
    }));

    this.tables.push(new Table<ResultsAbbreviation>('ResultsAbbreviation', 'Results abbreviations', from([
      {
        columnDef: 'shortName',
        header: 'Short name',
        controlsConfig: [Validators.required]
      }, {
        columnDef: 'fullName',
        header: 'Full name',
        controlsConfig: [Validators.required]
      }]), {
      add: true,
      delete: true,
      edit: true
    }));

    this.tables.push(new Table<SailingNumbersAssociatedToSailor>('SailingNumbersAssociatedToSailor', 'Sailing numbers associated to sailors', from([
      {
        columnDef: 'sailorId',
        header: 'Sailor id',
        controlsConfig: [Validators.required]
      }, {
        columnDef: 'regattaId',
        header: 'Regatta id',
        controlsConfig: [Validators.required]
      }, {
        columnDef: 'sailNumber',
        header: 'Sail number',
        controlsConfig: [Validators.required]
      }]), {
      add: true,
      delete: true,
      edit: true
    }));
  }
}
