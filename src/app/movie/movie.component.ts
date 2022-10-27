import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, Subscription } from 'rxjs';
import { catchError, map, shareReplay, tap,  } from 'rxjs/operators';
import { FilmsService } from '../services/films.service';
import { ActivatedRoute } from '@angular/router';
import { Movie } from "../model/interface";

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
  vehicles: string[];
}

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss'],
})
export class MovieComponent implements OnInit {
  // films$: Observable<any>
  id: any;
  movieData: Subscription

  private starWarsUrl = 'https://swapi.dev/api/films/1';

  constructor(
    private http: HttpClient,
    private filmsService: FilmsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // this.fetchMovie()
    // this.fetchFilms();
    this.route.paramMap.subscribe((params) => {
      console.log(params, 'PARAMS>>>');
      this.id = params.get('id');
      console.log(this.id, 'PARAMS ID >>>');
    });

    this.movieData = this.filmsService.loadAllLessons().subscribe(data => data.filter((movie: any) => movie.id === this.id))
    console.log(this.movieData, "????")
    // console.log(this.route.data, this.route.snapshot.params);
  }
//  fetchMovie() {
//     this.filmsService.loadAllLessons().subscribe(data => data.filter())
  // .pipe(
  //        tap((data) => console.log(data.id, "????")),
  //       map(  
        
  //         (data: any) => data.filter((movie: any) => movie.id === 2)
        
  //       ), 
        // tap((data) => console.log(data, this.id,"????")),
  // .pipe(
  //   map(data => data.filter(data => data.id === this.id)), 
  //   tap(data => console.log(data, ">>>>")),
  //  )




// }

  // fetchFilms() {
  //   this.films$ = this.http.get<Films>(this.starWarsUrl).pipe(
  //     tap((data) => console.log(data)),
  //     catchError(this.handleError<Films>()),
  //     shareReplay()
  //   );
  // }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
