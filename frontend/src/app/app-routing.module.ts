import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { FormComponent } from './form/form.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ClientsComponent } from './clients/clients.component';
import { TableComponent } from './table/table.component';

/* 
#####################
TODO
#####################
- [] Spostare le rotte in un file separato e poi importarlo 
*/
const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'form', component: FormComponent },
  { path: 'clients', title: 'Clienti', component: ClientsComponent, children: [
      { path: 'forms', component: FormComponent },
      { path: 'forms/:id', component: FormComponent},
      { path: 'table', component: TableComponent } 
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }