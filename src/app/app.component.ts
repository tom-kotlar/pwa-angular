import { Component, OnInit } from '@angular/core';
import { SwUpdate } from "@angular/service-worker";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  links = ['home', 'movies', 'series', 'comics', 'characters'];
  titles = ['Home', 'Movies', 'Series', 'Comics', 'Characters'];

  constructor(private swUpdate: SwUpdate) { }

  ngOnInit() {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe(() => {
        if (confirm("New Version is Availible, Load new Version?")) {
          window.location.reload()
        }
      })
    }
  }
}
