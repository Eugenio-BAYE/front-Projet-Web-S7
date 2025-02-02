import { Type } from "@angular/core";

export interface ComponentNavItem {
    label: string;
    component: Type<any>;
  }