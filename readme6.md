# Dawn
2018/09/13
## 目標
NLog
## 安裝
```
Sun>dotnet add package NLog --version 4.5.9
```
有另一種整合ASP.NET的做法, 會使用NLog.Web.AspNetCore
## 修改 Sun
修改Startup.cs
```cs
NLog.LogManager.Configuration = new NLog.Config.XmlLoggingConfiguration("Config/nlog.config");

// app.UseHttpsRedirection();
app.UseMvc();
```
修改ValuesController.cs
```cs
public class ValuesController : ControllerBase
{
    private static readonly NLog.Logger logger = NLog.LogManager.GetCurrentClassLogger();

    // GET api/values
    [HttpGet]
    public ActionResult<IEnumerable<string>> Get()
    {
        logger.Debug("api/values");
        return new string[] { "value1", "value2" };
    }
    ...
}
```
新增Config/nlog.config
```xml
<?xml version="1.0" encoding="utf-8" ?>
<nlog xmlns="http://www.nlog-project.org/schemas/NLog.xsd"
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">

  <targets>
    <target name="logfile" xsi:type="File" fileName="Logs/${date:format=yyyyMMdd}-nlog.log"
            maxArchiveFiles="10"
            archiveAboveSize="1000000"
            archiveEvery="Day">
      <layout xsi:type="JsonLayout">
        <attribute name="TimeStamp" layout="${longdate}" />
        <attribute name="Level" layout="${level:uppercase=true}" />
        <attribute name="LoggerName" layout="${logger}" />
        <attribute name="Message" layout="${message}" escapeUnicode="false" />
        <attribute name="Exception" layout="${exception:format=ToString}" escapeUnicode="false" />
      </layout>
    </target>
    <target name="logstash" xsi:type="Network" address="[address]">
      <layout xsi:type="JsonLayout" includeAllProperties="true">
        <attribute name="TimeStamp" layout="${date:universalTime=true:format=o}" />
        <attribute name="Level" layout="${level:uppercase=true}" />
        <attribute name="LoggerName" layout="${logger}" />
        <attribute name="MachineName" layout="${machinename}" />
        <attribute name="ProgId" layout="IRS" />
        <attribute name="ProcessName" layout="${processname}" />
        <attribute name="AssemblyVersion" layout="${assembly-version}" />
        <attribute name="Message" layout="${message}" />
        <attribute name="Exception" layout="${exception:format=ToString}" />
      </layout>
    </target>
    <target xsi:type="Mail"
       name="MailLog"
       html="True"
       replaceNewlineWithBrTagInHtml="True"
       subject="Sun:${machinename}"
       to="hyflame@gmail.com"
       from="hyflame@gmail.com"
       enableSsl="False"
       smtpAuthentication="None"
       smtpServer="[smtpServer]"
       smtpPort="25"
       useSystemNetMailSettings="False" >
      <layout xsi:type="JsonLayout" includeAllProperties="true">
        <attribute name="TimeStamp" layout="${longdate}" />
        <attribute name="LoggerName" layout="${logger}" />
        <attribute name="Message" layout="${message}"  escapeUnicode="false" />
        <attribute name="Exception" layout="${exception:format=ToString}" escapeUnicode="false" />
      </layout>
    </target>
  </targets>

  <rules>
    <logger name="*" minlevel="Debug" writeTo="logfile" />
    <!--<logger name="*" minlevel="Info" writeTo="logstash" />-->
    <!-- <logger name="*" minlevel="Error" writeTo="MailLog" /> -->
  </rules>
</nlog>
```
## 測試
```
Sun>dotnet run
```
瀏覽 http://localhost:5000/api/values
## 版控
```
Dawn>git add .
Dawn>git commit -m "nlog"
```