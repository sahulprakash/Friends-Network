import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProfileService } from '../services/profile.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
result:any
loginDetail

profileForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    gender: new FormControl('', [Validators.required]),
    email: new FormControl('',[Validators.required])
  });

  constructor(private _profileService: ProfileService, private _router: Router) { }

  ngOnInit() {
   let loginDetail = localStorage.getItem('item')
    if (loginDetail == null) {
      this._router.navigate(['/login'])
    }
    else {
      let idStr = JSON.parse(loginDetail)
      let id = idStr.user_id
      this.getUserById(id)
    }
  }
  onSubmit() {
    this.loginDetail = localStorage.getItem('item')
    let idStr = JSON.parse(this.loginDetail)
      let id = idStr.user_id
    this._profileService.updateUser(this.profileForm.value,id)
      .subscribe(res => {
        alert("successfully added the task")
        console.log("task response", res)
      }, err => { console.log("error while adding task", err) })
  }

  getUserById(id) {
    this._profileService.getProfile(id)
      .subscribe(res => {
        this.result = res.result
      }, err => {
        console.log("error on getting user details", err)
      })
  }
}
