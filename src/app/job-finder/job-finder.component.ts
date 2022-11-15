
import { Component, OnInit, Injectable } from '@angular/core';
import { Account } from '../account';
import { UsersListService } from '../users-list.service';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-job-finder',
  templateUrl: './job-finder.component.html',
  styleUrls: ['./job-finder.component.scss']
})
export class JobFinderComponent implements OnInit {

  currentAccount: Account = {firstN:"", lastN:"", email:"", password:""};
  suggestedJobsClicked: Boolean = true;
  appliedJobsClicked: Boolean = false;
  accounts: Account[] = [];
  path = "/resume";
  logAccount: Account = {firstN:"", lastN:"", email:"", password:""};
  nexturl: string = "/job2";
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
  geturl(){
    this.nexturl = "/job2?industry="+(<HTMLInputElement>document.getElementById("industry")).value+"&location="+(<HTMLInputElement>document.getElementById("location")).value;
    //console.log(this.nexturl);
    window.location.href = this.nexturl;
  }
  

}

