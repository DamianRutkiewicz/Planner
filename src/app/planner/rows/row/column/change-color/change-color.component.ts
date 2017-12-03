import { Component, OnInit, Output,} from '@angular/core';
import { RowService } from '../../../row.service';

@Component({
  selector: 'app-change-color',
  templateUrl: './change-color.component.html',
  styleUrls: ['./change-color.component.scss'],
  outputs:['childEvent']
})
export class ChangeColorComponent implements OnInit {


  left:number;
  top:number;
  timelineid;
  // @Output() childEvent: EventEmitter<string> = new EventEmitter<string>();

  colors:string[]=[
  '#FF0000',
  '#1EE850',
  '#30E1FF',
  '#FF8BDC',
  '#FFEDCA',
  '#BBFFEF',
  '#BA84D1',
  '#B0ABD1',
  '#D1BAB8',
  '#8B007F',
  '#8F101A',
  '#59CEEB',
  '#FEFF0E',
  '#8C00E8',
  '#4B007D',
  '#006E09'
  ]

  constructor(private rowservice: RowService) { }

  ngOnInit() {
  }

  onChangeColor(value){
  	console.log("Zmieniono na ",value);
  	this.rowservice.changeModalColor(value,this.timelineid);
  }

}
