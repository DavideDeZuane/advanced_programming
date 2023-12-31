import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

import { HttpClient } from '@angular/common/http';
import { concat, concatMap } from 'rxjs';


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

  ngOnInit(): void {
  }

}