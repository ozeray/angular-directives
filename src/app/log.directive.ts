import { Directive, ElementRef, inject, input } from '@angular/core';

@Directive({
  selector: '[appLog]',
  standalone: true,
  host: {
    '(click)': 'onLog()'
  }
})
// LogDirective is used as a host directive in authComponent, 
// whereas as an attribute directive in learningResourcesComponent. 
export class LogDirective {
  loggedData = input<string>();
  private elementRef = inject(ElementRef);

  onLog() {
    console.log("Clicked: ", this.elementRef, this.loggedData());
  }
}
