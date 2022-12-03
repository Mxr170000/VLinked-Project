import {Router, ActivatedRoute, Params} from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {jobs} from './job_data'
import { Account } from '../account';
@Component({
  selector: 'app-job-finder-pg1',
  templateUrl: './job-finder-pg1.component.html',
  styleUrls: ['./job-finder-pg1.component.scss']
})
export class JobFinderPg1Component implements OnInit {
  appliedJobs : any = [];
  count:number = 0;
  location: String = "";
  industry: String = "";
  sorta:Boolean = true;
  sortb:Boolean = true;
  sortc:Boolean = true;
  user:string = "";
  currentAccount: Account = {firstN:"", lastN:"", email:"", password:""};
  constructor(private activatedRoute: ActivatedRoute) { 
    
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
    
    if(localStorage.getItem('appliedJobs')){
      console.log(localStorage.getItem('appliedJobs'));
      let obj = JSON.parse(localStorage.getItem('appliedJobs')|| '{}');
      this.appliedJobs = obj.appliedjobs;
    }
    this.activatedRoute.queryParams.subscribe(params => {
        this.location =  params['location'] || "";
        this.industry =  params['industry'] || "";
      });
    
    this.appendOptions();
  };
  appendOptions():void{
    this.count = 0;
    (<HTMLInputElement>document.getElementById("job-cards")).innerHTML = "";
    for (var job of jobs){
      if ((this.location=="" || job.location.toLowerCase().replace(/\s/g, '') == this.location) && (this.industry=="" || job.industry.toLowerCase().replace(/\s/g, '') == this.industry)){
        this.count+=1;
        var text = "<div class='card mt-3 to-display-func' value='"+job.id+"' style='width: 18rem;'><div class='card-body mt-4 mr-1'><h5 class='card-title'>"+job.title+"</h5><p class='card-text'>at "+job.company +"</p><p class='card-text'>"+job.location+"</p><p class='card-text'>Date Posted: "+job.date+"</p><p class='card-text'> Number of Veterans Hired: "+job.num_veterans_hired+"</p><p class='card-text'>Experience Required(in years): "+job.experience+"</p><p class='card-text'>"+job.short_description+"</p>"
        if (this.appliedJobs.includes(job.id)){
            text += "<button type='button' class='btn btn-secondary'>Applied</button>"
        }
        else{
            text += "<button type='button' value='"+job.id+"' class='btn btn-primary to-apply-func'>Apply</button>" 
        }
        text+=    "</div></div>";  
        (<HTMLInputElement>document.getElementById("job-cards")).innerHTML+=text
      }
      
    }
    console.log(this.count);
    let x = this;
    const btns = document.querySelectorAll('.to-apply-func');
    for (let i = 0; i < btns.length; i++) {
      btns[i].addEventListener('click', function (e) {
          btns[i].classList.remove('btn-primary');
          btns[i].classList.remove('to-apply-func');
          btns[i].classList.add('btn-secondary');
          btns[i].innerHTML="Applied";
          x.appliedJobs.push(btns[i].getAttribute('value'));
          x.writeData();
      });
    };
    const cards = document.querySelectorAll('.to-display-func');
    for (let i = 0; i < cards.length; i++) {
      console.log(String(cards[i].getAttribute('value')));
      cards[i].addEventListener('click', function (e) {
        console.log(cards[i].getAttribute('value'));
        job = x.findId(String(cards[i].getAttribute('value')));
        (<HTMLInputElement>document.getElementById("job_desc")).innerHTML = "";
        var text = "<div class='card-header'><h5 class='card-title'>"+job.title+"</h5><p class='card-text'>at "+job.company+"</p><p class='card-text'>"+job.location+"</p><div class='text-end'>";
        if (x.appliedJobs.includes(job.id)){
          text += "<button type='button' class='btn btn-secondary'>Applied</button>";
        }
        else{
              text += "<button type='button' value='"+job.id+"' class='btn btn-primary to-apply-func'>Apply</button>" ;
        } 
        text +="</div></div><ul class='list-group list-group-flush'><li class='list-group-item'><h5 class='card-title'>Benefits</h5><p>"+job.benefits+"</p></li><li class='list-group-item'><h5 class='card-title'>Full job description</h5><p>"+job.long_description+"</p></li></ul>";
        (<HTMLInputElement>document.getElementById("job_desc")).innerHTML += text;
        const btns = (<HTMLInputElement>document.getElementById("job_desc")).querySelectorAll('.to-apply-func');
        for (let i = 0; i < btns.length; i++) {
          btns[i].addEventListener('click', function (e) {
              btns[i].classList.remove('btn-primary');
              btns[i].classList.remove('to-apply-func');
              btns[i].classList.add('btn-secondary');
              btns[i].innerHTML="Applied";
              x.appliedJobs.push(btns[i].getAttribute('value'));
              x.writeData();
              x.changetoApplied();
          });
        };
      });
    }
  }
  findId(idToLookFor:string):any {
    for (var i = 0; i < jobs.length; i++) {
        if (jobs[i].id == idToLookFor) {
            console.log("returned");
            console.log(jobs[i]);
            return(jobs[i]);
        }
    }
  }
  writeData():void{
    var request: any = {};
    request.appliedjobs = this.appliedJobs
    localStorage.setItem('appliedJobs', JSON.stringify(request));
  }
  changetoApplied():void{
    const btns = document.querySelectorAll('.to-apply-func');
    for (let i = 0; i < btns.length; i++) {
      if(this.appliedJobs.includes(btns[i].getAttribute('value'))) {
          btns[i].classList.remove('btn-primary');
          btns[i].classList.remove('to-apply-func');
          btns[i].classList.add('btn-secondary');
          btns[i].innerHTML="Applied";
      };
    };
  }

  sortByDate():void{
    if (this.sorta==true){
      jobs.sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
      this.sorta = false;
    }
    else{
      jobs.sort((a, b) => Date.parse(a.date) - Date.parse(b.date));
      this.sorta = true; 
    }
    this.appendOptions();
  }
  sortByNumber():void{
    if (this.sortb==true){
      jobs.sort((a, b) => Number(b.num_veterans_hired) - Number(a.num_veterans_hired));
      this.sortb = false;
    }
    else{
      jobs.sort((a, b) => Number(a.num_veterans_hired) - Number(b.num_veterans_hired));
      this.sortb = true; 
    }
    this.appendOptions();
    
  }
  sortByExperience():void{
    if (this.sortc==true){
      jobs.sort((a, b) => Number(b.experience) - Number(a.experience));
      this.sortc = false;
    }
    else{
      jobs.sort((a, b) => Number(a.experience) - Number(b.experience));
      this.sortc = true; 
    }
    this.appendOptions();
    
  }

}
