import { Component, OnInit } from '@angular/core';
import { Account } from '../account';
import { UsersListService } from '../users-list.service';

@Component({
  selector: 'app-resume-builder-pg1',
  templateUrl: './resume-builder-pg1.component.html',
  styleUrls: ['./resume-builder-pg1.component.scss']
})
export class ResumeBuilderPg1Component implements OnInit {

  specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  currentAccount: Account = {firstN:"", lastN:"", email:"", password:""};
  suggestedJobsClicked: Boolean = true;
  appliedJobsClicked: Boolean = false;
  accounts: Account[] = [];
  path = "/resume";
  logAccount: Account = {firstN:"", lastN:"", email:"", password:""};
  firstname : string = "";
  lastname : string = "";
  address : string = "";
  city : string = "";
  zipcode : string = "";
  country : string = "";
  email : string = "";
  phnumber : string = "";  
  user:string;
  pathTwo: string="/resume2"

  eEmpty: boolean = false;
  eFN: boolean = false;
  eLN: boolean = false;
  eAd: boolean = false;
  eCity: boolean = false;
  eZP: boolean = false;
  eCo: boolean = false;
  eEm: boolean = false;
  ePHN: boolean = false;




  constructor(private usersListService : UsersListService){
    this.accounts = this.usersListService.accounts
  }
  get(key: string): unknown {
    try {
      return JSON.parse(localStorage.getItem(key) || "");
    } catch (e) {
      console.error('Error getting data from localStorage', e);
      return null;
    }
  }
  ngOnInit(): void {
    if(localStorage.getItem('users')){
        var obj:any = JSON.parse(localStorage.getItem('users')|| '{}');
        
        if(localStorage.getItem('currentUser')){
           this.user = localStorage.getItem('currentUser')|| '';
        }
        if (this.user in obj){
          this.currentAccount = obj[this.user];
        }
    }
    if(localStorage.getItem(this.user+'pg1Data')){
      console.log(localStorage.getItem(this.user+'pg1Data'));
      let obj = JSON.parse(localStorage.getItem(this.user+'pg1Data')|| '{}');
      this.firstname = obj.firstname;
      this.lastname = obj.lastname;
      this.address = obj.address;
      this.city = obj.city;
      this.zipcode = obj.zipcode;
      this.country = obj.country;
      this.email = obj.email;
      this.phnumber = obj.phnumber;
    }
    // console.log(UsersListService.currentAccount);
    // console.log(UsersListService.accounts);
  }
  suggestedJobs():void{
    this.suggestedJobsClicked = true;
    this.appliedJobsClicked = false;
  }

  appliedJobs():void{
    this.appliedJobsClicked = true;
    this.suggestedJobsClicked = false;
  }
  readData(value: string):void{
    console.log("Read value on page1")
    console.log(value);
    console.log("First Name: " + (<HTMLInputElement>document.getElementById("firstname")).value);
    console.log("FN length: " + (<HTMLInputElement>document.getElementById("firstname")).value.length);
    var request: any = {};
    request.firstname = (<HTMLInputElement>document.getElementById("firstname")).value;
    request.lastname = (<HTMLInputElement>document.getElementById("lastname")).value;
    request.address = (<HTMLInputElement>document.getElementById("address")).value;
    request.city = (<HTMLInputElement>document.getElementById("city")).value;
    request.zipcode = (<HTMLInputElement>document.getElementById("zipcode")).value;
    request.country = (<HTMLInputElement>document.getElementById("country")).value;
    request.email = (<HTMLInputElement>document.getElementById("email")).value;
    request.phnumber = (<HTMLInputElement>document.getElementById("phnumber")).value;

    if((<HTMLInputElement>document.getElementById("firstname")).value.length == 0 || (<HTMLInputElement>document.getElementById("lastname")).value.length == 0  
    || (<HTMLInputElement>document.getElementById("address")).value.length == 0  || (<HTMLInputElement>document.getElementById("city")).value.length == 0  || 
    request.zipcode.length == 0  || request.country.length == 0  || request.email.length == 0  || request.phnumber.length == 0 )
      this.eEmpty = true;
    else
      this.eEmpty = false;
    
    
    
    this.eFN = this.specialChars.test((<HTMLInputElement>document.getElementById("firstname")).value);
    if(!this.eFN)
      this.eFN = /\d/.test((<HTMLInputElement>document.getElementById("firstname")).value);

    this.eLN = this.specialChars.test((<HTMLInputElement>document.getElementById("lastname")).value);  
    if(!this.eLN)
      this.eLN = /\d/.test((<HTMLInputElement>document.getElementById("lastname")).value);

    this.eAd = this.specialChars.test((<HTMLInputElement>document.getElementById("address")).value);

    this.eCity = this.specialChars.test((<HTMLInputElement>document.getElementById("city")).value);
    if(!this.eCity)
      this.eCity = /\d/.test((<HTMLInputElement>document.getElementById("city")).value);

    this.eZP = !/^[0-9]+$/.test((<HTMLInputElement>document.getElementById("zipcode")).value);
    if(!this.eZP)
      this.eZP = (<HTMLInputElement>document.getElementById("zipcode")).value.length != 5;

    this.ePHN = !/^[0-9]+$/.test((<HTMLInputElement>document.getElementById("phnumber")).value);
    if(!this.ePHN)
    {
      if((<HTMLInputElement>document.getElementById("phnumber")).value.length != 9)
        this.ePHN = true;
    }


    console.log("Length: " + (<HTMLInputElement>document.getElementById("phnumber")).value.length);
    
    let regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
    this.eEm = !regex.test((<HTMLInputElement>document.getElementById("email")).value);
    console.log("Current: " + request);
    if(!this.eEmpty && !this.eAd && !this.eCity && !this.eCo && !this.eEm && !this.eFN && !this.eLN && !this.ePHN && !this.eEm)
    {
      this.pathTwo = "/resume2";

      localStorage.setItem(this.user+'pg1Data', JSON.stringify(request));
    }
    else
    {
      console.log("I'm happening");
      this.pathTwo = "/resume1";
    }

  }
  logout():void{
    localStorage.removeItem('currentUser');
    localStorage.removeItem(this.user+'pg1Data');
    localStorage.removeItem(this.user+'pg2Data');
    localStorage.removeItem(this.user+'pg3Data');
    localStorage.removeItem(this.user+'currentUser');
  }
}
