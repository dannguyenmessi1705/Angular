import { Component, DestroyRef, inject, OnInit } from "@angular/core";
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { debounceTime, delay, map, of } from "rxjs";

function mustContainQuestionMark(control: AbstractControl) {
  if (control.value.includes("?")) {
    return null; // Valid
  }
  return { notContainQuestionMark: true }; // Invalid
}

function isNotDuplicate(control: AbstractControl) {
  const email = control.value;
  return of(email).pipe(
    delay(1000), // Giả lập đang gọi đến backend check trùng (trễ 1s)
    map((email) => {
      if (email === "messiprohy@gmail.com") return { isDuplicate: true };
      return null;
    })
  );
}

/**
 * Dùng init set vào FormControl
 * */
let initialEmailValue = "";
const savedForm = window.localStorage.getItem("saved-login-form");

if (savedForm) {
  const loadedForm = JSON.parse(savedForm);
  initialEmailValue = loadedForm.email;
}
@Component({
  selector: "app-login",
  standalone: true,
  templateUrl: "./login.component.html",
  styleUrl: "./login.component.css",
  imports: [ReactiveFormsModule],
})
export class LoginComponent implements OnInit {
  destroyRef = inject(DestroyRef);

  form = new FormGroup({
    email: new FormControl(initialEmailValue, {
      validators: [Validators.required, Validators.email],
      asyncValidators: [isNotDuplicate],
    }),
    password: new FormControl("", {
      validators: [
        Validators.required,
        Validators.minLength(6),
        mustContainQuestionMark,
      ],
    }),
  });

  get isValidEmail() {
    return (
      this.form.controls.email.touched &&
      this.form.controls.email.dirty &&
      this.form.controls.email.invalid
    );
  }

  get isValidPassword() {
    return (
      this.form.controls.password.touched &&
      this.form.controls.password.dirty &&
      this.form.controls.password.invalid
    );
  }

  ngOnInit(): void {
    /** Dùng patchValue */
    // const savedForm = window.localStorage.getItem("saved-login-form");

    // if (savedForm) {
    //   const loadedForm = JSON.parse(savedForm);
    //   this.form.patchValue({
    //     email: loadedForm.email,
    //   });
    // }
    const sub = this.form.valueChanges.pipe(debounceTime(500)).subscribe({
      next: (value) => {
        window.localStorage.setItem(
          "saved-login-form",
          JSON.stringify({ email: value.email })
        );
      },
    });
    this.destroyRef.onDestroy(() => {
      sub.unsubscribe();
    });
  }

  onSubmit() {
    console.log(this.form.value);
  }
}
