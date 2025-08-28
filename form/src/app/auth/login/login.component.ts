import { Component } from "@angular/core";
import { FormsModule, NgForm } from "@angular/forms";

@Component({
  selector: "app-login",
  standalone: true,
  templateUrl: "./login.component.html",
  styleUrl: "./login.component.css",
  imports: [FormsModule],
})
export class LoginComponent {
  onSubmit(form: NgForm) {
    const enteredEmail = form.form.value.email;
    const enteredPassword = form.form.value.password;

    if (form.invalid) {
      return;
    }
    console.log("Email:", enteredEmail);
    console.log("Password:", enteredPassword);
  }
}
