import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, of } from 'rxjs';
import { catchError, shareReplay, tap, } from 'rxjs/operators';


interface Films {
  characters: string[];
  created: string;
  director: string;
  edited: string;
  episode_id: number;
  opening_crawl: string;
  planets: string[];
  producer: string;
  release_date: string;
  species: string[];
  starships: string[];
  title: string;
  url: string;
  vehicles: string[]
}



@Component({
  selector: 'app-film',
  templateUrl: './film.component.html',
  styleUrls: []
})
export class FilmComponent implements OnInit {

  films$: Observable<Films>;


  private starWarsUrl = "https://swapi.dev/api/films/1"

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchFilms()
  }

  fetchFilms() {
    this.films$ = this.http.get<Films>(this.starWarsUrl)
      .pipe(
        tap(data => console.log(data)),
        catchError(this.handleError<Films>()),
        shareReplay()
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }


}
