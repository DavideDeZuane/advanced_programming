import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  
  links = [
    {
      text: 'Clienti',
      router: 'clients',
    },
    {
      text: 'Dispositivi',
      router: 'devices'
    },
    {
      text: 'Components',
      router: 'components'
    },
    {
      text: 'Prototipi',
      router: 'prototypes' 
    },
    {
      text: 'Impiegati',
      router: 'employees'
    },
    {
      text: 'Sistemi',
      router: 'systems'
    },
    {
      text: 'Operazioni',
      router: 'operations'
    }
  ]

}
