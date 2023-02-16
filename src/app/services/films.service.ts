import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { catchError, map, share, shareReplay, tap } from 'rxjs/operators';
import { Movie } from '../models/interface.model';



@Injectable({
  providedIn: 'root'
})
export class FilmsService {

  private azureApi =' https://azure-storage-api.azurewebsites.net/api/blob/FILMS'

  private starWarsUrl = 'https://swapi.dev/api/films/?search=';

  private wikiURL = "https://en.wikipedia.org/w/api.php"

  constructor(private http: HttpClient) { }

 

  _fetchAllMovies$ = this.http.get<{lessons: Movie[]}>('/api/films')
  .pipe(
    tap(data => console.log(data, "--->")),
    map(res => res.lessons), 
    catchError((err) => of([])),
   share()
  )


  _fetchMovieById(id) {
    return this._fetchAllMovies$
    .pipe(
      map(data =>  data.filter((film: Movie) => film.id === Number(id))),
      tap((data) => console.log(data)),
      )
  }

  

  _fetchSWAPIMovie(url): Observable<any> {
    return this.http.get<any>(`${this.starWarsUrl}${url}&format=json`)
    .pipe(
      tap(data => console.log(data, "SWAPI")),
      map(data =>  data.results),
      tap(data => console.log(data, "SW")),
      )
  }


  _fetchSWAPICharacters(url): Observable<any> {
    return this.http.get<any>(`${url}`)
    .pipe(
      tap(data => console.log(data, "SWAPICHARACTERS")),
      // map(data =>  data.results),
      // tap(data => console.log(data, "SW")),
      )
  }

  wikimedia(searText: string | any) {
    return this.http.get<any>(this.wikiURL, {
      params: {
        action: 'query',
        format: 'json',
        list: 'search',
        srsearch: searText,
        origin: '*',
        srlimit: 100,
      }
    });
  }
}
