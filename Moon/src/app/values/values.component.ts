import { Component, OnInit } from '@angular/core';
import { ValuesService } from './values.service';
import * as signalR from '@aspnet/signalr';
import { ApiUrlRoot } from '../config';

@Component({
  selector: 'app-values',
  templateUrl: './values.component.html',
  styleUrls: ['./values.component.scss']
})
export class ValuesComponent implements OnInit {

  title: string;
  list: Array<string>;

  constructor(private valuesService: ValuesService) { }

  ngOnInit() {
    this.getList();
    this.connectSignalR();
  }

  getList() {
    this.valuesService.getList()
      .subscribe(list => {
        this.list = list;
      })
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
