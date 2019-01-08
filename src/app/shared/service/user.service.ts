import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable()
export class UserService {
  userInfo = null;
  userBalance = null;
  username = null;
  token = null;
  baseURL = 'https://dashboard.kaenko.com/';
  constructor(private http: HttpClient) {
    this.username = localStorage.getItem('username');
    this.token = localStorage.getItem('token');
    document.cookie+="Authorization="+this.token;
    var reqHeader = new HttpHeaders({'Authorization' : 'Bearer ' + this.token});

    this.http.get(this.baseURL+'/api/user/' + this.username+ '/about', {headers: reqHeader}).subscribe((data => {
      this.userInfo = data;
      console.log(this.userInfo);
      localStorage.setItem('photo', this.userInfo.photo);
    }))
  }
  getUserInfo()
  {
    var reqHeader = new HttpHeaders({'Authorization' : 'Bearer ' + this.token});
    return this.http.get(this.baseURL+'api/user/' + this.username+ '/about', {headers: reqHeader});
  }

  userAuthentication(userName, password){
    var user = {
      "username": userName,
      "password": password
    };

    return this.http.post(this.baseURL+'api/auth/login/', user);
  }

  getUserBalance(){
    var reqHeader = new HttpHeaders({'Authorization' : 'Bearer ' + this.token});
    return this.http.get(this.baseURL+'api/user/' + this.username+ '/balance', {headers: reqHeader});
  }

  sendSMS() {
    var reqHeader = new HttpHeaders({'Authorization' : 'Bearer ' + this.token});

    return this.http.get(this.baseURL+'api/2fa/' + this.username+ '/send_sms/', {headers: reqHeader});
  }

  changePassword(passwrod1, password2, oldpassword)
  {
    var passwords = {
      "password1": passwrod1,
      "password2": password2,
      "old_password": oldpassword
    }
    var reqHeader = new HttpHeaders({'Authorization' : 'Bearer ' + this.token});

    return this.http.post(this.baseURL+'api/user/'+this.username+'/change_password/', passwords, {headers: reqHeader});
  }

  confirmCode(code)
  {
    var codedata = {
      "code": code
    }
    var reqHeader = new HttpHeaders({'Authorization' : 'Bearer ' + this.token});

    return this.http.post(this.baseURL+'api/2fa/'+this.username+'/phone_verify/', codedata, {headers: reqHeader});
  }

  referralsAnalysis()
  {
    var reqHeader = new HttpHeaders({'Authorization' : 'Bearer ' + this.token});
    return this.http.get(this.baseURL+'api/transaction/referrals_analysis/', {headers: reqHeader});
  }

  withdrawToken(withdrawToken)
  {
    var reqHeader = new HttpHeaders({'Authorization' : 'Bearer ' + this.token});
    return this.http.post(this.baseURL+'api/user/'+this.username+'/withdraw_token/', withdrawToken, {headers: reqHeader});
  }

  transactionHistory()
  {
    var reqHeader = new HttpHeaders({'Authorization' : 'Bearer ' + this.token});

    return this.http.get(this.baseURL+'api/transaction/history/', {headers: reqHeader});
  }

  buytoken(buytokeninfo)
  {
    var reqHeader = new HttpHeaders({'Authorization' : 'Bearer ' + this.token});
    return this.http.post(this.baseURL+'api/user/'+this.username+'/buy_token/', buytokeninfo, {headers: reqHeader});
  }

  address(addressInfo)
  {
    var reqHeader = new HttpHeaders({'Authorization' : 'Bearer ' + this.token});
    return this.http.patch(this.baseURL+'api/user/'+this.username+'/address/', addressInfo, {headers: reqHeader});

  }

  phone(phoneInfo){
    var reqHeader = new HttpHeaders({'Authorization' : 'Bearer ' + this.token});
    return this.http.patch(this.baseURL+'api/user/'+this.username+'/phone/', phoneInfo, {headers: reqHeader});
  }

  detail(detailInfo){
    var reqHeader = new HttpHeaders({'Authorization' : 'Bearer ' + this.token});
    return this.http.patch(this.baseURL+'api/user/'+this.username+'/detail/', detailInfo, {headers: reqHeader});
  }

  uploadProfileImage(formdata)
  {
    var reqHeader = new HttpHeaders({'Authorization' : 'Bearer ' + this.token});
    return this.http.patch(this.baseURL+'api/user/'+this.username+'/upload_photo/', formdata, {headers: reqHeader});
  }

  getAllCountries()
  {
    return this.http.get('https://restcountries.eu/rest/v2/all');
  }

  address_eth(eth_address)
  {
    var reqHeader = new HttpHeaders({'Authorization' : 'Bearer ' + this.token});
    return this.http.patch(this.baseURL+'api/user/'+this.username+'/address_eth/', eth_address, {headers: reqHeader});
  }

  confirmUser(uidb, token)
  {
    return this.http.get(this.baseURL+'api/auth/signup_activation/'+uidb+'/'+token+'/?format=json');
  }

  uploadAddressFile(formdata)
  {
    var reqHeader = new HttpHeaders({'Authorization' : 'Bearer ' + this.token});
    return this.http.post(this.baseURL+'api/user/'+this.username+'/address_verify/', formdata, {headers: reqHeader});
  }
}
