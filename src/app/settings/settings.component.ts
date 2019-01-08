import { Component, OnInit } from '@angular/core';
import { UserService } from "../shared/service/user.service";
import {Ng2TelInputModule} from 'ng2-tel-input';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})

export class SettingsComponent implements OnInit {
  isSentSms = false;
  resSendSms = null;
  oldpass = "";
  newpass = "";
  cnewpass = "";
  is_shown_msg_pass= false;
  res_change_pass = null;
  code = "";
  ng2TelInputOptions = null;
  phone_number ;
  userinfo;
  countries;
  phone_code;

  passwordChangeErrors = [];
  passwordErrorkeys = [];

  constructor(
    private userservice: UserService
  ) {

    userservice.getUserInfo().subscribe((data:any) => {

      this.userinfo = data;
      if(this.userinfo.phone == null || this.userinfo.phone == "")
      {
        this.phone_code = "1";
      }else {
        this.phone_code = this.userinfo.phone.split(" ")[0];
        this.phone_code = this.phone_code.split('+')[1];
      }
      userservice.getAllCountries().subscribe((data:any)=>{
        this.countries = data;

        this.countries.forEach(element => {
          if(this.phone_code == element.callingCodes[0])
          {
            this.ng2TelInputOptions = {
              initialCountry: element.alpha2Code.toLowerCase()
            }
            this.phone_number = this.userinfo.phone.split("+" + element.callingCodes[0])[1];
            this.phone_number = this.phone_number.replace(" ", "");
            if(this.phone_number == "undefined")
            {
              this.phone_number = "";
            }
          }
        });
      });
    });
  }

  ngOnInit() {
  }

  sendSMS()
  {
   this.userservice.sendSMS().subscribe((data:any)=>{
     this.isSentSms = true;
     this.resSendSms = data;
     var me = this;
   });
  }

  confirmCode()
  {
    this.userservice.confirmCode(this.code).subscribe((data:any)=>{
      this.resSendSms = data;
      this.isSentSms = true;
    });
  }

  changePassword(){
    this.userservice.changePassword(this.newpass, this.cnewpass, this.oldpass).subscribe((data:any)=>{
      this.is_shown_msg_pass = true;
      this.res_change_pass = data;

    }, (err)=>{

      this.is_shown_msg_pass = true;
      this.res_change_pass = {
        messages:err.error
      }

      var tempkey = Object.keys(err.error);
      var errorkey = tempkey;
      this.passwordErrorkeys = tempkey;

      var temp = Object.keys(err.error).map(key=>err.error[key]);
      var str = "";
      for(var i = 0; i < temp.length; i++){
        str +=  tempkey[i] + " : " + temp[i][0];
        this.passwordChangeErrors[tempkey[i]] = temp[i][0];
      }

      this.res_change_pass = {
        messages:str
      }
    });
  }

  changePhone(){
    var phoneInfo = {
      "phone": "+" + this.phone_code + " " + this.phone_number
    }
    this.userservice.phone(phoneInfo).subscribe((data:any)=>{
    })
  }

  telInputObject(obj) {
    obj.intlTelInput('setCountry', this.ng2TelInputOptions.initialCountry);
  }

  hasError(error)
  {

  }

  getNumber(number){

  }

  onCountryChange(event)
  {
    this.phone_code = event.dialCode;
    var phoneInfo = {
      "phone": "+" + this.phone_code + " " + this.phone_number
    }
    this.userservice.phone(phoneInfo).subscribe((data:any)=>{
    })
  }
}
