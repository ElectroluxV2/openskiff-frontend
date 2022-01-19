import { Component, Inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { ModelEntity } from "../../../services/api.interface";
import { Table } from "../table";

interface AddEditDialogData {
  table: Table<ModelEntity>;
  sourceObject?: ModelEntity;
}

@Component({
  selector: 'app-table-add-edit-dialog',
  templateUrl: './table-add-edit-dialog.component.html',
  styleUrls: ['./table-add-edit-dialog.component.scss']
})
export class TableAddEditDialogComponent {
  @ViewChild('form') form!: NgForm;
  public modelEntityForm: FormGroup;

  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<TableAddEditDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: AddEditDialogData) {
    console.log(data)

    const controlsConfig: {
      [key: string]: any;
    } = {};

    for (const column of data.table.columns) {
      controlsConfig[column.columnDef] = column.controlsConfig;
    }

    console.log(controlsConfig)

    this.modelEntityForm = this.fb.group(controlsConfig);
  }

  public submit(): void {
    if (this.modelEntityForm.invalid) return;
    this.dialogRef.close(this.modelEntityForm.value);
  }

  public getValue(columnDef: string): string {
    return !!this.data.sourceObject ? this.data.sourceObject['shortName'] : 'a';
  }
}
