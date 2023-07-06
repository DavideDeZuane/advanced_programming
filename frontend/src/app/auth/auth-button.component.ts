import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

import { HttpClient } from '@angular/common/http';


/* andiamo a definire quella che è la struttura della riposta, in questo modo sappiamo a quali campi è possibile accedere altrimnenti non darebbe errore*/ 
interface Response {
  campo: string;
}

@Component({
  selector: 'app-authentication-button',
  templateUrl: './auth-button.component.html',
  styles: [],
})
export class AuthenticationButtonComponent implements OnInit {
  
  constructor(public auth: AuthService, public http: HttpClient) {}

  prova: string = '';

  ngOnInit(): void {
    this.getData()
  }
  //se non effettuiamo la subscribe non viene effettuata la richiesta
  //con localhost funziona, se metto express no, secondo me perchè lo risolve nginx e non docker
  getData() {
    this.http.get<Response>('http://localhost:3000/public').subscribe(
      (res) => {console.log(res.campo); this.prova = res.campo;}
    )
  }


}