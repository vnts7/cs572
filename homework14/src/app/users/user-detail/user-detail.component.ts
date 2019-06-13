import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styles: []
})
export class UserDetailComponent implements OnInit {
  detail;
  sub;
  constructor(r: ActivatedRoute, u:UserService) {
    this.sub =
      r.params.subscribe(p => {
        u.getCacheData().subscribe(users=>{
          console.log(users, p.id)
          this.detail = JSON.stringify(users.find(i=>i.login.uuid===p.id), null, 4);
        })
      });
  }

  ngOnInit() {
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
