import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  showAddTask!: boolean;
  subscription!: Subscription;

  constructor(private uiService: UiService) {}

  ngOnInit(): void {
    this.subscription = this.uiService.onToggle().subscribe((value) => {
      this.showAddTask = value;
    });
  }

  toggleForm() {
    this.uiService.toggleAddTask();
  }
}
