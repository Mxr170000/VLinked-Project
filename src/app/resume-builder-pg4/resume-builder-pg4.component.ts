import { Component, OnInit } from '@angular/core';
import { Account } from '../account';
import { UsersListService } from '../users-list.service';

@Component({
  selector: 'app-resume-builder-pg4',
  templateUrl: './resume-builder-pg4.component.html',
  styleUrls: ['./resume-builder-pg4.component.scss']
})
export class ResumeBuilderPg4Component implements OnInit {

 currentAccount: Account = {firstN:"", lastN:"", email:"", password:""};
  suggestedJobsClicked: Boolean = true;
  appliedJobsClicked: Boolean = false;
  accounts: Account[] = [];
  path = "/resume";
  logAccount: Account = {firstN:"", lastN:"", email:"", password:""};

  constructor(private usersListService : UsersListService){
    this.accounts = this.usersListService.accounts
  }

  ngOnInit(): void {
    this.currentAccount = this.usersListService.currentAccount;
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


}
