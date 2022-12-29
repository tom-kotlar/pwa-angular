import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map, shareReplay, tap } from 'rxjs/operators';
import { Movie } from '../model/interface';


@Injectable({
  providedIn: 'root'
})
export class FilmsService {

  wikiURL = "https://en.wikipedia.org/w/api.php"
  constructor(private http: HttpClient) {

  }

  _fetchAllMovies(): Observable<any> {
    return this.http.get<any>('https://azure-storage-api.azurewebsites.net/api/blob/FILMS')
      .pipe(
        tap(data => console.log(data, "--->")),
        map(res => res.ALLFILMS), 
        shareReplay(1)
      )
  }

  _fetchMovieById(id: string) {
    return this._fetchAllMovies()
    .pipe(
      map(data =>  data.filter(film => film.id === Number(id))),
      tap((data) => console.log(data)),
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
