import { Injectable, EventEmitter, Output} from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class RowService {

  modalShowed:boolean=false;
  modalSubject = new Subject<any>();
  modalColorSubject = new Subject<string>();
  modalIconSubject = new Subject<string>();
  removeNoteSubject = new Subject<string>();
  saveNoteSubject = new Subject<string>();

  @Output() childEvent: EventEmitter<string> = new EventEmitter<string>();

  private timeLineSteps:number=9;
  private Steps=[];
  private startHour:string='09';
  private endHour:string='18';
  oneTd:number;
  private leftSteps:number[]=[];
  EventIdentificators:string[]=[];
  TimelineIdentificators:string[]=[];
  colors:string[];

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
  },
  {
    name:"zadanie 7",
    time: [
      {
        start:17,
        end:18
      }
    ]
  },
  {
    name:"zadanie 8",
    time: [
      {
        start:17,
        end:18
      }
    ]
  },
  
  ];

  constructor() {
    this.timeLineSteps=9;
    this.oneTd = 400/this.timeLineSteps;
    let stepsTmp = this.timeLineSteps*2;

    for (var i = 0; i < stepsTmp; i++) {
      // this.leftSteps.push(this.oneTd*i);
      // console.log(this.oneTd," to jest oneTd a to i",i);
      this.leftSteps.push(i*(this.oneTd/2));
    }
    // console.log("left steps : ",this.leftSteps);
    // console.log("tablica odleglosci od lewej strony :",this.leftSteps, " a to stepsTmp", stepsTmp);
  }

  ngDoCheck(){
    // for (var i = 0; i < this.timeLineSteps; i++) {
    //   this.Steps.push(1);
    // }
  }

  removeNote(data){
    this.removeNoteSubject.next(data)
  }
  saveNote(data,id){
    var tmp = data+" "+id;
    this.saveNoteSubject.next(tmp);
  }

  changeModalColor(value,id){
    let tmp = value+" "+id;
    this.modalColorSubject.next(tmp);
  }
  changeModalIcon(value,id){
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

}
