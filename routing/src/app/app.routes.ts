import { Routes } from "@angular/router";
import { TaskComponent } from "./tasks/task/task.component";
import { NoTaskComponent } from "./tasks/no-task/no-task.component";

export const routes: Routes = [
  {
    path: "", // <domain>/
    component: NoTaskComponent,
  },
  {
    path: "tasks", // <domain>/tasks
    component: TaskComponent,
  },
  {
    path: "**", // <domain>/anything-else
    component: NoTaskComponent,
  },
];
