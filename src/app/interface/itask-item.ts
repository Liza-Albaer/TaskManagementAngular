export interface ItaskItem {
}
export interface TaskItem {
  id: number;
  title: string;
  description?: string;
  createdAt: Date;
  dueDate?: Date;
  statusId?: number;
  status?: TaskStatus;
  categoryId?: number;
  category?: Category;
}
export interface TaskStatus {
  id: number;
  name: string;
}
export interface Category {
  id: number;
  name: string;
}
export interface TaskItemDto {
  title: string;
  description?: string;
  createdAt: Date;
  dueDate?: Date;
  statusId?: number;
  categoryId?: number;
}
