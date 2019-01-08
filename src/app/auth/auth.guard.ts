import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot,  Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UserService } from '../shared/service/user.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private userservice: UserService
  ){

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      if(localStorage.getItem('token') != null){
        this.userservice.username = localStorage.getItem('username');
        this.userservice.token = localStorage.getItem('token');
        return true;
      }
      else {
        this.router.navigate(['/login']);
        return false;
      }
  }
}
