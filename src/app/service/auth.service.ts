import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  newUser(email: string, password: string) {
    return this.http.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAn3ebFlvI3PzWAafDt_ON6xR_3RQR4AiU', {
      email, password, returnSecureToken: true
    })
  }

  signIn(email: string, password: string) {
    return this.http.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAn3ebFlvI3PzWAafDt_ON6xR_3RQR4AiU', {
      email, password, returnSecureToken: true
    })
  }
}
