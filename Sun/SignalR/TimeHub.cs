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
            if (globalClients == null)
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