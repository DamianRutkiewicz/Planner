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


@Injectable()

export class AuthService {
  user: Observable<firebase.User>;
  email;
  // onGetData: EventEmitter<any>=new EventEmitter();

  userId;
  items: FirebaseObjectObservable<any>;
  isUserLoggedIn;
  navColor:FirebaseObjectObservable<any>;
  color;
  errorMessage = new Subject<string>();
  // @Output() colorek = new EventEmitter();

  constructor(private firebaseAuth: AngularFireAuth, private router:Router, private af:AngularFireDatabase, private http:Http) {
    this.user = firebaseAuth.authState;

    this.items = this.af.object('/users/');
    this.items = af.object('/users');
    const relative = af.object('/users/');
    console.log("Teraz sprawdzian",relative);

    this.user = this.firebaseAuth.authState;

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
        console.log("dupaaa",this.navColor);
        this.email=value.email;
        // this.items.subscribe(snapshot => {
        //   console.log("hey:",snapshot.key)
        //   console.log("val",snapshot.val());
        // })
        localStorage.setItem('uid',this.userId);

        this.router.navigate(['/dashboard']);
        return this.navColor.toPromise().then(snapshot => {
          this.color = snapshot.val();
          // this.colorek.emit(this.color);

          
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

    // return new Promise((resolve , reject)=>{
    //   this.firebaseAuth
    //   .auth
    //   .signInWithEmailAndPassword(email, password)
    //   .then(value => {
       
    //     this.userId=value.uid;
    //     this.items = this.af.object('/users/'+this.userId, {preserveSnapshot: true});
    //     this.navColor = this.af.object('/users/'+this.userId+"/navColor", {preserveSnapshot: true});
    //     console.log("dupaaa",this.navColor);
    //     this.email=value.email;
    //     // this.items.subscribe(snapshot => {
    //     //   console.log("hey:",snapshot.key)
    //     //   console.log("val",snapshot.val());
    //     // })
    //     localStorage.setItem('uid',this.userId);

    //     this.router.navigate(['/dashboard']);
    //     return this.navColor.toPromise().then(snapshot => {
    //       console.log("ostatnia");
    //       this.color = snapshot.val();
    //       // this.colorek.emit(this.color);

          
    //       return this.color;
    //     })
       
    //   })
    //   .catch(err => {
    //     console.log('Something went wrong:',err.message);
    //     // this.router.navigate(['/login']);
    //     return false;
    //   });
    // })
  }

  logout() {
    this.firebaseAuth
      .auth
      .signOut();
    this.isUserLoggedIn = false;
  }
  getUser(){
  	return this.email;
  }

  // getData(){
  //   let food={"klucz":"wartosc"};
  //   let headers = new Headers({'Content-Type':'application/json'});
  //   let options = new RequestOptions({headers:headers});
  //   let body = JSON.stringify(food);
  //   return this.http.post('/dashboard/pulpit', body, options ).map((res: Response) => {
  //     this.onGetData.emit("test");
  //   });
  	

  
  // getColor(){
  //   return this.color;
  // }
  

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
}
