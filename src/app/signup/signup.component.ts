import { Component, OnInit } from '@angular/core';
import {HttpClient,HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  user = {
    "username": "",
    "email": "",
    "full_name": "",
    "password": ""
  }
  errors = null;
  isError = false;
  errorkey = null;
  errormsg = null;
  isShowThanks = false;

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
  }

  click() {
    this.http.post('https://dashboard.kaenko.com/api/auth/signup/', this.user).subscribe((data => {
      // this.router.navigate(['login']);
      this.isShowThanks = true;
    }), (err: HttpErrorResponse) => {
      var tempkey = Object.keys(err.error);
      this.errorkey = tempkey;
      this.isError = true;
      var temp = Object.keys(err.error).map(key=>err.error[key]);
      this.errormsg = temp;
      var str = "";
      for(var i = 0; i < temp.length; i++){
        str += tempkey[i] + " " + temp[i];
        str += "<br>";
      }
      this.errors = str;
    });

  }

  gotoLogin(){
    this.router.navigate(['login']);
  }
}
