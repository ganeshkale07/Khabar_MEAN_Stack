import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { NewsApiService } from "../services/news-api.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  email !: FormControl;
  password !: FormControl ;
  signInForm!: FormGroup;
  loginError  : string = "";
constructor(private newsApi : NewsApiService, private route : Router) { }

  ngOnInit(): void {
    this.createForm();
    this.createSignInFormModel();
  }
  

  createSignInFormModel(){
    this.signInForm = new FormGroup({
      email : this.email,
      password : this.password
    })
  }

  createForm(){
    this.email = new FormControl('', [Validators.required, Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)]);
    this.password = new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]);
  }

  loginForm() {
    this.newsApi.checkLoginUser(this.signInForm.value).subscribe({
      next : (data) => { 
        localStorage.clear();
        localStorage.setItem('access_token', data.access_token);
        localStorage.setItem('refresh_token', data.refresh_token); 
        alert("Logged in successfully !");
        this.route.navigate(['/Khabar', 'all'])
      } ,
    
      error : (error) => this.loginError = error.error.message 
    
  })
  }

  resetForm(){
    this.signInForm.reset();
  }




}
