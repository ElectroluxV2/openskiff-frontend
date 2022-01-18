import { Component } from '@angular/core';
import { ModelEntityColumn } from "./components/clubs/model-entity-column.interface";
import { Club, ModelEntity, Penalty, Race, Regatta, Sailor, YearCategory } from "./services/api.interface";

interface Table {
  modelEntityName: string;
  label: string;
  columns: ModelEntityColumn<ModelEntity>[];
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  tables: Table[] = [{
    modelEntityName: 'Club',
    label: 'Clubs',
    columns: [{
      columnDef: 'clubId',
      header: '#',
      cell: (element: Club) => `${element.clubId}`
    }, {
      columnDef: 'shortName',
      header: 'Short Name',
      cell: (element: Club) => `${element.shortName}`
    }, {
      columnDef: 'fullName',
      header: 'Full Name',
      cell: (element: Club) => `${element.fullName}`
    }]
  }, {
    modelEntityName: 'Sailor',
    label: 'Sailors',
    columns: [{
      columnDef: 'sailorId',
      header: '#',
      cell: (element: Sailor) => `${element.sailorId}`
    }, {
      columnDef: 'sex',
      header: 'Sex',
      cell: (element: Sailor) => `${element.sex}`
    }, {
      columnDef: 'birthdate',
      header: 'Birth date',
      cell: (element: Sailor) => `${element.birthDate}`
    }, {
      columnDef: 'givenName',
      header: 'Given name',
      cell: (element: Sailor) => `${element.givenName}`
    }, {
      columnDef: 'familyName',
      header: 'Family name',
      cell: (element: Sailor) => `${element.familyName}`
    }]
  }, {
    modelEntityName: 'Race',
    label: 'Races',
    columns: [{
      columnDef: 'raceNumber',
      header: '#',
      cell: (element: Race) => `${element.raceNumber}`
    }, {
      columnDef: 'regattaId',
      header: 'Regatta Id',
      cell: (element: Race) => `${element.regattaId}`
    }]
  }, {
    modelEntityName: 'YearCategory',
    label: 'Year categories',
    columns: [{
      columnDef: 'yearCategory',
      header: 'Category',
      cell: (element: YearCategory) => `${element.category}`
    }, {
      columnDef: 'youngerThan',
      header: 'Younger than',
      cell: (element: YearCategory) => `${element.youngerThan}`
    }]
  }, {
    modelEntityName: 'Penalty',
    label: 'Penalties',
    columns: [{
      columnDef: 'regattaId',
      header: 'Regatta Id',
      cell: (element: Penalty) => `${element.regattaId}`
    }, {
      columnDef: 'raceNumber',
      header: 'Race number',
      cell: (element: Penalty) => `${element.raceNumber}`
    }, {
      columnDef: 'sailNumber',
      header: 'Sail number',
      cell: (element: Penalty) => `${element.sailNumber}`
    }, {
      columnDef: 'abbreviation',
      header: 'Abbreviation',
      cell: (element: Penalty) => `${element.abbreviation}`
    }]
  }, {
    modelEntityName: 'Regatta',
    label: 'Regattas',
    columns: [{
      columnDef: 'regattaId',
      header: 'Regatta Id',
      cell: (element: Regatta) => `${element.regattaId}`
    }]
  }];
}
