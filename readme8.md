# Dawn
2018/09/14
## 目標
使用Kendo提供的Angular UI  
要錢!!!  
https://www.telerik.com/kendo-angular-ui
## 修改Sun專案
修改Startup.cs  
這是為了WebAPI產Json時不要將屬性自動轉為小寫開頭的camel格式, 改寫後Json就會保持原名。
```cs
services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1)
  .AddJsonOptions(options => {
    options.SerializerSettings.ContractResolver = new Newtonsoft.Json.Serialization.DefaultContractResolver();
  });
```
新增Elves/ValueElf.cs
```cs
namespace Sun.Elves
{
    public class ValueElf
    {
        public int ID { get; set; }
        public string Name { get; set; }
    }
}
```
修改ValulesController.cs, 加上GetValueElfList()
```cs
[HttpGet("GetValueElfList")]
public ActionResult GetValueElfList()
{
    List<ValueElf> list = new List<ValueElf>();
    list.Add(new ValueElf { ID = 1, Name = "Hyflame" });
    list.Add(new ValueElf { ID = 2, Name = "Peter" });
    return Ok(list);
}
```
## 修改Moon專案
安裝Theme
```
Moon>npm install --save @progress/kendo-theme-bootstrap
```
修改styles.scss
```scss
@import "~@progress/kendo-theme-bootstrap/scss/all";
@import "~bootstrap/scss/bootstrap";
```
安裝Grid  
ng add 有問題, 所以使用手動做法
```
Moon>npm install --save @progress/kendo-angular-grid @progress/kendo-angular-dropdowns @progress/kendo-angular-inputs @progress/kendo-angular-dateinputs @progress/kendo-data-query @progress/kendo-angular-intl @progress/kendo-angular-l10n @progress/kendo-drawing @progress/kendo-angular-excel-export @progress/kendo-angular-buttons
Moon>npm install --save rxjs-compat@6
```
修改app.module.ts 
加上BrowserAnimationsModule及GridModule
```ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GridModule } from '@progress/kendo-angular-grid';

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
    HttpClientModule,
    BrowserAnimationsModule,
    GridModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```
新增app\values\valueElf.ts
```ts
export class ValueElf {
    ID: number;
    Name: string;
}
```
修改values.service.ts
```ts
import { ValueElf } from './valueElf';
...
getValueElfList(): Observable<ValueElf[]> {
  return this.http.get<ValueElf[]>(ApiUrlRoot.concat('api/values/GetValueElfList'));
}
```
修改values.component.ts
```ts
import { ValueElf } from './valueElf';
...
export class ValuesComponent implements OnInit {
  ...
  gridData: Array<ValueElf>;

  ngOnInit() {
    ...
    this.getValueElfList();
  }

  getValueElfList() {
    this.valuesService.getValueElfList()
    .subscribe(list => {
      this.gridData = list;
    });
  }
  ...
}

```
修改values.component.html
```cs
<div class="row">
  <div class="col-md-6">
    <h1>{{title}}</h1>
    <ul class="list-group">
      <li class="list-group-item" *ngFor="let item of list">
        {{item}}
      </li>
    </ul>
  </div>
  <div class=col-md-6>
    <h1>Data Grid</h1>
    <kendo-grid [data]="gridData">
      <kendo-grid-column field="ID" title="ID">
      </kendo-grid-column>
      <kendo-grid-column field="Name" title="Name">
      </kendo-grid-column>
    </kendo-grid>
  </div>
</div>
```
## 測試
```
Sun>dotnet run
Moon>npm start
```
1. 設中斷點
2. 除錯

## 版控
```
Dawn>git add .
Dawn>git commit -m "Kendo"
```