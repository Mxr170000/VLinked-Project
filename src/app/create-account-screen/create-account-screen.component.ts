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
      const newAccount : Account = {firstN: this.firstN, lastN: this.lastN, email: this.email, password: this.password};
      console.log(newAccount);
      this.usersListService.addAccount(newAccount);
      console.log(this.usersListService.accounts);
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
}
