import { Component, OnInit } from '@angular/core';
import { NewsApiService } from "../services/news-api.service";
import { User } from "../interfaces/user";
import { NavigationEnd, Router } from "@angular/router";
import { Observable, catchError, of, tap } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profile$ : Observable<User | null> = of(null) ;
  profileFetchError: String = '';

  constructor(private newsApi:NewsApiService, private route : Router) { }

  ngOnInit() {
    //Todo 
    //Cannot read properties of undefined (reading 'username')
    //await firstValueFrom(this.newsApi.verifyLoggedInUser()).then((data) => this.profile = data).catch(error => this.profileFetchError = error) ;
    
    // this.route.events.subscribe((event) => {
    //   if(event instanceof NavigationEnd){     
    //     this.newsApi.verifyLoggedInUser().pipe(
    //       tap(ele => console.log(ele)),
    //       tap((data:User) => this.profile = data ),
    //       catchError((error) => this.profileFetchError = error)
    //     )
    //   }
    // })

   
    this.profile$ =  this.newsApi.verifyLoggedInUser().pipe(
      catchError(error => { this.profileFetchError = error ; return of(error)})
    );
    

  }

  logOut() {
     this.newsApi.logOutUser().subscribe({
      next : (data : any) => {
        localStorage.clear();
        this.route.navigate(['/Khabar', 'sign-in']);
        alert(data.message);
      },
      error : (error) => {
        alert(error.statusText);
        this.route.navigate(['/Khabar', 'sign-in']);}
    })
  }

}
