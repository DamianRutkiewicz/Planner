import { Component, OnInit, ElementRef, Renderer2 ,Type,ViewChild, HostListener, ComponentFactoryResolver, ViewContainerRef} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { RowService } from '../../rows/row.service';
import 'rxjs/add/observable/fromEvent';
import { ChangeColorComponent } from '../row/column/change-color/change-color.component';


@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss'],
  entryComponents: [
  ChangeColorComponent
  ]
})
export class TimelineComponent implements OnInit {

  left:number; //to jest odleglosc od lewej krawedzi kolumny
  public color:string="#1EE850"; //kolor timelineu
  // start:number=40;//
  // end:number = 220;
  widthTimeline:number;
  mouseDown:boolean=false;
  startMouseDown:number;
  endMouseDown:number;
  whichBox:number;
  private id;

  colorModalShowed:boolean=false;

  @ViewChild('changecolor', {read: ViewContainerRef}) changecolor: ViewContainerRef;
  // @HostListener('childEvent') childEvent(){
  // 	alert("zmieniono ten jebany color");
  // }


  onMouseDownClick(event){
  	this.mouseDown = true;
  	this.startMouseDown = event.clientX;
  	console.log("kliknieto ",event);
  }

  onMouseUpClick(event){
  	this.mouseDown = false;
  }

  onMouseLeave(){
  	this.mouseDown = false;
  }

  // funkcja odpowiedzialna za przesuwanie prawej krawedzi
  onMouseMoveClick(event:MouseEvent){

  	if(this.mouseDown){
  		// console.log(event.clientX);
  		// console.log("onmouseMove");
  		// this.end = event.clientX;
  		this.endMouseDown = event.clientX;
  		// console.log("przesunieto: ",(this.endMouseDown-this.startMouseDown));
  		 // console.log("end : ",this.end);
  		 if(((this.endMouseDown-this.startMouseDown)*1.3>this.rowservice.oneTd/2)
         &&(this.left+this.widthTimeline)<400){
  		 	this.widthTimeline += (this.rowservice.oneTd/2);
  		 	this.renderer.setStyle(this.el.nativeElement.querySelector('.timeline'),
  		 		'width',this.widthTimeline+"px");
  		 	this.startMouseDown = this.endMouseDown;
  		 	
  		 	// console.log("dlugosc: ",this.widthTimeline);
  		 	// console.log("przesunieto o ",this.widthTimeline+this.rowservice.oneTd/2+"px ", "tyle bylo :",this.widthTimeline);
  		 }else if((this.endMouseDown-this.startMouseDown)<-this.rowservice.oneTd/2){
  		 	// console.log("zmniejszam");
  		 	this.widthTimeline -= (this.rowservice.oneTd/2);

  		 	this.renderer.setStyle(this.el.nativeElement.querySelector('.timeline'),
  		 		'width',this.widthTimeline+"px");
  		 	this.startMouseDown = this.endMouseDown;
  		 }
  		// console.log(this.widthTimeline+(event.clientX-this.startMouseDown)+"px");
  		// this.widthTimeline+(this.endMouseDown-this.startMouseDown)
  	}
  }

  // funkcja odpowiedzialna za przesuwanie lewej krawedzi
  onMouseMoveClickLeft(event:MouseEvent){
  	if(this.mouseDown){
  		this.endMouseDown = event.clientX;
  		if((this.endMouseDown-this.startMouseDown)*1.3<-this.rowservice.oneTd/2){
  			console.log("lewo");
  			this.widthTimeline += (this.rowservice.oneTd/2);
  			this.renderer.setStyle(this.el.nativeElement.querySelector('.timeline'),
  		 		'width',this.widthTimeline+"px");
  			this.left-=this.rowservice.oneTd/2;
  			this.renderer.setStyle(this.el.nativeElement.querySelector('.timeline'),
  		 		'left',(this.left)+"px");
  			this.startMouseDown = this.endMouseDown;

  		}else if((this.endMouseDown-this.startMouseDown)*1.3>this.rowservice.oneTd/2){
  			console.log("prawo");

  			this.widthTimeline -= (this.rowservice.oneTd/2);

  			this.renderer.setStyle(this.el.nativeElement.querySelector('.timeline'),
  		 		'width',this.widthTimeline+"px");
  			this.left+=this.rowservice.oneTd/2;

  			this.renderer.setStyle(this.el.nativeElement.querySelector('.timeline'),
  		 		'left',(this.left)+"px");
  			this.startMouseDown = this.endMouseDown;
  		}
  	}
  }

