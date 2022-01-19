import { Component } from '@angular/core';
import { from, ModelEntityColumn } from "./components/table-view/model-entity-column";
import { Club, ModelEntity, Penalty, Race, Regatta, Sailor, YearCategory } from "./services/api.interface";
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
    this.tables.push(new Table<Club>('Club', 'Clubs', from([{
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
  }
}
