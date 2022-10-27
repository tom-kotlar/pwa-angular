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

  constructor(private http: HttpClient, private filmsService: FilmsService) {}

  ngOnInit(): void {
    this.fetchCharacters();
  }



  fetchCharacters() {
    this.filmsService
      .wikimedia('Star_Wars')
      .subscribe((data: any) => {
        console.log(data, "-->");
        this.results = data.query.search;

      this.totalResults = data.query.search.length;
      });
  }

 
}
