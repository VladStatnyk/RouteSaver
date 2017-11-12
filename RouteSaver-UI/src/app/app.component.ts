import { Component, ViewChild, OnInit } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { RouteService } from '../providers/route-service/route-service';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { ListPage } from '../pages/list/list';
import { Route } from '../models/Route';

@Component({
  templateUrl: 'app.html'
})
export class MyApp implements OnInit  {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  routes: Array<Route>;

  constructor(public platform: Platform,
     public statusBar: StatusBar,
      public splashScreen: SplashScreen,
       public AuthServiceProvider: AuthServiceProvider,
      public RouteService : RouteService) {
      this.initializeApp();

    
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
    // used for an example of ngFor and navigation
    this.RouteService.GetAllRoutes().subscribe(data => {
      this.routes = <Array<Route>>data.json();
    });
}

  openPage(route) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(ListPage, route);
  }
}
