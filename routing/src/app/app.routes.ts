import {
  CanMatchFn,
  RedirectCommand,
  Route,
  Router,
  Routes,
  UrlSegment,
} from "@angular/router";
import { TaskComponent } from "./tasks/task/task.component";
import { NoTaskComponent } from "./tasks/no-task/no-task.component";
import {
  titleResolver,
  userNameResolver,
  UserTasksComponent,
} from "./users/user-tasks/user-tasks.component";
import {
  canDeactivatePage,
  NewTaskComponent,
} from "./tasks/new-task/new-task.component";
import { TasksComponent } from "./tasks/tasks.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { inject } from "@angular/core";

const canAccessPage: CanMatchFn = (route: Route, segments: UrlSegment[]) => {
  const router = inject(Router);
  const rand = Math.random();
  if (rand < 0.5) {
    return true; // Cho phép truy cập
  }
  return new RedirectCommand(router.parseUrl("/unauthorized")); // Chuyển hướng đến trang khác nếu không đủ quyền truy cập
};

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
    title: titleResolver,
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
        runGuardsAndResolvers: "always",
        canMatch: [canAccessPage],
      },
      {
        path: "tasks/new",
        component: NewTaskComponent,
        canDeactivate: [canDeactivatePage],
      },
    ],
  },
  {
    path: "**", // <domain>/anything-else
    component: NotFoundComponent,
  },
];
