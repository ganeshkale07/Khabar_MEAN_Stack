import { Component, OnInit } from '@angular/core';
import { NewsApiService } from '../services/news-api.service';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css']
})
export class NewsListComponent implements OnInit {
  newsArray : any = {};
  errorMessage : string = "";
  specificAreaNews : string = "" ;
  specificQuery ='';
  specificCat = '';
  specificCountry = '';
  currentPage = 1;
  totalResults = 0;
  totalPages = 0;
  constructor(private newsapiService : NewsApiService, private route: ActivatedRoute , private title : Title) { 

  }

  ngOnInit(): void {
    this.title.setTitle('Khabar - Home')
    this.route.params.subscribe(routeParams => {
      if(this.route.snapshot.paramMap.get('news_country')){
        this.getUserSpecificFeed( this.currentPage = 1);
      }else{
        this.getUser(this.currentPage = 1 );
      }
      
    });

  }

  getUser( currentPage : number = 1){

    this.specificAreaNews = String(this.route.snapshot.paramMap.get('news_category'));
  
      this.newsapiService.getNewsApiData(currentPage , this.specificAreaNews).subscribe({
        next: data => {
            this.newsArray = data;
            this.totalResults =   this.newsArray.totalResults;
        },
        error: error => {
            console.error('There was an error!', error.message);
        }
    })
  }

  


  getUserSpecificFeed( currentPage : number){
    this.specificCat = String(this.route.snapshot.paramMap.get('news_category'));
    this.specificCountry = String(this.route.snapshot.paramMap.get('news_country'));
    this.specificQuery = String(this.route.snapshot.paramMap.get('news_query'));

    this.newsapiService.getNewsHeadlines(this.specificCountry,this.specificCat,this.specificQuery , currentPage ).subscribe({
      next: data => {
          this.newsArray = data;
          this.totalResults =   this.newsArray.totalResults;
          console.log(this.newsArray);
      },
      error: error => {
          console.error('There was an error!', error.message);
      }
  })
  }

  getResults(data : Number){
    console.log(this.totalResults);
    this.totalResults < 20 ? this.totalPages = Math.floor(this.totalResults / 20) : this.totalPages = Math.ceil(this.totalResults / 20);
    
    if(data && this.currentPage > 0 && this.currentPage < this.totalPages ){
      this.currentPage++;
    }else{
      this.currentPage--;
    }

    if(this.route.snapshot.paramMap.get('news_country')){
      console.log(this.currentPage)
      this.getUserSpecificFeed(this.currentPage);
    }else{
      this.getUser(this.currentPage);
    }
  }
}
