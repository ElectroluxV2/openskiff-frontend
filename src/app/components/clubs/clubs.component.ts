import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from "../../services/api.service";
import { Club } from "../../services/club";
import { MatTable, MatTableDataSource } from "@angular/material/table";
import { SelectionModel } from "@angular/cdk/collections";
import { MatDialog } from "@angular/material/dialog";
import { ClubDialogComponent } from "./club-dialog/club-dialog.component";
import { firstValueFrom } from "rxjs";
import { MatSnackBar } from "@angular/material/snack-bar";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: 'app-clubs',
  templateUrl: './clubs.component.html',
  styleUrls: ['./clubs.component.scss']
})
export class ClubsComponent {
  // @ts-ignore
  @ViewChild(MatTable) table: MatTable<Club>;
  displayedColumns: string[] = ['select', 'clubId', 'shortName', 'fullName'];
  dataSource = new MatTableDataSource<Club>([])
  selection = new SelectionModel<Club>(true, []);

  constructor(private apiService: ApiService, public dialog: MatDialog, private snackBar: MatSnackBar) {
    apiService.getClubs().then(c => {
      this.dataSource = new MatTableDataSource<Club>(c);
    });
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  public masterToggle(): void {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  public checkboxLabel(row?: Club): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.clubId}`;
  }

  public async openDialog(): Promise<void> {
    const dialogRef = this.dialog.open(ClubDialogComponent);

    const club: Club = await firstValueFrom(dialogRef.afterClosed());
    if (!(club instanceof Object)) return;

    try {
      club.clubId = await this.apiService.saveClub(club) as number;
      this.dataSource.data.push(club);
      this.table.renderRows();
    } catch (exception) {
      await this.handleError(exception);
    }
  }

  public async editSelected(): Promise<void> {
    console.log(this.selection.selected);
    for (const club of this.selection.selected) {

    }
  }

  public async deleteSelected(): Promise<void> {
    for (const club of this.selection.selected) {
      try {
        await this.apiService.deleteClub(club);
        this.dataSource.data = this.dataSource.data.filter(x => x.clubId !== club.clubId);
        this.selection.deselect(club);
        this.table.renderRows();
      } catch (exception) {
        await this.handleError(exception);
      }
    }
  }

  private async handleError(exception: unknown): Promise<void> {
    const ref = this.snackBar.open('An error occurred', 'Show', {
      horizontalPosition: 'start',
      verticalPosition: 'bottom',
      duration: 2000
    });

    await firstValueFrom(ref.onAction());
    window.alert((<HttpErrorResponse>exception).error.message);
  }
}
