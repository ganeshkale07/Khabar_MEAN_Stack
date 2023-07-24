
import { Component, OnInit } from '@angular/core';
import { NewsApiService } from './services/news-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angular-concept';
  newsArray : any = {};
  errorMessage : string = "";
  constructor(){

  }

  ngOnInit() {
  }


  
}
