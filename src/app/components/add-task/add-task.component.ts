import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Task } from 'src/app/models/task';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
})
export class AddTaskComponent implements OnInit {
  @Output() onAddTask: EventEmitter<Task> = new EventEmitter();

  showAddTask!: boolean;
  subscription!: Subscription;

  taskForm = new FormGroup<any>({
    id: new FormControl<number | null>(null),
    text: new FormControl<string | null>(null),
    day: new FormControl<string | null>(null),
    reminder: new FormControl<boolean | null>(false),
  });

  constructor(private uiService: UiService) {}

  ngOnInit(): void {
    this.subscription = this.uiService.onToggle().subscribe((value) => {
      this.showAddTask = value;
      this.taskForm.reset();
    });
  }

  onSubmit() {
    if (this.taskForm.valid) {
      let task: Task = this.taskForm.value;
      task.id = Math.floor(Math.random() * 100) + 1;

      this.onAddTask.emit(task);
      this.uiService.toggleAddTask();
    }
  }
}
