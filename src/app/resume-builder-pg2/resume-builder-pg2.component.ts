import { Component, OnInit } from '@angular/core';
import { Account } from '../account';
import { UsersListService } from '../users-list.service';

@Component({
  selector: 'app-resume-builder-pg2',
  templateUrl: './resume-builder-pg2.component.html',
  styleUrls: ['./resume-builder-pg2.component.scss']
})
export class ResumeBuilderPg2Component implements OnInit {

  currentAccount: Account = {firstN:"", lastN:"", email:"", password:""};
  suggestedJobsClicked: Boolean = true;
  appliedJobsClicked: Boolean = false;
  accounts: Account[] = [];
  path = "/resume";
  logAccount: Account = {firstN:"", lastN:"", email:"", password:""};
  activeOptions:any;
  mainskills:any;
  skills:any;
  jobtitle:string = "";
  employer:string = "";
  user:string = ""
  constructor(private usersListService : UsersListService){
    if(localStorage.getItem('users')){
        var obj:any = JSON.parse(localStorage.getItem('users')|| '{}');
        
        if(localStorage.getItem('currentUser')){
           this.user = localStorage.getItem('currentUser')|| '';
        }
        if (this.user in obj){
          this.currentAccount = obj[this.user];
        }
    }
    this.accounts = this.usersListService.accounts
    this.activeOptions = new Set<number>();
    this.mainskills = ["Accounting or bookkeeping ",
              "Data analysis",
              "Data privacy — Cybersecurity",
              "Enterprise resource planning ",
              "Process automation",
              "Adaptability ",
              "Attention to detail ",
              "Project management",
              "Leadership",
              "Multitasking",
              "Positivity",
              "Self-motivation",
              "Time management ",
              "Work ethic"
              ];

    this.skills = {
      "set1": [1,2,3,4],
      "set2": [7,8,9,10],
      "set3": [11,12,13],
      "set4": [5,6,0,7],
    };
    if(localStorage.getItem(this.user+'pg2Data')){
      console.log(localStorage.getItem(this.user+'pg2Data'));
      let obj = JSON.parse(localStorage.getItem(this.user+'pg2Data')|| '{}');
      this.employer = obj.employer;
      this.jobtitle = obj.jobtitle;
      this.activeOptions = new Set(obj.activeOptions);
    }
    

  }

  ngOnInit(): void {
    this.currentAccount = this.usersListService.currentAccount;
    console.log("Sreekar"+this.accounts)
    console.log(this.accounts)
    this.changeText();
    // console.log(UsersListService.currentAccount);
    // console.log(UsersListService.accounts);
  }
  ngAfterViewInit() {
    // assume dynamic HTML was added before
    
    // this.elRef.nativeElement.querySelector('button').addEventListener('click', 
    // this.click.bind(this));
  }
  
  appendOptions():void{
    var val = (<HTMLInputElement>document.getElementById("skills")).value;
    console.log(this.skills.val)
    var skillIndex = this.skills[val];
    (<HTMLInputElement>document.getElementById("skilllist")).innerHTML = "";
    for (var ind of skillIndex){
      if (this.activeOptions.has(ind.toString())){
        (<HTMLInputElement>document.getElementById("skilllist")).innerHTML+=
          "<div class='form-group w-100 input-group mb-3'><div class='input-group-prepend'><button (click)='changeText($event)' value='"+ind+"' class='to-add-func btn btn-danger' type='button'>Remove</button></div><text class='input-group-text'>"+this.mainskills[ind]+"</text></div>";  
      }
      else{
        (<HTMLInputElement>document.getElementById("skilllist")).innerHTML+=
          "<div class='form-group w-100 input-group mb-3'><div class='input-group-prepend'><button (click)='changeText($event)' value='"+ind+"' class='to-add-func btn btn-success' type='button'>Add</button></div><text class='input-group-text'>"+this.mainskills[ind]+"</text></div>";  
      }
      
    }
    let x = this;
    const btns = document.querySelectorAll('.to-add-func');
    for (let i = 0; i < btns.length; i++) {
      btns[i].addEventListener('click', function (e) {
        if(btns[i].innerHTML=="Add"){
          btns[i].innerHTML = "Remove";
          btns[i].classList.remove('btn-success');
          btns[i].classList.add('btn-danger');
          x.activeOptions.add(btns[i].getAttribute('value'));
          x.changeText();
        }
        else{
          btns[i].innerHTML = "Add";
          btns[i].classList.remove('btn-danger');
          btns[i].classList.add('btn-success');
          x.activeOptions.delete(btns[i].getAttribute('value'));
          console.log(x.activeOptions);
          x.changeText();
        }
      });
    }
  }
  changeText():void{

    (<HTMLInputElement>document.getElementById("skillsummary")).innerHTML = "";
    for (var ind of this.activeOptions){
      (<HTMLInputElement>document.getElementById("skillsummary")).innerHTML+=
          "<li>"+this.mainskills[ind]+"</li>";
    }
  }
  readData(value: string):void{
    var request: any = {};
    request.employer = (<HTMLInputElement>document.getElementById("employer")).value;
    request.jobtitle = (<HTMLInputElement>document.getElementById("jobtitle")).value;
    request.activeOptions = [...this.activeOptions];
    console.log(request);
    localStorage.setItem(this.user+'pg2Data', JSON.stringify(request));
  }
  logout():void{
    localStorage.removeItem('currentUser');
    localStorage.removeItem(this.user+'pg1Data');
    localStorage.removeItem(this.user+'pg2Data');
    localStorage.removeItem(this.user+'pg3Data');
    localStorage.removeItem(this.user+'currentUser');
  }

}
