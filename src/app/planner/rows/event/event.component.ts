import { Component, OnInit ,ViewRef, Renderer2, ElementRef,ComponentFactoryResolver,ViewChild, Type, ViewContainerRef} from '@angular/core';
import { RowService } from '../row.service';
import 'rxjs/add/observable/fromEvent';
import { ChangeIconComponent } from '../row/column/change-icon/change-icon.component';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {

  left:number;
  start:number=40;
  mouseDown:boolean=false;
  startMouseDown:number;
  endMouseDown:number;
  whichBox:number;
  column:number;
  icon:string="e3.png";
  private id;
  hourColumn:string;
  hour:string;

  // @ViewChild('timeline1', {read: ViewContainerRef}) timeline: ViewContainerRef;

  iconModalShowed:boolean=false;

  @ViewChild('changeicon', {read: ViewContainerRef}) changeicon: ViewContainerRef;

  constructor(private renderer: Renderer2,private viewref: ViewContainerRef, private el: ElementRef, private rowService: RowService, private resolver: ComponentFactoryResolver) {
    
    console.log("to jest EventsIdentificators : ",this.rowService.EventIdentificators);

    if(this.rowService.EventIdentificators.length!==0){
      let tmp=this.rowService.EventIdentificators[this.rowService.EventIdentificators.length-1];
      tmp=tmp.substr(5);
      console.log("teoretycznie ostatni z tej jebanej tablicy : ",this.rowService.EventIdentificators)
      let tmp2= Number(tmp);
      tmp2++;
      this.rowService.EventIdentificators.push("event"+String(tmp2));
      this.id = "event"+tmp2;
      // console.log("takie Id mi wyrzuca : ",this.id);
      console.log("tablica eventow : ",this.rowService.EventIdentificators)
    }
    else{
      this.id="event1";
      this.rowService.EventIdentificators.push(this.id);
      // this.rowService.EventIdentificators.push(this.id);
    };

    this.rowService.listenDelateEvent().subscribe((value)=>{
      this.iconModalShowed = false;
      let cmp = this.changeicon.remove();

    })
    
  }


  ngOnInit() {

    console.log("to jest ID dla tego eventu: ",this.id);
    console.log("to jest hour dla tego eventu : ",this.hour);

    // dopasowuje left do tablicy z rowservice
    for (var i = 0; i < this.rowService.getLeftSteps().length; i++) {
      if(this.rowService.getLeftSteps()[i]>this.left){
        this.whichBox = i-1;
        // this.whichBox = this.rowService.headHours.indexOf();
        this.hourColumn = String(this.whichBox);
        break;

      }
      if(i==this.rowService.getLeftSteps().length-1){
        this.whichBox = i;
        this.hourColumn = String(this.whichBox);

      }
    };

  	this.renderer.setStyle(this.el.nativeElement.querySelector(".event"),'left',this.rowService.getLeftSteps()[this.whichBox]+"px");

    ///zmiana ikonki z modala
    this.rowService.modalIconSubject.subscribe((value)=>{
      
      let tmp = value.split(/(\s+)/).filter(function(e){return e.trim().length>0;});
      if(this.id==tmp[1]){
        this.icon = tmp[0];
      }
      
    });

    this.rowService.listenDelateEvent2().subscribe((value)=>{
      if(value==this.id){
        this.destroy();
      }
    })

    // console.log("to jest godzina ktorej szukam !!!!",this.hour);
    // this.renderer.setStyle(this.el.nativeElement.querySelector(".timeline"),'background-color',this.color);
  }

  setId(id){
    this.id = id;
    return this.id;
  }

  createIconModal(event){
     if(!this.iconModalShowed){
       // console.log("Tworzenie modalu wyboru koloru");
      const comp = this.resolver.resolveComponentFactory(<Type<ChangeIconComponent>>ChangeIconComponent);

      let cmp= this.changeicon.createComponent(comp);
      cmp.instance.left = 500;
      cmp.instance.top = 100;
      cmp.instance.eventId=this.id;
      // console.log("stworzylem nowy komponent");
      this.iconModalShowed = true;
     }
     else{
       this.iconModalShowed = false;
       let cmp = this.changeicon.remove();
     }

     // this.viewref.destroy();
     
  }
  getId(){
    return this.id;
  }
  getHour(){
    return this.hourColumn;
  }

  destroy(){
    this.viewref.
        element.nativeElement.
        parentElement.
        removeChild(this.viewref.element.nativeElement);
  }

}
