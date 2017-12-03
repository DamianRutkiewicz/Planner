import { Component, OnInit } from '@angular/core';
import { RowService } from '../../../row.service';

@Component({
  selector: 'app-change-icon',
  templateUrl: './change-icon.component.html',
  styleUrls: ['./change-icon.component.scss']
})
export class ChangeIconComponent implements OnInit {

  left:number;
  top:number;
  eventId;

  icons:string[]=[
  'e1.png',
  'e2.png',
  'e3.png',
  'e4.png',
  'e5.png',
  'e6.png',
  'e7.png',
  'e8.png',
  'e9.png',
  ]

  constructor(private rowservice: RowService) { }

  ngOnInit() {
  }

  onChangeIcon(value){
  	console.log("Zmieniono na ",value,);
  	this.rowservice.changeModalIcon(value,this.eventId);
  }

}
