import { Component } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { FirebaseService } from './firebase.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  
  prd;

  constructor(private af:AngularFireDatabase, private firebase: FirebaseService){
  	// const users$: FirebaseListObservable<any>=this.af.list('/users');

  	
  	// this.tmp = this.firebase.getUserObject();
  	// this.prd = this.firebase.getUserObject();
  	// console.log("to jest tmp : ",this.prd);
  }
}
