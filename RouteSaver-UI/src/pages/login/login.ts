import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service'
import { RegisterPage } from '../register/register'
import { HomePage } from '../home/home'

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  registerCredentials = { email: '', password: '' };
  constructor(public navCtrl: NavController, public navParams: NavParams, public authservice: AuthServiceProvider) {
  }

  login(): void {
     this.authservice.login(this.registerCredentials.email, this.registerCredentials.password)
     .subscribe(data => {
      let user = data.json();
      if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.navCtrl.push(HomePage);
      }
  }, error => {
      console.log("Oooops!");
  })
  }

  createAccount(): void{
    this.navCtrl.push(RegisterPage);
  }

}
