import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { FormComponent } from './form/form.component';
import { NavbarComponent } from './navbar/navbar.component';

/* 
#####################
TODO
#####################
- [] Spostare le rotte in un file separato e poi importarlo 
*/
const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'form', component: FormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }