import { Component, OnInit , Renderer2, ElementRef,ComponentFactoryResolver,ViewChild, Type, ViewContainerRef} from '@angular/core';
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

  iconModalShowed:boolean=false;

  @ViewChild('changeicon', {read: ViewContainerRef}) changeicon: ViewContainerRef;

  constructor(private renderer: Renderer2, private el: ElementRef, private rowService: RowService, private resolver: ComponentFactoryResolver) {
    if(this.rowService.EventIdentificators.length!==0){
      let tmp=this.rowService.EventIdentificators[this.rowService.EventIdentificators.length-1];
      tmp=tmp.substr(5);
      let tmp2= Number(tmp);
      tmp2++;
      this.rowService.EventIdentificators.push("event"+String(tmp2));
      this.id = "event"+tmp2;
    }
    else{
      this.id="event1";
      this.rowService.EventIdentificators.push(this.id);
    }
    
  }

  ngOnInit() {
    // if(this.rowService.getLeftSteps()[this.rowService.getLeftSteps().length/2]<this.left){
    //     // console.log("moj left ",this.left, " a to srodkowy element ",this.rowService.getLeftSteps()[this.rowService.getLeftSteps().length/2]);
    //     // this.whichBox = this.rowService.getLeftSteps().length/2;
    //     for (var i = this.rowService.getLeftSteps().length/2+1; i <= this.rowService.getLeftSteps().length; i++) {
    //       if(this.rowService.getLeftSteps()[i]>this.left){
    //         this.whichBox = i-1;
    //         console.log("moj left:",this.left," pasuje do kolumny ",this.whichBox,"o wartosci ",this.rowService.getLeftSteps()[this.whichBox]);
    //         break;          
    //       }
    //     }
    // }
    // console.log("to jest left", this.left);


    //dopasowuje left do tablicy z rowservice
    for (var i = 0; i < this.rowService.getLeftSteps().length; i++) {
      if(this.rowService.getLeftSteps()[i]>this.left){
        this.whichBox = i-1;
        break;
      }
    }
  	this.renderer.setStyle(this.el.nativeElement.querySelector(".event"),'left',this.rowService.getLeftSteps()[this.whichBox]+"px");
  
    ///zmiana ikonki z modala
    this.rowService.modalIconSubject.subscribe((value)=>{
      console.log("taki string dostaje z service: ",value);
      
      let tmp = value.split(/(\s+)/).filter(function(e){return e.trim().length>0;});
      if(this.id==tmp[1]){
        this.icon = tmp[0];
      }
      
      // console.log("to po odcieciu: ",goal, " a to jest druga czesc: ",path,"value: ", value);
      // console.log("to dostalem po zmianie ikonki ",value);
      // console.log("to moj split:",tmp);
       // this.renderer.setStyle(this.el.nativeElement.querySelector(".timeline"),'background-color',this.color);
      // console.log("TEEEEEEEEEEEEEEEEEEEE  zminilem kolor w obiekcie na ",this.color);
    })
    // this.renderer.setStyle(this.el.nativeElement.querySelector(".timeline"),'background-color',this.color);
  }

  private createIconModal(event){
     if(!this.iconModalShowed){
       console.log("Tworzenie modalu wyboru koloru");
      const comp = this.resolver.resolveComponentFactory(<Type<ChangeIconComponent>>ChangeIconComponent);

      let cmp= this.changeicon.createComponent(comp);
      cmp.instance.left = 500;
      cmp.instance.top = 100;
      cmp.instance.eventId=this.id;
      console.log("stworzylem nowy komponent");
      this.iconModalShowed = true;
     }
     else{
       this.iconModalShowed = false;
       let cmp = this.changeicon.remove();
     }
     
  }

}
