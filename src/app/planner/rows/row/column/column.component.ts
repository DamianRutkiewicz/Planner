import { Component, OnInit, ViewContainerRef, ViewChild, ElementRef,Type, Renderer2,ComponentFactoryResolver, Input } from '@angular/core';
import { RowService } from '../../row.service';
import { ContextMenuModule } from '../../../../../../node_modules/ngx-contextmenu';
import { TimelineComponent } from '../../timeline/timeline.component';
import { EventComponent } from '../../event/event.component';


@Component({
  selector: '[app-column]',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.css']
})
export class ColumnTdComponent implements OnInit {

  private TimelineSteps=[];
   @ViewChild('timeline1', {read: ViewContainerRef}) timeline: ViewContainerRef;
   

   @Input() a; //przechowuje w ktorej kolumnie jest
   @Input() index; //przechowuje w ktorym evencie jest

  constructor(private el: ElementRef
    , private renderer: Renderer2
    , private rowservice: RowService
    , private resolver: ComponentFactoryResolver) {

   }

  ngOnInit() {
  	this.TimelineSteps= this.rowservice.getTimeLineSteps();
  }

  private onRightClick(event: MouseEvent){
    // console.log("clicked !!!!!!!!!!");
    // console.log("modul ten zostal klikniety o indeksie: ",this.a, " i row : ",this.index);
    // console.log(event.target);
    this.rowservice.clicked = [this.index,this.a];
    console.log(this.index, " tak tak ",this.a)
    this.showModal(event);
        // console.log("right coord: ",event.clientX, event.clientY," Teraz wartosc z serwisu: ",this.rowService.modalShowed);

    return false;
  }

  private showModal(event){
    this.rowservice.modalSubject.subscribe((data)=>{
      // console.log("Odebralem kurwa dane ja pierdole",data.option,data.posX,data.posY);
      console.log("kurwa mac",this.a, "opcja : ",data.option);
      if(data.option=='timeline'){

        if((this.el.nativeElement.querySelector(".in-tr").getAttribute("id")==("td"+this.rowservice.clicked[1]))&&
        	(this.el.nativeElement.querySelector(".in-tr").getAttribute("class")==("one-column in-tr in-tr"+this.rowservice.clicked[0]))){

          console.log("id z clicked : ","td"+this.rowservice.clicked[1])
          console.log("class z clicked : ","in-tr"+this.rowservice.clicked[0])
          

          console.log("pozycje X: ",data.posX," Y: ",data.posY);
          this.createComponentt(data.posX,data.posY);
          this.rowservice.clicked=null;
          return false;
          
        }
      }else if(data.option=='event'){
        console.log("event");
        // if((this.el.nativeElement.querySelector(".in-tr").getAttribute("id")==("td"+this.rowservice.clicked[1]))&&
        //   (this.el.nativeElement.querySelector(".in-tr").getAttribute("class")==("one-column in-tr in-tr"+this.rowservice.clicked[0]))){
        //   console.log("no i tu jest wstawienie eventu")
        // }
        console.log(this.el.nativeElement.querySelector(".in-tr").getAttribute("class")," z tym ","one-column in-tr in-tr"+this.rowservice.clicked[0]);
        if(this.el.nativeElement.querySelector(".in-tr").getAttribute("id")==("td"+this.rowservice.clicked[1])&&
          (this.el.nativeElement.querySelector(".in-tr").getAttribute("class")==("one-column in-tr in-tr"+this.rowservice.clicked[0]))){
          this.createEventComponent(data.posX);
          // this.rowservice.clicked=null;
          return false;
        }
      }
;    })
  }  

  //tworzy komponent timeline
  private createComponentt(posx:number,posY:number){
    const comp = this.resolver.resolveComponentFactory(<Type<TimelineComponent>>TimelineComponent);

    let cmp= this.timeline.createComponent(comp);
    cmp.instance.left = posx-(this.a*400)-415;
    console.log("stworzylem nowy komponent od lewej: ",posx, " a to jest this.a",this.a);
    console.log(cmp.instance.left," a to jest posx",posx)
  }

  //tworzy komponent event
  private createEventComponent(posx:number){
    // const comp = this.resolver.resolveComponentFactory()
    // console.log("jestem w eventComponent");
    const comp = this.resolver.resolveComponentFactory(<Type<EventComponent>>EventComponent);
    let cmp= this.timeline.createComponent(comp);
    console.log(posx - 415," ti jest cmp left")
    cmp.instance.left = posx-415-(this.a*400);
  }
  

}
