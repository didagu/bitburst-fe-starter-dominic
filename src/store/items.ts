import { defineStore } from "pinia";
import { Item, State } from "@/store/ItemTypes.ts";
import { v4 as uuidv4 } from "uuid";
import { list, backlog, completedItems } from '@/fixtures/seeds.ts'

export const useItemsStore = defineStore('items', {
  state: (): State => ({
    items: list,
    backlog,
    completedItems
  }),
  actions: {
    addItem(value: string, toWhere: string) {
      const arrayToUse = toWhere === 'list' ? 'items' : 'backlog'
      this[arrayToUse].push({
        id: uuidv4(),
        title: value,
        createdAt: new Date().toLocaleString('en-GB',{
          hour12: true,
          year: 'numeric',
          month: 'numeric',
          day: 'numeric',
          hour: '2-digit',
          minute:'2-digit'}
        ),
        completed: false
      })
    },
    toggleItemCompletion(value: Item, targetArray: string) {
      const arrayToUse = targetArray === 'list' ? 'items' : 'backlog'
      const foundItem = this[arrayToUse].find(({ id }) => id === value.id)
      if(foundItem) {
        foundItem.completed = !foundItem.completed
        setTimeout(() => {
          this.completedItems.push(foundItem)
          this.deleteItem(value.id, targetArray)
        }, 500)
      }
    },
    deleteItem(value: string, fromWhere: string = 'list') {
      const arrayToUse = fromWhere === 'list' ? 'items' : 'backlog'
      this[arrayToUse] = this[arrayToUse ].filter(item => item.id !== value)
    },
    moveItemToBacklog(value: string) {
      const itemToMove = this.items.find(item => item.id === value)
      if(itemToMove) {
        this.backlog.push(itemToMove);
        this.deleteItem(value);
      }
    },
    moveItemToList(value: string) {
      const itemToMove = this.backlog.find(item => item.id === value)
      if(itemToMove) {
        this.items.push(itemToMove);
        this.deleteItem(value, 'backlog');
      }
    },
    sortBy(sortCriteria: keyof Item) {
      this.backlog.sort((a, b) => {
        if (typeof a[sortCriteria] === 'string') {
          return (a[sortCriteria] as string).localeCompare(b[sortCriteria] as string);
        } else if (typeof a[sortCriteria] === 'boolean') {
          // Sort booleans with true first
          return a[sortCriteria] === b[sortCriteria] ? 0 : a[sortCriteria] ? -1 : 1;
        } else {
          // Handle other types if needed
          return 0;
        }
      });
    }
  }
});
