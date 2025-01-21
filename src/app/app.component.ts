import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { environment } from './environments/environments';
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  //  app = initializeApp(environment.firebaseConfig);
  // analytics = getAnalytics(this.app);

  constructor() {
    // if (this.app) {
    // //  console.log('Firebase foi inicializado com sucesso:', this.app);
    // } else {
    //  // console.error('Erro ao inicializar o Firebase');
    // }
  }
}
