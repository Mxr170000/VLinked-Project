import { Component, OnInit } from '@angular/core';
import { Account } from '../account';
import { UsersListService } from '../users-list.service';
import {jobs} from '../job-finder-pg1/job_data'

@Component({
  selector: 'app-account-screen',
  templateUrl: './account-screen.component.html',
  styleUrls: ['./account-screen.component.scss']
})
export class AccountScreenComponent implements OnInit {

  currentAccount: Account = {firstN:"", lastN:"", email:"", password:""};
  suggestedJobsClicked: Boolean = true;
  appliedJobsClicked: Boolean = false;
  jobsapplied:any = [];
  user:string="";
  constructor(private usersListService : UsersListService) { }

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
  
  if(localStorage.getItem(this.user+'appliedJobs')){
    console.log(localStorage.getItem(this.user+'appliedJobs'));
    let obj = JSON.parse(localStorage.getItem(this.user+'appliedJobs')|| '{}');
    this.jobsapplied = obj.appliedjobs;
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
