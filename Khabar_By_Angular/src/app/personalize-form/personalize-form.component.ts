import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-personalize-form',
  templateUrl: './personalize-form.component.html',
  styleUrls: ['./personalize-form.component.css']
})
export class PersonalizeFormComponent implements OnInit {
  personalizeForm !: FormGroup;
  country !: FormControl;
  cat !: FormControl;
  query !: FormControl;


  constructor(private fb:FormBuilder) { }

  ngOnInit(): void {
    this.createFormModel();
    this.createFormControl();
  }

  onSubmit(formValue : FormGroup){
    console.log(formValue.value);
    console.log(formValue);
  }

  createFormControl(){
    this.personalizeForm = this.fb.group({
      country : this.country,
      cat : this.cat,
      query : this.query
    })
  }


  createFormModel(){
    this.country = new FormControl('in', [Validators.required, Validators.pattern(/^[a-zA-Z]{2}$/)])
    this.cat = new FormControl('sport',[Validators.required, Validators.pattern(/^[a-zA-Z]+$/)])
    this.query = new FormControl('cricket',[Validators.required])
  }

  clearForm(){
    this.personalizeForm.reset();
  }

}
