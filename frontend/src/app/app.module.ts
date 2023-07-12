import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module'; 
// Import the module from the SDK
import { AuthModule } from '@auth0/auth0-angular';
import {ReactiveFormsModule} from "@angular/forms"; 
import { environment } from 'src/env/env';
import { LoginButtonComponent } from './auth/login';
import { LogoutButtonComponent } from './auth/logout';
import { AuthenticationButtonComponent } from './auth/auth-button.component';
import { ProfileComponent } from './auth/profile.component.';
/*For API reqquest */
import { AuthHttpInterceptor } from '@auth0/auth0-angular';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { FormComponent } from './form/form.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  declarations: [
    AppComponent,
    LoginButtonComponent,
    LogoutButtonComponent,
    AuthenticationButtonComponent,
    ProfileComponent,
    NavbarComponent,
    FooterComponent,
    FormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    // Import the module into the application, with configuration
    AuthModule.forRoot({
      ...environment.auth0,
      httpInterceptor: {
        allowedList: [ `${environment.api.serverUrl}/*`,]
      }
    }),
    NoopAnimationsModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true },
  ],

  bootstrap: [AppComponent],
})
export class AppModule {}