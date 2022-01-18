import { Component } from '@angular/core';
import { from, ModelEntityColumn } from "./components/clubs/model-entity-column.interface";
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
    columns: from([{
      columnDef: 'clubId',
      header: '#'
    }, {
      columnDef: 'shortName',
      header: 'Short Name'
    }, {
      columnDef: 'fullName',
      header: 'Full Name'
    }])
  }, {
    modelEntityName: 'Sailor',
    label: 'Sailors',
    columns: [{
      columnDef: 'sailorId',
      header: '#',
      cell: (entity: Sailor) => `${entity.sailorId}`
    }, {
      columnDef: 'sex',
      header: 'Sex',
      cell: (entity: Sailor) => `${entity.sex}`
    }, {
      columnDef: 'birthDate',
      header: 'Birth date',
      cell: (entity: Sailor) => `${entity.birthDate}`
    }, {
      columnDef: 'givenName',
      header: 'Given name',
      cell: (entity: Sailor) => `${entity.givenName}`
    }, {
      columnDef: 'familyName',
      header: 'Family name',
      cell: (entity: Sailor) => `${entity.familyName}`
    }]
  }, {
    modelEntityName: 'Race',
    label: 'Races',
    columns: from([{
      columnDef: 'raceNumber',
      header: '#'
    }, {
      columnDef: 'regattaId',
      header: 'Regatta Id'
    }])
  }, {
    modelEntityName: 'YearCategory',
    label: 'Year categories',
    columns: from([{
      columnDef: 'yearCategory',
      header: 'Category'
    }, {
      columnDef: 'youngerThan',
      header: 'Younger than'
    }])
  }, {
    modelEntityName: 'Penalty',
    label: 'Penalties',
    columns: from([{
      columnDef: 'regattaId',
      header: 'Regatta Id'
    }, {
      columnDef: 'raceNumber',
      header: 'Race number'
    }, {
      columnDef: 'sailNumber',
      header: 'Sail number'
    }, {
      columnDef: 'abbreviation',
      header: 'Abbreviation'
    }])
  }, {
    modelEntityName: 'Regatta',
    label: 'Regattas',
    columns: from([{
      columnDef: 'regattaId',
      header: 'Regatta Id'
    }])
  }];
}
