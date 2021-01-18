import { Component, OnInit } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { NewslaterService } from "../services/newslater.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  readonly VAPID_PUBLIC_KEY = 'BO2LO73vl7KzPHoGTDkOYeSLXZIAi78jVff5vG5QSK31PJjeDj06GK8LwzIH7Du_ESa9Ya0Xg_QAN4RA9ZSFCMw'

  sub: PushSubscription

  constructor(private swPush: SwPush, private newsLetter: NewslaterService) { }

  ngOnInit(): void {
  }



  subscribeToNotifications() {
    this.swPush.requestSubscription({
      serverPublicKey: this.VAPID_PUBLIC_KEY
    })
      .then(sub => {
        console.log("Notification", sub)
        this.sub = sub
        this.newsLetter.addPushSubscriber(sub).subscribe(
          () => alert(' 👉 Subscription sent to server'),
          err => console.log('Could not send subscription to server', err)
        )
      })
      .catch(err => {
        console.error("Could not subscribe to notifications", err)
      })
  }


  sendNewsletter() {
    alert("📤 Sending Newsletter to all Subscribers ...");
    this.newsLetter.send().subscribe();
  }


}
