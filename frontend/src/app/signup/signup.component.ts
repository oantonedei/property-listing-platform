import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder,FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import IUserState from '../IUserState.interface';
import { UserService } from '../user.service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-signup',
  template: `
    <section class="bg-gray-50 dark:bg-gray-900">
      <div
        class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0"
      >
        <a
          href="#"
          class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <img class="w-8 h-8 mr-2" src="../assets/image8.png" alt="logo" />
          SweetHome
        </a>
        <div
          class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
        >
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1
              class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
            >
              Create and account
            </h1>
            <form [formGroup]="signupForm" (ngSubmit)="signup()" class="space-y-4 md:space-y-6" action="#" >
              <div>
                <label
                  for="fullname"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Fullname</label
                >
                <input
                  type="text"
                  name="fullname"
                  id="fullname"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="fullname"
                  formControlName="user_name"
                  required=""
                />
              </div>
              <div>
                <label
                  for="email"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Email</label
                >
                <input
                  type="email"
                  name="email"
                  id="email"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="email"
                  formControlName="user_email"
                  required=""
                />
              </div>
              <div
                *ngIf="
                  user_email?.invalid &&
                  (signupForm.dirty || signupForm.touched)
                "
              >
                <div *ngIf="!user_email?.valid">Invalid email!</div>
              </div>
              <div>
                <label
                  for="password"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Password</label
                >
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  formControlName="user_password"
                  required=""
                />
              </div>
              <div>
                <label
                  for="confirm-password"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Confirm Password</label
                >
                <input
                  type="password"
                  name="confirm-password"
                  id="confirm-password"
                  placeholder="••••••••"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                />
              </div>
              <div>
                <label
                  for="user-role"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >User Role</label
                >
                <select
                  id="user-role"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  formControlName="user_role"
                  required=""
                >
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
              </div>
              <div class="flex items-start">
                <div class="flex items-center h-5">
                  <input
                    id="terms"
                    aria-describedby="terms"
                    type="checkbox"
                    class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                    required=""
                  />
                </div>
                <div class="ml-3 text-sm">
                  <label
                    for="terms"
                    class="font-light text-gray-500 dark:text-gray-300"
                    >I accept the
                    <a
                      class="font-medium text-primary-600 hover:underline dark:text-primary-500"
                      href="#"
                      >Terms and Conditions</a
                    ></label
                  >
                </div>
              </div>
              <button
                type="submit"
                class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                [disabled]="!signupForm.valid"
              >
                Create an account
              </button>
              <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account?
                <a
                  href="#"
                  class="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >Login here</a
                >
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
    <br />
  `,
  styles: [
    `
      img {
        width: 30%;
        height: 45%;
      }
    `,
  ],
})
export class SignupComponent {
  userService = inject(UserService);
  router = inject(Router);
  title = 'Sign Up Form';
  signupForm = inject(FormBuilder).nonNullable.group({
    user_name: ['', Validators.required],
    user_email: ['', Validators.required],
    user_password: ['', Validators.required],
    user_role: ['', Validators.required],
  });
  get user_email() {
    return this.signupForm.get('user_email');
  }
  constructor(private http: HttpClient) {}
  signup() {
    this.userService
      .signup(
        this.signupForm.value as {
          user_name: string;
          user_email: string;
          user_password: string;
          user_role: string;
        }
      )
      .subscribe((response) => {
        this.router.navigate(['login']);
      });
  }
}
