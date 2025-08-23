import { Directive } from "@angular/core";

@Directive({
  selector: "a[appSafeLink]",
  standalone: true,
  host: {
    "(click)": "confirmToLeave($event)",
  },
})
export class SafeLinkDirective {
  constructor() {
    console.log("SafeLinkDirective initialized");
  }

  confirmToLeave(event: MouseEvent) {
    const isConfirm = window.confirm("Do you want to leave this page?"); // Hiển thị hộp thoại xác nhận

    if (isConfirm) return; // Người dùng xác nhận, cho phép chuyển hướng

    event.preventDefault(); // Ngăn chặn chuyển hướng
  }
}
