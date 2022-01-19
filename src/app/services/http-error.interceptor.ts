import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpErrorResponse, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatSnackBar } from "@angular/material/snack-bar";
import {
  TableViewErrorSnackBarComponent
} from "../components/view-error-snack-bar/table-view-error-snack-bar.component";

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(private snackBar: MatSnackBar) { }

  private handleError(exception: unknown): void {
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


  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.error instanceof Error) {
          // A client-side or network error occurred. Handle it accordingly.
          console.error('An error occurred:', error.error.message);
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          console.error(`Backend returned code ${error.status}, body was: ${error.error}`, error.error);
        }

        this.handleError(error);

        // If you want to return a new response:
        //return of(new HttpResponse({body: [{name: "Default value..."}]}));

        // If you want to return the error on the upper level:
        return throwError(() => error);

        // or just return nothing:
        // return EMPTY;
      })
    );
  }
}
