import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'; 
import { MatDatepicker } from '@angular/material/datepicker';
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
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
  myForm: FormGroup; 
  constructor(fb: FormBuilder, private http: HttpClient, private toastr: ToastrService) {
    /* creiamo la struttura della form tramite  builder, il binding tra le proprietà del componente e la form è realizzato trmiate la direttiva [formGroup] e tramite 
       formControlName per la corrsipondenza tra ciascun elemento di input e il relativo controllo creato all'interno del componente
    */
    this.myForm = fb.group({
    firstName: ["", [Validators.maxLength(30)]],
    lastName: [],
    birthDate: [],
    fiscalCode: [],
    address:[],
    vatNumber:[]
    });
  }

  visualizzaArticolo(){
    console.log('provo ad inviare')
    this.http.post<Client>('http://localhost:3000/clients', this.myForm.value).subscribe(
      (response) => { console.log(response) },
      (err) => { console.log(err); this.toastr.error('Login Required')}
    )

  }
}