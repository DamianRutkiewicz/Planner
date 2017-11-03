import { Injectable} from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class RowService {

  modalShowed:boolean=false;
  modalSubject = new Subject<any>();

  private timeLineSteps:number=9;
  private Steps=[];
  private startHour:string='09';
  private endHour:string='18';
  oneTd:number;

  cliked:number[];
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
  {
    name:"zadanie 9",
    time: [
      {
        start:17,
        end:18
      }
    ]
  },
  {
    name:"zadanie 10",
    time: [
      {
        start:17,
        end:18
      }
    ]
  }
  ];

  constructor() {
    this.timeLineSteps=9;
    this.oneTd = 400/this.timeLineSteps;
  }

  ngDoCheck(){
    // for (var i = 0; i < this.timeLineSteps; i++) {
    //   this.Steps.push(1);
    // }
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
    return this.Steps;
  }

  getStartEnd(){
    return [this.startHour,this.endHour];
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
