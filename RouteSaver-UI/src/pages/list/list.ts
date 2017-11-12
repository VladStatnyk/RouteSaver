import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MyApp } from '../../app/app.component'

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  routeName: any;
  RoutePoints : Array<string>;
  icons: string[];
  items: Array<{title: string, note: string, icon: string}>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    // If we navigated to this page, we will have an item available as a nav param
    this.routeName = navParams.get('routeName');
    this.RoutePoints = navParams.get('routePoints');  
  }

  BackToMain() {
    this.navCtrl.setRoot(MyApp);
  }
}
