export type UserRole = 'manager' | 'storekeeper';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  quantity: number;
  price: number;
  unit: string;
  supplier: string;
  lastUpdated: string;
  status: 'in-stock' | 'low-stock' | 'out-of-stock';
}

export interface DashboardStats {
  totalProducts: number;
  totalValue: number;
  lowStockItems: number;
  categories: number;
  recentActivity: {
    id: string;
    action: string;
    product: string;
    user: string;
    timestamp: string;
  }[];
}

export interface LoginCredentials {
  email: string;
  password: string;
}
