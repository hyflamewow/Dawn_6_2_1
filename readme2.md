# Dawn
2018/09/13
## 目標
WebAPI實作

## 修改Moon
安裝bootstrap
```
Moon>npm i bootstrap
```
套用bootstrap, 現在是4.1.3
src/styles.scss
```ts
@import "~bootstrap/scss/bootstrap";
```
## 建立values component
```
Moon>ng g component values
Moon\src\app\values>ng g service values
```
## 載入HttpClientModuel
src/app/app.module.ts
```ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ValuesComponent } from './values/values.component';

@NgModule({
  declarations: [
    AppComponent,
    ValuesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

```
## app.component.html
```html
<div class="container">
    <router-outlet></router-outlet>
</div>
```
## app-routing.module.ts
```ts
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ValuesComponent } from './values/values.component';

const routes: Routes = [
  { path: '', redirectTo: '/values', pathMatch: 'full' },
  { path: 'values', component: ValuesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```
## values.service.ts
```ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ValuesService {

  constructor(private http: HttpClient) { }

  getList(): Observable<string[]> {
    return this.http.get<string[]>('api/values');
  }

}
```
## values.components.ts
```ts
import { Component, OnInit } from '@angular/core';
import { ValuesService } from './values.service';

@Component({
  selector: 'app-values',
  templateUrl: './values.component.html',
  styleUrls: ['./values.component.scss']
})
export class ValuesComponent implements OnInit {

  list: Array<string>;

  constructor(private valuesService: ValuesService) { }

  ngOnInit() {
    this.getList();
  }

  getList() {
    this.valuesService.getList()
      .subscribe(list => {
        this.list = list;
      })
  }

}
```
## values.component.html
```html
<ul class="list-group">
  <li class="list-group-item" *ngFor="let item of list">
    {{item}}
  </li>
</ul>
```
## 建置
```
Sun>dotnet run
Moon>npm start
```
瀏覽 http://localhost:4200/
## 版控
```
Dawn>git add .
Dawn>git commit -m "webapi"
```