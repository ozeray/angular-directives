import {
  Directive,
  ElementRef,
  HostListener,
  inject,
  input,
} from '@angular/core';

/* If you are using ngModule, set standalone = false and add this 
directive to the directives array of the module. */
/* This directive is an attribute directive */
@Directive({
  selector: 'a[appSafeLink]',
  standalone: true,
  host: {
    '(click)': 'onPageLeave($event)',
  },
})
export class SafeLinkDirective {
  // Old way:
  //   @HostListener('click')
  //   linkClicked() {
  //     const answer = confirm('Are you sure?');
  //     return answer;
  //   }

  queryParam = input('myapp', { alias: 'appSafeLink' });
  hostElement = inject<ElementRef<HTMLAnchorElement>>(ElementRef);

  constructor() {
    // console.log('SafeLink directive is active.');
  }

  onPageLeave(event: MouseEvent) {
    const answer = window.confirm('Sure?');

    if (answer) {
      // const addr = (event.target as HTMLAnchorElement).href;
      // (event.target as HTMLAnchorElement).href = addr + '?from=' + this.queryParam();
      // Same, but using elementRef:
      const addr = this.hostElement.nativeElement.href;
      this.hostElement.nativeElement.href = addr + '?from=' + this.queryParam();

      return;
    }

    event.preventDefault();
  }
}
