import { Component, OnInit, ViewEncapsulation  } from '@angular/core';
import { UserService } from "../shared/service/user.service";
import * as $ from "jquery";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  // encapsulation: ViewEncapsulation.None  // Enable dynamic HTML styles
})

export class ProfileComponent implements OnInit {
  userinfo =  null;

  countries;
  flagImage;
  ng2TelInputOptions = null;
  phone_number ;

  private value:any = {};
  private _disabledV:string = '0';
  private disabled:boolean = false;
  private items:Array<any> = [];
  isloadedcountry = false;
  selectedItems;
  constructor(
    private userservice: UserService
  ) {
    console.log('on create');

    userservice.getUserInfo().subscribe((data:any) => {

      this.userinfo = data;
      if(this.userinfo.phone == null || this.userinfo.phone == ""){
        phone_code = "+1";
      }
      else {
        var phone_code = this.userinfo.phone.split(" ")[0];
        phone_code = phone_code.split('+')[1];
      }
      userservice.getAllCountries().subscribe((data:any)=>{
        console.log(data);

        this.countries = data;

        this.countries.forEach(element => {
          if(this.userinfo.country == element.name)
          {
            this.flagImage = element.flag;
            this.selectedItems= [{
              id:element.name,
              text: `<img src="${element.flag}" style=" width: 30px;"><span style="margin-left:10px;">${element.name}</span>`
            }];
          }

          this.items.push({
            id: element.name,
            text: `<img src="${element.flag}" style=" width: 30px;"><span style="margin-left:10px;">${element.name}</span>`
          });
        });

        console.log(this.selectedItems);
        this.isloadedcountry = true;
      });
    });


   }

  ngOnInit() {
    // console.log('on init');

    // COLORS.forEach((color:{name:string, hex:string}) => {
    //   this.items.push({
    //     id: color.hex,
    //     text: `<img src="https://restcountries.eu/data/afg.svg"><colorbox class='colorbox' style='background-color:${color.hex};'></colorbox>${color.name} (${color.hex})`
    //   });
    // });
  }

  saveDetail()
  {
    var detailInfo = {
      "full_name": this.userinfo.full_name,
      "nationality": this.userinfo.nationality
    }
    this.userservice.detail(detailInfo).subscribe((data:any)=>{
      console.log(data);
    })

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
      console.log(data);

    })
  }

  changedCountry(value){
    this.countries.forEach(element => {
      if(value == element.name)
      {
        this.flagImage = element.flag;
      }

    });
    console.log(this.flagImage);

  }


  private get disabledV():string {
    return this._disabledV;
  }

  private set disabledV(value:string) {
    this._disabledV = value;
    this.disabled = this._disabledV === '1';
  }

  public selected(value:any):void {
    console.log('Selected value is: ', value);
    this.userinfo.country = value.id;
    this.saveAddress();

  }

  public removed(value:any):void {
    console.log('Removed value is: ', value);
    this.userinfo.country = "";
    this.saveAddress();
  }

  public typed(value:any):void {
    console.log('New search input: ', value);
  }

  public refreshValue(value:any):void {
    this.value = value;
  }

  public uploadAddressFileDlg()
  {
    document.getElementById('address-file-input').click();
  }

  fileChange(event)
  {
    let fileList: FileList = event.target.files;
    if(fileList.length > 0) {
        let file: File = fileList[0];
        let formData:FormData = new FormData();
        formData.append('doc_for_verify', file, file.name);

        this.userservice.uploadAddressFile(formData).subscribe((data:any)=>{
            console.log(data);
        });
    }
  }
}
