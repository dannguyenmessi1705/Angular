import { Directive, ElementRef, inject, input } from "@angular/core";

@Directive({
  selector: "a[appSafeLink]",
  standalone: true,
  host: {
    "(click)": "confirmToLeave($event)",
  },
})
export class SafeLinkDirective {
  queryParam = input("", { alias: "appSafeLink" }); // Tạo input với giá trị mặc định là "" và có attribute chính là "appSafeLink" để trong template có thể sử dụng luôn bằng cách <tên directive> = "<giá trị>"

  private hostElementRef = inject<ElementRef<HTMLAnchorElement>>(ElementRef); // Lấy tham chiếu đến phần tử host (ở đây là thẻ <a>)
  constructor() {
    console.log("SafeLinkDirective initialized");
  }

  confirmToLeave(event: MouseEvent) {
    const isConfirm = window.confirm("Do you want to leave this page?"); // Hiển thị hộp thoại xác nhận

    if (isConfirm) {
      // const address = (event.target as HTMLAnchorElement).href; // Lấy địa chỉ liên kết mà người dùng muốn truy cập khi nhấp vào
      // (event.target as HTMLAnchorElement).href =
      //   address + "?form=" + this.queryParam(); // Thêm tham số truy vấn vào địa chỉ liên kết

      const address = this.hostElementRef.nativeElement.href; // Lấy địa chỉ liên kết mà người dùng muốn truy cập khi nhấp vào
      this.hostElementRef.nativeElement.href =
        address + "?form=" + this.queryParam(); // Thêm tham số truy vấn vào địa chỉ liên kết

      return;
    } // Người dùng xác nhận, cho phép chuyển hướng

    event.preventDefault(); // Ngăn chặn chuyển hướng
  }
}
