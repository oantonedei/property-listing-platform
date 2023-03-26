import { APP_INITIALIZER, inject, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { SignupComponent } from './signup/signup.component';
import { UserService } from './user.service';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { AddTokenInterceptor } from './add-token.interceptor';



function initializeAppFunction(userService: UserService): () => void {
  return () => {
    const localStorage_state = localStorage.getItem('USER_STATE');
    if (localStorage_state) {
      userService.setUserState(JSON.parse(localStorage_state));
    }
  };
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    WelcomeComponent,
    SignupComponent,
    FooterComponent,
    HeaderComponent,
  
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeAppFunction,
      deps: [UserService],
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AddTokenInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: WelcomeComponent, pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignupComponent },
      {
        path: 'properties',
        loadChildren: () =>
          import('./properties/properties.module').then(
            (m) => m.PropertiesModule
          ),
        canActivate: [
          () => (inject(UserService)._userState.value.jwt ? true : false),
        ],
      },
    ]),
  ],
})
export class AppModule {}
