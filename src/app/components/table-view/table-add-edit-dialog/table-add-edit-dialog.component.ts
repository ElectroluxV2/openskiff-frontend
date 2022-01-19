import { Component, ViewChild} from '@angular/core';
import { FormBuilder, NgForm, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'app-table-add-edit-dialog',
  templateUrl: './table-add-edit-dialog.component.html',
  styleUrls: ['./table-add-edit-dialog.component.scss']
})
export class TableAddEditDialogComponent {
  // @ts-ignore
  @ViewChild('form') form: NgForm;

  clubForm = this.fb.group({
    shortName: ['', [Validators.required, Validators.max(64), Validators.nullValidator]],
    fullName: ['', [Validators.required, Validators.max(256), Validators.nullValidator]]
  })

  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<TableAddEditDialogComponent>) { }

  public submit(): void {
    if (this.clubForm.invalid) return;
    this.dialogRef.close(this.clubForm.value);
  }
}
