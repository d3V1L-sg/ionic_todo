import {Component} from '@angular/core';
import { Events, ToastController, AlertController} from 'ionic-angular';
import {Storage} from '../../providers/storage'
import _ from 'lodash';
import {NativeAudio} from '@ionic-native/native-audio';
/**
 * Generated class for the Completed page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-completed',
  templateUrl: 'completed.html',
})

export class Completed {
  items: any = [];
  completedItems: any = [];
  pendingItems: any = [];

  constructor(public events: Events, public storage: Storage, public toastCtrl: ToastController, private alertCtrl: AlertController, private nativeAudio: NativeAudio) {
    this.events.subscribe('list:completed', () => {
      this.updateList();
    });
    this.updateList();
    this.nativeAudio.preloadSimple('beep', 'assets/audio/beep.mp3').then(() => console.log('Success'), (err) => console.log('error' + err));


  }

  updateList() {
    this.items = this.storage.todoList(null);
    this.completedItems = _.filter(this.items, function (b) {
      if (b.isCompleted) {
        return b.title
      }
    });
    this.pendingItems = _.filter(this.items, function (b) {
      if (!b.isCompleted) {
        return b.title
      }
    });
  }

  deleteTask(task) {
    let taskTitle;

    let alert = this.alertCtrl.create({
      title: 'Confirm Delete',
      message: 'Do you want to delete this task?',
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
            for (let i = 0; i < this.items.length; i++) {

              if (this.items[i] == task) {
                taskTitle = this.items[i].title;
                this.items.splice(i, 1);
              }
            }
            this.storage.todoList(this.items);
            this.updateList();
            const toast = this.toastCtrl.create({
              message: `${taskTitle} Deleted`,
              duration: 1500
            });
            toast.present();
            this.nativeAudio.play('beep', () => console.log('beep is done playing'));
          }
        }
      ]
    });
    alert.present();
  }

  moveToPending(task) {
    let taskTitle;

    let alert = this.alertCtrl.create({
      title: 'Confirm',
      message: 'Do you want to move task to pending list?',
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
            for (let i = 0; i < this.items.length; i++) {

              if (this.items[i] == task) {
                taskTitle = this.items[i].title;
                this.items[i].isCompleted = false;
              }
            }
            this.storage.todoList(this.items);
            this.updateList();
            const toast = this.toastCtrl.create({
              message: `${taskTitle} moved to pending.`,
              duration: 1500
            });
            toast.present();
            this.events.publish('list:added');
          }
        }
      ]
    });
    alert.present();
  }

  deleteAllTask() {
    if (this.pendingItems.length === 0 && this.completedItems.length !== 0) {

      let alert = this.alertCtrl.create({
        title: 'Confirm Delete',
        message: 'Do you want to delete all the tasks?',
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
              this.nativeAudio.play('beep', () => console.log('beep is done playing'));
            }
          }
        ]
      });
      alert.present();
    } else if(this.pendingItems.length !== 0) {
      const toast = this.toastCtrl.create({
        message: `Complete all tasks first.`,
        duration: 1500
      });
      toast.present();
    } else if(this.completedItems.length === 0) {
      const toast = this.toastCtrl.create({
        message: `No tasks present.`,
        duration: 1500
      });
      toast.present();
    }
  }
}
