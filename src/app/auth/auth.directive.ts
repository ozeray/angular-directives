import { Directive, effect, inject, input, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthService } from './auth.service';
import { Permission } from './auth.model';

@Directive({
  selector: '[appAuth]',
  standalone: true
})
export class AuthDirective {
  private authService = inject(AuthService);
  userType = input.required<Permission>({alias: 'appAuth'});
  private viewContainerRef = inject<ViewContainerRef>(ViewContainerRef);
  private templateRef = inject<TemplateRef<ViewContainerRef>>(TemplateRef);

  constructor() { 
    effect(() => {
      if (this.authService.activePermission() === this.userType()) {
        this.viewContainerRef.createEmbeddedView(this.templateRef);
        // console.log("show element");
      } else {
        this.viewContainerRef.clear();
        // console.log("don't show element");
      }
    })
  }

}
