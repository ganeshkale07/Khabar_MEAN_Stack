import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export const matchPassword: ValidatorFn =  (control : AbstractControl) : ValidationErrors | null  => {
    const password = control.get('password');
    const repeat_password = control.get('repeat_password');
    if(password && repeat_password && password.value != repeat_password.value){
        return {
            matchError : "Both password should match" 
        }
    }
    return null;
}