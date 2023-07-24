import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from './login.guard';
import { NewsDetailsComponent } from './news-details/news-details.component';
import { NewsListComponent } from './news-list/news-list.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PersonalizeFormComponent } from './personalize-form/personalize-form.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { RegistrationComponent } from "./registration/registration.component";
import { ProfileComponent } from "./profile/profile.component";


const routes: Routes = [
  {
    path : 'Khabar/sign-in',
    component:SignInComponent
  },
  {
    path : 'Khabar/register',
    component:RegistrationComponent,
    pathMatch : 'full'
  },
  {
    path : 'Khabar/profile',
    component:ProfileComponent,
    canActivate : [LoginGuard],
    pathMatch : 'full'
  },
  {
    path:'Khabar/all',
    component:NewsListComponent,
    canActivate : [LoginGuard]
  },
  {
    path:'Khabar/user/personalized-form',
    component:PersonalizeFormComponent,
    canActivate : [LoginGuard] 
  },
  {
    path:'Khabar/:news_category',
    component:NewsListComponent,
    pathMatch : 'full',
    canActivate : [LoginGuard] 

  },
  {
    path:'Khabar/:news_country/:news_category/:news_query/details/:index',
    component:NewsDetailsComponent,
    pathMatch : 'full',
    canActivate : [LoginGuard] 
  },
  {
    path:'Khabar/:news_category/details/:index',
    component:NewsDetailsComponent,
    pathMatch : 'full',
    canActivate : [LoginGuard] 
  },
  {
    path:'Khabar/:news_country/:news_category/:news_query',
    component:NewsListComponent,
    pathMatch : 'full',
    canActivate : [LoginGuard]  

  },
  {
    path:'statistics',
    component : StatisticsComponent,
    pathMatch : 'full'
  },
  {
    path:'',
    redirectTo : 'Khabar/sign-in',
    pathMatch : 'full'
  },
  {
    path:'Khabar',
    redirectTo : 'Khabar/india',
    pathMatch : 'full'
  },
  //always add wild card route at the bottom
  {
    path : '**',
    component : PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes , {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
