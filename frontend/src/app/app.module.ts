import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module'; 
// Import the module from the SDK
import { AuthModule } from '@auth0/auth0-angular';

import { environment } from 'src/env/env';
import { LoginButtonComponent } from './auth/login';
import { LogoutButtonComponent } from './auth/logout';
import { AuthenticationButtonComponent } from './auth/auth-button.component';
import { ProfileComponent } from './auth/profile.component.';
/*For API reqquest */
import { AuthHttpInterceptor } from '@auth0/auth0-angular';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    LoginButtonComponent,
    LogoutButtonComponent,
    AuthenticationButtonComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    // Import the module into the application, with configuration
    AuthModule.forRoot({
      ...environment.auth0,
      httpInterceptor: {
        allowedList: [ `${environment.api.serverUrl}/*`,]
      }
    }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true },
  ],

  bootstrap: [AppComponent],
})
export class AppModule {}