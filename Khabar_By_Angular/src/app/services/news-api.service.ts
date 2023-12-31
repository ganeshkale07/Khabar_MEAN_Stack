import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Login } from '../interfaces/login';
import { User } from '../interfaces/user';
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class NewsApiService {
  apiKey = "665c3eb9dbd54d9eb5bca1cef906bf5f";
  serverBaseUrl = "http://localhost:5001/api/";
  access_Token !:string;
  refresh_Token !:string;
  constructor(private httpClient : HttpClient) { }

  //To get news
  getNewsApiData(page : number ,query:string = 'all' ){
    const headers = new HttpHeaders({
      'X-Api-key': this.apiKey

    })
    console.log(query);
    const params = new HttpParams()
    // .set('country', 'us')
    .set('q',query )
    .set('pageSize',20)
    .set('page',page)
    
    return this.httpClient.get(`https://newsapi.org/v2/everything`, { headers , params} );
  }

  //To get filtered headlines
  getNewsHeadlines(country:string, category:string ,query:string = 'all', page : number  ){
    const headers = new HttpHeaders({
      'X-Api-key': this.apiKey,

    })
    const params = new HttpParams()
    .set('country',country)
    .set('category',category) 
    .set('q',query)
    .set('pageSize',20)
    .set('page',page)

    
    return this.httpClient.get(`https://newsapi.org/v2/top-headlines`,{ headers , params });

  }

  //Register user
  regsiterUser(data : any){
    const headers = new HttpHeaders({
      'Access-Control-Allow-Origin' : "*"
    })
    return this.httpClient.post(this.serverBaseUrl + '/register', data , { headers});
  }

  //login User
  checkLoginUser(data : any):Observable<Login>{
    const headers = new HttpHeaders({
      'Access-Control-Allow-Origin' : "*"
    })
    return this.httpClient.post<Login>(this.serverBaseUrl + 'login', data , { headers});
  }

  //Verify User is loggedIn
  verifyLoggedInUser():Observable<User>{
    this.access_Token = localStorage['access_token'];
    const headers = new HttpHeaders({
      'Authorization' : "Bearer "+ this.access_Token
    })
    return this.httpClient.get<User>(this.serverBaseUrl + 'me' , {headers});
  }

  //Refresh Token
  refreshToken():Observable<Login> {
    return this.httpClient.post<Login>(this.serverBaseUrl + 'refreshToken' , {refresh_token : localStorage['refresh_token']});

  }

  //Log out user
  logOutUser(){
    const headers = new HttpHeaders({
      'Authorization' : "Bearer "+ this.access_Token
    })
    console.log(headers);
    return this.httpClient.post(this.serverBaseUrl + 'logout' , {refresh_token : localStorage['refresh_token']}, {headers});
  }

}
