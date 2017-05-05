import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

/*
  Generated class for the Storage provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Storage {

  localData: any = [];

  todoList(data) {
    if(data) {
      localStorage.setItem('todoList', JSON.stringify(data));
      this.localData = JSON.parse(localStorage.getItem('todoList'));
    } else {
      this.localData = JSON.parse(localStorage.getItem('todoList'));
    }

    return this.localData;
  }
}
