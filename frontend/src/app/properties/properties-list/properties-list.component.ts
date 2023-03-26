import { Component, inject } from '@angular/core';
import IUserState from '../../IUserState.interface';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-properties-list',
  template: `
    <div *ngIf="userState.user_role == 'admin'" class="container">
      <app-admin></app-admin>
    </div>
    <div *ngIf="userState.user_role == 'user'" class="container">
      <app-user></app-user>
    </div>
  `,
  styles: [],
})
export class PropertiesListComponent {
  userService = inject(UserService);
  userState!: IUserState;
  constructor() {
    this.userService.getUserStates$.subscribe((response) => {
      this.userState = response;
    });
  }
}
