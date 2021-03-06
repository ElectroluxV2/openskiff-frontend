import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { ApiService } from "../../services/api.service";
import { ModelEntity, Page, Sort } from "../../services/api.interface";
import { MatTable, MatTableDataSource } from "@angular/material/table";
import { SelectionModel } from "@angular/cdk/collections";
import { MatDialog } from "@angular/material/dialog";
import { TableAddEditDialogComponent } from "./table-add-edit-dialog/table-add-edit-dialog.component";
import { catchError, firstValueFrom, map, merge, startWith, switchMap, of as observableOf, filter } from "rxjs";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { TableViewErrorSnackBarComponent } from "../view-error-snack-bar/table-view-error-snack-bar.component";
import { Table } from "./table";


@Component({
  selector: 'app-table-view[table]',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.scss']
})
export class TableViewComponent implements AfterViewInit, OnInit {
  @Input('table') sourceDatabaseTable!: Table<ModelEntity>;
  @ViewChild(MatTable) table!: MatTable<ModelEntity>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  isLoadingResults = true;
  errorOccurred = false;

  public probe: {
    [key: string]: any
  } = {};
  private searchTimeout: number = 0;

  displayedColumns: string[] = [];
  dataSource = new MatTableDataSource<ModelEntity>([]);
  resultsLength = 0;
  selection = new SelectionModel<ModelEntity>(true, []);

  constructor(private apiService: ApiService, public dialog: MatDialog, private snackBar: MatSnackBar) {
    apiService.tableChangeNotifier
      .pipe(filter(packet => packet.table === this.sourceDatabaseTable.modelEntityName))
      .subscribe(packet => {
        this.paginator.page.emit();
    });
  }

  public ngOnInit(): void {
    this.displayedColumns = ['select', ...this.sourceDatabaseTable.columns.map(c => c.columnDef)]
  }

  public async ngAfterViewInit(): Promise<void> {
    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.apiService
            .getAll(this.sourceDatabaseTable.modelEntityName, {
              page: new Page(this.paginator),
              sort: new Sort(this.sort),
              probe: this.probe as ModelEntity
            })
            .pipe(catchError(() => observableOf(null)));
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
          this.resultsLength = data.request.page.totalElements;
          return data.items;
        }),
      )
      .subscribe(data => (this.dataSource.data = data));
  }

  public async openDialog(sourceObject?: ModelEntity): Promise<void> {
    const dialogRef = this.dialog.open(TableAddEditDialogComponent, {
      data: {
        table: this.sourceDatabaseTable,
        sourceObject
      }
    });

    const item: ModelEntity = await firstValueFrom(dialogRef.afterClosed());
    if (!(item instanceof Object)) return;

    try {
      this.isLoadingResults = true;
      await this.apiService.save(this.sourceDatabaseTable.modelEntityName, item); // Changes will be refreshed through WS packet
      // TODO: Optimistic visual changes, we can assume that it will succeed and imitate visual effects in table until response will come back.

    } catch (exception) {
      this.isLoadingResults = false;
      await this.handleError(exception);
    }
  }

  public async add(): Promise<void> {
    await this.openDialog();
  }

  public async editSelected(): Promise<void> {
    for (const item of this.selection.selected) {
      await this.openDialog(item);
      this.selection.toggle(item);
    }
  }

  public async deleteSelected(): Promise<void> {
    for (const item of this.selection.selected) {
      try {
        this.isLoadingResults = true;
        await this.apiService.delete(this.sourceDatabaseTable.modelEntityName, item); // Changes will be refreshed through WS packet
        // TODO: Optimistic visual changes, we can assume that it will succeed and imitate visual effects in table until response will come back.
        this.selection.clear(); // Remove selection
      } catch (exception) {
        this.isLoadingResults = false;
        await this.handleError(exception);
      }
    }
  }

  private async handleError(exception: unknown): Promise<void> {
    this.snackBar.openFromComponent(TableViewErrorSnackBarComponent, {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: ['mat-toolbar', 'mat-warn'],
      duration: 15000,
      data: {
        exception
      }
    });
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
  public checkboxLabel(row?: ModelEntity): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.ids}`;
  }

  public onSearchChange(header: string, value: string) {

    if (value === '') {
      delete this.probe[header];
    } else {
      this.probe[header] = value;
    }

    this.searchTimeout && clearTimeout(this.searchTimeout);
    this.searchTimeout = setTimeout(this.doSearch.bind(this), 300);
  }

  private doSearch() {
    console.log(this.probe)
    this.paginator.page.emit();
  }
}
