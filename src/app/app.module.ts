import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from "@angular/material/tabs";
import { TableViewComponent } from './components/table-view/table-view.component';
import { MatTableModule } from "@angular/material/table";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatDialogModule } from "@angular/material/dialog";
import { TableAddEditDialogComponent } from './components/table-view/table-add-edit-dialog/table-add-edit-dialog.component';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule } from "@angular/material/sort";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { TableViewErrorSnackBarComponent } from './components/view-error-snack-bar/table-view-error-snack-bar.component';
import { ErrorDetailsDialogComponent } from './components/view-error-snack-bar/error-details-dialog/error-details-dialog.component';
import { HttpErrorInterceptor } from "./services/http-error.interceptor";

@NgModule({
  declarations: [
    AppComponent,
    TableViewComponent,
    TableAddEditDialogComponent,
    TableViewErrorSnackBarComponent,
    ErrorDetailsDialogComponent
  ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MatTabsModule,
        MatTableModule,
        HttpClientModule,
        MatToolbarModule,
        MatButtonModule,
        MatCheckboxModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        ReactiveFormsModule,
        MatSnackBarModule,
        MatPaginatorModule,
        MatSortModule,
        MatProgressSpinnerModule,
        FormsModule
    ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: HttpErrorInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
