import {
  Directive,
  effect,
  inject,
  input,
  TemplateRef,
  ViewContainerRef,
} from "@angular/core";
import { AuthService } from "./auth.service";
import { Permission } from "./auth.model";

@Directive({
  selector: "[appAuth]",
  standalone: true,
})
export class AuthDirective {
  private authService = inject(AuthService);
  userType = input.required<Permission>({ alias: "appAuth" });
  hostTemplateRef = inject(TemplateRef); // Tham chiếu đến TemplateRef của thẻ <ng-template>
  viewContainerRef = inject(ViewContainerRef); // Tham chiếu đến ViewContainerRef (các phần tử con) của thẻ <ng-template>
  constructor() {
    effect(() => {
      if (this.authService.activePermission() === this.userType()) {
        console.log("Render Element");
        this.viewContainerRef.createEmbeddedView(this.hostTemplateRef); // Hiển thị phần tử con bên trong thẻ <ng-template>
      } else {
        console.log("Do Not Render Element");
        this.viewContainerRef.clear(); // Xóa phần tử con bên trong thẻ <ng-template> nếu điều kiện không đúng
      }
    });
  }
}
