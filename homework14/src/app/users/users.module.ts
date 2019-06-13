import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './user-list/user-list.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { RouterModule } from '@angular/router';
import { UserNotFoundComponent } from './user-not-found/user-not-found.component';
import { UserDetailGuard } from './user-detail-guard';

@NgModule({
  declarations: [UserListComponent, UserDetailComponent, UserNotFoundComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: UserListComponent },
      { path: 'detail/:id', component: UserDetailComponent, canActivate: [UserDetailGuard] },
      { path: 'error', component: UserNotFoundComponent }
    ])
  ],
  providers: [UserDetailGuard],
  bootstrap: [UserListComponent]
})
export class UsersModule { }
