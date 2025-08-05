import {
  Component,
  computed,
  EventEmitter,
  input,
  Input,
  output,
  Output,
  signal,
} from "@angular/core";
import { type UserModel } from "./user.model";
// import { DUMMY_USERS } from "../dummy-user";

// const randomIndex = Math.floor(Math.random() * DUMMY_USERS.length);

@Component({
  selector: "app-user",
  imports: [],
  templateUrl: "./user.html",
  styleUrl: "./user.css",
})
export class User {
  // selectedUser = signal(DUMMY_USERS[randomIndex]); // signal dùng để lưu trữ trạng thái người dùng đã chọn, trong html để lấy ra các phương thức của signal thì cần gọi () để lấy ra giá trị
  // imagePath = computed(() => this.selectedUser().avatar); // computed để lấy ra trạng thái của signal khi có sự thay đổi, trong html để lấy ra các phương thức của signal thì cần gọi () để lấy ra giá trị

  // @Input({ required: true }) avatar!: string; // @Input() dùng để thêm attribute vào thẻ selector của nó <app-user>, các thuộc tính này sẽ được truyền từ component cha xuống component con (và chỉ có thể đọc, không thể ghi), trong html để lấy ra chỉ cần gọi avatar
  // @Input({ required: true }) name!: string; //// @Input() dùng để thêm attribute vào thẻ selector của nó <app-user>, các thuộc tính này sẽ được truyền từ component cha xuống component con (và chỉ có thể đọc, không thể ghi), trong html để lấy ra chỉ cần gọi name
  // @Input({ required: true }) id!: string; // @Input() dùng để thêm attribute vào thẻ selector của nó <app-user>, các thuộc tính này sẽ được truyền từ component cha xuống component con (và chỉ có thể đọc, không thể ghi), trong html để lấy ra chỉ cần gọi id
  @Input({ required: true }) user!: UserModel;
  @Input() selected!: boolean; // Biến để lưu trữ trạng thái người dùng đã chọn, trong html để lấy ra chỉ cần gọi selected
  @Output() select = new EventEmitter<string>(); // @Output() dùng để thêm 1 sự kiện vào thẻ selector của nó <app-user>, <app-user (select)="onSelectUser($event)">, các sự kiện này sẽ được phát ra từ component con và được lắng nghe bởi component cha, nếu cần truyền dữ liệu từ component con sang component cha thì cần thêm $event vào trong hàm của cha (để giữ giá trị của sự kiện)

  // select = output<string>(); // output() là phương thức của signal, dùng để thêm sự kiện vào thẻ selector của nó <app-user>, các sự kiện này sẽ được phát ra từ component con và được lắng nghe bởi component cha, nếu cần truyền dữ liệu từ component con sang component cha thì cần thêm $event vào trong hàm của cha (để giữ giá trị của sự kiện)

  get imagePath() {
    return this.user.avatar;
  } // get để lấy ra giá trị của avatar (trong html chỉ cần gọi imagePath)

  // avatar = input.required<string>(); // input() là phương thức của signal, dùng để thêm attribute vào thẻ selector của nó <app-user>, các thuộc tính này sẽ được truyền từ component cha xuống component con (và chỉ có thể đọc, không thể ghi), trong html để lấy ra chỉ cần thêm () để lấy ra giá trị của signal
  // name = input.required<string>(); // input() là phương thức của signal, dùng để thêm attribute vào thẻ selector của nó <app-user>, các thuộc tính này sẽ được truyền từ component cha xuống component con (và chỉ có thể đọc, không thể ghi), trong html để lấy ra chỉ cần thêm () để lấy ra giá trị của signal

  onSelectUser() {
    // on - sự kiện khi người dùng click vào nút, trong html để gọi hàm cần thêm ()
    this.select.emit(this.user.id); // emit() để phát ra sự kiện, trong hàm này sẽ phát ra sự kiện select và truyền id của người dùng đã chọn, trong html để gọi hàm cần thêm () để lấy ra giá trị của signal
  }
}