  constructor(private renderer: Renderer2,
   private el: ElementRef,
    private rowservice: RowService,
     private resolver: ComponentFactoryResolver) {
  	// this.widthTimeline = this.end - this.start;
    this.widthTimeline = 180;

     if(this.rowservice.TimelineIdentificators.length!==0){
      let tmp=this.rowservice.TimelineIdentificators[this.rowservice.TimelineIdentificators.length-1];
      tmp=tmp.substr(8);
      let tmp2= Number(tmp);
      tmp2++;
      this.rowservice.TimelineIdentificators.push("timeline"+String(tmp2));
      this.id = "timeline"+tmp2;
      }
      else{
        // this.id="event1";
        this.id = "timeline1";
        this.rowservice.TimelineIdentificators.push(this.id);
      }
  }

  ngOnInit() {

    //petla sprawdza gdzie powinien zaczynac sie timeline i wybiera wartosc left z tablicy z rowservice
    for (var i = 0; i < this.rowservice.getLeftSteps().length; i++) {
      if(this.rowservice.getLeftSteps()[i]>this.left){
        this.whichBox = i-1;
        this.left = this.rowservice.getLeftSteps()[i-1]
        // console.log("to jest whichbox: ",this.whichBox);
        break;
      }
      if(i==this.rowservice.getLeftSteps().length-1){
          this.whichBox = i;
          this.left = this.rowservice.getLeftSteps()[i];
      }
    }
  	
    // sprawdza czy dlugosc timelinea nie wyjdzie poza zakres
  	if((this.left+this.widthTimeline)<400){
      this.renderer.setStyle(this.el.nativeElement.querySelector(".timeline"),'left',this.rowservice.getLeftSteps()[this.whichBox]+"px");
      this.renderer.setStyle(this.el.nativeElement.querySelector(".timeline"),'width',this.widthTimeline+"px");
    }
    else{
      this.widthTimeline = 400-this.left;
      this.renderer.setStyle(this.el.nativeElement.querySelector(".timeline"),'left',this.rowservice.getLeftSteps()[this.whichBox]+"px");
      if(this.widthTimeline<this.rowservice.oneTd/2){
        this.widthTimeline=this.rowservice.oneTd/2;
        this.renderer.setStyle(this.el.nativeElement.querySelector(".timeline"),'left',this.rowservice.getLeftSteps()[this.whichBox]+"px");
      }

      this.renderer.setStyle(this.el.nativeElement.querySelector(".timeline"),'width',this.widthTimeline+"px");
    }
  	
  	
  	this.rowservice.modalColorSubject.subscribe((value)=>{

      let tmp = value.split(/(\s+)/).filter(function(e){return e.trim().length>0;});
      if(this.id==tmp[1]){
        this.color = tmp[0];
      }
      console.log("to jest id: ",this.id, "a to jest color:",this.color);
  		// this.color = value;
  		// console.log("Zmienilem kolor na ",this.color);
  		//  this.renderer.setStyle(this.el.nativeElement.querySelector(".timeline"),'background-color',this.color);
  		// console.log("TEEEEEEEEEEEEEEEEEEEE  zminilem kolor w obiekcie na ",this.color);
  	})
  	// this.renderer.setStyle(this.el.nativeElement.querySelector(".timeline"),'background-color',this.color);
  	console.log("to jest left tego timelinea: ",this.left)
  }
   private createColorModal(event){
   	if(!this.colorModalShowed){
   		console.log("Tworzenie modalu wyboru koloru");
	    const comp = this.resolver.resolveComponentFactory(<Type<ChangeColorComponent>>ChangeColorComponent);

	    let cmp= this.changecolor.createComponent(comp);
	    cmp.instance.left = 500;
	    cmp.instance.top = 100;
      cmp.instance.timelineid = this.id;
	    console.log("stworzylem nowy komponent");
	    this.colorModalShowed = true;
   	}
   	else{
   		this.colorModalShowed = false;
   		let cmp = this.changecolor.remove();
   	}
   	
  }

}
