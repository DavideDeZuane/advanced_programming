import { Component, OnInit } from '@angular/core';
import { faAdd, faRefresh } from '@fortawesome/free-solid-svg-icons';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

interface Response {
  firstName:string;
  lastName:string;
  fiscalCode: string;
  vatNumber: string;
  address: string;
}

class Client implements Response{
  
  firstName:string = '';
  lastName:string = '';
  fiscalCode:string = '';
  vatNumber: string = ''
  address: string = ''

  constructor(){}
}

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent {
  icon = {
    add: faAdd,
    refresh: faRefresh,
  }

  header:string[]  = [ 'Nome', 'Cognome', 'Codice Fiscale', 'Indirizzo', 'Partita IVA' ];


  clients:Client[];

  constructor(private http: HttpClient, private toastr: ToastrService) { this.clients = []}

  ngOnInit(){
    this.http.get<Client[]>('http://localhost:3000/clients').subscribe(
      (res) => {console.log(res); this.clients = res },
      (err) => { this.toastr.error('Login Required', 'Toastr fun!'); }
    )
  }

  getObjectKeys(obj: any): string[] {
    return Object.keys(obj);
  }

}
