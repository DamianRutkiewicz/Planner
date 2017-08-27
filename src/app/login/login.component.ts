import { Component, OnInit, HostBinding } from '@angular/core';
import { Router} from '@angular/router';
import { ElementRef } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
// import { environment } from '../environments/environment';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AuthService } from '../connect-db.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // constructor(private router: Router, private elementRef: ElementRef, private af: AngularFireDatabase) { 
  // 	const users$: FirebaseListObservable<any>=this.af.list('/users');

  // 	users$.subscribe(console.log);
  // }

  email: string;
  password:string;

  constructor(private router: Router, private elementRef: ElementRef, public authService: AuthService){

  }

  ngOnInit() {
    
  }

  login() {
    this.authService.login(this.email, this.password);
    this.elementRef.nativeElement.querySelector('#login-wrapper').classList.remove('rollIn');
    this.elementRef.nativeElement.querySelector('#login-wrapper').classList.add('fadeOut');
    this.email = this.password = '';    
    
    return false;
  }

  goToRegister(event){
  	event.preventDefault();
  	this.elementRef.nativeElement.querySelector('#login-wrapper').classList.remove('rollIn');
  	this.elementRef.nativeElement.querySelector('#login-wrapper').classList.add("rollOut");
  	setTimeout(()=>{
  		this.router.navigate(['/register']);
  	},300)
  	

  }

}
