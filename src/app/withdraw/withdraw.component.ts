import { Component, OnInit, VERSION, ViewChild } from '@angular/core';
import { UserService } from '../shared/service/user.service';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';

import { Result } from '@zxing/library';
@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.css']
})
export class WithdrawComponent implements OnInit {

  withdrawdata = {
    "withdraw_token": 0,
    "eth_wallet_address": ""
  };
  isShowMSG = false;
  responseData = null;
  ngVersion = VERSION.full;
  @ViewChild('scanner')
  scanner: ZXingScannerComponent;
  hasCameras = false;
  hasPermission: boolean;
  qrResultString: string;

  availableDevices: MediaDeviceInfo[];
  selectedDevice: MediaDeviceInfo;
  isscanqrcode = false;
  constructor (
    private userservice: UserService
  ) {
    userservice.getUserInfo().subscribe((data:any)=>{
      this.withdrawdata.eth_wallet_address =data.address_eth_wallet;
    });
   }

  ngOnInit() {
    this.scanner.camerasFound.subscribe((devices: MediaDeviceInfo[]) => {
      this.hasCameras = true;
      this.availableDevices = devices;
  });

  this.scanner.camerasNotFound.subscribe((devices: MediaDeviceInfo[]) => {

  });

  this.scanner.permissionResponse.subscribe((answer: boolean) => {
    this.hasPermission = answer;
  });

  }

  confirmWithdraw()
  {
    this.userservice.withdrawToken(this.withdrawdata).subscribe((data:any)=>{
      this.isShowMSG = true;
      this.responseData = data;
    });
  }

  save_eth() {
    var eth_address = {
      "address_eth_wallet": this.withdrawdata.eth_wallet_address
    }
    this.userservice.address_eth(eth_address).subscribe((data:any)=>{
    });
  }


  handleQrCodeResult(resultString: string) {
    this.qrResultString = resultString;
    this.withdrawdata.eth_wallet_address = resultString;
  }

  onDeviceSelectChange(selectedValue: string) {
    this.selectedDevice = this.scanner.getDeviceById(selectedValue);
  }

  changeisqrcode() {
    this.isscanqrcode =  !this.isscanqrcode;
    if (!this.isscanqrcode)
    {
      this.selectedDevice = null;
    }
  }

  isscanqrcodestyle() {
      if(this.isscanqrcode){
        var style = {
          'display' : 'block'
        };
        return  style;
      }
      else {
        var style = {
          'display' : 'none'
        };
        return  style;
      }
  }
}
