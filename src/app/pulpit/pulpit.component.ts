import { Component, OnInit,ElementRef, Input} from '@angular/core';
import { noteClass } from '../noteClass';
import { AuthService } from '../connect-db.service';
import { AngularFireDatabase, FirebaseObjectObservable , FirebaseListObservable} from 'angularfire2/database';

@Component({
  selector: 'app-pulpit',
  templateUrl: './pulpit.component.html',
  styleUrls: ['./pulpit.component.scss']
})
export class PulpitComponent implements OnInit {
	
  // @ViewChild('builder') builder:ElementRef;  
  obObs:FirebaseObjectObservable<any>;
  bgColor;
  Notes:Array<noteClass>=[];

  constructor(private elRef:ElementRef, private authService:AuthService, db:AngularFireDatabase) { 
    this.obObs=db.object('/users/'+localStorage.getItem("uid"));
    this.obObs.subscribe(snapshot =>{
      this.bgColor=snapshot.bgColor;
      // this.Notes = snapshot.Notes;
    })
  }

  ngOnInit() {
  }

  randNumber(){
  	let elem = this.elRef.nativeElement.querySelector('.pulpit-wrapper');
  	return [Math.random()*(elem.offsetHeight-80),Math.random()*(elem.offsetWidth-100)];
  }
  randRotate(){
    let sign = Math.random();
    if(sign < 0.5){
      return Math.random()*3*(-1);
    }
    else {
      return Math.random()*3;
    }
    

  }

  noteInit(header:string, text:string){
	  

	// console.log(this.randNumber()[0],this.randNumber()[1]);
    if(this.Notes.length < 12){
      this.Notes.push(new noteClass());
      // this.obObs.update({"Notes":new noteClass()});
      
    }
  	
  }
  

}
