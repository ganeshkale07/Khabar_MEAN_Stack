import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { NewsApiService } from "./services/news-api.service";
import { firstValueFrom, retry } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  isUserExist : boolean  = false ;
  constructor(private newsApi : NewsApiService, private route : Router){

  }

async canActivate(): Promise<boolean> {
  /****** Implementation using observable 
    const a = await new Promise((resolve, reject) => {
      //Use the firstValueFrom
        (this.newsApi.verifyLoggedInUser()).subscribe({
              next : (data) => {
                if(data){ 
                  resolve(true);
                }
              },
              error : (error) => {
                if(error.status == 401){
                  if(!localStorage['refresh_token']){
                    return alert("Refresh Token is not present!");
                  }
                  this.newsApi.refreshToken().subscribe({
                    next : (renewedToken) => {
                      localStorage.clear();
                      localStorage.setItem('access_token', renewedToken.access_token);
                      localStorage.setItem('refresh_token', renewedToken.refresh_token); 
                      alert("Refresh automatically !");
                    },
                    error : (error) => {
                      alert(error.message);
                      reject(false);                      
                    } 
                  })
                  resolve(true);
                }
                else {
                  reject(false)
                }
                
              }
            });
    }).then(() => true )
    .catch(() => false)
    *********/

    let isAuthorized = await firstValueFrom(this.newsApi.verifyLoggedInUser())
    .then((data) => {
      if(data){
        return true;
      }else{
        return false;
      }
    })
    .catch( async(error) => {
      if(error.status == 401){
        if(!localStorage['refresh_token']){
          alert("Refresh Token is not present!");
          return false;
        }
        let isValid = await firstValueFrom(this.newsApi.refreshToken())
          .then((renewedToken) => {
            localStorage.clear();
              localStorage.setItem('access_token', renewedToken.access_token);
              localStorage.setItem('refresh_token', renewedToken.refresh_token); 
              alert("Refresh automatically !");
              return true;
          })
          .catch((error) => {
            alert(error.message);
            return false;
          })
          return isValid;
      }
      else{
        return false;
      }
      });

    isAuthorized ? console.log("User Exist !") : this.route.navigate(['/Khabar', 'sign-in']);
    return isAuthorized;


  }
  
}
