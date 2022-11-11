import { Component, OnInit } from '@angular/core';
import { UsersListService } from '../users-list.service';

@Component({
  selector: 'app-home-screen',
  templateUrl: './home-screen.component.html',
  styleUrls: ['./home-screen.component.scss']
})
export class HomeScreenComponent implements OnInit {

  constructor(private usersListService : UsersListService) { }

  ngOnInit(): void {
    console.log(this.usersListService.accounts);
  }

}
