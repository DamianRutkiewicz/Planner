import { Component, OnInit, ViewContainerRef, ViewChild, ElementRef,Type, Renderer2,ComponentFactoryResolver, Input } from '@angular/core';
import { RowService } from '../../row.service';
import { ContextMenuModule } from '../../../../../../node_modules/ngx-contextmenu';
import { TimelineComponent } from '../../timeline/timeline.component';
import { ChangeColorComponent } from './change-color/change-color.component';

@Component({
  selector: '[app-column]',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.css']
})
export class ColumnTdComponent implements OnInit {

  private TimelineSteps=[];
   @ViewChild('timeline1', {read: ViewContainerRef}) timeline: ViewContainerRef;
   @ViewChild('changecolor', {read: ViewContainerRef}) changecolor: ViewContainerRef;

   @Input() a;
   @Input() index;

  constructor(private el: ElementRef
    , private renderer: Renderer2
    , private rowservice: RowService
    , private resolver: ComponentFactoryResolver) {

   }

  ngOnInit() {
  	this.TimelineSteps= this.rowservice.getTimeLineSteps();
  	// console.log("tablica",)
  }

  private onRightClick(event: MouseEvent){
    console.log("clicked !!!!!!!!!!");
    console.log("modul ten zostal klikniety o indeksie: ",this.a, " i row : ",this.index);
    console.log(event.target);
    this.rowservice.cliked = [this.index,this.a];
    this.showModal(event);
        // console.log("right coord: ",event.clientX, event.clientY," Teraz wartosc z serwisu: ",this.rowService.modalShowed);

    return false;
    // this.contextmenu =true;
      // this.contextmenuX=event.clientX
      // this.contextmenuY=event.clientY
      // this.contextmenu=true;
  }

  private showModal(event){
    this.rowservice.modalSubject.subscribe((data)=>{
      // console.log("Odebralem kurwa dane ja pierdole",data.option,data.posX,data.posY);
      console.log("kurwa mac",this.a, "opcja : ",data.option);
      if(data.option=='timeline'){
      	console.log("przeszedlem do ifa timeline oto parametry : row:",this.index," a:",this.a);
      	// this.renderer.setStyle(this.el.nativeElement.querySelector("#td"+this.a),'background','gray');
      	// this.rowservice.cliked[0]=this.index;
      	// this.rowservice.cliked[1]=this.a;

      	console.log("id z clicked : ","tm"+this.rowservice.cliked[1])
          console.log("class z clicked : ","in-tr"+this.rowservice.cliked[0])

        console.log("a takie zwraca");
        console.log(this.el.nativeElement.querySelector(".in-tr").getAttribute("id"));
        console.log(this.el.nativeElement.querySelector(".in-tr").getAttribute("class"));

        if((this.el.nativeElement.querySelector(".in-tr").getAttribute("id")==("td"+this.rowservice.cliked[1]))&&
        	(this.el.nativeElement.querySelector(".in-tr").getAttribute("class")==("one-column in-tr in-tr"+this.rowservice.cliked[0]))){

          console.log("id z clicked : ","td"+this.rowservice.cliked[1])
          console.log("class z clicked : ","in-tr"+this.rowservice.cliked[0])
          

          console.log("pozycje X: ",data.posX," Y: ",data.posY);
          this.createComponentt(data.posX,data.posY);
          this.rowservice.cliked=null;
          return false;
          
        }
      }else if(data.option=='event'){

      }
    })
  }  

  private createComponentt(posx:number,posY:number){
    const comp = this.resolver.resolveComponentFactory(<Type<TimelineComponent>>TimelineComponent);

    let cmp= this.timeline.createComponent(comp);
    cmp.instance.left = posx-(this.a*400);
    console.log("stworzylem nowy komponent");
  }

  

}
