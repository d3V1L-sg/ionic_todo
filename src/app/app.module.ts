import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';

import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '../providers/storage';
import { Vibration } from '@ionic-native/vibration';
import { NativeAudio } from '@ionic-native/native-audio';
import { Firebase } from '@ionic-native/firebase';

import {
  GoogleMaps
} from '@ionic-native/google-maps';

import { HomeModule } from "../pages/home/home.module";

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    HomeModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Storage,
    Vibration,
    NativeAudio,
    GoogleMaps,
    Firebase,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
