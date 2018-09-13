# Dawn
2018/09/13
## 目標
啟用SignalR

## 安裝
```
Sun>dotnet add package Microsoft.AspNetCore.SignalR --version 1.1.0-preview2-35157
Moon>npm i @aspnet/signalr@1.1.0-preview2-35157
```
## 修改 Sun
新增 TimeHub.cs
```cs
using System;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace Sun.Signal
{
    public class TimeHub : Hub
    {
        private static IHubCallerClients globalClients;
        public void Send(string message)
        {
            Clients.All.SendAsync("send", message);
        }
        public void Register()
        {
            if(globalClients == null)
            {
                globalClients = Clients;
                SendTime();
            }
        }
        public async static void SendTime()
        {
            await globalClients.All.SendAsync("send", DateTime.Now.ToLongTimeString());
            Thread.Sleep(1000);
            SendTime();
        }
    }
}
```
修改Startup.cs
```cs
    public void ConfigureServices(IServiceCollection services)
    {
        services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);
        services.AddCors(options =>
        {
            options.AddPolicy("CorsPolicy",
                builder => builder
                    .AllowAnyOrigin()
                    .AllowAnyMethod()
                    .AllowAnyHeader()
            );
        });
        services.Configure<MvcOptions>(options =>{
            options.Filters.Add(new CorsAuthorizationFilterFactory("CorsPolicy"));
        });
        services.AddSignalR();
    }

    // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
    public void Configure(IApplicationBuilder app, IHostingEnvironment env)
    {
        if (env.IsDevelopment())
        {
            app.UseDeveloperExceptionPage();
        }
        else
        {
            app.UseHsts();
        }

        // app.UseHttpsRedirection();
        app.UseMvc();
        app.UseDefaultFiles();
        app.UseStaticFiles();
        app.UseCors("CorsPolicy");
        app.UseSignalR(routes => {
            routes.MapHub<TimeHub>("/time");
        });
        app.Run(async (context) =>
        {
            if (!Path.HasExtension(context.Request.Path.Value))
            {
                await context.Response.SendFileAsync(Path.Combine(env.WebRootPath, "index.html"));
            }
        });
    }
}
```
## 修改 Moon
values.component.html
```
<h1>{{title}}</h1>
<ul class="list-group">
  <li class="list-group-item" *ngFor="let item of list">
    {{item}}
  </li>
</ul>
```
values.component.ts
```ts
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as signalR from '@aspnet/signalr';
...
export class ValuesComponent implements OnInit {
  public title: string;
  public list: string[];
  ...
  ngOnInit() {
    this.getList();
    this.connectSignalR();
  }

  connectSignalR() {
    const hub = new signalR.HubConnectionBuilder()
      .withUrl(ApiUrlRoot.concat('time'))
      .build();
    hub.on('send', data => {
      this.title = data;
    });
    hub.start()
      .then(() => hub.invoke('register'));
  }
}
```
## 測試
```
Sun>dotnet run
Moon>ng serve
```
瀏覽 http://localhost:4200/
## 版控
```
Dawn>git add .
Dawn>git commit -m "SignalR"
```