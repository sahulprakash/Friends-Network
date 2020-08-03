import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  x: any
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  constructor(private _loginService: LoginService, private _router: Router) { }

  ngOnInit() {
  }
  onSubmit() {
    this._loginService.loginUser(this.loginForm.value)
      .subscribe(res => {
        this.x = JSON.stringify(res)
        localStorage.setItem('item', this.x)
        this._router.navigate(['/my-account'])
      }, err => {
        console.log("invalid credentials", err)
        this._router.navigate(['/login'])
      })
  }
  logout() {
    localStorage.clear()
    this._router.navigate(['/login'])
  }
}
