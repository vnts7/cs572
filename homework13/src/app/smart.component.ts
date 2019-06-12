import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-smart',
  template: `
    
      <app-dumb *ngFor="let item of data" [item]="item">
      </app-dumb>
    
  `,
  styles: []
})
export class SmartComponent implements OnInit {
  data = [1, 2, 3, 4, 5];
  constructor() { }

  ngOnInit() {
  }

}
