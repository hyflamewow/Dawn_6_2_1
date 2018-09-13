import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiUrlRoot } from '../config';

@Injectable({
  providedIn: 'root'
})
export class ValuesService {

  constructor(private http: HttpClient) { }

  getList(): Observable<string[]> {
    return this.http.get<string[]>(ApiUrlRoot.concat('values'));
  }

}
