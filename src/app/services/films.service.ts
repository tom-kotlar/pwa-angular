import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';
import { Movie } from '../model/interface';


@Injectable({
  providedIn: 'root'
})
export class FilmsService {

  constructor(private http: HttpClient) {

  }

  loadAllLessons(): Observable<Movie[]> {
    return this.http.get<any>('/api/films')
      .pipe(
        map(res => res.lessons)
      )
  }

  findLessonById(id: number) {
    return this.http.get<Movie>('/api/lessons/' + id);
  }
}
