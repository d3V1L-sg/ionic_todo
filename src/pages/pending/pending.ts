import { Component } from '@angular/core';
import { ModalController, Platform, Events, ToastController, NavController, Tabs, AlertController } from 'ionic-angular';
import { Storage } from '../../providers/storage'
import _ from 'lodash';
import { Vibration } from '@ionic-native/vibration';

/**
 * Generated class for the Pending page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
import {AddTodo} from '../add-todo/add-todo'

@Component({
  selector: 'page-pending',
  templateUrl: 'pending.html',
})
export class Pending {
  items: any = [];
  pendingItems: any = [];
  tab:Tabs;

  constructor(public modalController: ModalController, public platform: Platform, public storage: Storage, public events: Events, public toastCtrl: ToastController, private vibration: Vibration, public navCtrl: NavController, private alertCtrl: AlertController) {
    this.tab = this.navCtrl.parent;
    this.events.subscribe('list:added', () => {
      this.updateList();
    });
    this.updateList();
  }

  updateList () {
    this.items = this.storage.todoList(null);
    this.pendingItems = _.filter(this.items, function(b){
      if(!b.isCompleted){
        return b.title
      }
    });
    console.log(this.pendingItems.length);
  }

  deleteAll() {
    if(this.pendingItems.length === 0) {
      this.deleteAllTask()
    }
  }

  openModal() {
    let addModal = this.modalController.create(AddTodo);
    addModal.present();
  }

  getClass () {
    return (this.platform.dir() == 'ltr' ? 'right' : 'left');
  }

  completeTask(item){
    let taskTitle;
    for(let i = 0; i < this.items.length; i++) {

      if(this.items[i] == item){
        taskTitle = this.items[i].title;
        this.items[i].isCompleted = true;
      }
    }
    this.storage.todoList(this.items);
    this.updateList();
    this.deleteAll();
    const toast = this.toastCtrl.create({
      message: `${taskTitle} Completed`,
      duration: 1500
    });
    toast.present();
    this.events.publish('list:completed');
    this.vibration.vibrate(100);
    this.tab.select(1);
  }



  deleteAllTask () {
    let alert = this.alertCtrl.create({
      title: 'Confirm Delete',
      message: 'All task completed, delete all completed the tasks?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Confirm',
          handler: () => {
            this.items = [];
            this.storage.todoList(this.items);
            this.updateList();
            this.events.publish('list:completed');
          }
        }
      ]
    });
    alert.present();
  }
}
