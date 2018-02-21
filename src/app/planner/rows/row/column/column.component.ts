import { Component, OnInit, ViewContainerRef, ViewChild, ElementRef,Type, Renderer2,ComponentFactoryResolver, Input } from '@angular/core';
import { RowService } from '../../row.service';
import { ContextMenuModule } from '../../../../../../node_modules/ngx-contextmenu';
import { TimelineComponent } from '../../timeline/timeline.component';
import { EventComponent } from '../../event/event.component';
import { AuthService } from '../../../../connect-db.service';
import { FirebaseService } from '../../../../firebase.service';
import {Router} from "@angular/router";


@Component({
  selector: '[app-column]',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.css']
})
export class ColumnTdComponent implements OnInit {

  TimelineSteps=[];
   @ViewChild('timeline1', {read: ViewContainerRef}) timeline: ViewContainerRef;
   

   @Input() a; //przechowuje w ktorej kolumnie jest
   @Input() index; //przechowuje w ktorym evencie jest

   idTmp;

  private comp = this.resolver.resolveComponentFactory(<Type<EventComponent>>EventComponent);


  constructor(private el: ElementRef
    , private renderer: Renderer2
    , private rowservice: RowService
    , private resolver: ComponentFactoryResolver
    , private authservice: AuthService
    , private firebase:FirebaseService
    ,private rt: Router
    ) {

   }

  ngOnInit() {
  	this.TimelineSteps= this.rowservice.getTimeLineSteps();

      var events = this.firebase.getUser().Events;
      var timelines = this.firebase.getUser().Timelines;

      for (var key in events) {
        var newDate = new Date(events[key].day).getFullYear()+" "+new Date(events[key].day).getMonth()+" "+new Date(events[key].day).getDate();
        var new2Date = new Date(this.authservice.headDays[this.a]).getFullYear()+" "+
        new Date(this.authservice.headDays[this.a]).getMonth()+" "+
        new Date(this.authservice.headDays[this.a]).getDate();
         
          if((newDate===new2Date)&&(this.index===events[key].row)){
            
            this.rowservice.EventIdentificators.push(events[key].id);
         
            this.createEventComponent(events[key].posx,events[key].hour,events[key].icon,events[key].id);
          }
          
      }
      for (var key in timelines) {
        var newDate = new Date(timelines[key].day).getFullYear()+" "+new Date(timelines[key].day).getMonth()+" "+new Date(timelines[key].day).getDate();
        var new2Date = new Date(this.authservice.headDays[this.a]).getFullYear()+" "+
        new Date(this.authservice.headDays[this.a]).getMonth()+" "+
        new Date(this.authservice.headDays[this.a]).getDate();
         
          if((newDate===new2Date)&&(this.index===timelines[key].row)){
         
            this.createTimelineComponent(timelines[key].posx,timelines[key].hour,timelines[key].color,timelines[key].id,timelines[key].width);
          }
          
      }

 }

  private onRightClick(event: MouseEvent){
    this.rowservice.clicked = [this.index,this.a];
    this.showModal(event);
    return false;
  }

  private showModal(event){
    this.rowservice.modalSubject.subscribe((data)=>{

      if(data.option=='timeline'){

        if((this.el.nativeElement.querySelector(".in-tr").getAttribute("id")==("td"+this.rowservice.clicked[1]))&&
        	(this.el.nativeElement.querySelector(".in-tr").getAttribute("class")==("one-column in-tr in-tr"+this.rowservice.clicked[0]))){

          this.createComponentt(data.posX,data.posY);
          return false;
          
        }
      }else if(data.option=='event'){
        if(this.el.nativeElement.querySelector(".in-tr").getAttribute("id")==("td"+this.rowservice.clicked[1])&&
          (this.el.nativeElement.querySelector(".in-tr").getAttribute("class")==("one-column in-tr in-tr"+this.rowservice.clicked[0]))){
          
          data.posX = data.posX-415-(this.a*400);

          this.createEv(data.posX, true);
          return false;
        }
      }
;    })
  }  

