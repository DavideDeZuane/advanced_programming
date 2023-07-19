import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'; 
import { MatDatepicker } from '@angular/material/datepicker';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';

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
  birthDate: Date = new Date('01/01/1970');

  constructor(){}
}


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
  myForm: FormGroup; 
  id:string = '';

  constructor(fb: FormBuilder, private http: HttpClient, private toastr: ToastrService, private route: ActivatedRoute) {
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

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.id = String(params.get('id'));
    });
    if(this.id !== ''){
      this.http.get<Client>(`http://localhost:3000/clients/${this.id}`).subscribe(
        (res) => {
          this.myForm.get('firstName')?.setValue(res.firstName)
          this.myForm.get('lastName')?.setValue(res.lastName) 
          this.myForm.get('address')?.setValue(res.address)
          this.myForm.get('vatNumber')?.setValue(res.vatNumber)  
          this.myForm.get('fiscalCode')?.setValue(res.fiscalCode) 
          this.myForm.get('birthDate')?.setValue(new Date(res.birthDate)) 
        }
      );
    }
  }

  visualizzaArticolo(){
    console.log('provo ad inviare')
    this.http.post<Client>('http://localhost:3000/clients', this.myForm.value).subscribe(
      (response) => { console.log(response) },
      (err) => { console.log(err); this.toastr.error('Login Required')}
    )

  }
}