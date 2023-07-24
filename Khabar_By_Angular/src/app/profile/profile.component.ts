import { Component, OnInit } from '@angular/core';
import { NewsApiService } from "../services/news-api.service";
import { User } from "../interfaces/user";
import { Router } from "@angular/router";
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profile !: User ;
  profileFetchError: String = '';

  constructor(private newsApi:NewsApiService, private route : Router) { }

  async ngOnInit(): Promise<void> {
    //Todo 
    //Cannot read properties of undefined (reading 'username')
    await firstValueFrom(this.newsApi.verifyLoggedInUser()).then((data) => this.profile = data).catch(error => this.profileFetchError = error) ;
  }

  logOut() {
     this.newsApi.logOutUser().subscribe({
      next : (data : any) => {
        localStorage.clear();
        this.route.navigate(['/Khabar', 'sign-in']);
        alert(data.message);
      },
      error : (error) => alert(error)
    })
  }

}
