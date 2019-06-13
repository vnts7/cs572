import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styles: []
})
export class UserListComponent implements OnInit {
  data$;
  constructor(public u: UserService) {
    this.data$ = u.getCacheData();
  }

  ngOnInit() {
  }

}
