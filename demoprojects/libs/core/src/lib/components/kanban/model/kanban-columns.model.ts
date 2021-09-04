export class KanbanColumns {
  name: string | undefined;
  items: Array<string> | undefined;
  templateRef?: any;

  constructor(name: string, items: string[]);
  constructor(name: string, items: string[], templateRef: any);
  constructor(name?: string, items?: string[], templateRef?: any) {
    this.name = name;
    this.items = items;
    this.templateRef = templateRef;
  }
}
