import { Component, OnInit } from '@angular/core';
import { Account } from '../account';
import { UsersListService } from '../users-list.service';

@Component({
  selector: 'app-resume-builder-pg3',
  templateUrl: './resume-builder-pg3.component.html',
  styleUrls: ['./resume-builder-pg3.component.scss']
})
export class ResumeBuilderPg3Component implements OnInit {

  eSchool: boolean = false;
  eCity: boolean = false;
  eState: boolean = false;
  eEmpty: boolean = false;
  specialChars = /[`!@#$%^*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  pathTwo: string = "/resume4";

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
  user:string="";
  constructor(private usersListService : UsersListService){
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
    if(localStorage.getItem(this.user+'pg3Data')){
      console.log(localStorage.getItem(this.user+'pg1Data'));
      let obj = JSON.parse(localStorage.getItem(this.user+'pg3Data')|| '{}');
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

    if((<HTMLInputElement>document.getElementById("schoolname")).value.length == 0 || (<HTMLInputElement>document.getElementById("schoolcity")).value.length == 0
     || (<HTMLInputElement>document.getElementById("schoolstate")).value.length == 0)
      this.eEmpty = true;
    else
      this.eEmpty = false;

  this.eSchool = this.specialChars.test((<HTMLInputElement>document.getElementById("schoolname")).value);
  if(!this.eSchool)
    this.eSchool = /\d/.test((<HTMLInputElement>document.getElementById("schoolname")).value);

  this.eCity = this.specialChars.test((<HTMLInputElement>document.getElementById("schoolcity")).value);  
  if(!this.eCity)
    this.eCity = /\d/.test((<HTMLInputElement>document.getElementById("schoolcity")).value);
  
  this.eState = this.specialChars.test((<HTMLInputElement>document.getElementById("schoolstate")).value);  
  if(!this.eCity)
    this.eCity = /\d/.test((<HTMLInputElement>document.getElementById("schoolstate")).value);

  if(!this.eCity && !this.eSchool && !this.eState && !this.eEmpty)
  {
    this.pathTwo = "/resume4";
    localStorage.setItem(this.user+'pg3Data', JSON.stringify(request));
  }
  else{
    this.pathTwo = "/resume3";
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
