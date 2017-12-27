import { Injectable, Output, EventEmitter} from '@angular/core';
// import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';
import { settClass } from './settingsClass';
import { Http,Response, Headers, RequestOptions } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import { FirebaseService } from './firebase.service';


@Injectable()

export class AuthService {
  user: Observable<firebase.User>;
  email;
  // onGetData: EventEmitter<any>=new EventEmitter();

  userId;
  items: FirebaseObjectObservable<any>;
  isUserLoggedIn;
  navColor:FirebaseObjectObservable<any>;
  events:FirebaseObjectObservable<any>;
  changeOb:FirebaseObjectObservable<any>;
  removeEv:FirebaseObjectObservable<any>;
  changeList:FirebaseListObservable<any>;
  color;
  errorMessage = new Subject<string>();

  private tmp:FirebaseObjectObservable<any>;

  private requests;

  eventsArrray= new Array();
  eventGoalsRows = new Array();
  eventGoalsColumns = new Array();
  // @Output() colorek = new EventEmitter();

  currentDay = new Date();
  nextDay = new Date();
  next2Day = new Date();
  next3Day = new Date();
  next4Day = new Date();


  headDays:Date[]=[this.currentDay,this.nextDay,this.next2Day,this.next3Day,this.next4Day];

  eventsList;
  rows;


  constructor(private firebase: FirebaseService,private firebaseAuth: AngularFireAuth, private router:Router, private af:AngularFireDatabase, private http:Http) {
    this.user = firebaseAuth.authState;

    this.af.object('/users/'+localStorage.getItem("uid")+"/Requests").subscribe((data)=>{
      // console.log("lista : ",data);
      this.setRequests(data);
    })

    this.af.object('/users/'+localStorage.getItem("uid")+"/Events").subscribe((data)=>{
      this.eventsList = data;
    })


    this.events = this.af.object('/users/'+localStorage.getItem("uid")+"/Events/");


    this.user = this.firebaseAuth.authState;

    // console.log("event goals column : ",this.eventGoalsColumns);
    // this.af.object('/users/'+localStorage.getItem("uid")+"/Events/event1").update(this.tmp);

    this.nextDay.setDate(this.currentDay.getDate()+1);
    this.next2Day.setDate(this.currentDay.getDate()+2);
    this.next3Day.setDate(this.currentDay.getDate()+3);
    this.next4Day.setDate(this.currentDay.getDate()+4);

  }

  getEvent(id){
    var tmp;
    this.af.object('/users/'+localStorage.getItem("uid")+"/Events/"+id).subscribe((data)=>{
      // console.log("get Event !!!  -> ",data);
      tmp = data;
    })
    return tmp;
  }


  getDays(){
    return new Array(this.currentDay, this.nextDay,this.next2Day,this.next3Day,this.next4Day);
  }

  setRequests(data){
    this.requests = data;
  }
  getRequests(){
    return this.requests;
  }

  signup(email: string, password: string) {
    this.firebaseAuth
      .auth
      .createUserWithEmailAndPassword(email, password)
      .then(value => {
        console.log('Success!', value);
        this.userId=value.uid;
        this.email=value.email;

        this.af.object('/users/'+this.userId).update({"name":this.email,"navColor":"#EB5A29","bgColor":"#fff"});

        var req2 = ["zadanie 1","zadanie 2","zadanie 3","zadanie 4","zadanie 5","zadanie 6","zadanie 7","zadanie 8"];
        this.af.object('/users/'+this.userId+"/Requests").update(req2);

        this.router.navigate(['/login']);
      })
      .catch(err => {
        console.log('Something went wrong:',err.message);
        this.returnError(err.message);
        return false;
      });    
  }

