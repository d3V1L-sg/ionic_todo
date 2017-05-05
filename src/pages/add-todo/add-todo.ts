import { Component } from '@angular/core';
import { ViewController, ToastController, Events } from 'ionic-angular';
import { Storage } from '../../providers/storage'
/**
 * Generated class for the AddTodo page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-add-todo',
  templateUrl: 'add-todo.html',
})
export class AddTodo {

  add: {list?: string} = {};
  submitted= false;
  constructor(public viewCtrl: ViewController, public storage: Storage, public toastCtrl: ToastController, public events: Events) {
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }

  onAdd() {
    this.submitted= true;
    if(this.add.list !== undefined && this.add.list != '') {
      let list = this.storage.todoList(null) || [];
      list.push({title: this.add.list, isCompleted: false});
      this.storage.todoList(list);
      this.viewCtrl.dismiss();
      const toast = this.toastCtrl.create({
        message: 'Task added.',
        duration: 1500
      });
      toast.present();

      this.events.publish('list:added');
      this.events.publish('list:completed');
    }
  }

}
