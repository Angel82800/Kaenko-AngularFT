import { Component, OnInit } from '@angular/core';
import { UserService } from "../shared/service/user.service";

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit {
  userinfo =  null;
  constructor(
    private userservice: UserService
  ) {
    userservice.getUserInfo().subscribe((data:any) => {
      this.userinfo = data;
    });
  }

  ngOnInit() {
  }

  saveProfile()
  {
    this.saveAddress();
    this.savePhone();
    this.saveDetail();
  }

  saveAddress()
  {
    var addressInfo = {
      "address_line": this.userinfo.address_line,
      "city": this.userinfo.city,
      "country": this.userinfo.country,
      "zipcode": this.userinfo.zipcode
    }
    this.userservice.address(addressInfo).subscribe((data:any)=>{
    })
  }

  savePhone()
  {
    var phoneInfo = {
      "phone": this.userinfo.phone
    }
    this.userservice.phone(phoneInfo).subscribe((data:any)=>{

    })
  }

  saveDetail()
  {
    var detailInfo = {
      "full_name": this.userinfo.full_name,
      "nationality": this.userinfo.nationality
    }
    this.userservice.detail(detailInfo).subscribe((data:any)=>{
    })
  }
}
