import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map, tap } from 'rxjs/operators';
import { Movie } from '../model/interface';



@Injectable({
  providedIn: 'root'
})
export class FilmsService {

  wikiURL = "https://en.wikipedia.org/w/api.php"
  constructor(private http: HttpClient) {

  }

  loadAllLessons(): Observable<any> {
    return this.http.get<any>('/api/films')
      .pipe(
        map(res => res.lessons)
      )
  }

  findLessonById(id: number) {
    return this.http.get<any>('/api/films/')
    .pipe(
      tap(data => console.log(data.lessons, id )),
      map(  
        
        data => data.lessons.filter(data => data.id === id)
      
      ), 
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
