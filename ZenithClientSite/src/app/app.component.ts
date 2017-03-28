import { Component } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  private title = 'app works!';
  private token;
  private events;

  constructor (private http: Http) {}



  getToken(): string {
    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let data = 'grant_type=password'+'&username=a@a.a'+'&password=P@$$w0rd';

    this.http.post(
      "http://localhost:30228/connect/token",
       data,
       {headers: headers}
    ).map(res => res.json()).subscribe(data => { this.token = data.access_token});
    //.map(res => res.json()).subscribe(data => {console.log(data.access_token)})
    //.map(this.extractData).subscribe(token => token = token)

    //console.log(token)
    return ;
  }

  getZenithToken(): string {
    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let data = 'grant_type=password'+'&username=a'+'&password=P@$$w0rd';

    this.http.post(
      "http://zenithsocietycore.azurewebsites.net/connect/token",
       data,
       {headers: headers}
    ).map(res => res.json()).subscribe(data => { this.token = data.access_token});

    //console.log(token)
    return ;
  }

  getEvents(): string {
    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let concat = "Bearer " + this.token;
    console.log(concat);
    headers.append('Authorization', concat);

    this.events = this.http.get(
      "http://zenithsocietycore.azurewebsites.net/api/EventsApi",
      {headers: headers}
    ).map(res => res.json()).subscribe(data => { this.events = data});
    //.map(res => res.toString()).subscribe(data => console.log (data));
    //.map(this.extractData).subscribe(data => this.events = data)
    //.subscribe(data => { this.events = data.eventId})
    //.subscribe(data => { this.events = data});
    console.log("Done");
    return ;
  }

  printEvents(): void {
    console.log(this.events);
  }

  getTest(): void {
    console.log(this.token);
  }

  private extractData(res: Response) {
    return JSON.parse(JSON.stringify(res || null ));
  }

      //"eventId":4,
      //"start":"2017-03-13T07:00:00",
      //"end":"2017-03-13T08:30:00",
      //"createdBy":"a",
      //"activityId":4,
      //"activity":{  
         //"activityId":4,
         //"description":"Intro to UX/UI",
         //"creationDate":"2017-01-04T00:00:00",
         //"events":[  

         //]
      //},
      //"creationDate":"2017-01-04T00:00:00",
      //"isActive":true
   //},
}

/*

  var jwt = localStorage.getItem('id_token');
  var authHeader = new Headers();
  if(jwt) {
    authHeader.append('Authorization', 'Bearer ' + jwt);      
  }

  this.http.get('http://localhost:3001/api/protected/random-quote', {
    headers: authHeader
  })
  .map(res => res.text())
  .subscribe(
    data => this.secretQuote = data,
    err => this.logError(err),
    () => console.log('Secret Quote Complete')
  );
  */