  login(email: string, password: string){
    return this.firebaseAuth
      .auth
      .signInWithEmailAndPassword(email, password)
      .then(value => {
       
        this.isUserLoggedIn = true;
        this.userId=value.uid;
        this.items = this.af.object('/users/'+this.userId, {preserveSnapshot: true});
        this.navColor = this.af.object('/users/'+this.userId+"/navColor", {preserveSnapshot: true});

        this.email=value.email;
        // this.items.subscribe(snapshot => {
        //   console.log("hey:",snapshot.key)
        //   console.log("val",snapshot.val());
        // })
        localStorage.setItem('uid',this.userId);

        this.af.object('/users/'+localStorage.getItem("uid")).subscribe((data)=>{
          this.tmp = data.Notes;

          this.firebase.setUser(data);
        });       

        this.af.object('/users/'+localStorage.getItem("uid")+"/Requests/").subscribe((data)=>{
          console.log("jestem w login connect db a to jest rows:",data);
          this.rows = data;

          this.router.navigate(['/dashboard']);
        }); 

        // const RowsPromise = new Promise((resolve, reject)=>{
        //   console.log("promise 1");
        // }).then(this.test())

        // RowsPromise.then(this.test())

        
        return this.navColor.toPromise().then(snapshot => {
          this.color = snapshot.val();

          
          return this.color;
        })
       
      })
      .catch(err => {
        console.log('Something went wrong:',err.message);
        // this.router.navigate(['/login']);
        // this.errorMessage = err.message;
        this.returnError(err.message);
        return false;
      });

    
  }


  logout() {
    this.firebaseAuth
      .auth
      .signOut();
    this.isUserLoggedIn = false;
    localStorage.clear();
  }
  getUser(){
  	return this.email;
  }
  
  getEventHour(id){
    console.log("event id : ",id);

    this.af.object('/users/'+localStorage.getItem("uid")+"/Events/"+id).subscribe((data)=>{
           console.log("conncect  : ",data.hour);
    });
  }

  /// Authentication     
  getUserLogged(){
  	return this.firebaseAuth.auth.currentUser;
  }
  isUserLogged(){
    return this.isUserLoggedIn;
  }

  returnError(value){
    this.errorMessage.next(value);
  }

  saveEvent(posx, column, event, id, hour){
    var tmp = {
      id:id,
      row:event,
      column:column,
      posx:posx,
      day:this.headDays[column],
      hour:hour
    }
    
    this.af.object('/users/'+localStorage.getItem("uid")+"/Events/"+tmp.id).update(tmp);
  }

  saveTimeline(posx,column, event,id,hour,width){
    console.log("dane: ",posx," ",column," ",event, " ",id," ",hour, " ", width);

    var tmp = {
      id:id,
      row:event,
      column:column,
      posx:posx,
      day:this.headDays[column],
      hour:hour,
      width:width
    }

    this.af.object('/users/'+localStorage.getItem("uid")+"/Timelines/"+tmp.id).update(tmp);
  }

  changeIcon(value, id){
    this.changeOb = this.af.object('/users/'+localStorage.getItem("uid")+"/Events/"+id);
    // this.changeOb.update(value);
    var tmp = this.firebase.getUser().Events[id];
    var output = {
      column:tmp.column,
      id:id,
      posx:tmp.posx,
      row:tmp.row,
      icon:value
    }
    console.log("biore object: ",this.changeOb);
    this.changeOb.update(output);
  }

  changeColor(value,id){
    this.changeOb = this.af.object('/users/'+localStorage.getItem("uid")+"/Timelines/"+id);
    // this.changeOb.update(value);
    var tmp = this.firebase.getUser().Timelines[id];
    var output = {
      column:tmp.column,
      id:id,
      posx:tmp.posx,
      row:tmp.row,
      color:value
    }
    console.log("biore object: ",this.changeOb);
    this.changeOb.update(output);
  }

  removeEvent(id){
    console.log("Connect-db remove event() !!!",id);
    this.removeEv = this.af.object('/users/'+localStorage.getItem("uid")+"/Events/"+id);
    this.removeEv.remove();
  }
  removeTimeline(id){
    console.log("Connect-db remove event() !!!",id);
    this.removeEv = this.af.object('/users/'+localStorage.getItem("uid")+"/Timelines/"+id);
    this.removeEv.remove();
  }

  changeTimelineWidth(value,hour, id){
    this.changeOb = this.af.object('/users/'+localStorage.getItem("uid")+"/Timelines/"+id);

    // var tmp = this.firebase.getUser().Timelines[id];
    var output = {
      width:value,
      hour:hour
    }
    this.changeOb.update(output);
  }
  changeEventName(data, row){
    this.changeOb = this.af.object('/users/'+localStorage.getItem("uid")+"/Requests/"+row);

    this.changeOb.set(data);
  }
}
