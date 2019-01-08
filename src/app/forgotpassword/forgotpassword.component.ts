import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";
@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {
  emailinfo = {
    "email": ""
  };
  isShowMsg = false;
  isError = false;
  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit() {
  }
  sendemail()
  {
    console.log(this.emailinfo);
    this.http.post('https://dashboard.kaenko.com/api/auth/password_reset/', this.emailinfo).subscribe((data:any)=>{
      this.isShowMsg = true;
    }, (err: HttpErrorResponse) => {
      console.log(err.error);
      this.isError = true;

    });
  }
  gotoSignup(){
    this.router.navigate(['/signup']);
  }
}
