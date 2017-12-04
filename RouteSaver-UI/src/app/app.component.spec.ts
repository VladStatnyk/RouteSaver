import { async, TestBed } from '@angular/core/testing';
import { IonicModule, Platform } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { HttpModule } from '@angular/http';
import { AppConfig } from '../app/app.config';
import { MapsAPILoader } from '@agm/core';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { RouteService } from '../providers/route-service/route-service';

import { NavController } from 'ionic-angular';
import { AuthServiceProvider } from '../providers/auth-service/auth-service'
import { RegisterPage } from '../pages/register/register'
import { HomePage } from '../pages/home/home'
import { Point } from '../models/Point'
import { RouteServiceMock } from './app.mocks'

import { MyApp } from './app.component';
import { TokenService } from '../providers/token-service/token-service'
import {
  PlatformMock,
  StatusBarMock,
  SplashScreenMock
} from '../../test-config/mocks-ionic';

describe('MyApp Component', () => {
  let tokenservice;
  let loginComp: LoginPage;
  let homeComp: HomePage;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MyApp, LoginPage, HomePage],
      imports: [
        HttpModule,
        IonicModule.forRoot(MyApp)
      ],
      providers: [
        { provide: TokenService, useClass : TokenService },
        { provide: RouteService, useClass : RouteServiceMock },
        { provide: MapsAPILoader, useClass : MapsAPILoader },
        { provide: AppConfig, useClass : AppConfig },
        { provide: NavController, useClass : NavController },
        { provide: FormBuilder, useClass : FormBuilder },
        { provide: AuthServiceProvider, useClass : AuthServiceProvider },
        { provide: StatusBar, useClass: StatusBarMock },
        { provide: SplashScreen, useClass: SplashScreenMock },
        { provide: Platform, useClass: PlatformMock }
      ]
    })
  }));

  beforeEach(() => {
    tokenservice = TestBed.get(TokenService);
    let loginPageFixture = TestBed.createComponent(LoginPage);
    loginComp = loginPageFixture.componentInstance;
    let homePageFixture = TestBed.createComponent(HomePage);
    homeComp = homePageFixture.componentInstance;
    homeComp.middlePoints = new Array<Point>();
    homeComp.middlePointsRef = new Array<HTMLInputElement>();
  });

  it('should be null', () => {
    expect(tokenservice.GetToken()).toBeNull();
  });

  it('isValid should be false when form is invalid', (() => {
    loginComp.loginForm.controls['email'].setValue('');
    loginComp.loginForm.controls['password'].setValue('');
    expect(loginComp.formValid).toBeFalsy();
}));

it('isValid should be true when form is valid', (() => {
  loginComp.loginForm.controls['email'].setValue('test@mail.com');
  loginComp.loginForm.controls['password'].setValue('test123124');
  expect(loginComp.formValid).toBeTruthy();
}));

it('one of the field is invalid then should return false', (() => {
  loginComp.loginForm.controls['email'].setValue('');
  loginComp.loginForm.controls['password'].setValue('test');
  expect(loginComp.formValid).toBeFalsy();
}));

it('email field is not equal to email pattern, should return false', (() => {
  loginComp.loginForm.controls['email'].setValue('test');
  loginComp.loginForm.controls['password'].setValue('test');
  expect(loginComp.formValid).toBeTruthy();
}));

it('email field is equal to email pattern, should return true', (() => {
  loginComp.loginForm.controls['email'].setValue('test@test.com');
  loginComp.loginForm.controls['password'].setValue('test145621');
  expect(loginComp.formValid).toBeTruthy();
}));

it('password field min-length < 8, should return false', (() => {
  loginComp.loginForm.controls['email'].setValue('test@test.com');
  loginComp.loginForm.controls['password'].setValue('test145621');
  expect(loginComp.formValid).toBeTruthy();
}));


it('after adding middle point, array length should be incremented', (() => {
  let initialLength = homeComp.middlePoints.length;
  homeComp.AddMiddlePoint();
  expect(homeComp.middlePoints.length).toEqual(initialLength + 1);
}));

it('adding new route, should return Ok', (() => {
  homeComp.startPointRef.nativeElement.value = "Kiev";
  homeComp.endPointRef.nativeElement.value = "Rivne";
  homeComp.routeName = "asd";
  expect(homeComp.SaveRoute());
}));

it('home add new route(with out start point), should work validation', (() => {
  homeComp.startPointRef.nativeElement.value = "";
  homeComp.endPointRef.nativeElement.value = "Rivne";
  homeComp.routeName = "asd";
  expect(homeComp.formValid).toBeFalsy();
}));

it('home add new route (without name), should work validation', (() => {
  homeComp.startPointRef.nativeElement.value = "Kiev";
  homeComp.endPointRef.nativeElement.value = "Rivne";
  homeComp.routeName = "";
  expect(homeComp.formValid).toBeFalsy();
}));

it('home add new route, should work validation', (() => {
  homeComp.startPointRef.nativeElement.value = "Kiev";
  homeComp.endPointRef.nativeElement.value = "Rivne";
  homeComp.routeName = "First";
  expect(homeComp.formValid).toBeTruthy();
}));

});
