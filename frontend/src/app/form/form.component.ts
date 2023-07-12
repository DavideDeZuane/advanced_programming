import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'; 

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
  myForm: FormGroup; 
  constructor(fb: FormBuilder) {
    /* creiamo la struttura della form tramite  builder, il binding tra le proprietà del componente e la form è realizzato trmiate la direttiva [formGroup] e tramite 
       formControlName per la corrsipondenza tra ciascun elemento di input e il relativo controllo creato all'interno del componente
    */
    this.myForm = fb.group({
    firstName: ["", [Validators.maxLength(30)]],
    lastName: [],
    birthDate: [],
    fiscalCode: [],
    address:[]
    });
  }

  visualizzaArticolo() {
    console.log(this.myForm.value);
 }
}