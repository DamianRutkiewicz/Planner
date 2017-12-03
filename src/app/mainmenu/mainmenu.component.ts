import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { RouterModule, Routes} from '@angular/router';

@Component({
  selector: 'app-mainmenu',
  templateUrl: './mainmenu.component.html',
  styleUrls: ['./mainmenu.component.css']
})
export class MainmenuComponent implements OnInit {

  constructor(private http: Http) { }

  ngOnInit() {
  	
  }

}
