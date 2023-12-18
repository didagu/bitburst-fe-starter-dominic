export type Item = {
  id: string;
  title: string;
  createdAt: string;
  completed: boolean;
}

export type State = {
  items: Array<Item>
  backlog: Array<Item>,
  completedItems: Array<Item>
}
