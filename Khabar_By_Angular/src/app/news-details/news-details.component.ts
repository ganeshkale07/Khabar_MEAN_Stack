import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ChildActivationEnd } from '@angular/router';
import { NewsApiService } from '../services/news-api.service';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-news-details',
  templateUrl: './news-details.component.html',
  styleUrls: ['./news-details.component.css']
})
export class NewsDetailsComponent implements OnInit {
  newsIndex : string = "";
  specificAreaNews : string = "" ;
  newsArray : any = {};
  newsDetail : any = {};
  constructor(private activatedRoute : ActivatedRoute, private newsapiService : NewsApiService ,private title : Title ) {}

  ngOnInit() {
    this.title.setTitle(`Khabar - ${this.specificAreaNews}`);
    if(this.activatedRoute.snapshot.paramMap.get('news_country')){
      console.log("Hi")
      this.getNewsHeadlineDetails();
    }else{
      this.getNewsDetails();
    }
  }

  getNewsDetails(){
    this.activatedRoute.params.subscribe(params => {
      this.specificAreaNews = params['news_category'];
      this.newsIndex = params['index'];
    });
    this.newsapiService.getNewsApiData(1 , this.specificAreaNews).subscribe({
      next: response => {
        this.newsArray = response;
        this.newsDetail  = this.newsArray['articles'][this.newsIndex];
        console.log(this.newsDetail)
      },
      error: err => {
        console.log(err) 
      }  
    });
  }

  getNewsHeadlineDetails(){
    const specificCat = String(this.activatedRoute.snapshot.paramMap.get('news_category'));
    const specificCountry = String(this.activatedRoute.snapshot.paramMap.get('news_country'));
    const specificQuery = String(this.activatedRoute.snapshot.paramMap.get('news_query'));
    this.newsIndex = String(this.activatedRoute.snapshot.paramMap.get('index'));
    console.log(this.activatedRoute.snapshot.paramMap)

    this.newsapiService.getNewsHeadlines(specificCountry,specificCat,specificQuery, 1 ).subscribe({
      next: data => {
          this.newsArray = data;
          this.newsDetail  = this.newsArray['articles'][this.newsIndex];
      },
      error: error => {
          console.error('There was an error!', error.message);
      }
  });
  console.log("Hi2")
  }
}
