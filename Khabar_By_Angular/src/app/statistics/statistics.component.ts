import { Component, OnInit } from '@angular/core';
import { User } from '../shared/user';
import { UserApiService } from '../services/user-api.service';
import { observable, Observable } from 'rxjs';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  userList: User[] = [];
  constructor(private userApiService : UserApiService) { }

  ngOnInit(): void {
    this.userList = this.userApiService.getUsers();
  }

  // agentNum : any = 0;
  // this.agentNum = new Observable( (observer) => {
  //   try{
  //     observer.next(12);
  //     observer.next(122);
  //     observer.next(18);
  //   }
  //   catch(e){
  //     observer.error(e);
  //   }
  // })

  // this.agentNum.subscribe(data => console.log(data));

}
