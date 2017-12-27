import { Component, OnInit, ViewContainerRef, ViewChild, ElementRef,Type, Renderer2,ComponentFactoryResolver, Input } from '@angular/core';
import { RowService } from '../../row.service';
import { ContextMenuModule } from '../../../../../../node_modules/ngx-contextmenu';
import { TimelineComponent } from '../../timeline/timeline.component';
import { EventComponent } from '../../event/event.component';
import { AuthService } from '../../../../connect-db.service';
import { FirebaseService } from '../../../../firebase.service';


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
    ) {

    // this.rowservice.listenDelateEvent().subscribe((value)=>{

    //   let cmp= this.timeline.get(0);
    //   if(cmp!=null){
    //     console.log("to jest te value w column : ",value);
    //     console.log("a to jest moj cmp: ",cmp);
    //     // console.log("dalej ",cmp)
    //   }

      
    // });
   }

  ngOnInit() {
  	this.TimelineSteps= this.rowservice.getTimeLineSteps();

      var events = this.firebase.getUser().Events;
      var timelines = this.firebase.getUser().Timelines;
      // this.rowservice.EventIdentificators = [];
      // console.log("events wwwwww : ",events);
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
            
            // this.rowservice.EventIdentificators.push(events[key].id);
         
            this.createTimelineComponent(timelines[key].posx,timelines[key].hour,timelines[key].color,timelines[key].id,timelines[key].width);
          }
          
      }
      // console.log("jestem w column !!!! to sa timelines : ",timelines);
    // }
    // console.log("dlugosc Events : ",Object.keys(this.firebase.getUser().Events).length);


 }

  private onRightClick(event: MouseEvent){
    // console.log("clicked !!!!!!!!!!");
    // console.log("modul ten zostal klikniety o indeksie: ",this.a, " i row : ",this.index);
    // console.log(event.target);
    this.rowservice.clicked = [this.index,this.a];
    // console.log(this.index, " tak tak ",this.a)
    this.showModal(event);
        // console.log("right coord: ",event.clientX, event.clientY," Teraz wartosc z serwisu: ",this.rowService.modalShowed);

    return false;
  }

  private showModal(event){
    this.rowservice.modalSubject.subscribe((data)=>{
      console.log("to jest moje data : ",data);

      if(data.option=='timeline'){

        if((this.el.nativeElement.querySelector(".in-tr").getAttribute("id")==("td"+this.rowservice.clicked[1]))&&
        	(this.el.nativeElement.querySelector(".in-tr").getAttribute("class")==("one-column in-tr in-tr"+this.rowservice.clicked[0]))){

          // console.log("id z clicked : ","td"+this.rowservice.clicked[1])
          // console.log("class z clicked : ","in-tr"+this.rowservice.clicked[0])
          

          // console.log("pozycje X: ",data.posX," Y: ",data.posY);
          this.createComponentt(data.posX,data.posY);
          // this.rowservice.clicked=null;
          return false;
          
        }
      }else if(data.option=='event'){
        console.log("event");
        if(this.el.nativeElement.querySelector(".in-tr").getAttribute("id")==("td"+this.rowservice.clicked[1])&&
          (this.el.nativeElement.querySelector(".in-tr").getAttribute("class")==("one-column in-tr in-tr"+this.rowservice.clicked[0]))){
          
          data.posX = data.posX-415-(this.a*400);

          this.createEv(data.posX, true);
          // this.rowservice.clicked=null;
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

    console.log("to jest tablica leftow: ",this.rowservice.getLeftSteps())
    console.log("a to jest moje posx timeline ",posx);

    for (var i = 0; i < this.rowservice.getLeftSteps().length; i++) {

           if(this.rowservice.getLeftSteps()[i]>posx){
              console.log("pod tym indexem !!!",i);
              console.log(this.rowservice.headHours[i-1]," <- godzina timeline");
              hour = this.rowservice.headHours[i-1];
              console.log("ta godzine chce wjebac w timeline", hour);
              break;

            }
            else{
              hour = this.rowservice.headHours[i];
            }
         
    };
    if(hour!=undefined){
      cmp.instance.hour = hour;
    }
     console.log("jestem po petli w timeline");
    this.authservice.saveTimeline(posx,this.a,this.index,cmp.instance.getId(),hour,cmp.instance.widthTimeline);
  }
 


  //tworzy timeline z bazy
  private createTimelineComponent(posx:number, hour:string,color:string, id:string,width:number){
    console.log("to jest createTimelineComponent przy odczycie z bazy!!!");

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
    console.log("z bazy taka godzina !!! ",this.rowservice.headHours[tmpWhich-1]);
    cmp.instance.hour = this.rowservice.headHours[tmpWhich];
  }

  // funkcja kiedy powstaje nowy event
  private createEv(posx:number, save:boolean)
  {
    console.log("parametry nowego : ",posx," ",save);
    if(posx>0){
      // const comp = this.resolver.resolveComponentFactory(<Type<EventComponent>>EventComponent);

      let cmp= this.timeline.createComponent(this.comp);
      cmp.instance.left = posx;
      var tmpWhich;
      var hour;

      for (var i = 0; i < this.rowservice.getLeftSteps().length; i++) {

           if(this.rowservice.getLeftSteps()[i]>posx){
              console.log("pod tym indexem !!!",i);
              console.log(this.rowservice.headHours[i-1]," <- godzina");
              hour = this.rowservice.headHours[i-1];
              console.log("ta godzine chce wjebac", hour);
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
    }
    
  }
  //tworzy komponent event na podstawie bazy
  private createEventComponent(posx:number, hour:string,icon?:string, id?:string){

    const comp = this.resolver.resolveComponentFactory(<Type<EventComponent>>EventComponent);
    let cmp= this.timeline.createComponent(comp);
    cmp.instance.left = posx;
    console.log("to jest te id ",id);
    if((id!="undefined")&&(id!==null)){
      cmp.instance.setId(id);
      console.log("jego id : ",cmp.instance.setId(id))
    }

    var tmp1 = this.rowservice.getLeftSteps();// pobieram tablice odleglosci w pixelach od lewej krawedzi
    console.log("to jest left steps: ",tmp1);

    var tmpWhich; /// zmienna ktora mowi o tym ktorym elementem w tablicy godzin jest dany event
    // console.log("id ktore dodalem przed chwila : ",id);

    var event = this.authservice.getEvent(id); 
    console.log("event sprawdzam !!",event);


    for (var i = 0; i < this.rowservice.headHours.length; i++) {
      if(this.rowservice.headHours[i]==hour){
        tmpWhich = i;
        console.log("natrafilem !!!!!! index: ",i," hour :",hour);
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
