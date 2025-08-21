import { Component, OnInit, OnDestroy, signal, effect } from "@angular/core";

@Component({
  selector: "app-server-status",
  standalone: true,
  imports: [],
  templateUrl: "./server-status.component.html",
  styleUrl: "./server-status.component.css",
})
export class ServerStatusComponent implements OnInit, OnDestroy {
  currentStatus = signal<"online" | "offline" | "unknown">("online");
  private interval?: ReturnType<typeof setInterval>;

  constructor() {
    console.log("No change", this.currentStatus());

    effect(() => {
      console.log(
        "Status changed when signal change by effect:",
        this.currentStatus()
      );
    });
  }

  ngOnInit() {
    this.interval = setInterval(() => {
      const rnd = Math.random();
      if (rnd < 0.5) {
        this.currentStatus.set("online");
      } else if (rnd < 0.9) {
        this.currentStatus.set("offline");
      } else this.currentStatus.set("unknown");
    }, 1000);
  }

  ngAfterViewInit() {
    console.log("AFTER VIEW INIT");
  } // sau khi view đã được khởi tạo

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }
}
