import { Component } from '@angular/core';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  
  links = [
    {
      text: 'Form',
      router: 'form',
    },
    {
      text: 'FAQ',
      router: 'faq'
    },
    {
      text: 'Altro',
      router: ''
    }
  ]
}
