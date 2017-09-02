import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-planner',
  templateUrl: './planner.component.html',
  styleUrls: ['./planner.component.css']
})
export class PlannerComponent {

  temp;
  lat="52.23";
  lon="21.01";
  api = "http://api.openweathermap.org/data/2.5/weather?lat="+this.lat+"&lon="+this.lon+"&appid=06a64d8a64a5d7158cca6215772051d0";

  constructor() { }

  ngOnInit() {
  	
  }

}
