import { Routes } from "@angular/router";
import { TaskComponent } from "./tasks/task/task.component";
import { NoTaskComponent } from "./tasks/no-task/no-task.component";
import {
  userNameResolver,
  UserTasksComponent,
} from "./users/user-tasks/user-tasks.component";
import { NewTaskComponent } from "./tasks/new-task/new-task.component";
import { TasksComponent } from "./tasks/tasks.component";
import { NotFoundComponent } from "./not-found/not-found.component";

export const routes: Routes = [
  {
    path: "", // <domain>/
    component: NoTaskComponent,
  },
  {
    path: "users/:userId",
    component: UserTasksComponent,
    data: { title: "User Tasks" },
    resolve: {
      userNameRes: userNameResolver,
    },
    runGuardsAndResolvers: "always",
    children: [
      {
        path: "", // <domain>/users/:userId
        redirectTo: "tasks", // Chuyển hướng đến <domain>/users/:userId/tasks
        pathMatch: "prefix", // So khớp với phần đầu của URL
      },
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
    component: NotFoundComponent,
  },
];
