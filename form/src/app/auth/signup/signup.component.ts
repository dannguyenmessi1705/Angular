import { Component } from "@angular/core";
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";

function equalPassword(control: AbstractControl) {
  // const { password, confirmPassword } = control.value;
  const password = control.get("password")?.value; // Nên dùng cách này
  const confirmPassword = control.get("confirmPassword")?.value; // Nên dùng cách này

  console.log(password, confirmPassword);
  if (password !== confirmPassword) {
    return { notMatching: true };
  }
  return null;
}

@Component({
  selector: "app-signup",
  standalone: true,
  templateUrl: "./signup.component.html",
  styleUrl: "./signup.component.css",
  imports: [ReactiveFormsModule],
})
export class SignupComponent {
  form = new FormGroup({
    email: new FormControl("", {
      validators: [Validators.required, Validators.email],
    }),
    passwords: new FormGroup(
      {
        password: new FormControl("", {
          validators: [Validators.required, Validators.minLength(6)],
        }),
        confirmPassword: new FormControl("", {
          validators: [Validators.required, Validators.minLength(6)],
        }),
      },
      {
        validators: [equalPassword],
      }
    ),
    firstName: new FormControl("", {
      validators: [Validators.required],
    }),
    lastName: new FormControl("", {
      validators: [Validators.required],
    }),
    address: new FormGroup({
      street: new FormControl("", {
        validators: [Validators.required],
      }),
      number: new FormControl("", {
        validators: [Validators.required],
      }),
      postalCode: new FormControl("", {
        validators: [Validators.required],
      }),
      city: new FormControl("", {
        validators: [Validators.required],
      }),
    }),
    role: new FormControl<
      "student" | "teacher" | "employee" | "founder" | "other"
    >("student", {
      validators: [Validators.required],
    }),
    source: new FormArray([
      new FormControl(false),
      new FormControl(false),
      new FormControl(false),
    ]),
    agree: new FormControl(false, {
      validators: [Validators.requiredTrue],
    }),
  });

  onSubmit() {
    console.log(this.form.value);
  }

  onReset() {
    this.form.reset();
  }
}
