import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Maps } from '../maps/maps';
import { HomePage } from './home';
import {Completed} from "../completed/completed";
import {Pending} from "../pending/pending";
import {AddTodo} from "../add-todo/add-todo";

@NgModule({
  declarations: [
    HomePage,
    Maps,
    Completed,
    Pending,
    AddTodo
  ],
  imports: [
    IonicPageModule.forChild(HomePage),
  ],
  exports: [
    HomePage,
    Maps,
    Completed,
    Pending,
    AddTodo
  ],
  entryComponents:[
    Maps,
    Completed,
    Pending,
    AddTodo
  ]
})
export class HomeModule {}
