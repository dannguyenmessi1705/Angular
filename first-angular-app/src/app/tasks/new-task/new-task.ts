import { Component, EventEmitter, Input, Output, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { NewTaskModel } from "../newTasks.model";
import { TaskService } from "../tasks.service";

@Component({
  selector: "app-new-task",
  imports: [FormsModule],
  templateUrl: "./new-task.html",
  styleUrl: "./new-task.css",
})
export class NewTask {
  constructor(private taskService: TaskService) {}

  @Output() close = new EventEmitter<void>();
  @Input() userId!: string; // Nhận userId từ component cha để thêm task cho người dùng cụ thể

  enteredTitle = signal<string>("");
  enteredSummary = signal<string>("");
  enteredDueDate = signal<string>("");

  onCancel() {
    this.close.emit();
  }
  onSubmit() {
    this.taskService.addTask(
      {
        title: this.enteredTitle(),
        summary: this.enteredSummary(),
        date: this.enteredDueDate(),
      },
      this.userId
    );
    this.close.emit(); // Phát ra sự kiện cancel để thông báo component cha rằng việc thêm task đã hoàn thành
  }
}

/**
 * FormsModule: sử dụng các thư viện để làm việc với form trong Angular
 * * ngModel: directive cho phép hai chiều dữ liệu binding giữa form và component (ví dụ: hiển thị giá trị trong input và cập nhật giá trị trong component khi người dùng nhập). Để sử dụng ngModel, cần import FormsModule từ @angular/forms và trong template HTML, sử dụng cú pháp [(ngModel)]="biến" để liên kết biến trong component với input. Nên sử dụng kết hợp với tín hiệu (signal) để cập nhật giá trị mỗi khi UI thay đổi.
 * * ngSubmit: directive để xử lý sự kiện khi form được submit. Trong template, có thể sử dụng (ngSubmit)="hàm()" để gọi hàm trong component khi form được submit. <form (ngSubmit)="onSubmit()">
 * * ngModelChange: sự kiện được kích hoạt khi giá trị của ngModel thay đổi. Có thể sử dụng (ngModelChange)="hàm($event)" để nhận giá trị mới từ ngModel và thực hiện các hành động cần thiết trong component. <input [(ngModel)]="biến" (ngModelChange)="onValueChange($event)">
 * * ngModelGroup: directive để nhóm các ngModel lại với nhau, thường dùng trong các form phức tạp hơn. Trong template, có thể sử dụng <div ngModelGroup="tên nhóm"> để nhóm các ngModel lại với nhau. Ví dụ: <div ngModelGroup="taskDetails"> <input [(ngModel)]="task.title"> </div>
 * * ngForm: directive đại diện cho một form trong Angular, có thể sử dụng để truy cập các thuộc tính và phương thức của form như valid, invalid, dirty, pristine, v.v. Trong template, có thể sử dụng #form="ngForm" để tạo một biến đại diện cho form và truy cập các thuộc tính của nó. Ví dụ: <form #form="ngForm" (ngSubmit)="onSubmit(form)"> <input [(ngModel)]="task.title" name="title"> </form>
 */
