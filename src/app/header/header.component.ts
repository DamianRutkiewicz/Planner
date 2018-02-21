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

  colorNav;
  ob:FirebaseObjectObservable<any>;
  @Input() user:string;
  @Input() navColor:string;

  constructor(public authService: AuthService, private router: Router, private af:AngularFireDatabase) { 
  }

  ngOnInit() {
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

}
