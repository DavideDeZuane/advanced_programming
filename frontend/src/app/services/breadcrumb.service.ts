import { Injectable } from '@angular/core';

interface Breadcrumb {
  label: string;
  url: string;
}

@Injectable({
  providedIn: 'root'
})
class BreadcrumbService {
  private breadcrumbs: Breadcrumb[] = [];

  constructor() { }


  getBreadcrumbs(): Breadcrumb[] {
    return this.breadcrumbs;
  }

  addBreadcrumb(label: string, url: string): void {
    const breadcrumb: Breadcrumb = { label, url };
    this.breadcrumbs.push(breadcrumb);
  }

  removeBreadcrumb(index: number): void {
    this.breadcrumbs.splice(index, 1);
  }

  clearBreadcrumbs(): void {
    this.breadcrumbs = [];
  }
  
}

export {BreadcrumbService, Breadcrumb}