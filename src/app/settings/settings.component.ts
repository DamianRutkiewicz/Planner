import { Component, OnInit, ElementRef, Output } from '@angular/core';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { RowService } from '../planner/rows/row.service';
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

  startHour:string;
  endHour:string;

  DatesStart:Date[]=[
    new Date('1968-11-16T07:00:00'),
    new Date('1968-11-16T08:00:00'),
    new Date('1968-11-16T09:00:00'),
    new Date('1968-11-16T10:00:00'),
    new Date('1968-11-16T11:00:00'),
    new Date('1968-11-16T12:00:00'),

  ]
  DatesEnd:Date[]=[
    new Date('1968-11-16T16:00:00'),
    new Date('1968-11-16T17:00:00'),
    new Date('1968-11-16T18:00:00'),
    new Date('1968-11-16T19:00:00'),
    new Date('1968-11-16T20:00:00'),
    new Date('1968-11-16T21:00:00'),
    new Date('1968-11-16T22:00:00'),

  ]

  constructor(private elRef:ElementRef, db:AngularFireDatabase, private rowService: RowService) { 
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

  

  change(){
    if((this.startHour!==undefined)&&(this.endHour!==undefined)){
      // console.log("roznica : ",this.startHour," end : ",this.endHour);
      var steps:number =this.rowService.calculateSteps(this.startHour,this.endHour);
      this.rowService.setSteps(steps);
      this.rowService.setStartHour(this.startHour);
      this.rowService.setEndHour(this.endHour);

      this.rowService.changeTimelineSteps();
    }
  }

}
