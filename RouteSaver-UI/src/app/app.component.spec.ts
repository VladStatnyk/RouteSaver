import { async, TestBed } from '@angular/core/testing';
import { IonicModule, Platform } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { HttpModule } from '@angular/http';
import { AppConfig } from '../app/app.config';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';

import { NavController } from 'ionic-angular';
import { AuthServiceProvider } from '../providers/auth-service/auth-service'
import { RegisterPage } from '../pages/register/register'
import { HomePage } from '../pages/home/home'

import { MyApp } from './app.component';
import { TokenService } from '../providers/token-service/token-service'
import {
  PlatformMock,
  StatusBarMock,
  SplashScreenMock
} from '../../test-config/mocks-ionic';

describe('MyApp Component', () => {
  let tokenservice;
  let comp: LoginPage;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MyApp, LoginPage],
      imports: [
        HttpModule,
        IonicModule.forRoot(MyApp)
      ],
      providers: [
        { provide: TokenService, useClass : TokenService },
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
    let fixture = TestBed.createComponent(LoginPage);
    comp = fixture.componentInstance;
  });

  it('should be null', () => {
    expect(tokenservice.GetToken()).toBeNull();
  });

  it('isValid should be false when form is invalid', (() => {
    comp.loginForm.controls['email'].setValue('');
    comp.loginForm.controls['password'].setValue('');
    expect(comp.formValid).toBeFalsy();
}));

it('isValid should be true when form is valid', (() => {
  comp.loginForm.controls['email'].setValue('test');
  comp.loginForm.controls['password'].setValue('test');
  expect(comp.formValid).toBeTruthy();
}));

it('one of the field is invalid then should return false', (() => {
  comp.loginForm.controls['email'].setValue('');
  comp.loginForm.controls['password'].setValue('test');
  expect(comp.formValid).toBeFalsy();
}));

});
