import { Component, OnInit } from '@angular/core';
import { BreadcrumbService, Breadcrumb } from './services/breadcrumb.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';
  breadcrumbs: Breadcrumb[];

  constructor(private breadcrumbService: BreadcrumbService) { this.breadcrumbs = [] }

  ngOnInit(): void {
    this.breadcrumbService.addBreadcrumb('Home', '/');
    this.breadcrumbs = this.breadcrumbService.getBreadcrumbs();
  
  }
}
