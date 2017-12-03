import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { NoteComponent } from './note/note.component';

@Injectable()
export class SaveFirebaseService {

  private listOfNotes:string[];

  constructor() { }

  addToNotes(value:string){
  	this.listOfNotes.push(value);
  	console.log("to jest lista notes ",this.listOfNotes);
  }
  removeNote(value:string){
  	this.listOfNotes = this.listOfNotes.filter(item => item !== value);
  }

}
