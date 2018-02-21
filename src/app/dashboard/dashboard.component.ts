import { Component, OnInit } from '@angular/core';
import { AuthService } from '../connect-db.service';
import { Router} from '@angular/router';
import { AngularFireDatabase, FirebaseObjectObservable} from 'angularfire2/database';

@Component({
  selector: 'app-dashboard',
  providers:[AuthService],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  item:FirebaseObjectObservable<any>;
   user="test@przykladowe.pl"; 
   ob;
   navColor;
   bgColor;
  
  constructor(private authService: AuthService, private router: Router, db:AngularFireDatabase) { 
    this.ob=db.object('/users/'+localStorage.getItem("uid")).subscribe(snapshot =>{
      this.user = snapshot.name;
      this.navColor=snapshot.navColor;
      this.bgColor=snapshot.bgColor;

    });
  }

  ngOnInit() {
  	
  }
  ngOnViewInit(){
  }

  logout() {
    this.authService.logout();

  }

}
