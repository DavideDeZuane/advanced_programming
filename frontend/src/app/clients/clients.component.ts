import { Component, OnInit } from '@angular/core';
import { faAdd, faRefresh, faTable } from '@fortawesome/free-solid-svg-icons';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent {
  icon = {
    add: faAdd,
    show: faTable,
    refresh: faRefresh,
  }

  header:string[]  = [ 'Nome', 'Cognome', 'Codice Fiscale', 'Indirizzo', 'Partita IVA' ];



  constructor(private http: HttpClient, private toastr: ToastrService) { }

}
