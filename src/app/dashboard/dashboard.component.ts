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
    // this.item = db.object('/users/'+localStorage.getItem("uid"),{ preserveSnapshot:true});

    // console.log("dashboard: ",this.authService.color);
    // console.log("dashboard storage:",localStorage.getItem('uid'));

    // console.log("try:",this.item);
    this.ob=db.object('/users/'+localStorage.getItem("uid")).subscribe(snapshot =>{
      this.user = snapshot.name;
      this.navColor=snapshot.navColor;
      this.bgColor=snapshot.bgColor;
      console.log("snapshot",snapshot.name);
      console.log("navColor",this.navColor);
    });
  }

  ngOnInit() {
  	// if(this.authService.isUserLogged()!==null){
  	// 	// console.log("zalogowany jako: " , this.authService.isUserLogged());
  	// }
  	// else this.router.navigate(['/login']);

  	
  }
  ngOnViewInit(){
    console.log("czy ktos jest zalogowany ",this.authService.isUserLogged());
  }

  logout() {
    this.authService.logout();

    // console.log("poszlo");

  }

}
