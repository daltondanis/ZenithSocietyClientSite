import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Events } from '../event';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  private events = Array();

  constructor (private http: Http) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let concat = "Bearer " + localStorage.getItem("Usertoken");
    //console.log(concat);
    headers.append('Authorization', concat);

    this.http.get(
      "http://zenithsocietycore.azurewebsites.net/api/EventsApi",
      {headers: headers}
    ).map(res => res.json())
     .subscribe(data => {
       for (var i = 0; i < data.length; i++) {
          var temp = new Events();
          temp.ActivityId = data[i].activityId;
          temp.CreatedBy = data[i].createdBy;
          temp.CreationDate = data[i].creationDate;
          temp.End = data[i].endventId;
          temp.EventId = data[i].eventId;
          temp.IsActive = data[i].isActive;
          temp.Start = data[i].start;

          this.events = this.events.concat(temp);
          console.log(temp);

          //this.events = this.events.concat("eventID",data[i].eventId);
          //console.log(data[i].eventId);
       }
       //this.events.concat(data);
     });
    //.map(res => res.toString()).subscribe(data => console.log (data));
    console.log("Done");
  }

  printEvents(): void {
    console.log(this.events);
    //for (let e of this.events) {
      //console.log(e.ActivityId);
    //}
  }

  printToken(): void {
    console.log(localStorage.getItem("Usertoken"));
    console.log(localStorage.getItem("Username"));
    //console.log(this.token);
  }

  ngOnInit() {
  }
}

/*
Http Response

activity:Object
	activityId:2
	creationDate:"2017-01-02T00:00:00"
	description:"Intro to CSS 3"
	events:Array(1)
		0:Object
			activityId:2
			createdBy:"maks"
			creationDate:"2017-01-04T00:00:00"
			end:"2017-03-30T08:30:00"
			eventId:3
			isActive:true
			start:"2017-03-30T06:30:00"
			__proto__:Object
		length:1
		__proto__:Array(0)
	__proto__:Object
activityId:2
createdBy:"maks"
creationDate:"2017-03-26T03:20:02"
end:"2017-03-26T09:30:00"
eventId:6
isActive:true
start:"2017-03-26T08:30:00"
*/