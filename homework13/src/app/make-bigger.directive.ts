import { Directive, HostListener, Renderer2, ElementRef, HostBinding } from '@angular/core';

@Directive({
  selector: '[makeBigger]'
})
export class MakeBiggerDirective {
  @HostBinding('style.fontSize') fontSize = '16px';
  @HostListener('dblclick') onDbClick() {
    console.log(this.fontSize)
    this.fontSize = (parseInt(this.fontSize) + 2) + 'px';
  }
  constructor(public e: ElementRef, public r: Renderer2) { }

}
