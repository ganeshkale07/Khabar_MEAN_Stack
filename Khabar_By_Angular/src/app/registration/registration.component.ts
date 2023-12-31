import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { NewsApiService } from "../services/news-api.service";
import {Router} from "@angular/router";
import { matchPassword } from "../validators/matchpassword.validators";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  email !: FormControl;
  username !: FormControl;
  repeat_password !: FormControl;
  password !: FormControl ;
  signInForm !: FormGroup;
  registrationError : string = "";
  constructor(private newsApi : NewsApiService , private route : Router) { }

  ngOnInit(): void {
    this.createForm();
    this.createSignInFormModel();
  }
  
 

  createSignInFormModel(){
    this.signInForm = new FormGroup({
      email : this.email,
      username : this.username,
      password : this.password,
      repeat_password : this.repeat_password,
    },{
      validators:matchPassword
    })
  }

  createForm(){
    this.email = new FormControl('', [Validators.required, Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)]);
    this.password = new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]);
    this.username = new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]);
    this.repeat_password = new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]);
  }

  registrationForm() {
    this.newsApi.regsiterUser(this.signInForm.value).subscribe({
      next : (data) => {
        if(data){          
          alert("Registered successfully !");
          this.route.navigate(['/Khabar', 'sign-in']);
          //navigate to login page
          //this.route.navigate(['Khabar','sign-in']);
        } 
      } ,
    
      error : (error) => this.registrationError = error.error.message
    
  })
  }

  resetForm(){
    this.signInForm.reset();
  }


}
