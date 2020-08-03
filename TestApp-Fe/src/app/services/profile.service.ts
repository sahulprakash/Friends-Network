import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private baseUrl: string = 'http://localhost:3000';

  constructor(private http: HttpClient, private _router: Router) {}
  initRequestOptions() {
    let tokenstr = localStorage.getItem('item');
    let tokenparse = JSON.parse(tokenstr)
    let token = tokenparse.token
    let headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Authorization': 'Bearer ' + token
    }
    let headersConfig = new HttpHeaders(headers)
    return headersConfig
  }

  updateUser(user,id): Observable<any> {
    var datas: any = {};
    datas = user;
    var data = JSON.stringify(datas);
    let options = this.initRequestOptions();
    return this.http.post<any>(`${this.baseUrl}/personal/${id}`, data, {
      headers: options,
    });
  }
  getProfile(id): Observable<any> {
    let options = this.initRequestOptions()
    return this.http.get<any>(`${this.baseUrl}/profile/${id}`, { headers: options })
  }
  getAllUsers():Observable<any>{
    let options = this.initRequestOptions()
    return this.http.get<any>(`${this.baseUrl}/users`, {headers:options})
  }
}
