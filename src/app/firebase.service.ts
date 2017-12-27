import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable()
export class FirebaseService {

 private user;

  constructor(private af:AngularFireDatabase){
  	// const users$: FirebaseListObservable<any>=this.af.list('/users');

  	// users$.subscribe(console.log);

  	

  	
  }

  // getUserObject():FirebaseObjectObservable<any>{
  // 	this.af.object('/users/'+localStorage.getItem("uid")).subscribe((data)=>{
  // 		// this.tmp = data.Notes;
  // 		// console.log("to w app.component : ",data);
  // 		this.tmp = data;

  // 	});
  // 	return this.tmp;
  // }

  setUser(user){
  	this.user = user;
  }

  getUser(){
  	return this.user;
  }

}
