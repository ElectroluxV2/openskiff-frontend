import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: 'app-error-details-dialog',
  templateUrl: './error-details-dialog.component.html',
  styleUrls: ['./error-details-dialog.component.scss']
})
export class ErrorDetailsDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: {exception: HttpErrorResponse}) {}
}
