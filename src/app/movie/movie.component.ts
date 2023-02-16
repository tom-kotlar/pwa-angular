import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of, Subscription } from 'rxjs';
import { catchError, map, shareReplay, tap,  } from 'rxjs/operators';
import { FilmsService } from '../services/films.service';
import { ActivatedRoute } from '@angular/router';

import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';

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
  films$: Observable<any>
  swapiFilm
  SWapi$: Observable<any>
  id: any;
  movieData: Subscription
// newId: any
  starWarsUrl = 'https://swapi.dev/api/films/?search=';

  trustedUrl: SafeUrl;
  dangerousVideoUrl!: string;

  constructor(
    private http: HttpClient,
    private filmsService: FilmsService,
    private activeRoute: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) {
   
    // this.newId  =  this.activeRoute.snapshot.params['id'];

   
  }

  ngOnInit(): void {
    // this.fetchMovie()
    // this.fetchFilms();
    this.activeRoute.paramMap.subscribe((params) => {
      console.log(params, 'PARAMS>>>');
      this.id = params.get('id');
      console.log(this.id, 'PARAMS ID >>>');
    });

   
    
    this.films$ = this.filmsService._fetchMovieById(this.id)
    
   
   

  

    this.films$.subscribe( (data: any) => data.map(value => {
      // this.swapiFilm = value.name
  
      this.SWapi$ = this.filmsService._fetchSWAPIMovie(value.name)
      this.SWapi$.subscribe(data =>data.map(value => value.characters.map(char => this.setDetails(char)))
 
          
        
      )
    
  }))



  }






  


charArr = []
    setDetails(url) {
     
   this.filmsService._fetchSWAPICharacters(url).subscribe( data => this.charArr.push(data))
    
  
  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
// https://github.com/akabab/starwars-api
// https://github.com/alimehdiofficial/starwars-api-build

// https://www.youtube.com/watch?v=ZIMo8JYXzMQ
// https://akabab.github.io/starwars-api/api/all.json