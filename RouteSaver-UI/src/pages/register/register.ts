import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service'
import { LoginPage } from '../login/login'

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  registerCredentials = { email: '', password: '' };
  constructor(public navCtrl: NavController, public navParams: NavParams, public authservice: AuthServiceProvider) {
  }

  register():void{
    this.authservice.register(this.registerCredentials.email, this.registerCredentials.password)
    .subscribe(data => {
      this.navCtrl.push(LoginPage);
    }, error => {
      console.log("Error register");
    });
    
  }

}
