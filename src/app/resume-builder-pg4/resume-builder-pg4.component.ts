import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Account } from '../account';
import { UsersListService } from '../users-list.service';
import { PdfViewerModule, PdfViewerComponent, PDFDocumentProxy } from "ng2-pdf-viewer";
//import * as pdfMake from "pdfmake/build/pdfmake";
//import pdfFonts from "../../assets/vsf_fonts.js";
const pdfFonts = require("../../assets/vsf_fonts.js")
const pdfMake = require('pdfmake/build/pdfmake.js');
//import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { Margins } from 'pdfmake/interfaces';

import { fonts, styles, defaultStyle } from "../../assets/utilities";
import { HttpClient } from "@angular/common/http";

// PDFMAKE fonts

(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;
(pdfMake as any).fonts = fonts;
@Component({
  selector: 'app-resume-builder-pg4',
  templateUrl: './resume-builder-pg4.component.html',
  styleUrls: ['./resume-builder-pg4.component.scss']
})
export class ResumeBuilderPg4Component implements OnInit {

 currentAccount: Account = {firstN:"", lastN:"", email:"", password:""};
  suggestedJobsClicked: Boolean = true;
  appliedJobsClicked: Boolean = false;
  accounts: Account[] = [];
  path = "/resume";
  logAccount: Account = {firstN:"", lastN:"", email:"", password:""};
  pdfSrc:any; // this sample, dynamic one we will generate with the pdfmake
  pageVariable = 1;

  // Initialize variables required for the header and this component
  fileName = "test-document.pdf";
  // set zoom variables
  zoom = 0.80; // default initial zoom value
  zoomMax = 2; // max zoom value
  zoomMin = 0.5; // min zoom value
  zoomAmt = 0.2; // stepping zoom values on button click
  zoomScale = "page-width"; // zoom scale based on the page-width
  totalPages = 0; // indicates the total number of pages in the pdf document
  pdf: PDFDocumentProxy ; // to access pdf information from the pdf viewer
  documentDefinition: object;
  generatedPDF: any ;
  pdfData:any;
  mainskills:any;
  skilldesc:any;
  user:string = "";
  constructor(private usersListService : UsersListService,private httpClient: HttpClient){
    this.accounts = this.usersListService.accounts
    if(localStorage.getItem('users')){
        var obj:any = JSON.parse(localStorage.getItem('users')|| '{}');
        
        if(localStorage.getItem('currentUser')){
           this.user = localStorage.getItem('currentUser')|| '';
        }
        if (this.user in obj){
          this.currentAccount = obj[this.user];
        }
    }
    this.mainskills = ["Accounting or bookkeeping ",
              "Data analysis",
              "Data privacy — Cybersecurity",
              "Enterprise resource planning ",
              "Process automation",
              "Adaptability ",
              "Attention to detail ",
              "Project management",
              "Leadership",
              "Multitasking",
              "Positivity",
              "Self-motivation",
              "Time management ",
              "Work ethic"
              ];
  this.skilldesc = ["Obtained this skill while doing the math class",
    "Statistics and math and got experience with matlab",
    "Did a high level analysis about network protocols",
    "Resource planning learnt while working at HR",
    "Automation learnt while working at a school project",
    "Highly adaptable",
    "Have concentrated on all the aspects of studies and job",
    "Project management learnt while working at HR",
    "Was a lead of a project",
    "Well known in office for doing multiple tasks",
    "Always keep the positive nature at workplace",
    "Push myself to work all the time",
    "Never missed a deadline",
    "Always followed work ethics"]
  }

  ngOnInit(): void {
    this.currentAccount = this.usersListService.currentAccount;
    this.getData();
    console.log("Sreekar"+this.accounts)
    console.log(this.accounts)
    
  }

  download(): void {
    const blob = new Blob([this.pdfSrc], { type: "application/pdf" });

    const data = window.URL.createObjectURL(blob);
    const link = document.createElement("a"); 
    link.href = data; 
    link.download = this.fileName;
    link.click(); 
    setTimeout(() => {
      window.URL.revokeObjectURL(data);
    }, 100);
  }

  print(): void {
  }

  // to know the browser is IE or not
  isIE(): boolean {
    return navigator.userAgent.lastIndexOf("MSIE") !== -1;
  }

  // to know the browser is Edge or not
  isEdge(): boolean {
    return false;
  }

  // after load complete of the pdf function
  afterLoadComplete(pdf: PDFDocumentProxy): void {
    this.pdf = pdf;
    this.totalPages = pdf.numPages;
  }

  generatePDF(): void {
    // All the contents required goes here
    let obj1 = JSON.parse(localStorage.getItem(this.user+'pg1Data')|| '{}');
    let obj2 = JSON.parse(localStorage.getItem(this.user+'pg2Data')|| '{}');
    let obj3 = JSON.parse(localStorage.getItem(this.user+'pg3Data')|| '{}');
    let pdfskills:string = "";
    console.log("Testing at peaks");
    console.log(obj3);
    let activeOptions = new Set(obj2.activeOptions);
    console.log(activeOptions);
    for (var ind of activeOptions){
          pdfskills +=this.mainskills[Number(ind) ]+": "+this.skilldesc[Number(ind)]+"\n ";
    }
    // if (pdfskills.length>3){
    //   pdfskills = pdfskills.substring(0, pdfskills.length - 2);
    // }
    this.documentDefinition = {
      info: {
        title: this.pdfData.title,
        author: this.pdfData.author,
        subject: this.pdfData.subject,
        keywords: this.pdfData.keywords,
        creator: this.pdfData.creator,
        creationDate: new Date(),
      },
      pageSize: "A4",
      pageOrientation: "landscape",
      pageMargins: [40, 60, 40, 60], // left, top, right, bottom margin values
      margin: [40, 60, 40, 60] as Margins,
      /*{
  {employer: "dasmbbmb", jobtitle: ",bjhbhj", activeOptions: ["3", "1", "2", "4", "7", "9"]}
}*/

      content: [
        {
          text: "Basic Resume",
          style: "head", // normal text with custom font
          alignment:"center"
        },
        {
          text: "Basic Information",
          style: "head",
        },
        {
          text: "\nName : "+obj1.firstname+" "+obj1.lastname +"\nAddress: "+obj1.address
          +", "+obj1.city +", "+obj1.county+"\n Zipcode : "+obj1.zipcode+"\nEmail : "
          +obj1.email+"\n Mobile Number : "+obj1.phnnumber,
        },
        {
          text: "Education",
          style: "head",
        },
        {
          text: "\nSchool : "+obj3.schoolname+"\nLocation : "+obj3.schoolcity
          +"\State : "+obj3.schoolstate+"\nHighest Degree Obtained: "+obj3.degree,
        },
        {
          text: "Experience",
          style: "head",
        },

        {
          text: "\nEmployer : "+obj2.employer+"\nDesignation: "+obj2.jobtitle,
        },
        {
          text: "Skills",
          style: "head",
        },
        {
          text: pdfskills,
        },

        
      ], // it will be discussed later
      styles,
      defaultStyle,
    };

    // Generating the pdf
    this.generatedPDF = pdfMake.createPdf(this.documentDefinition);
    // This generated pdf buffer is used for the download, print and for viewing
    this.generatedPDF.getBuffer((buffer:any) => {
      this.pdfSrc = buffer;
    });
  }

  getData(): void {
    this.httpClient.get("assets/data.json").subscribe((data:any) => {
      if (data) {
        this.pdfData = data;
        this.generatePDF();
      }
    });
  }
  clickEvent():void{
    let x = (<HTMLInputElement>document.getElementById("toastmessage"));
    console.log(x.style.display);
    if (x.style.display === "none" || x.style.display === "") {
        x.style.display = "block";
      } else {
        x.style.display = "none";
      }
  }
  logout():void{
    localStorage.removeItem('currentUser');
    localStorage.removeItem(this.user+'pg1Data');
    localStorage.removeItem(this.user+'pg2Data');
    localStorage.removeItem(this.user+'pg3Data');
    localStorage.removeItem(this.user+'currentUser');
  }

}