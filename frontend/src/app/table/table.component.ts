import { Component } from '@angular/core';
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
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {

  header:string[]  = [ 'Nome', 'Cognome', 'Codice Fiscale', 'Indirizzo', 'Partita IVA' ];
  clients:Client[];

  constructor(private http: HttpClient, private toastr: ToastrService) { this.clients = []}

  ngOnInit(){
    this.http.get<Client[]>('http://localhost:3000/clients').subscribe(
      (res) => {console.log(res); this.clients = res },
      (err) => { this.toastr.error('Login Required', 'Toastr fun!'); }
    )
  }

}
