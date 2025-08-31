import { Component, inject, input } from "@angular/core";
import { DatePipe } from "@angular/common";

import { type Task } from "./task.model";
import { CardComponent } from "../../shared/card/card.component";
import { TasksService } from "../tasks.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-task",
  standalone: true,
  templateUrl: "./task.component.html",
  styleUrl: "./task.component.css",
  imports: [DatePipe, CardComponent],
})
export class TaskComponent {
  task = input.required<Task>();
  private tasksService = inject(TasksService);
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);

  onComplete() {
    this.tasksService.removeTask(this.task().id);
    this.router.navigate(["./"], {
      // Điều hướng đến route hiện tại
      relativeTo: this.activatedRoute, // Tương đối với route hiện tại
      onSameUrlNavigation: "reload", // Tải lại trang nếu cùng URL
      queryParamsHandling: "preserve", // Giữ nguyên các tham số truy vấn
    });
  }
}
