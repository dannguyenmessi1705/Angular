import { Directive, ElementRef, inject } from "@angular/core";

@Directive({
  selector: "[appLog]",
  standalone: true,
  host: {
    "(click)": "onLog()",
  },
})
export class LogDirective {
  elementRef = inject(ElementRef);
  constructor() {}

  onLog() {
    console.log("Click");
    console.log(this.elementRef.nativeElement);
  }
}
