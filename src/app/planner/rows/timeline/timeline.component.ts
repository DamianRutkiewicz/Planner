import { Component, OnInit, ElementRef, Renderer2 , HostListener} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { RowService } from '../../rows/row.service';
import 'rxjs/add/observable/fromEvent';


@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {

  left:number;
  color:string="#1EE850";
  start:number=40;
  end:number = 220;
  widthTimeline:number;
  mouseDown:boolean=false;
  startMouseDown:number;
  endMouseDown:number;

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

  onMouseMoveClick(event:MouseEvent){

  	if(this.mouseDown){
  		// console.log(event.clientX);
  		// console.log("onmouseMove");
  		this.end = event.clientX;
  		this.endMouseDown = event.clientX;
  		// console.log("przesunieto: ",(this.endMouseDown-this.startMouseDown));
  		 // console.log("end : ",this.end);
  		 if((this.endMouseDown-this.startMouseDown)*1.3>this.rowservice.oneTd/2){
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

  onMouseMoveClickLeft(event:MouseEvent){
  	if(this.mouseDown){
  		this.endMouseDown = event.clientX;
  		if((this.endMouseDown-this.startMouseDown)*1.3<-this.rowservice.oneTd/2){
  			console.log("lewo");
  			console.log("start : ",this.startMouseDown," end: ",this.endMouseDown);
  			this.widthTimeline += (this.rowservice.oneTd/2);
  			this.renderer.setStyle(this.el.nativeElement.querySelector('.timeline'),
  		 		'width',this.widthTimeline+"px");
  			console.log("left : ",this.left);
  			this.left-=this.rowservice.oneTd/2;
  			console.log("left : ",this.left);
  			this.renderer.setStyle(this.el.nativeElement.querySelector('.timeline'),
  		 		'left',(this.left-415)+"px");
  			this.startMouseDown = this.endMouseDown;

  		}else if((this.endMouseDown-this.startMouseDown)*1.3>this.rowservice.oneTd/2){
  			console.log("prawo");

  			this.widthTimeline -= (this.rowservice.oneTd/2);

  			this.renderer.setStyle(this.el.nativeElement.querySelector('.timeline'),
  		 		'width',this.widthTimeline+"px");
  			this.left+=this.rowservice.oneTd/2;

  			this.renderer.setStyle(this.el.nativeElement.querySelector('.timeline'),
  		 		'left',(this.left-415)+"px");
  			this.startMouseDown = this.endMouseDown;
  		}
  	}
  }

  constructor(private renderer: Renderer2, private el: ElementRef, private rowservice: RowService) {
  	this.widthTimeline = this.end - this.start;
  }

  ngOnInit() {
  	// console.log("Jestem w timeline a oto wartosc left: ",this.left);
  	this.renderer.setStyle(this.el.nativeElement.querySelector(".timeline"),'left',(this.left-415)+"px");
  	this.renderer.setStyle(this.el.nativeElement.querySelector(".timeline"),'background-color',this.color);
  	this.renderer.setStyle(this.el.nativeElement.querySelector(".timeline"),'width',this.widthTimeline+"px");
  	
  }

   colorModal(){

   }

   private createColorModal(event){
    // const comp = this.resolver.resolveComponentFactory(<Type<ChangeColorComponent>>ChangeColorComponent);

    // let cmp= this.changecolor.createComponent(comp);
    // cmp.instance.left = posx-(this.a*400);
    // console.log("stworzylem nowy komponent");
  }

}
