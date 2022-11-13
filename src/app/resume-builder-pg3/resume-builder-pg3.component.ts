import { Component, OnInit } from '@angular/core';
import { Account } from '../account';
import { UsersListService } from '../users-list.service';

@Component({
  selector: 'app-resume-builder-pg3',
  templateUrl: './resume-builder-pg3.component.html',
  styleUrls: ['./resume-builder-pg3.component.scss']
})
export class ResumeBuilderPg3Component implements OnInit {

  currentAccount: Account = {firstN:"", lastN:"", email:"", password:""};
  suggestedJobsClicked: Boolean = true;
  appliedJobsClicked: Boolean = false;
  accounts: Account[] = [];
  path = "/resume";
  logAccount: Account = {firstN:"", lastN:"", email:"", password:""};
  schoolname : string = "";
  schoolcity : string = "";
  schoolstate : string = "";
  degree : string = "";
  constructor(private usersListService : UsersListService){
    this.accounts = this.usersListService.accounts
  }

  ngOnInit(): void {
    this.currentAccount = this.usersListService.currentAccount;
    if(localStorage.getItem('pg3Data')){
      console.log(localStorage.getItem('pg1Data'));
      let obj = JSON.parse(localStorage.getItem('pg3Data')|| '{}');
      this.schoolname = obj.schoolname;
      this.schoolcity = obj.schoolcity;
      this.schoolstate = obj.schoolstate;
      this.degree = obj.degree;
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
    var request: any = {};
    request.schoolname = (<HTMLInputElement>document.getElementById("schoolname")).value;
    request.schoolcity = (<HTMLInputElement>document.getElementById("schoolcity")).value;
    request.schoolstate = (<HTMLInputElement>document.getElementById("schoolstate")).value;
    request.degree = (<HTMLInputElement>document.getElementById("degree")).value;
    localStorage.setItem('pg3Data', JSON.stringify(request));
  }

}
