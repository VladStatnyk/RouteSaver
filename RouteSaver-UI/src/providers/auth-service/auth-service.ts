import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import {NavController, App} from "ionic-angular/index";

import { AppConfig } from '../../app/app.config';
import { LoginPage } from '../../pages/login/login';

/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthServiceProvider {

  constructor(public http: Http, public config: AppConfig) {
  }

  // Login a user
  // Normally make a server request and store
  // e.g. the auth token
  login(username: string, password: string) {
   return this.http.post(this.config.apiUrl + '/auth/login', { username: username, password: password });
  
  }

  // Logout a user, destroy token and remove
  // every information related to a user
  register(username: string, password: string) {
    return this.http.post(this.config.apiUrl + '/auth/register', { username: username, password: password });
  }
 
  // Returns whether the user is currently authenticated
  // Could check if current token is still valid
  authenticated(): boolean {
    if (localStorage.getItem('currentUser')) {
      // logged in so return true
      return true;
    }

    return false;
  }

}
