import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { RouteService } from '../../providers/route-service/route-service';
import { LoginPage } from '../login/login';

import { ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { } from 'googlemaps';
import { MapsAPILoader } from '@agm/core';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

  constructor(public navCtrl: NavController, public AuthServiceProvider: AuthServiceProvider,
    private mapsAPILoader: MapsAPILoader, public RouteService: RouteService) {

  }

  public middlePoints:Array<Number>;
  public middlePointsRef:Array<HTMLInputElement>;
  public routeName: string;

  @ViewChild("startPointRef")
  public startPointRef: ElementRef;

  @ViewChild("endPointRef")
  public endPointRef: ElementRef;

  ionViewCanEnter() {
     if(!this.AuthServiceProvider.authenticated()){
       console.log("inside");
        this.navCtrl.push(LoginPage);
     }
  }

  ngOnInit() {
    this.middlePoints = new Array<Number>();
    this.middlePointsRef = new Array<HTMLInputElement>();
    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
       new google.maps.places.Autocomplete(this.startPointRef.nativeElement, {
        types: ["(cities)"]
      });
    });

    this.mapsAPILoader.load().then(() => {
      new google.maps.places.Autocomplete(this.endPointRef.nativeElement, {
        types: ["(cities)"]
      });
    });
  }

  public AddMiddlePoint():void{
    let newPointID = this.middlePoints.length + 1;
    this.middlePoints.push(newPointID);
    let tempArray = this.middlePointsRef;
    setTimeout(function(){
      let newSearchElem = document.getElementById(newPointID.toString());
      let inputElem = <HTMLInputElement>newSearchElem;
      tempArray.push(inputElem);
      new google.maps.places.Autocomplete(inputElem, {
        types: ["(cities)"]
      });
    }, 500) 

    this.middlePointsRef = tempArray;
  }

  public SaveRoute():void{
    let start = this.startPointRef.nativeElement.value;
    let end = this.endPointRef.nativeElement.value;

    let tempArray = new Array<string>();
    for(let i = 0; i< this.middlePointsRef.length; i++){
      tempArray.push(this.middlePointsRef[i].value);
    }
    
    this.RouteService.SaveRoute(this.routeName, start, end, tempArray);
  }
}
