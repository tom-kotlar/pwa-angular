

import { Component } from '@angular/core';

@Component({
  selector: 'app-not-found',
  template: `
  
  <div fxLayout="column" fxLayoutAlign="center center" style="padding-top: 60px"> 
  <a  mat-button href="home" >BACK</a>
    <img src="https://miro.medium.com/max/1400/1*ASPrAbd2qtFVSVuru7Y7Rw.png" width="90%"  alt="404 page" style="padding-top: 10px" >
    <a href="https://dribbble.com/shots/2309412-Daily-UI-404-Error" style="text-decoration: none">Credits</a>
  </div>
  
 
    `
})
export class NotFoundComponent { }

