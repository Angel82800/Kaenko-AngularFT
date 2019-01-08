import { Injectable } from '@angular/core';

@Injectable()
export class HeaderServiceService {
  user
  constructor() { }

  setUser(user){
    this.user = user;
  }

  getUser(){
    return this.user;
  }
}
