import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Films } from "../model/films"
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class FilmsService {

  constructor(private http: HttpClient) {

  }

  loadAllLessons(): Observable<Films[]> {
    return this.http.get<any>('/api/films')
      .pipe(
        map(res => res.lessons)
      )
  }

  findLessonById(id: number) {
    return this.http.get<Films>('/api/lessons/' + id);
  }
}
