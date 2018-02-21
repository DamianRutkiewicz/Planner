import { Component, OnInit,ElementRef, Input} from '@angular/core';
import { noteClass } from '../noteClass';
import { AuthService } from '../connect-db.service';
import { AngularFireDatabase, FirebaseObjectObservable , FirebaseListObservable} from 'angularfire2/database';
import * as $ from 'jquery';
import { RowService } from '../planner/rows/row.service';

@Component({
  selector: 'app-pulpit',
  templateUrl: './pulpit.component.html',
  styleUrls: ['./pulpit.component.css']
})
export class PulpitComponent implements OnInit {
	
  // @ViewChild('builder') builder:ElementRef;  
  obObs:FirebaseObjectObservable<any>;
  obObsNotes:FirebaseObjectObservable<any>;
  bgColor;
  Notes:Array<noteClass>=[];
  maxId=0;

  constructor(private rowservice: RowService, private elRef:ElementRef, private authService:AuthService,private db:AngularFireDatabase) { 


    this.obObs=db.object('/users/'+localStorage.getItem("uid"));
    this.obObsNotes = db.object('/users/'+localStorage.getItem("uid")+"/Notes/");
    this.obObs.subscribe(snapshot =>{
      this.bgColor=snapshot.bgColor;
      // this.Notes = snapshot.Notes;
    });

      this.obObsNotes.subscribe((value)=>{
      // console.log("obiekt: ",value.);
      // this.noteInit(value.notetext,value.noteid);
        this.Notes = [];
        for (var key in value) {
          if(value[key]!==null){
            this.noteInit(value[key].notetext,value[key].noteid);
          }
          
      }

      for (var key in value) {
        var tmp= Number(key.substr(4))
        if(tmp>this.maxId){
          this.maxId = tmp;
        }
      }
      this.maxId++;
    })
    
  }

  removeNote(data:string):void{
    this.db.object('/users/'+localStorage.getItem("uid")+"/Notes/"+data).remove();
    var index = this.Notes.filter(function(el){
      return el.noteid != data;
    })
    this.Notes = index;
  }
  saveNote(data){
    var index = data.indexOf(" ");
    var id = data.substr(0,index);
    var text = data.substr(index+1);
    var tmpOb = {
      noteid:id,
      notetext:text
    }
    this.db.object('/users/'+localStorage.getItem("uid")+"/Notes/"+tmpOb.noteid).update(tmpOb);
  }

  ngOnInit() {

    this.rowservice.removeNoteSubject.subscribe((data)=>{
      this.removeNote(data);
    });
    this.rowservice.saveNoteSubject.subscribe((data)=>{
      this.saveNote(data);

    });
  
    (function(){
      var x = navigator.geolocation;
      x.getCurrentPosition(success,failure,{timeout: 30000, enableHighAccuracy: true, maximumAge: 75000});
      
      
      
    })();

    function createCalendar(api){
      $.getJSON(api,function(data){
      
          var temp=data.main.temp-273.15;

          $("#city").html(data.name);
          var txt = temp+"<sup>o</sup>C";
          var wind = data.wind.speed+"m/s ";
          var icon = "<img src='assets/images/"+data.weather[0].icon+".png'/>";
          // $("#ico").html(data.weather[0].icon);
          var pressure = data.main.pressure+"hpa";
          $("#ico").html(icon);
          $("#temp").html(txt);
          $("#wind").html(wind);
          $("#pressure").html(pressure);
        });
    }

    function success(position){
        var lat = position.coords.latitude;
        var lon = position.coords.longitude;
        var api = "http://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&appid=06a64d8a64a5d7158cca6215772051d0";
        
        createCalendar(api);
    }

    function failure(){
        var lat = "52.2297";
        var lon = "21.07";
        var api = "http://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&appid=06a64d8a64a5d7158cca6215772051d0";
        createCalendar(api);
        console.log("Nie udało się zlokalizować położenia");
    }

    $(function() {
    function c() {
        p();
        var e = h();
        var r = 0;
        var u = false;
        l.empty();
        while (!u) {
            if (s[r] == e[0].weekday) {
                u = true
            } else {
                l.append('<div class="blank"></div>');
                r++
            }
        }
        for (var c = 0; c < 42 - r; c++) {
            if (c >= e.length) {
                l.append('<div class="blank"></div>')
            } else {
                var v = e[c].day;
                var m = g(new Date(t, n - 1, v)) ? '<div class="today">' : "<div>";
                l.append(m + "" + v + "</div>")
            }
        }
        var y = o[n - 1];
        a.css("background-color", y).find("h1").text(i[n - 1] + " " + t);
        f.find("div").css("color", y);
        l.find(".today").css("background-color", y);
        d()
    }

    function h() {
        var e = [];
        for (var r = 1; r < v(t, n) + 1; r++) {
            e.push({
                day: r,
                weekday: s[m(t, n, r)]
            })
        }
        return e
    }

    function p() {
        f.empty();
        for (var e = 0; e < 7; e++) {
            f.append("<div>" + s[e].substring(0, 3) + "</div>")
        }
    }

    function d() {
        var t;
        var n = $("#calendar").css("width", "100%");
        n.find(t = "#calendar_weekdays, #calendar_content").css("width", "100%").find("div").css({
            width:"14.25%",
            height: "20px",
            float:"left",
            "line-height": "100%%"
        });
        n.find("#calendar_header").css({
            height: e * (1 / 7) + "px"
        }).find('i[class^="icon-chevron"]').css("line-height", e * (1 / 7) + "px")
    }

    function v(e, t) {
        return (new Date(e, t, 0)).getDate()
    }

    function m(e, t, n) {
        return (new Date(e, t - 1, n)).getDay()
    }

    function g(e) {
        return y(new Date) == y(e)
    }

    function y(e) {
        return e.getFullYear() + "/" + (e.getMonth() + 1) + "/" + e.getDate()
    }

    function b() {
        var e = new Date;
        t = e.getFullYear();
        n = e.getMonth() + 1
    }
    var e = 480;
    var t = 2013;
    var n = 9;
    var r = [];
    var i = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var s = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var o = ["#16a085", "#1abc9c", "#c0392b", "#27ae60", "#FF6860", "#f39c12", "#f1c40f", "#e67e22", "#2ecc71", "#e74c3c", "#d35400", "#2c3e50"];
    var u = $("#calendar");
    var a = u.find("#calendar_header");
    var f = u.find("#calendar_weekdays");
    var l = u.find("#calendar_content");
    b();
    c();
    a.find('i[class^="fa"]').on("click", function() {
        var e = $(this);
        var r = function(e) {
            n = e == "next" ? n + 1 : n - 1;
            if (n < 1) {
                n = 12;
                t--
            } else if (n > 12) {
                n = 1;
                t++
            }
            c()
        };
        if (e.attr("class").indexOf("left") != -1) {
            r("previous")
        } else {
            r("next")
        }
    })
})


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
    

  };

  newNote(){
    this.Notes = [];
    this.updateNotes();
  }
  saveToDb(max){
    var tmp ={
      noteid:"note"+max,
      notetext:""
    }

    this.db.object('/users/'+localStorage.getItem("uid")+"/Notes/"+tmp.noteid).update(tmp);
  }

  updateNotes(){
    var objTmp = new noteClass("","note"+this.maxId);
    this.db.object('/users/'+localStorage.getItem("uid")+"/Notes/"+objTmp.noteid).update(objTmp);
  }

  noteInit(text,id){
    if(this.Notes.length < 12){
      this.Notes.push(new noteClass(text,id));
      
    }
  	
  }
  

}
