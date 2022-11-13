import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Account } from '../account';
import { UsersListService } from '../users-list.service';
import { PdfViewerModule, PdfViewerComponent, PDFDocumentProxy } from "ng2-pdf-viewer";
//import * as pdfMake from "pdfmake/build/pdfmake";
//import pdfFonts from "../../assets/vsf_fonts.js";
//const pdfFonts = require("../../assets/vsf_fonts.js")
const pdfMake = require('pdfmake/build/pdfmake.js');
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
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
  zoom = 0.98; // default initial zoom value
  zoomMax = 2; // max zoom value
  zoomMin = 0.5; // min zoom value
  zoomAmt = 0.2; // stepping zoom values on button click
  zoomScale = "page-width"; // zoom scale based on the page-width
  totalPages = 0; // indicates the total number of pages in the pdf document
  pdf: PDFDocumentProxy ; // to access pdf information from the pdf viewer
  documentDefinition: object;
  generatedPDF: any ;
  pdfData:any;


  constructor(private usersListService : UsersListService,private httpClient: HttpClient){
    this.accounts = this.usersListService.accounts
  }

  ngOnInit(): void {
    this.currentAccount = this.usersListService.currentAccount;
    this.getData();
    console.log("Sreekar"+this.accounts)
    console.log(this.accounts)
    // console.log(UsersListService.currentAccount);
    // console.log(UsersListService.accounts);
  }

  download(): void {
    const blob = new Blob([this.pdfSrc], { type: "application/pdf" });

    const data = window.URL.createObjectURL(blob);
    const link = document.createElement("a"); // creating an anchor tag
    link.href = data; // setting href value to anchor
    link.download = this.fileName; // giving the download attr to the anchor with the filename that we are giving
    link.click(); // fake click using the js to download it.

    // For firefox it is necessary to delay revoking the ObjectURl
    setTimeout(() => {
      window.URL.revokeObjectURL(data);
    }, 100);
  }

  // pdfSrc value we are taking from the pdfmake generate function in buffer type so currently this willnot work
  // after the pdf is generated it will work
  // Print functionlaity of the pdf
  print(): void {
    // // Remove previously added iframes
    // const prevFrames = document.querySelectorAll('iframe[name="pdf-frame"]');
    // if (prevFrames.length) {
    //   prevFrames.forEach((item) => item.remove());
    // }
    // // just like download , we are using the blob
    // const blob = new Blob([this.pdfSrc], { type: "application/pdf" });
    // const objectURl = URL.createObjectURL(blob);

    // // create iframe element in dom
    // const frame = document.createElement("iframe");
    // frame.style.display = "none"; // hiding the iframe
    // frame.src = objectURl; // setting the source for that iframe
    // // appending this iframe to body
    // document.body.appendChild(frame);
    // frame.name = "pdf-frame";
    // frame.focus();

    // // in edge or IE we are using different methods to print
    // if (this.isIE() || this.isEdge()) {
    //   frame.contentWindow.document.execCommand("print", false, null);
    // } else {
    //   // all other browsers will use this method
    //   frame.contentWindow.print();
    // }
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
      margin: [20, 0, 40, 0] as Margins,
      content: [
        {
          text: "Sample test to check the font",
          style: "head", // normal text with custom font
        },
        {
          text: "> Sample test to check the font",
          
        },
        {
          text: "> hfbsediuhfeibneidw ewqbqjwk.",
          font: "Icomoon", // icon intgerated to the pdfmake document
          fontSize: 18,
        },
        {
          text: "hfbsediuhfeibneidw ewqbqjwkwqdfjywgqh.",
          font: "Icomoon", // icon intgerated to the pdfmake document
          fontSize: 18,
        },
        {
          text: "Sample test to check the font",
          style: "head", // normal text with custom font
        },
        {
          text: "Sample test to check the font",
          style: "head", // normal text with custom font
        },
        {
          text: ">",
          font: "Icomoon", // icon intgerated to the pdfmake document
          fontSize: 18,
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
}