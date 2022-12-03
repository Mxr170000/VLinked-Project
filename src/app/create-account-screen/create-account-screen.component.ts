import { Component, OnInit } from '@angular/core';
import { UsersListService } from '../users-list.service';
import { Account } from '../account';

@Component({
  selector: 'app-create-account-screen',
  templateUrl: './create-account-screen.component.html',
  styleUrls: ['./create-account-screen.component.scss']
})
export class CreateAccountScreenComponent implements OnInit {
  
  fieldNotFilled: boolean = false;
  firstN: String="";
  lastN: String="";
  password: String="";
  email: String="";
  path: String ="\home";
  
  constructor(private usersListService : UsersListService){}

  ngOnInit()
  {
  } 

  addAccount():void{
    this.firstN! = (<HTMLInputElement>document.getElementById("first-name")).value;
    this.lastN! = (<HTMLInputElement>document.getElementById("last-name")).value;
    this.email! = (<HTMLInputElement>document.getElementById("email")).value;
    this.password! = (<HTMLInputElement>document.getElementById("password")).value;
    if(this.firstN == "" || this.lastN == "" || this.email == "" || this.password == "")
      this.fieldNotFilled =  true;
    else
      this.fieldNotFilled =  false;
    if(!this.fieldNotFilled)
    {
      var userCount = 1;
      var obj:any = {};
      const newAccount : Account = {firstN: this.firstN, lastN: this.lastN, email: this.email, password: this.password};
      
      this.usersListService.addAccount(newAccount);
      if(localStorage.getItem('users')){
        obj = JSON.parse(localStorage.getItem('users')|| '{}');
        userCount = Object.keys(obj).length+1;
        for (const key in obj) {
            var checkUser = obj[key];
            if (this.email==checkUser['email']){
              alert('Email already used')
              return;
            }
        }
        
      }
      obj['user'+userCount.toString()] = newAccount;
      
      localStorage.setItem('users', JSON.stringify(obj));
      
      (<HTMLInputElement>document.getElementById("first-name")).value = "";
      (<HTMLInputElement>document.getElementById("last-name")).value = "";
      (<HTMLInputElement>document.getElementById("email")).value = "";
      (<HTMLInputElement>document.getElementById("password")).value = "";
      this.firstN = "";
      this.lastN = "";
      this.email = "";
      this.password = "";
      this.path="/home";
    }
    else{
      this.path="/signup";
    }
  }
  logout():void{
    var user = localStorage.getItem('currentUser');
    localStorage.removeItem('currentUser');
    localStorage.removeItem(user+'pg1Data');
    localStorage.removeItem(user+'pg2Data');
    localStorage.removeItem(user+'pg3Data');
    localStorage.removeItem(user+'currentUser');
  }
}
