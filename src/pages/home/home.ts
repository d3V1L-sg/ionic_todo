import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Pending } from '../pending/pending';
import { Completed } from '../completed/completed';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  tab1Root: any = Pending;
  tab2Root: any = Completed;
  mySelectedIndex: number;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.mySelectedIndex = navParams.data.tabIndex || 0;
  }

}
