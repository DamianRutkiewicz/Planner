import { Component, OnInit, ElementRef, Output } from '@angular/core';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
// declare var jquery:any;
// declare var $ :any;

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  navColors:string[]=["#E7FC92","#0AEB9D","#1D9690","#ffffff","#EBE929","#EB5A29","#45ABC454"];
  backColors:string[] = ["#E7FC92","#0AEB9D","#1D9690","#ffffff","#EBE929","#EB5A29"];

  ob:FirebaseObjectObservable<any>;

  @Output() element;
  @Output() bgEl;

  constructor(private elRef:ElementRef, db:AngularFireDatabase) { 
    this.ob=db.object('/users/'+localStorage.getItem("uid"));
  }

  ngOnInit() {
  	// var divColor = document.getElementById('colorList');

  	
  }
  changeColor(event){

    this.element = event.target.style['background-color'];
    this.ob.update({"navColor":this.element});
  }
  changeBg(event){
    this.bgEl = event.target.style['background-color'];
    this.ob.update({'bgColor':this.bgEl});
  }

}
