import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Observable, of, Subject } from 'rxjs';
import { Account } from './account';


@Injectable({
  providedIn: 'root'
})
export class UsersListService {
  
  currentAccount: Account = {firstN:"", lastN:"", email:"", password:""};

  accounts: Account[] = [];

  accountChange: Subject<Account> = new Subject<Account>();

  currentChange: Subject<Account> = new Subject<Account>();

  constructor(private http: HttpClient) 
  {
    // this.getJSON().subscribe(data => {
    //   for(let i = 0; i < data.length; i++)
    //   {
    //     this.accounts.push(data[i]);
    //   }
    // });
    this.accountChange.subscribe((value) => {
      this.accounts.push(value);
  });
    this.accountChange.subscribe((value) => {
      this.currentAccount = value;
  });

    console.log(this.accounts);

  }

  public getJSON(): Observable<any> {
      return this.http.get("assets/active-users.json");
  }

  public addAccount(newAccount: Account): void {
      this.accountChange.next(newAccount);
  }

  getAccounts(): Account[]
  {
    return this.accounts;
  }

  setCurAccount(currentAccount: Account): void
  {
    this.accountChange.next(currentAccount);
  }
}
