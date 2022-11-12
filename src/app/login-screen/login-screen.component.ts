import { Component, OnInit } from '@angular/core';
import { Account } from '../account';
import { UsersListService } from '../users-list.service';

@Component({
  selector: 'app-login-screen',
  templateUrl: './login-screen.component.html',
  styleUrls: ['./login-screen.component.scss']
})
export class LoginScreenComponent implements OnInit {

inputEmail: String = "";
inputPassword: String = "";
accountNotExist: Boolean = false;
accounts: Account[] = [];
path = "/home";
logAccount: Account = {firstN:"", lastN:"", email:"", password:""};

constructor(private usersListService : UsersListService){this.accounts = this.usersListService.accounts}

ngOnInit()
{
  console.log(this.accounts);
} 



  checkAccount()
  {
    this.inputEmail! = (<HTMLInputElement>document.getElementById("inputEmail")).value;
    this.inputPassword! = (<HTMLInputElement>document.getElementById("inputPassword")).value;
    if(this.accounts.length == 0)
    {
      this.accountNotExist = true;
      this.path =  "/login";
    }
    for(let i = 0; i < this.accounts.length; i++)
    {
      if(this.inputEmail == this.accounts[i].email && this.inputPassword == this.accounts[i].password)
      {
        this.accountNotExist = false;
        this.logAccount = this.accounts[i];
        break;
      }
      if(i + 1 == this.accounts.length)
      {
        this.accountNotExist = true;
      }
    }
    if(!this.accountNotExist)
    {
      this.usersListService.setCurAccount(this.logAccount);
      (<HTMLInputElement>document.getElementById("inputEmail")).value = "";
      (<HTMLInputElement>document.getElementById("inputPassword")).value = "";
      this.inputEmail = "";
      this.inputPassword = "";
      this.accountNotExist = false;
      this.path =  "/home";
    }
    else
    {
      this.path =  "/login";
    }
  }

}
