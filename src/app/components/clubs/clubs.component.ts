import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from "../../services/api.service";
import { Club, Page } from "../../services/api.interface";
import { MatTable, MatTableDataSource } from "@angular/material/table";
import { SelectionModel } from "@angular/cdk/collections";
import { MatDialog } from "@angular/material/dialog";
import { ClubDialogComponent } from "./club-dialog/club-dialog.component";
import { catchError, firstValueFrom, map, merge, startWith, switchMap, of as observableOf } from "rxjs";
import { MatSnackBar } from "@angular/material/snack-bar";
import { HttpErrorResponse } from "@angular/common/http";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";

@Component({
  selector: 'app-clubs',
  templateUrl: './clubs.component.html',
  styleUrls: ['./clubs.component.scss']
})
export class ClubsComponent implements AfterViewInit {
  @ViewChild(MatTable) table!: MatTable<Club>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  isLoadingResults = true;
  errorOccurred = false;

  displayedColumns: string[] = ['select', 'clubId', 'shortName', 'fullName'];
  dataSource = new MatTableDataSource<Club>([]);
  resultsLength = 0;
  selection = new SelectionModel<Club>(true, []);

  constructor(private apiService: ApiService, public dialog: MatDialog, private snackBar: MatSnackBar) { }

  public async ngAfterViewInit(): Promise<void> {
    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.apiService.getClubs(
            new Page(this.paginator, this.sort)
          ).pipe(catchError(() => observableOf(null)));
        }),
        map(data => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.errorOccurred = data === null;

          if (data === null) {
            return [];
          }

          // Only refresh the result length if there is new data. In case of rate
          // limit errors, we do not want to reset the paginator to zero, as that
          // would prevent users from re-triggering requests.
          console.log(data.page)

          this.resultsLength = data.page.totalElements;

          console.log(this.resultsLength)
          return data.items;
        }),
      )
      .subscribe(data => (this.dataSource.data = data));
  }

  public async openDialog(): Promise<void> {
    const dialogRef = this.dialog.open(ClubDialogComponent);

    const club: Club = await firstValueFrom(dialogRef.afterClosed());
    if (!(club instanceof Object)) return;

    try {
      club.clubId = await this.apiService.saveClub(club) as number;
      this.paginator.page.emit(); // Refresh results
    } catch (exception) {
      await this.handleError(exception);
    }
  }

  public async editSelected(): Promise<void> {
    // console.log(this.selection.selected);
    // for (const club of this.selection.selected) {
    //
    // }
  }

  public async deleteSelected(): Promise<void> {
    for (const club of this.selection.selected) {
      try {
        await this.apiService.deleteClub(club);
        this.selection.clear(); // Remove selection
        this.paginator.page.emit(); // Refresh results
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

  public isAllSelected(): boolean {
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
}
