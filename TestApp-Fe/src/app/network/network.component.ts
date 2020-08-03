import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../services/profile.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-network',
  templateUrl: './network.component.html',
  styleUrls: ['./network.component.css']
})
export class NetworkComponent implements OnInit {
  result

  constructor(private _profileService: ProfileService, private _router: Router) { }

  ngOnInit() {
    this.getAllUsers()
  }
  getAllUsers() {
    this._profileService.getAllUsers()
      .subscribe(res => {
        this.result = res.result
      }, err => {
        console.log("error on getting user details", err)
      })
  }

}
