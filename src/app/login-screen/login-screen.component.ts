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

constructor(private usersListService : UsersListService){}

ngOnInit()
{
   this.usersListService.getJSON().subscribe(data => {
        this.accounts = data;
    });
    
} 

  checkAccount()
  {
    this.inputEmail! = (<HTMLInputElement>document.getElementById("inputEmail")).value;
    this.inputPassword! = (<HTMLInputElement>document.getElementById("inputPassword")).value;
    for(let i = 0; i < this.accounts.length; i++)
    {
      if(this.inputEmail === this.accounts[i].email && this.inputPassword === this.accounts[i].password)
      {
        this.accountNotExist = false;
        break;
      }
      if(i + 1 == this.accounts.length)
      {
        this.accountNotExist = true;
      }
    }
    if(!this.accountNotExist)
    {
      (<HTMLInputElement>document.getElementById("inputEmail")).value = "";
      (<HTMLInputElement>document.getElementById("inputPassword")).value = "";
      this.inputEmail = "";
      this.inputPassword = "";
      this.accountNotExist = false;
      window.location.href='http://localhost:4200/home';

    }

    console.log("I'm getting clicked")
  }

}
