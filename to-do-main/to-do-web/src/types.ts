// src/types.ts

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  createdAt: string;
}

export type FilterOption = 'all' | 'active' | 'completed';
export type SortByOption = 'createdAt' | 'title';
export type SortOrderOption = 'asc' | 'desc';