# Dawn
2018/09/13
## 目標
啟用CORS
## 修改 Sun
Startup.cs
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
                .AllowCredentials()
        );
    });
    services.Configure<MvcOptions>(options =>{
        options.Filters.Add(new CorsAuthorizationFilterFactory("CorsPolicy"));
    });
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
    app.Run(async (context) =>
    {
        if (!Path.HasExtension(context.Request.Path.Value))
        {
            await context.Response.SendFileAsync(Path.Combine(env.WebRootPath, "index.html"));
        }
    });
}
```
## 修改Moon
新增src/app/config.ts
```ts
export const ApiUrlRoot = 'http://localhost:5000/api/';
```
values.component.ts
```ts
import { ApiUrlRoot } from '../config';

getList(): Observable<string[]> {
    return this.http.get<string[]>(ApiUrlRoot.concat('values'));
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
Dawn>git commit -m "CORS"
```