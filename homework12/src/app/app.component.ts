import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  ComponentCounterValue:number = 8;
  Component2CounterValue:number = 5;
  counterChange(e){
    this.ComponentCounterValue = e;
  }
  counterChange2(e){
    this.Component2CounterValue = e;
  }
}
