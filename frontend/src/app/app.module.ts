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
    // Import the module into the application, with configuration
    AuthModule.forRoot({
      domain: environment.auth0.domain,
      clientId: environment.auth0.clientId,
      authorizationParams: {
        redirect_uri: window.location.origin
      }
    }),
  ],

  bootstrap: [AppComponent],
})
export class AppModule {}