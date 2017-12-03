import { Component, OnInit, Input , ElementRef, EventEmitter} from '@angular/core';
import { noteClass } from '../noteClass';
import { SaveFirebaseService } from '../save-firebase.service';
import { RowService } from '../planner/rows/row.service';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {

  @Input() note;
  str:string;
  // @Output() removeClicked:EventEmitter<any>=new EventEmitter<any>();
  // @Output() saveClicked:EventEmitter<any>=new EventEmitter<any>();
  rotate;

  noteid:string;
  constructor(private elRef:ElementRef, private rowservice: RowService) { 
  	this.rotate = this.randRotate();
  	this.elRef.nativeElement.style.value;

  }

  ngOnInit() {
    console.log(this.note.noteText," note text");
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

  removeNote(){

    this.rowservice.removeNote(this.note.noteid);
    // this.noteid = this.note.noteid;
    // console.log("dla tej notatki jej id: ",this.noteid);

    // console.log("to chce wyslac",this.note.noteid)
    // this.removeClicked.emit("this.note.noteid");
  }
  saveNote(){
    this.rowservice.saveNote(this.note.noteid,this.note.notetext);
    // this.saveClicked.emit(true);
  }

}
