import { Component, OnInit } from '@angular/core';
import { EventObject, FullCalendarOptions } from 'ngx-fullcalendar';

@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.component.html',
  styleUrls: ['./reserva.component.css']
})
export class ReservaComponent implements OnInit {
  options!: FullCalendarOptions;
  events!: EventObject[];

  ngOnInit() {
    this.options = {
      defaultDate: '2018-07-26',
      editable: true,
      locale: 'es',
      dragScroll: true,

    };

    this.events = [
      { id: 'a', title: 'My Birthday', allDay: true },
      { id: 'b', title: 'Friends coming round', start: '2018-07-26T18:00:00', end: '2018-07-26T23:00:00' }
    ]


}

constructor() {
  }
}
