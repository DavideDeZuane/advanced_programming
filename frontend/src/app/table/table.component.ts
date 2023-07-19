import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

const delete_msg = (name:string) => {
  return `Are you sure you want to delete the ${name}? the action is irreversible`
}

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
  edit = faEdit;
  delete = faTrash;


  clients:Client[];

  constructor(private http: HttpClient, private toastr: ToastrService, private router: Router) { this.clients = []}

  allowedProp(key:string):boolean {
    if(key === '_id') return false;
    if(key === 'birthDate') return false;
    return true;
  }

  ngOnInit(){
    this.http.get<Client[]>('http://localhost:3000/clients').subscribe(
      (res) => {console.log(res); this.clients = res },
      (err) => { console.log(err); this.toastr.error('Login Required', 'Toastr fun!'); }
    )
  }

  Edit(id:string){
      this.router.navigate(['clients/forms', id]);
  }

  Delete(id:string){
    Swal.fire({
      title:'Warning', 
      text: delete_msg('user'),
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Elimina',
      cancelButtonText: 'Annulla'
    }).then( (result) => { 
      if(result.isConfirmed) 
        this.http.delete<Client>(`http://localhost:3000/clients/${id}`).subscribe(
          (res) => { this.toastr.success('Eliminato con successo') }
      );
    });
  }

}
