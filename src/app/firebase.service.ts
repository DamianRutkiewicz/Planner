import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable()
export class FirebaseService {

 private user;

  constructor(private af:AngularFireDatabase){
  	
  }

  setUser(user){
  	this.user = user;

  }

  getUser(){
  	return this.user;
  }

  getRequests(){
  	return this.user.Requests;
  }

}
