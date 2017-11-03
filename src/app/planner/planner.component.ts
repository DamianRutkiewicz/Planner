import { Component, OnInit, ElementRef, Renderer2, Output,Input, EventEmitter } from '@angular/core';
import { DatePipe, NgClass } from '@angular/common';
import { RowComponent } from './rows/row/row.component';
import { RowService } from './rows/row.service';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-planner',
  templateUrl: './planner.component.html',
  styleUrls: ['./planner.component.css']
})
export class PlannerComponent {

  currentDay = new Date();
  nextDay = new Date();
  next2Day = new Date();
  next3Day = new Date();
  next4Day = new Date();

  tableWidth;

  rows;
  Steps:number[]=[];

  widthTd:number;

  modal:boolean=false;

  clX:number;
  clY:number;

  @Output() update = new EventEmitter<any>();

  constructor(private elRef: ElementRef, private renderer: Renderer2, private rs: RowService) {
    this.Steps=this.rs.getTimeLineSteps();
  }

  ngOnInit() {
    // this.tableWidth= ElementRef.
    this.rows = this.rs.getRows();
    this.Steps=this.rs.getTimeLineSteps();
    // console.log("Inicjacja plannera : ",this.Steps.length);
    this.nextDay.setDate(this.currentDay.getDate()+1);
    this.next2Day.setDate(this.currentDay.getDate()+2);
    this.next3Day.setDate(this.currentDay.getDate()+3);
  	this.next4Day.setDate(this.currentDay.getDate()+4);

    this.widthTd = 400/this.Steps.length;

    // this.rs.modalShowed.subscribe((val)=>{
    //   this.modal = val;
    // })
  }
  ngAfterViewInit(){
    // this.renderer.setElementStyle(this.elRef.nativeElement.querySelector(".timeline tr td"),'width','20%');
    // this.setWidthTD();
  }

  // ngOnChanges(){
  //   this.rs.modalSubject.subscribe((val)=>{
  //     this.modal=val;
  //     console.log("on changes :",this.modal);
  //   })
  // }

  onRightClick(event: MouseEvent){
    console.log("to jest modal i elref");
    this.renderer.setStyle(this.elRef.nativeElement.querySelector('.modal-ss'),'left',event.clientX+"px");
    this.renderer.setStyle(this.elRef.nativeElement.querySelector('.modal-ss'),'top',event.clientY+"px");
    this.renderer.setStyle(this.elRef.nativeElement.querySelector('.modal-ss'),'display',"block");
    this.renderer.setStyle(this.elRef.nativeElement.querySelector('.modal-ouer'),'z-index',"1000");
    
    this.clX = event.clientX;
    this.clY = event.clientY;
    return false;
  }
  hideModal(){
    this.renderer.setStyle(this.elRef.nativeElement.querySelector('.modal-ss'),'display',"none");
    this.renderer.setStyle(this.elRef.nativeElement.querySelector('.modal-ouer'),'z-index',"-1");
  }

  setStyle(){
    let style ={'background':'blue'};
    return style;
  }

  optionAddTimeline(){
     // this.update.emit({
     //   option:"timeline"
     // })
     console.log("wybrana opcja timeline");
     let pos ={
       option:'timeline',
       posX:this.clX,
       posY:this.clY
     }
     console.log("X: ",this.clX," Y:",this.clY);
     // this.rs.setRowIndex()
     this.rs.onUpdate(pos);
     // console.log("timeline odpalony");
  }
  optionAddEvent(){
     let pos ={
       option:'event',
       posX:this.clX,
       posY:this.clY
     }
     this.rs.onUpdate(pos);
     // console.log("event odpalony")
  }
}
