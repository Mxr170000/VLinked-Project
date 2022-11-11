import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-account-screen',
  templateUrl: './create-account-screen.component.html',
  styleUrls: ['./create-account-screen.component.scss']
})
export class CreateAccountScreenComponent implements OnInit {
  
  firstNameAutofilled: boolean = false;
  lastNameAutofilled: boolean = false;
  
  constructor() { }

  ngOnInit(): void {
  }

}
