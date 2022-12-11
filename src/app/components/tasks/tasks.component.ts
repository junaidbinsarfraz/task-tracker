import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/models/task';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit {
  tasks: Task[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.getTasks();
  }

  deleteTask(task: Task) {
    this.taskService.deleteTask(task).subscribe(() => {
      this.getTasks();
    });
  }

  toggleReminder(task: Task) {
    task.reminder = !task.reminder;
    this.taskService.updateTask(task).subscribe(() => this.getTasks());
  }

  addTask(task: Task) {
    this.taskService.addTask(task).subscribe(() => this.getTasks());
  }

  private getTasks() {
    this.taskService.getTasks().subscribe((tasks) => {
      this.tasks = tasks;
    });
  }
}
