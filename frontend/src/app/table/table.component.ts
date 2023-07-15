import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';


interface Response {
  _id:string;
  firstName:string;
  lastName:string;
  fiscalCode: string;
  vatNumber: string;
  address: string;
  createdAt:string;
}

class Client implements Response{
  
  _id: string = '';
  firstName:string = '';
  lastName:string = '';
  fiscalCode:string = '';
  vatNumber: string = '';
  createdAt: string = '';
  address: string = '';

  constructor(){}
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {

  header:string[]  = ['Nome', 'Cognome', 'Codice Fiscale', 'Indirizzo', 'Partita IVA', 'Action' ]
  icon = faEdit;
  delete = faTrash;


  clients:Client[];

  constructor(private http: HttpClient, private toastr: ToastrService) { this.clients = []}

  allowedProp(key:string):boolean {
    if(key === '_id') return false;
    if(key === 'birthDate') return false;
    return true;
  }

  ngOnInit(){
    this.http.get<Client[]>('http://localhost:3000/clients').subscribe(
      (res) => {console.log(res); this.clients = res },
      (err) => { this.toastr.error('Login Required', 'Toastr fun!'); }
    )
  }

}
