import { Component } from '@angular/core';
import { ModelEntityColumn } from "./components/clubs/model-entity-column.interface";
import { Club, ModelEntity, Sailor } from "./services/api.interface";

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
    modelEntityName: 'club',
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
    modelEntityName: 'sailor',
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
  }];
}
