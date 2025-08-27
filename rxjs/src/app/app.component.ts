import { Component, DestroyRef, inject, OnInit, signal } from "@angular/core";
import { toObservable, toSignal } from "@angular/core/rxjs-interop";
import { interval, map } from "rxjs";

@Component({
  selector: "app-root",
  standalone: true,
  templateUrl: "./app.component.html",
})
export class AppComponent implements OnInit {
  private destroyRef = inject(DestroyRef);
  count = signal(0);
  clickCount$ = toObservable(this.count);
  interval$ = interval(1000);
  interval = toSignal(this.interval$, {
    initialValue: 0,
  });
  ngOnInit(): void {
    // const subcription = interval(1000)
    //   .pipe(
    //     map((value) => value * 2) // Tăng giá trị lên 2
    //   ) // Pipe có vai trò biến đổi dữ liệu
    //   .subscribe({
    //     // Phát ra giá trị mỗi 1000ms
    //     next: (value) => {
    //       console.log(value);
    //       this.count.set(value);
    //     }, // Xử lý giá trị tiếp theo
    //     complete: () => console.log("Completed"), // Xử lý khi hoàn thành
    //     error: (err) => console.log("Error: ", err), // Xử lý lỗi
    //   });
    // this.destroyRef.onDestroy(() => {
    //   subcription.unsubscribe(); // Hủy đăng ký khi component bị hủy
    // });

    const subscription = this.clickCount$.subscribe({
      next: (value) => {
        console.log("Current count:", value);
      },
      complete: () => console.log("Completed"),
      error: (err) => console.log("Error: ", err),
    });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
}
