import { Component, OnInit, Input , ElementRef} from '@angular/core';
import { noteClass } from '../noteClass';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {

  @Input() note;
  rotate;
  constructor(private elRef:ElementRef) { 
  	this.rotate = this.randRotate();
  	console.log(this.rotate);
  	this.elRef.nativeElement.style.value;
  	console.log("element ref: ",this.elRef.nativeElement.style.value)
  }

  ngOnInit() {

  }

  randRotate(){
    let sign = Math.random();
    if(sign < 0.5){
      return (Math.random()*4*(-1))+"deg";
    }
    else {
      return (Math.random()*4)+"deg";
    }
  }

}
