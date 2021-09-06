import { Injectable } from '@angular/core';

import {
  HttpClient,
  HttpErrorResponse
} from '@angular/common/http';

import { environment } from '../../../environments/environment';

import { throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})

export class LandingPageService {

  constructor(
    private _http: HttpClient
  ) { }

  // Get pokemon
  public getPokemon(limit, offset) {
    return this._http
      .get(environment.rootEndpoint + "?limit=" + limit + "&offset=" + offset)
      .pipe(
        retry(3), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );
  }

  // Get pokemon by id
  public getPokemonById(pokemonID: number) {
    return this._http
      .get(environment.rootEndpoint + "/" + pokemonID + '/')
      .pipe(
        retry(3), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('A client error occurred:', error);
      return throwError(error.error);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.message}`
      );
      return throwError(error);
    }
  }
}
