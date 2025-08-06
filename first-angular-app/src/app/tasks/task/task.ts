import { Component, EventEmitter, Input, Output } from "@angular/core";
import { type TaskModel } from "./task.model";
import { Card } from "../../shared/card/card";

@Component({
  selector: "app-task",
  imports: [Card],
  templateUrl: "./task.html",
  styleUrl: "./task.css",
})
export class Task {
  @Input({ required: true }) task!: TaskModel; // @Input() dùng để thêm attribute vào thẻ selector của nó <app-task>, các thuộc tính này sẽ được truyền từ component cha xuống component con (và chỉ có thể đọc, không thể ghi), trong html để lấy ra chỉ cần gọi task
  @Output() complete = new EventEmitter<string>(); // @Output() dùng để thêm 1 sự kiện vào thẻ selector của nó <app-task>, <app-task (complete)="onCompleteTask($event)">, các sự kiện này sẽ được phát ra từ component con và được lắng nghe bởi component cha, nếu cần truyền dữ liệu từ component con sang component cha thì cần thêm $event vào trong hàm của cha (để giữ giá trị của sự kiện)

  onClickComplete() {
    this.complete.emit(this.task.id); // emit() để phát ra sự kiện, trong hàm này sẽ phát ra sự kiện complete và truyền id của task đã hoàn thành, trong html để gọi hàm cần thêm () để lấy ra giá trị của signal
  }
}
