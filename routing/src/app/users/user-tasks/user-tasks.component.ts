import {
  Component,
  computed,
  DestroyRef,
  inject,
  Input,
  input,
  OnInit,
} from "@angular/core";
import { UsersService } from "../users.service";
import { ActivatedRoute, RouterLink, RouterOutlet } from "@angular/router";

@Component({
  selector: "app-user-tasks",
  standalone: true,
  templateUrl: "./user-tasks.component.html",
  styleUrl: "./user-tasks.component.css",
  imports: [RouterOutlet, RouterLink],
})
export class UserTasksComponent implements OnInit {
  private userService = inject(UsersService);
  // userId = input.required<string>();
  // username = computed(
  //   () => this.userService.users.find((u) => u.id === this.userId()?.name
  // );

  username: string = "";
  private destroyRef = inject(DestroyRef);
  private activatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    console.log(this.activatedRoute);
    const sub = this.activatedRoute.params.subscribe({
      next: (params) => {
        this.username =
          this.userService.users.find((u) => u.id === params["userId"])?.name ??
          "";
      },
    });
    this.destroyRef.onDestroy(() => sub.unsubscribe());
  }
}
