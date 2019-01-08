import { Component, OnInit } from '@angular/core';
import { UserService } from "../shared/service/user.service";
import { COMPOSITION_BUFFER_MODE } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  userBalance = null;
  transactionHistory = null;
  groupedHistory = null;
  grouptedHistorytrans = new Array();
  isShowNoTrans = false;
  constructor(
    private userservice : UserService
  ) {
    this.userBalance = this.userservice.getUserBalance().subscribe((data:any)=>{
      this.userservice.userBalance = data;
      this.userBalance = data;
      this.userBalance['Total balance (wallet amount + bonus)'] = Number.parseFloat(this.userBalance['Total balance (wallet amount + bonus)']).toFixed(2);
      this.userBalance['Earned by Referrals (wallet amount)'] = Number.parseFloat(this.userBalance['Earned by Referrals (wallet amount)']).toFixed(2);
      this.userBalance['Current value in EUR ((wallet amount + bonus) * token_sale_price)'] = Number.parseFloat(this.userBalance['Current value in EUR ((wallet amount + bonus) * token_sale_price)']).toFixed(2);
    });

    this.userservice.transactionHistory().subscribe((data:any)=>{
      this.transactionHistory = data;
      if(this.transactionHistory.length == 0){
        this.isShowNoTrans = true;
      }

      this.transactionHistory.map(trans =>{
        var date_str = trans["transaction_date"];
        var res = date_str.split("T");
        trans["transaction_date"] = res[0];
      });

      this.groupedHistory = this.groupby(data,"transaction_date");


      for (var k in this.groupedHistory){
        var temp = new Array();
        temp['key'] = k;
        temp['values'] = this.groupedHistory[k];

        this.grouptedHistorytrans.push(temp);
      }

    });

   }

  ngOnInit() {
  }
  scrollDown(){
    window.scrollTo(0, 500);
  }
  groupby(data, prop) {
    return data.reduce(function(groups, item) {
      const val = item[prop]
      groups[val] = groups[val] || []
      groups[val].push(item)
      return groups
    }, {})
  }
}