  //tworzy komponent timeline nowy
  private createComponentt(posx:number,posY:number){
    const comp = this.resolver.resolveComponentFactory(<Type<TimelineComponent>>TimelineComponent);

    let cmp= this.timeline.createComponent(comp);
    posx = posx-(this.a*400)-415;
    cmp.instance.left = posx;
    cmp.instance.widthTimeline = 180;
    
    var hour;

    for (var i = 0; i < this.rowservice.getLeftSteps().length; i++) {

           if(this.rowservice.getLeftSteps()[i]>posx){
              hour = this.rowservice.headHours[i-1];
              break;

            }
            else{
              hour = this.rowservice.headHours[i];
            }
         
    };
    if(hour!=undefined){
      cmp.instance.hour = hour;
    }
    this.authservice.saveTimeline(posx,this.a,this.index,cmp.instance.getId(),hour,cmp.instance.widthTimeline);
  }
 


  //tworzy timeline z bazy
  private createTimelineComponent(posx:number, hour:string,color:string, id:string,width:number){

    const comp = this.resolver.resolveComponentFactory(<Type<TimelineComponent>>TimelineComponent);
    let cmp= this.timeline.createComponent(comp);
    cmp.instance.left = posx;
    cmp.instance.widthTimeline = width;

    if((id!="undefined")&&(id!==null)){
      cmp.instance.setId(id);
    }

    var tmp1 = this.rowservice.getLeftSteps();// pobieram tablice odleglosci w pixelach od lewej krawedzi

    var tmpWhich; /// zmienna ktora mowi o tym ktorym elementem w tablicy godzin jest dany event

    var event = this.authservice.getEvent(id); 

    for (var i = 0; i < this.rowservice.headHours.length; i++) {
      if(this.rowservice.headHours[i]==hour){
        tmpWhich = i;
        cmp.instance.left = this.rowservice.getLeftSteps()[i];
        break;

      }
      if(i==this.rowservice.getLeftSteps().length-1){
        tmpWhich = i+1;

      }
    };

    if(color!==undefined){
      cmp.instance.color = color;
    }
    cmp.instance.hour = this.rowservice.headHours[tmpWhich];
  }

  // funkcja kiedy powstaje nowy event
  private createEv(posx:number, save:boolean)
  {
    if(posx>0){

      let cmp= this.timeline.createComponent(this.comp);
      cmp.instance.left = posx;
      var tmpWhich;
      var hour;

      for (var i = 0; i < this.rowservice.getLeftSteps().length; i++) {

           if(this.rowservice.getLeftSteps()[i]>posx){
              hour = this.rowservice.headHours[i-1];
              break;

            }
            else{
              hour = this.rowservice.headHours[i];
            }
         
      };
      if(hour!=undefined){
        cmp.instance.hour = hour;
      }
      
      this.authservice.saveEvent(posx, this.a, this.index, cmp.instance.getId(),hour);
      // this.rt.navigate(['/planner'])
    }
    
  }
  //tworzy komponent event na podstawie bazy
  private createEventComponent(posx:number, hour:string,icon?:string, id?:string){

    const comp = this.resolver.resolveComponentFactory(<Type<EventComponent>>EventComponent);
    let cmp= this.timeline.createComponent(comp);
    cmp.instance.left = posx;
    if((id!="undefined")&&(id!==null)){
      cmp.instance.setId(id);
    }

    var tmp1 = this.rowservice.getLeftSteps();// pobieram tablice odleglosci w pixelach od lewej krawedzi

    var tmpWhich; /// zmienna ktora mowi o tym ktorym elementem w tablicy godzin jest dany event
    // console.log("id ktore dodalem przed chwila : ",id);

    var event = this.authservice.getEvent(id); 

    for (var i = 0; i < this.rowservice.headHours.length; i++) {
      if(this.rowservice.headHours[i]==hour){
        tmpWhich = i;
        cmp.instance.left = this.rowservice.getLeftSteps()[i];
        break;

      }
      if(i==this.rowservice.getLeftSteps().length-1){
        tmpWhich = i+1;

      }
    };

    if(icon!==undefined){
      cmp.instance.icon = icon;
    }
    // console.log("a to jest tmpWhich : ",tmpWhich-1);
    cmp.instance.hour = this.rowservice.headHours[tmpWhich-1];
    
    
    
  }
  

}
