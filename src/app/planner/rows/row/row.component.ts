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

  private HoursInRow:number[];
  liczbaKolumn=[];
  testOb ={
    id:"jakisid",
    posx:"200px"
  }

  @Input() row;
  @Input() index;
  index1=1;

  @HostListener('mouseenter') onMouseEnter(){
  	this.changeColor("#EB5A29");

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

  focusEvent(){
    this.rowService.changeEventName(this.row,this.index);

  }
  private onClickHideModal(event){
    return false;
  }
  
  private hideModal(){

  }

  private changeColor(color){
  	this.renderer.setStyle(this.el.nativeElement.querySelector('.task-name input'),'background',color);
  }

}
