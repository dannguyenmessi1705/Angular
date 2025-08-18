import { Component, Input } from "@angular/core";
import { Task } from "./task/task";
import { dummyTasks } from "../dummy-task";
import { NewTask } from "./new-task/new-task";
import { NewTaskModel } from "./newTasks.model";
import { TaskModel } from "./task/task.model";
import { TaskService } from "./tasks.service";

@Component({
  selector: "app-tasks",
  imports: [Task, NewTask],
  templateUrl: "./tasks.html",
  styleUrl: "./tasks.css",
})
export class Tasks {

  constructor(private taskService: TaskService) {}

  @Input({ required: true }) id!: string; // @Input() dùng để thêm attribute vào thẻ selector của nó <app-tasks>, các thuộc tính này sẽ được truyền từ component cha xuống component con (và chỉ có thể đọc, không thể ghi), trong html để lấy ra chỉ cần gọi id
  @Input({ required: true }) name!: string; // @Input() dùng để thêm attribute vào thẻ selector của nó <app-tasks>, các thuộc tính này sẽ được truyền từ component cha xuống component con (và chỉ có thể đọc, không thể ghi), trong html để lấy ra chỉ cần gọi name

  tasks = dummyTasks; // Cung cấp dữ liệu động vào html, trong html để lấy ra chỉ cần gọi tasks
  addingTask = false;

  get selectedUserTasks() {
    return this.taskService.selectedUserTasks(this.id); // Lấy danh sách task của người dùng hiện tại
  }

  onCompleteTask(taskId: string) {
    this.taskService.removeTask(taskId);
  }

  onAddingTask() {
    this.addingTask = true; // Cập nhật trạng thái để hiển thị form thêm task mới
  }

  onCloseAddTask() {
    this.addingTask = false;
  }
}
