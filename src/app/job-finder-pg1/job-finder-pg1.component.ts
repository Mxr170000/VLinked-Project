
import { Component, OnInit } from '@angular/core';
import {jobs} from './job_data'
@Component({
  selector: 'app-job-finder-pg1',
  templateUrl: './job-finder-pg1.component.html',
  styleUrls: ['./job-finder-pg1.component.scss']
})
export class JobFinderPg1Component implements OnInit {
  appliedJobs : any = [];
  count:number = 0;
  constructor() { 
    
  }

  ngOnInit(): void {
    
    console.log(jobs);
    this.appendOptions();
    this.count = jobs.length;
  };
  appendOptions():void{
    this.count = 0;
    (<HTMLInputElement>document.getElementById("job-cards")).innerHTML = "";
    for (var job of jobs){
      if (job.location == "Dallas"){
        this.count+=1;
        var text = "<div class='card mt-3 to-display-func' value='"+job.id+"' style='width: 18rem;'><div class='card-body mt-4 mr-1'><h5 class='card-title'>"+job.title+"</h5><p class='card-text'>at "+job.company +"</p><p class='card-text'>"+job.location+"</p><p class='card-text'>"+job.short_description+"</p>"
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
    let x = this;
    const btns = document.querySelectorAll('.to-apply-func');
    for (let i = 0; i < btns.length; i++) {
      btns[i].addEventListener('click', function (e) {
          btns[i].classList.remove('btn-primary');
          btns[i].classList.remove('to-apply-func');
          btns[i].classList.add('btn-secondary');
          btns[i].innerHTML="Applied";
          x.appliedJobs.push(btns[i].getAttribute('value'));
      });
    };
    const cards = document.querySelectorAll('.to-display-func');
    for (let i = 0; i < cards.length; i++) {
      console.log(String(cards[i].getAttribute('value')));
      cards[i].addEventListener('click', function (e) {
        console.log('clicked the card');
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

  
  // changeText():void{

  //   (<HTMLInputElement>document.getElementById("skillsummary")).innerHTML = "";
  //   for (var ind of this.activeOptions){
  //     (<HTMLInputElement>document.getElementById("skillsummary")).innerHTML+=
  //         "<li>"+this.mainskills[ind]+"</li>";
  //   }
  // }

}
