import { Component, OnInit, Input} from '@angular/core';
import { AuthService } from '../connect-db.service';
import { Router } from '@angular/router';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { NgStyle } from '@angular/common';
 
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  // @Input() user:string;
  colorNav;
  ob:FirebaseObjectObservable<any>;
  @Input() user:string;
  @Input() navColor:string;

  constructor(public authService: AuthService, private router: Router, private af:AngularFireDatabase) { 
  	// this.user=this.authService.getUser();
  	// // console.log("jazdaaaaa : ",this.authService.getFromDB());
   //  this.ob = af.object('/users');


  }

  ngOnInit() {
  	// this.user=this.authService.getUser();
    // this.colorNav = this.authService.color;
    // console.log("header: ",this.authService.color);
  	// this.colorNav=this.authService.getNavColor();
  	// console.log(this.authService.getFromDB());
  	// console.log("nav: ",this.authService.getNavColor());
  	// console.log("taki kolor pownien byc : ",this.colorNav);
    console.log("header",this.navColor);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

}
