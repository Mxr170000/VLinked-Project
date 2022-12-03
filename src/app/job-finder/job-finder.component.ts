
import { Component, OnInit, Injectable } from '@angular/core';
import { Account } from '../account';
import { UsersListService } from '../users-list.service';
import {Router, ActivatedRoute, Params, NavigationExtras} from '@angular/router';

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
  ind: string="";
  loc: string = "";
  user:string = "";
  constructor(private usersListService : UsersListService, private router : Router){
    this.accounts = this.usersListService.accounts
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
    this.ind = (<HTMLInputElement>document.getElementById("industry")).value || "";
    this.loc = (<HTMLInputElement>document.getElementById("location")).value || "";
    
    let navigationExtras: NavigationExtras = {
      queryParams: {'industry': this.ind,'location':this.loc},
      fragment: ''
    };
    // Navigate to the login page with extras
    this.router.navigate(['/job2'], navigationExtras); 
  }
  logout():void{
    localStorage.removeItem('currentUser');
    localStorage.removeItem(this.user+'pg1Data');
    localStorage.removeItem(this.user+'pg2Data');
    localStorage.removeItem(this.user+'pg3Data');
    localStorage.removeItem(this.user+'currentUser');
  }
  

}

