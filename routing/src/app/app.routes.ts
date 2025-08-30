import { Routes } from "@angular/router";
import { TaskComponent } from "./tasks/task/task.component";
import { NoTaskComponent } from "./tasks/no-task/no-task.component";
import { UserTasksComponent } from "./users/user-tasks/user-tasks.component";
import { NewTaskComponent } from "./tasks/new-task/new-task.component";
import { TasksComponent } from "./tasks/tasks.component";

export const routes: Routes = [
  {
    path: "", // <domain>/
    component: NoTaskComponent,
  },
  {
    path: "users/:userId",
    component: UserTasksComponent,
    children: [
      {
        path: "tasks", // <domain>/tasks
        component: TasksComponent,
      },
      {
        path: "tasks/new",
        component: NewTaskComponent,
      },
    ],
  },
  {
    path: "**", // <domain>/anything-else
    component: NoTaskComponent,
  },
];
