import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Router, ActivatedRoute} from "@angular/router";
import {HeaderServiceService} from "../shared/service/header-service.service";
import {UserService} from "../shared/service/user.service";
import { Location } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user = {
    "username": "",
    "password": ""
  };
  userInfo;
  isLoginError : boolean = false;
  isfirstlogin;
  isRememberMe;
  isRememberMe1;
  photo = "";
  uidb;
  token;
  confirm_msg = "";
  path;
  isshowpwdupdated = false;
  constructor(
    private http: HttpClient,
    private router: Router,
    private headerServiceService:HeaderServiceService,
    private userservice: UserService,
    private activeroute : ActivatedRoute,
    private location: Location,
  ) {
    if(this.userservice.token != null){
      this.router.navigate(['/home']);
    }

    this.isfirstlogin = localStorage.getItem('isfirstlogin');
    if(this.isfirstlogin == null || this.isfirstlogin == 'yes')
    {
      this.isfirstlogin = true;
    }
    else {
      this.isfirstlogin = false;
    }


    this.isRememberMe = localStorage.getItem('isRememberMe');
    if(this.isRememberMe == null || this.isRememberMe == 'no')
    {
      this.isRememberMe = false;
    } else {
      this.isRememberMe = true;
    }

    this.isRememberMe1 = this.isRememberMe;

    this.photo = localStorage.getItem('photo');
    if(this.photo == null || this.photo == "")
    {
      this.photo = '../../assets/images/Log-in.jpg';
    }

    this.uidb = this.activeroute.snapshot.params['uidb'];
    this.token = this.activeroute.snapshot.params['token'];

    if(this.uidb && this.token){
      this.userservice.confirmUser(this.uidb, this.token).subscribe((data)=>{
        console.log(data);
        this.confirm_msg = 'Thank you for confirming your email address. You can now log into your account.';
      },
      (err: HttpErrorResponse) => {
        console.log(err.error.messages);
        this.confirm_msg = err.error.messages;
      });
    }


    router.events.subscribe((val) => {
      console.log(location.path());

      this.path = location.path();
      if (this.path == '/loginwidthpasswordupdate')
      {
        this.isshowpwdupdated = true;
      }
    });

   }

  ngOnInit() {

  }

  login(){
    this.userservice.userAuthentication(this.user.username, this.user.password).subscribe((data:any)=>{
      localStorage.setItem('token', data.token);
      localStorage.setItem('username', data.user.username);
      localStorage.setItem('isfirstlogin', 'no');
      localStorage.setItem('photo', data.user.photo);
      if(this.isRememberMe)
      {
        localStorage.setItem('isRememberMe', 'yes');
      }else{
        localStorage.setItem('isRememberMe', 'no');
      }
      this.userservice.userInfo = data.user;
      var me = this;

      setTimeout(function(){
        me.router.navigate(['/home']);
       }, 1000);

    },
    (err: HttpErrorResponse) => {
      this.isLoginError = true;
    });
  }

  gotoSignup(){
    this.router.navigate(['/signup']);
  }

  toggleRemember()
  {
    this.isRememberMe = !this.isRememberMe;
  }

  gotoforgotpassword()
  {
    this.router.navigate(['/forgotpassword']);
  }
}
