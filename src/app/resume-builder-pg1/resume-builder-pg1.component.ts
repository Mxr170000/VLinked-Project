import { Component, OnInit } from '@angular/core';
import { Account } from '../account';
import { UsersListService } from '../users-list.service';

@Component({
  selector: 'app-resume-builder-pg1',
  templateUrl: './resume-builder-pg1.component.html',
  styleUrls: ['./resume-builder-pg1.component.scss']
})
export class ResumeBuilderPg1Component implements OnInit {

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
    this.currentAccount = this.usersListService.currentAccount;
    if(localStorage.getItem('pg1Data')){
      console.log(localStorage.getItem('pg1Data'));
      let obj = JSON.parse(localStorage.getItem('pg1Data')|| '{}');
      this.firstname = obj.firstname;
      this.lastname = obj.lastname;
      this.address = obj.address;
      this.city = obj.city;
      this.zipcode = obj.zipcode;
      this.country = obj.country;
      this.email = obj.email;
      this.phnumber = obj.phnumber;
    }
    console.log("Sreekar"+this.accounts)
    console.log(this.accounts)
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
    var request: any = {};
    request.firstname = (<HTMLInputElement>document.getElementById("firstname")).value;
    request.lastname = (<HTMLInputElement>document.getElementById("lastname")).value;
    request.address = (<HTMLInputElement>document.getElementById("address")).value;
    request.city = (<HTMLInputElement>document.getElementById("city")).value;
    request.zipcode = (<HTMLInputElement>document.getElementById("zipcode")).value;
    request.country = (<HTMLInputElement>document.getElementById("country")).value;
    request.email = (<HTMLInputElement>document.getElementById("email")).value;
    request.phnumber = (<HTMLInputElement>document.getElementById("phnumber")).value;
    console.log(request);
    localStorage.setItem('pg1Data', JSON.stringify(request));
  }
}
