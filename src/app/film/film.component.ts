import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-film',
  templateUrl: './film.component.html',
  styleUrls: []
})
export class FilmComponent implements OnInit {

  films
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchFilms()
  }
  fetchFilms() {
    this.http.get('https://swapi.dev/api/films/1')
   .subscribe(data => this.films = data)
}
}
