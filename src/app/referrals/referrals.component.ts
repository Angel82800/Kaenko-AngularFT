import { Component, OnInit } from '@angular/core';
import { UserService } from "../shared/service/user.service";
@Component({
  selector: 'app-referrals',
  templateUrl: './referrals.component.html',
  styleUrls: ['./referrals.component.css']
})
export class ReferralsComponent implements OnInit {
  showTable = 'TotalReferrals';
  showContent = 'ShowTotalRefMobile';
  refferals = null;
  groupedHistory = null;
  grouptedHistorytrans = new Array();
  copystatus = "COPY";
  constructor(
    private userservice: UserService
  ) {
    this.userservice.referralsAnalysis().subscribe((data:any)=>{
      this.refferals = data;
      console.log(data);
      this.refferals["Total earned (wallet amount + wallet bonus)"] = Number.parseFloat(this.refferals["Total earned (wallet amount + wallet bonus)"]).toFixed(2);
      this.refferals['Transactions (last transactions)'].map(trans =>{
        var date_str = trans["transaction_date"];

        var res = date_str.split("T");

        trans["transaction_date"] = res[0];
      });
      this.groupedHistory = this.groupby(data['Transactions (last transactions)'],"transaction_date");
        console.log(this.groupedHistory);


        for (var k in this.groupedHistory){
          var temp = new Array();
          temp['key'] = k;
          temp['values'] = this.groupedHistory[k];

          this.grouptedHistorytrans.push(temp);
        }
        console.log(this.grouptedHistorytrans);

    });
  }

  ngOnInit() {
  }


  groupby(data, prop) {
    return data.reduce(function(groups, item) {
      const val = item[prop]
      groups[val] = groups[val] || []
      groups[val].push(item)
      return groups
    }, {})
  }

  copytext()
  {
    var copyText:HTMLInputElement  = document.getElementById("copytext") as HTMLInputElement;

    /* Select the text field */
     copyText.select();

    /* Copy the text inside the text field */
    document.execCommand("copy");
    this.copystatus = 'COPIED';

    /* Alert the copied text */
    // alert("Copied the text: " + copyText.value);
  }

}
