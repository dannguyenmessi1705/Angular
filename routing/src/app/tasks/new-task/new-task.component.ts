import { Component, inject, input, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { TasksService } from "../tasks.service";
import { Router, RouterLink } from "@angular/router";

@Component({
  selector: "app-new-task",
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: "./new-task.component.html",
  styleUrl: "./new-task.component.css",
})
export class NewTaskComponent {
  userId = input.required<string>();
  enteredTitle = signal("");
  enteredSummary = signal("");
  enteredDate = signal("");
  private tasksService = inject(TasksService);
  private route = inject(Router);

  onSubmit() {
    this.tasksService.addTask(
      {
        title: this.enteredTitle(),
        summary: this.enteredSummary(),
        date: this.enteredDate(),
      },
      this.userId()
    );
    this.route.navigate(["/users", this.userId(), "tasks"], {
      replaceUrl: true, // Thay thế URL hiện tại (không thêm vào lịch sử, và người dùng không thể quay lại trang trước đó)
    });
  }
}
