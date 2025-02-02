import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ComponentNavItem } from 'src/app/models/components-nav';

@Component({
  selector: 'app-component-button-panel',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    CommonModule,
  ],
  templateUrl: './component-button-panel.component.html',
  styleUrl: './component-button-panel.component.css'
})

export class ComponentButtonPanelComponent {
  // TODO : (Optional) Check if the ComponentNavItems is not empty
  @Input() ComponentNavItems: ComponentNavItem[] = [];

  activeComponent: ComponentNavItem | null = null;

  setActiveComponent(component: ComponentNavItem) {
    this.activeComponent = component;
    console.log(this.activeComponent);
  }

  ngOnInit() {
    if (this.ComponentNavItems.length > 0) {
      this.activeComponent = this.ComponentNavItems[0];
    }
    else {
      console.log('ComponentNavItems is empty');
    }
  }
}
