import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef, SimpleSnackBar } from "@angular/material/snack-bar";
import { MatDialog } from "@angular/material/dialog";
import { ErrorDetailsDialogComponent } from "./error-details-dialog/error-details-dialog.component";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: 'app-club-error-snack-bar',
  templateUrl: './club-error-snack-bar.component.html',
  styleUrls: ['./club-error-snack-bar.component.scss']
})
export class ClubErrorSnackBarComponent {

  constructor(public dialog: MatDialog, private snackBarRef: MatSnackBarRef<SimpleSnackBar>, @Inject(MAT_SNACK_BAR_DATA) private data: { exception: HttpErrorResponse }) { }

  public showMore(): void {
    this.dialog.open(ErrorDetailsDialogComponent, {
      data: this.data
    });
    this.dismiss();
  }

  public dismiss(): void {
    this.snackBarRef.dismiss();
  }
}
