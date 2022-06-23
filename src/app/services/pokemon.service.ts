import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { Pokemon } from '../models/pokemon';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private apiURL = environment.apiURL;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<Pokemon[]> {
    return this.httpClient.get<Pokemon[]>(this.apiURL+'?idAuthor=1')
    .pipe(
      catchError(this.errorHandler)
    )
  }
    
  create(Pokemon: Pokemon): Observable<Pokemon> {
    return this.httpClient.post<Pokemon>(this.apiURL, JSON.stringify(Pokemon), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }  
    
  find(id:number): Observable<Pokemon> {
    return this.httpClient.get<Pokemon>(this.apiURL +'/'+ id)
    .pipe(
      catchError(this.errorHandler)
    )
  }
    
  update(id:number, pokemon:Pokemon): Observable<Pokemon> {
    return this.httpClient.put<Pokemon>(this.apiURL +'/'+ id, JSON.stringify(pokemon), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }
    
  delete(id:number){
    return this.httpClient.delete<Pokemon>(this.apiURL +'/'+ id, this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }
     
   
  errorHandler(error :any) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
 }
}
