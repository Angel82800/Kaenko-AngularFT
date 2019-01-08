import { Component, OnInit } from '@angular/core';
import { UserService } from "../shared/service/user.service";

@Component({
  selector: 'app-buy-knko',
  templateUrl: './buy-knko.component.html',
  styleUrls: ['./buy-knko.component.css']
})
export class BuyKnkoComponent implements OnInit {
  monySelected = 'EUR';
  buytokeninfo = {
    "buy_token": 0,
    "sale_euro": 0
  }
  showCongratulation = false;
  showError = false;
  errorMsg = null;
  constructor(
    private userservice: UserService
  ) { }

  ngOnInit() {
  }

  buytoken()
  {
    this.userservice.buytoken(this.buytokeninfo).subscribe((data:any) => {
      this.showCongratulation = true;
    },(err)=>{
      this.showError = true;
      this.errorMsg = err.error;
    });
  }
}
