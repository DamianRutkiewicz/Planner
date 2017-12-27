import { Injectable, EventEmitter, Output, Input} from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { AuthService } from '../../connect-db.service';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class RowService {

  modalShowed:boolean=false;
  modalSubject = new Subject<any>();
  modalColorSubject = new Subject<string>();
  modalIconSubject = new Subject<string>();
  removeNoteSubject = new Subject<string>();
  saveNoteSubject = new Subject<string>();

  delateEventSubject = new Subject<any>();
  delateEventSubject2 = new Subject<any>();

  delateTimelineSubject = new Subject<any>();
  delateTimelineSubject2 = new Subject<any>();
  // pushEventToComponent = new Subject<string>();

  // @Output() childEvent: EventEmitter<string> = new EventEmitter<string>();
  myevent: EventEmitter<string> = new EventEmitter();

  private timeLineSteps:number=9;
  private Steps=[];
  private startHour:string='09';
  private endHour:string='18';
  oneTd:number;
  private leftSteps:number[]=[];
  EventIdentificators:string[]=[];
  TimelineIdentificators:string[]=[];
  colors:string[];

  headDays:Date[];
  headHours:string[]=new Array();
  

  clicked:number[];
  index:number;

  rows = [{
  	name:"zadanie 1",
  	time: [
  		{
  			start:13,
  			end:16
  		}
  	]
  },
  {
  	name:"zadanie 2",
  	time: [
  		{
  			start:17,
  			end:18
  		}
  	]
  },
  {
    name:"zadanie 3",
    time: [
      {
        start:17,
        end:18
      }
    ]
  },
  {
    name:"zadanie 4",
    time: [
      {
        start:17,
        end:18
      }
    ]
  },
  {
    name:"zadanie 5",
    time: [
      {
        start:17,
        end:18
      }
    ]
  },
  {
    name:"zadanie 6",
    time: [
      {
        start:17,
        end:18
      }
    ]
  }  
  ];

  constructor(private af: AuthService) {
    this.timeLineSteps=9;
    this.oneTd = 400/this.timeLineSteps;
    let stepsTmp = this.timeLineSteps*2;

    for (var i = 0; i < stepsTmp; i++) {
      // this.leftSteps.push(this.oneTd*i);
      // console.log(this.oneTd," to jest oneTd a to i",i);
      this.leftSteps.push(i*(this.oneTd/2));
      // this.assocHours.push()
    }

    this.rows = this.getRows();
    this.Steps=this.getTimeLineSteps();

    for (var i = 0; i < this.Steps.length*2; i++) {
      if(i%2!=0){
        this.headHours.push(String(this.Steps[(i-1)/2])+":30");
        
      }else{
        this.headHours.push(String(this.Steps[i/2]));
      }
    };


    // console.log(this.af.getRequests()+"jestem w row service ");
    this.rows = this.af.getRequests();

  }

  changeTimelineSteps(){
    let stepsTmp = this.timeLineSteps*2;
    // console.log("ile krokow : ",this.timeLineSteps)
    this.leftSteps = [];
    for (var i = 0; i < stepsTmp; i++) {
      // this.leftSteps.push(this.oneTd*i);
      // console.log(this.oneTd," to jest oneTd a to i",i);
      
      this.leftSteps.push(i*(this.oneTd/2));
    }
    // console.log("zminilem timline oto jedna kolumna :",this.oneTd/2);
    // console.log("left steps :",this.leftSteps)
  }

  listenDelateEvent():Observable<any>{
    return this.delateEventSubject.asObservable();
  }
  listenDelateEvent2():Observable<any>{
    return this.delateEventSubject2.asObservable();
  }

  delateEvent(value){
    this.delateEventSubject.next(value);
    this.af.removeEvent(value);
    this.delateEventSubject2.next(value);
  }

  listenDelateTimeline():Observable<any>{
    return this.delateEventSubject.asObservable();
  }
  listenDelateTimeline2():Observable<any>{
    return this.delateEventSubject2.asObservable();
  }

  delateTimeline(value){
    this.delateTimelineSubject.next(value);
    this.af.removeTimeline(value);
    this.delateEventSubject2.next(value); //ten subject chyba wysyla do eventa zeby go usunac z widoku
  }

  removeNote(data){
    this.removeNoteSubject.next(data)
  }
  saveNote(data,id){
    var tmp = data+" "+id;
    this.saveNoteSubject.next(tmp);
  }

  changeTimelineWidth(width,hour,id){
    console.log("row service ");
    this.af.changeTimelineWidth(width,hour,id);
  }

  changeModalColor(value,id){
    this.af.changeColor(value, id);
    let tmp = value+" "+id;
    this.modalColorSubject.next(tmp);
  }
  changeModalIcon(value,id){
    this.af.changeIcon(value, id);
    let tmp = value+" "+id;
    this.modalIconSubject.next(tmp);
  }

  shareModal(mod: boolean){
    this.modalSubject.next(mod);
  }

  changeModal(){
    this.modalShowed=!this.modalShowed;
  }

  calculateSteps(start:string, end:string){
    // let between = (Date.parse(end)-Date.parse(start))/(60*60*1000);
    if(Number.parseInt(end)!=0){
      let roznica = Number.parseInt(end)-Number.parseInt(start);
      // console.log("numerycznie: ",roznica);
      return roznica;
    }
    else{
      end = "24";
      let roznica = Number.parseInt(end)-Number.parseInt(start);
      // console.log("numerycznie: ",roznica);
      return roznica;
    }
  }

  getRows(){
  	return this.rows;
  }

  getTimeLineSteps(){
    this.Steps=[];
    for (var i = 0; i < this.timeLineSteps; i++) {
      this.Steps.push(Number(this.startHour)+i);
      // console.log("to jest start hour : ",this.startHour);
    }
    // console.log("time line steps : ",this.timeLineSteps, " a tu szerokosc komorki: ",this.oneTd, " steps:",this.Steps);
    return this.Steps;
  }

  getStartEnd(){
    return [this.startHour,this.endHour];
  }

  getLeftSteps(){
    return this.leftSteps;

  }

  setStartHour(start:string){
    this.startHour = start;
  }
  setEndHour(end:string){
    this.endHour = end;
  }

  setSteps(val:number){
    this.timeLineSteps = val;
    this.oneTd = 400/this.timeLineSteps;
     
    // console.log("this.oneTd: ",this.oneTd, "timelinesteps : ",this.timeLineSteps);
  }
  setRowIndex(index:number){
    this.index = index;
  }
  getRowIndex(){
    return this.index;
  }

  onUpdate(event){
    // console.log("odebrane od event emiterra w SERWISIE");
    this.modalSubject.next(event);
  }

  changeEventName(data, row){

    this.af.changeEventName(data,row);
  }

}
