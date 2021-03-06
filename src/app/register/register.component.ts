import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { ElementRef } from '@angular/core';
import { AuthService } from '../connect-db.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  email: string;
  password: string;
  repassword:string;
  message:string;
  errorMessage:string;

  constructor(private router: Router, private elementRef: ElementRef, public authService: AuthService) { }

  ngOnInit() {
    this.authService.errorMessage.subscribe((e)=>{
      this.message = e;
    })
  }

  signup() {
    if(this.password===this.repassword){
      this.authService.signup(this.email, this.password);
      this.email = this.password = this.repassword='';

    }
    else 
    this.message = "The repeated password is incorrect";
  }

  goToLogin(event){
  	event.preventDefault();
  	this.elementRef.nativeElement.querySelector('#register-wrapper').classList.remove('rollIn');
  	this.elementRef.nativeElement.querySelector('#register-wrapper').classList.add("rollOut");
  	setTimeout(()=>{
  		this.router.navigate(['/login']);
  	},300)
  	

  }

}
