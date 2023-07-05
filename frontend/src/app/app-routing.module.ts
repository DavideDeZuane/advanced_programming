import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

/* 
#####################
TODO
#####################
- [] Spostare le rotte in un file separato e poi importarlo 
*/
const routes: Routes = [
  { path: 'app', component: AppComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }