import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { MyAccountComponent } from './my-account/my-account.component';
import { FriendsComponent } from './friends/friends.component';
import { NetworkComponent } from './network/network.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'my-account', component: MyAccountComponent },
  { path: 'profile', component: ProfileComponent },
  {path:'friends', component:FriendsComponent},
  {path:'network', component:NetworkComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
