import { Injectable } from "@angular/core";
import { dummyTasks } from "../dummy-task";
import { type TaskModel } from "./task/task.model";
import { type NewTaskModel } from "./newTasks.model";

@Injectable({
  providedIn: "root",
})
export class TaskService {
  private tasks: TaskModel[] = [];

  constructor() {
    const taskJson = localStorage.getItem("tasks");
    if (taskJson) {
      this.tasks = JSON.parse(taskJson);
    } else {
      this.tasks = dummyTasks; // Initialize with dummy tasks if no tasks in localStorage
    }
  }

  selectedUserTasks(userId: string): TaskModel[] {
    return this.tasks.filter((task) => task.userId === userId);
  }

  removeTask(taskId: string): void {
    this.tasks = this.tasks.filter((task) => task.id !== taskId);
    this.saveTasks(); // Save tasks to localStorage after removing a task
  }

  addTask(newTask: NewTaskModel, userId: string): void {
    const task: TaskModel = {
      id: new Date().getTime().toString(),
      title: newTask.title,
      summary: newTask.summary,
      dueDate: newTask.date,
      userId, // Assuming userId is part of NewTaskModel
    };
    this.tasks.unshift(task);
    this.saveTasks(); // Save tasks to localStorage after adding a new task
  }

  private saveTasks(): void {
    localStorage.setItem("tasks", JSON.stringify(this.tasks));
  }
}
