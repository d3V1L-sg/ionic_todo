import {Component, ViewChild} from '@angular/core';
import {Nav, Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';

import {HomePage} from '../pages/home/home';
import {Pending} from '../pages/pending/pending';
import {Completed} from '../pages/completed/completed';
import {Maps} from '../pages/maps/maps';
import {Firebase} from '@ionic-native/firebase';


export interface PageInterface {
  title: string;
  name: string;
  component: any;
  icon: string;
  logsOut?: boolean;
  index?: number;
  tabName?: string;
  tabComponent?: any;
}


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;

  appPages: PageInterface[] = [
    {title: 'Pending', name: 'Home', component: HomePage, tabComponent: Pending, index: 0, icon: 'calendar'},
    {title: 'Completed', name: 'Home', component: HomePage, tabComponent: Completed, index: 1, icon: 'done-all'}
  ];

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public firebase: Firebase) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      {title: 'Pending', component: Pending},
      {title: 'Completed', component: Completed}
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.firebase.onTokenRefresh()
        .subscribe((token: string) => console.log(`Got a new token ${token}`));

      this.getToken();

    });
  }

  getToken() {
    this.firebase.getToken()
      .then(token => {
        if (!token) {
          console.log(`The token is ${token} err`)
        } else {
          console.log(`The token is ${token}`)
        }
      });// save the token server-side and use it to push notifications to this device
  }

  changeDirection() {
    if (this.platform.dir() == 'ltr') {
      this.platform.setDir('rtl', true);
    } else {
      this.platform.setDir('ltr', true);
    }
  }

  openPage(page: PageInterface) {
    let params = {};

    // the nav component was found using @ViewChild(Nav)
    // setRoot on the nav to remove previous pages and only have this page
    // we wouldn't want the back button to show in this scenario
    if (page.index) {
      params = {tabIndex: page.index};
    }

    // If we are already on tabs just change the selected tab
    // don't setRoot again, this maintains the history stack of the
    // tabs even if changing them from the menu
    if (this.nav.getActiveChildNav() && page.index != undefined) {
      this.nav.getActiveChildNav().select(page.index);
      // Set the root of the nav with params if it's a tab index
    } else {
      this.nav.setRoot(page.name, params).catch((err: any) => {
        console.log(`Didn't set nav root: ${err}`);
      });
    }
  }

  isActive(page: PageInterface) {
    let childNav = this.nav.getActiveChildNav();

    // Tabs are a special case because they have their own navigation
    if (childNav) {
      if (childNav.getSelected() && childNav.getSelected().root === page.tabComponent) {
        return 'primary';
      }
      return;
    }

    if (this.nav.getActive() && this.nav.getActive().name === page.name) {
      return 'primary';
    }
    return;
  }

  openMaps() {
    this.nav.push(Maps);
  }
}
