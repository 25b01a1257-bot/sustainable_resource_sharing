export type Category =
  | 'Books'
  | 'Electronics'
  | 'Education'
  | 'Clothing'
  | 'Furniture'
  | 'Sports'
  | 'Lab Equipment'
  | 'Stationery'
  | 'Other';

export type Condition = 'New' | 'Like New' | 'Good' | 'Fair' | 'Poor';

export type SharingType = 'Give' | 'Lend';

export type RequestStatus = 'Pending' | 'Approved' | 'Completed' | 'Rejected';

export interface Resource {
  id: string;
  name: string;
  category: Category;
  description: string;
  condition: Condition;
  location: string;
  owner: string;
  quantity: number;
  sharingType: SharingType;
  available: boolean;
  dateAdded: string;
  views: number;
  imageUrl?: string;
}

export interface ResourceRequest {
  id: string;
  resourceId: string;
  resourceName: string;
  requester: string;
  owner: string;
  status: RequestStatus;
  dateRequested: string;
  urgent: boolean;
  message: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  location: string;
  joined: string;
}

export const CATEGORIES: Category[] = [
  'Books',
  'Electronics',
  'Education',
  'Clothing',
  'Furniture',
  'Sports',
  'Lab Equipment',
  'Stationery',
  'Other',
];

export const CONDITIONS: Condition[] = ['New', 'Like New', 'Good', 'Fair', 'Poor'];

export const CATEGORY_ICONS: Record<Category, string> = {
  Books: 'BookOpen',
  Electronics: 'Laptop',
  Education: 'GraduationCap',
  Clothing: 'Shirt',
  Furniture: 'Sofa',
  Sports: 'Dumbbell',
  'Lab Equipment': 'FlaskConical',
  Stationery: 'PenTool',
  Other: 'Package',
};
