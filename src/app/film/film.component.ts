import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, shareReplay, tap } from 'rxjs/operators';
import { FilmsService } from '../services/films.service';



@Component({
  selector: 'app-film',
  templateUrl: './film.component.html',
  styleUrls: [],
})
export class FilmComponent implements OnInit {
  
  results: any = [];

  totalResults: any;
  page: number = 1;

  one 
  constructor(private http: HttpClient, private filmsService: FilmsService) {}

  ngOnInit(): void {
    this.fetchCharacters();
  }



  fetchCharacters() {
    this.filmsService
      .wikimedia('Luke Skywalker')
      .subscribe((data: any) => {
        console.log(data, "-->");
        this.results = data.query.search;
        console.log(this.results, "RESULT");
      this.totalResults = data.query.search.length;
   
      });
  }

 
}
