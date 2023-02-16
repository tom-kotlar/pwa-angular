import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { SwPush } from '@angular/service-worker';
import { NewslaterService } from '../services/newslater.service';
import { FilmsService } from '../services/films.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';



const ROWS_HEIGHT: { [id: number]: number } = { 1: 1200, 3: 880, 4: 600 };

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {
  small = true
  cols: number = 3;
  rowHeight: number = ROWS_HEIGHT[this.cols];

  @Output() columnsCountChange = new EventEmitter<number>();

  readonly VAPID_PUBLIC_KEY =
    'BO2LO73vl7KzPHoGTDkOYeSLXZIAi78jVff5vG5QSK31PJjeDj06GK8LwzIH7Du_ESa9Ya0Xg_QAN4RA9ZSFCMw';

  sub: PushSubscription;
  // films$: Observable<Movie[]>;

  isWideScreen$: Observable<boolean>;



  constructor(
    private swPush: SwPush,
    private newsLetter: NewslaterService,
    private filmsService: FilmsService,
    private breakpointObserver: BreakpointObserver
  ) { }

  ngOnInit(): void {
    // this.loadFilms();
    this.isWideScreen$ = this.breakpointObserver
      .observe([Breakpoints.Large])
      .pipe(map(({ matches }: any) => matches));
  }

  // loadFilms() {
  //   this.films$ = this.filmsService
  //     .loadAllLessons()
  //     .pipe(catchError((err) => of([])));
  // }

  getAllMovies$ = this.filmsService._fetchAllMovies$


  subscribeToNotifications() {
    this.swPush
      .requestSubscription({
        serverPublicKey: this.VAPID_PUBLIC_KEY,
      })
      .then((sub) => {
        console.log('Notification', sub);
        this.sub = sub;
        this.newsLetter.addPushSubscriber(sub).subscribe(
          () => alert(' 👉 Subscription sent to server'),
          (err) => console.log('Could not send subscription to server', err)
        );
      })
      .catch((err) => {
        console.error('Could not subscribe to notifications', err);
      });
  }

  sendNewsletter() {
    alert('📤 Sending Newsletter to all Subscribers ...');
    this.newsLetter.send().subscribe();
  }

  onColumnsUpdated(colsNum: number): void {
    this.columnsCountChange.emit(colsNum);
  }

  onColumnsChange(colsNum: number): void {
    this.cols = colsNum
    this.rowHeight = ROWS_HEIGHT[colsNum];
  }

}
