import { Directive, Renderer2, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[isVisible]'
})
export class IsVisibleDirective {
  @Input() isVisible = false;
  constructor(public e: ElementRef, public r: Renderer2) {
    
  }
  ngOnInit(){
    console.log(this.isVisible);
    this.r.setStyle(this.e.nativeElement, 'display', this.isVisible ? 'block' : 'none');
  }
}
