import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import IUserState from 'src/app/IUserState.interface';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  template: `
    <app-header></app-header>

    <router-outlet></router-outlet>

    <app-footer></app-footer>
  `,
  styles: [],
})
export class AppComponent {
  userServices = inject(UserService);
  router = inject(Router);
  userState!: IUserState;
  constructor() {
    this.userServices.getUserStates$.subscribe((response) => {
      this.userState = response;
    });
  }
  logout() {
    this.userServices.setUserState({
      jwt: '',
      _id: '',
      user_email: '',
      user_name: '',
      user_role: '',
    });
    localStorage.removeItem('USER_STATE');
    this.router.navigate(['']);
  }
}
