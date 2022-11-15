import { Component, OnInit } from '@angular/core';
import { Account } from '../account';
import { UsersListService } from '../users-list.service';
import {jobs} from '../job-finder-pg1/job_data'
@Component({
  selector: 'app-home-screen',
  templateUrl: './home-screen.component.html',
  styleUrls: ['./home-screen.component.scss']
})
export class HomeScreenComponent implements OnInit {

  currentAccount: Account = {firstN:"", lastN:"", email:"", password:""};
  suggestedJobsClicked: Boolean = true;
  appliedJobsClicked: Boolean = false;
  jobsapplied:any;
  constructor(private usersListService : UsersListService) { }

  ngOnInit(): void {
    this.currentAccount = this.usersListService.currentAccount;
    if(localStorage.getItem('appliedJobs')){
      console.log(localStorage.getItem('appliedJobs'));
      let obj = JSON.parse(localStorage.getItem('appliedJobs')|| '{}');
      this.jobsapplied = obj.appliedjobs;
    }
    
    
  }

  suggestedJobs():void{
    this.suggestedJobsClicked = true;
    this.appliedJobsClicked = false;
    const doc = window.document.getElementById("jobdiv")!
      doc.innerHTML = "";
  }

  appliedJobs():void{
    this.appliedJobsClicked = true;
    this.suggestedJobsClicked = false;
    //console.log((document.getElementById("jobdiv")).innerHTML);
    if(this.jobsapplied.length>0){
      const doc = window.document.getElementById("jobdiv")!
      doc.innerHTML = "";
      for (let i = 0; i < jobs.length; i++) {
        if(this.jobsapplied.includes(jobs[i].id)){
          doc.innerHTML += "<h2 style='padding-left: 10%'> "+jobs[i].title+" At "+jobs[i].company+", "+jobs[i].location+"</h2>";
        }
      }
    }
  }

}
