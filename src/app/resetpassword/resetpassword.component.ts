import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router"
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {

  uidb;
  token;
  isShowMsg = false;
  passwordsinfo = {
    password1: "",
    passwords2: ""
  }
  constructor(
    private activeroute : ActivatedRoute,
    private http: HttpClient,
    private router: Router,

  ) {
    this.uidb = this.activeroute.snapshot.params['uidb'];
    this.token = this.activeroute.snapshot.params['token'];
   }

  ngOnInit() {
  }

  updatepassword()
  {
    console.log(this.passwordsinfo);
    this.http.post('https://dashboard.kaenko.com/api/auth/password_reset_confirm/'+this.uidb+"/"+this.token+"/", this.passwordsinfo).subscribe((data:any)=>{
      this.isShowMsg = true;
      this.router.navigate(['/loginwidthpasswordupdate']);
      // console.log(data);
    });
  }

  gotoSignup(){
    this.router.navigate(['/signup']);
  }
}
