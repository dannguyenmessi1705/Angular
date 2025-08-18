import { Component, signal } from "@angular/core";
import { Header } from "./header/header";
import { User } from "./user/user";
import { DUMMY_USERS } from "./dummy-user";
import { Tasks } from "./tasks/tasks";

@Component({
  selector: "app-root",
  imports: [Header, User, Tasks],
  templateUrl: "./app.html",
  styleUrl: "./app.css",
})
export class App {
  protected readonly title = signal("first-app1");
  users = DUMMY_USERS; // Cung cấp dữ liệu động vào html
  selectedUserId?: string; // Biến để lưu trữ id của người dùng đã chọn

  get selectedUser() {
    return this.users.find((u) => u.id === this.selectedUserId);
  }

  onSelectUser(id: string) {
    this.selectedUserId = id; // Cập nhật id của người dùng đã chọn
  }
}
