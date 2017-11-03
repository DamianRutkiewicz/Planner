import { Component, OnInit, Input, HostListener, ElementRef, Renderer2, ViewChild, ViewContainerRef, ComponentFactoryResolver, Type } from '@angular/core';
import { RowService } from '../row.service';
import { ContextMenuModule } from '../../../../../node_modules/ngx-contextmenu';
import { TimelineComponent } from '../timeline/timeline.component';

// import {Observable} from 'rxjs/Observable';
// import 'rxjs/add/observable/fromEvent';


@Component({
  selector: '[app-row]',
  templateUrl: './row.component.html',
  styleUrls: ['./row.component.css'],
  entryComponents: [
  TimelineComponent
  ]
})
export class RowComponent implements OnInit {

  private TimelineSteps=[];
  private HoursInRow:number[];
  private liczbaKolumn=[];
  test:string="timeline";
  // oneTD:number;


  // @ViewChild('timeline1', {read: ViewContainerRef}) timeline: ViewContainerRef;


  @Input() row;
  @Input() index;
  index1=1;
  // @Input() index;
  // @HostListener("click") rightClick(){
  //   window.oncontextmenu = this.showCustomMenu();
  // } 

  @HostListener('mouseenter') onMouseEnter(){
  	this.changeColor("#C8FFE1");

  } 
  @HostListener('mouseleave') onMouseLeave(){
  	this.changeColor("none");
  } 

  constructor(private el: ElementRef
    , private renderer: Renderer2
    , private rowService: RowService
    , private resolver: ComponentFactoryResolver) {

    for (var i = 0; i < 4; i++) {
      this.liczbaKolumn.push(i);

    }
  }

  ngOnInit() {
    
  }
  ngDoCheck(){
    
  }
  // private onRightClick(event: MouseEvent){
  //   console.log("clicked !!!!!!!!!!");
  //   // this.renderer.setStyle(this.el.nativeElement.querySelector('.model'),'display','block');
  //   console.log("modul ten zostal klikniety o indeksie: ",this.index);
  //   this.rowService.cliked = this.index;
  //   this.showModal(event);
  //       // console.log("right coord: ",event.clientX, event.clientY," Teraz wartosc z serwisu: ",this.rowService.modalShowed);

  //   return false;
  //   // this.contextmenu =true;
  //     // this.contextmenuX=event.clientX
  //     // this.contextmenuY=event.clientY
  //     // this.contextmenu=true;
  // }
  private onClickHideModal(event){
    // console.log("hidden");
    // this.hideModal();
    return false;
  }
  
  private hideModal(){
    // this.renderer.setStyle(this.el.nativeElement.querySelector('.modal-ss'),'display','none');
  }

  // private showModal(event){
  //   this.rowService.modalSubject.subscribe((data)=>{
  //     // console.log("Odebralem kurwa dane ja pierdole",data.option,data.posX,data.posY);
  //     console.log("kurwa mac",this.index, "opcja : ",data.option);
  //     if(data.option=='timeline'){
  //       if(this.el.nativeElement.querySelector(".one-row").getAttribute("id")==("tm"+this.rowService.cliked)){
  //         // console.log("id : ","tm"+this.index)
  //         console.log("przed create Component");
  //         this.createComponentt(data.posX,data.posY);
  //         this.rowService.cliked=null;
  //         return false;
  //       }
        
  //       // console.log("jestem w ifie timline");
  //     }else if(data.option=='event'){

  //     }
  //   })
  // }  



  private changeColor(color){
  	this.renderer.setStyle(this.el.nativeElement.querySelector('.task-name input'),'background',color);
  }

  // private createComponentt(posx:number,posY:number){
  //   const comp = this.resolver.resolveComponentFactory(<Type<TimelineComponent>>TimelineComponent);

  //   let cmp= this.timeline.createComponent(comp);
  //   // this.renderer.setStyle(this.el.nativeElement.querySelector(".timeline"),'left',posx);
  //   cmp.instance.left = posx;
  //   console.log("stworzylem nowy komponent");
  //   // console.log("o tyle z lewej strony : ", posx);
  // }

  // onUpdate(){
  //   console.log("To jest wywolana funkcja od rodzica kurwa !!!!");
  // }

}
