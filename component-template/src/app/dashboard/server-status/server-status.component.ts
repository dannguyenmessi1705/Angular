import { Component, OnInit, OnDestroy } from "@angular/core";

@Component({
  selector: "app-server-status",
  standalone: true,
  imports: [],
  templateUrl: "./server-status.component.html",
  styleUrl: "./server-status.component.css",
})
export class ServerStatusComponent implements OnInit, OnDestroy {
  currentStatus: "online" | "offline" | "unknown" = "online";
  private interval?: ReturnType<typeof setInterval>;

  ngOnInit() {
    this.interval = setInterval(() => {
      const rnd = Math.random();
      if (rnd < 0.5) {
        this.currentStatus = "online";
      } else if (rnd < 0.9) {
        this.currentStatus = "offline";
      } else this.currentStatus = "unknown";
    }, 1000);
  }

  ngAfterViewInit() {
    console.log("AFTER VIEW INIT");
  } // sau khi view đã được khởi tạo

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }
}
