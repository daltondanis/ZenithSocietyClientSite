import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private http: Http) { }

  ngOnInit() {
  }

  register(Username, Password): void {
    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let data = 'grant_type=password'+'&username=' + Username +'&password=' + Password;

    this.http.post(
      "http://zenithsocietycore.azurewebsites.net/connect/token",
       data,
       {headers: headers}
    ).map(res => res.json()).subscribe(data => { localStorage.setItem('Usertoken', data.access_token), localStorage.setItem('Username', Username)});
    //.map(res => res.json()).subscribe(data => { this.token = data.access_token});

    console.log("Recieved Token");
  }

  print(): void {
    console.log(localStorage.getItem("Usertoken"));
    console.log(localStorage.getItem("Username"));
    //console.log(this.token);
  }

}
