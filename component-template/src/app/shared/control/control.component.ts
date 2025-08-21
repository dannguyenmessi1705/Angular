import {
  afterNextRender,
  afterRender,
  Component,
  contentChild,
  ContentChild,
  ElementRef,
  inject,
  input,
  ViewEncapsulation,
} from "@angular/core";

@Component({
  selector: "app-control",
  standalone: true,
  imports: [],
  templateUrl: "./control.component.html",
  styleUrl: "./control.component.css",
  encapsulation: ViewEncapsulation.None,
})
export class ControlComponent {
  title = input.required<string>();
  private el = inject(ElementRef);
  @ContentChild("content") private control?: ElementRef<
    HTMLInputElement | HTMLTextAreaElement
  >;

  constructor() {
    afterRender(() => {
      console.log("after render");
    });

    afterNextRender(() => {
      console.log("after next render");
    });
  }

  private control2 =
    contentChild<ElementRef<HTMLInputElement | HTMLTextAreaElement>>("content");

  onClick() {
    console.log("Control clicked");
    console.log("Host element:", this.el);
    console.log("Control value:", this.control?.nativeElement.value);
    console.log("Control2 value:", this.control2()?.nativeElement.value);
  }
}
