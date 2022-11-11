import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Observable, of, Subject } from 'rxjs';
import { Account } from './account';

@Injectable({
  providedIn: 'root'
})
export class UsersListService {
  accounts: Account[] = [];

  accountChange: Subject<Account> = new Subject<Account>();

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
}
