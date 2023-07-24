import { Injectable } from '@angular/core';
import { User } from '../shared/user';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {
  users : any[] = [
    {
      "id": "1",
      "firstName": "Animesh",
      "lastName": "Roy",
      "email": "ani@gmail.com",
      "age": 21,
      "companyId": "1"
    },
    {
      "id": "2",
      "firstName": "Rahul",
      "lastName": "Sharma",
      "email": "rahul@gmail.com",
      "age": 20,
      "companyId": "1"
    },
    {
      "id": "3",
      "firstName": "Mark",
      "lastName": "Tyson",
      "email": "lipon21@gmail.com",
      "age": 22,
      "companyId": "1"
    },
    {
      "id": "4",
      "firstName": "Saurav",
      "lastName": "Kumar",
      "email": "saurav@gmail.com",
      "age": 24,
      "companyId": "1"
    },
    {
      "id": "4",
      "firstName": "Sau",
      "lastName": "Kumar",
      "email": "saurav@gmail.com",
      "age": 34,
      "companyId": "1"
    },
    {
      "id": "4",
      "firstName": "Tom",
      "lastName": "Kumar",
      "email": "saurav@gmail.com",
      "age": 27,
      "companyId": "1"
    },
    {
      "id": "4",
      "firstName": "Shiva",
      "lastName": "Kumar",
      "email": "saurav@gmail.com",
      "age": 35,
      "companyId": "1"
    }
  ]
  
  constructor() { }

  getUsers(): User[]{
    return this.users;
  }
}
