import { Component } from '@angular/core';
import { faAdd, faRefresh } from '@fortawesome/free-solid-svg-icons';

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
}
