import { Component, Input } from "@angular/core";
import { Task } from "./task/task";
import { dummyTasks } from "../dummy-task";
import { NewTask } from "./new-task/new-task";
import { NewTaskModel } from "./newTasks.model";
import { TaskModel } from "./task/task.model";

@Component({
  selector: "app-tasks",
  imports: [Task, NewTask],
  templateUrl: "./tasks.html",
  styleUrl: "./tasks.css",
})
export class Tasks {
  @Input({ required: true }) id!: string; // @Input() dùng để thêm attribute vào thẻ selector của nó <app-tasks>, các thuộc tính này sẽ được truyền từ component cha xuống component con (và chỉ có thể đọc, không thể ghi), trong html để lấy ra chỉ cần gọi id
  @Input({ required: true }) name!: string; // @Input() dùng để thêm attribute vào thẻ selector của nó <app-tasks>, các thuộc tính này sẽ được truyền từ component cha xuống component con (và chỉ có thể đọc, không thể ghi), trong html để lấy ra chỉ cần gọi name

  tasks = dummyTasks; // Cung cấp dữ liệu động vào html, trong html để lấy ra chỉ cần gọi tasks
  addingTask = false;

  get selectedUserTasks() {
    return this.tasks.filter((t) => t.userId === this.id); // Lọc các task theo userId, trong html để lấy ra chỉ cần gọi selectedUserTasks
  }

  onCompleteTask(taskId: string) {
    this.tasks = this.tasks.filter((t) => t.id !== taskId); // Xóa task khi hoàn thành
  }
  onAddingTask() {
    this.addingTask = true; // Cập nhật trạng thái để hiển thị form thêm task mới
  }
  onCancelAddTask() {
    this.addingTask = false;
  }
  onSubmitNewTask(newTask: NewTaskModel) {
    const task: TaskModel = {
      id: new Date().getTime().toString(),
      title: newTask.title,
      summary: newTask.summary,
      dueDate: newTask.date,
      userId: this.id, // Gán userId từ component cha
    };
    this.tasks.unshift(task); // Thêm task mới vào đầu danh sách
    this.addingTask = false; // Đặt lại trạng thái để ẩn form thêm
  }
}
