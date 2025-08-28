import {
  afterNextRender,
  Component,
  DestroyRef,
  inject,
  viewChild,
} from "@angular/core";
import { FormsModule, NgForm } from "@angular/forms";
import { debounceTime } from "rxjs";

@Component({
  selector: "app-login-template",
  standalone: true,
  templateUrl: "./login1.component.html",
  styleUrl: "./login.component.css",
  imports: [FormsModule],
})
export class LoginComponent {
  formView = viewChild<NgForm>("form");
  destroyRef = inject(DestroyRef);

  constructor() {
    afterNextRender(() => {
      const jsonLogin = window.localStorage.getItem("user-login-form");

      if (jsonLogin) {
        const parseLogin = JSON.parse(jsonLogin);
        const savedEmail = parseLogin.email;
        console.log("Saved Email:", savedEmail);
        setTimeout(() => {
          this.formView()?.setValue({
            email: savedEmail || "",
            password: "", // Đặt password rỗng vì không lưu trữ password trong localStorage
          });
          // Hoặc có thể set cho từng trường riêng lẻ
          // this.formView()?.controls["email"].setValue(savedEmail || "");
        }, 1); // sử dụng setTimeout để đảm bảo rằng form đã được khởi tạo trước khi set giá trị
      }

      // sử dụng afterNextRender để đảm bảo rằng form đã được render (vì thế cần phải viewChild để lấy được thông tin form)
      const sub = this.formView()
        ?.valueChanges?.pipe(debounceTime(500)) // valueChange (lắng nghe form có thay đổi dữ liệu không => trả về 1 observables), debounceTime (chờ 500ms trước khi phát ra giá trị mới, tránh việc phát ra quá nhiều giá trị gây nghẽn)
        .subscribe({
          next: (val) =>
            window.localStorage.setItem(
              "user-login-form",
              JSON.stringify({ email: val.email })
            ),
        });

      this.destroyRef.onDestroy(() => {
        sub?.unsubscribe();
      });
    });
  }

  onSubmit(form: NgForm) {
    const enteredEmail = form.form.value.email;
    const enteredPassword = form.form.value.password;

    if (form.invalid) {
      return;
    }
    console.log("Email:", enteredEmail);
    console.log("Password:", enteredPassword);
    form.resetForm(); // Reset the form after submission
  }
}
