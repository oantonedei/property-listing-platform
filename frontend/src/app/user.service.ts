import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import IUserState from 'src/app/IUserState.interface';
import { BehaviorSubject, map, tap } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  SERVER = environment.SERVER;
  _userState: BehaviorSubject<IUserState> = new BehaviorSubject({
    jwt: '',
    _id: '',
    user_email: '',
    user_name: '',
    user_role: '',
  });
  getUserStates$ = this._userState.asObservable();
  setUserState(newState: IUserState) {
    this._userState.next(newState);
  }

  constructor(private http: HttpClient) {}

  login(user: { user_email: string; user_password: string }) {
    return this.http.post<{ success: boolean; results: string }>(
      this.SERVER +'/api/users/login',
      user
    );
  }
  signup(user: {
    user_name: string;
    user_email: string;
    user_password: string;
    user_role: string;
  }) {
    return this.http.post<{ success: boolean; results: string }>(
      this.SERVER +'/api/users/signup',
      user
    );
  }
  requestPropertyById(prop_id: string, rent_req:{number_of_months: number, start_date: Date}) {
    console.log(rent_req)
    return this.http.patch<{ success: boolean, result: string }>(
      this.SERVER +`/api/users/request/${prop_id}`, rent_req).pipe(
       map((response) => {
         console.log(response.result);
         
         return response.result;
       }
        
      )
    );
  }
}
