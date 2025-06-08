export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'assistant' | 'cashier';
  avatar?: string;
  createdAt: string;
  lastLogin?: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  sku: string;
  category: string;
  price: number;
  cost: number;
  stock: number;
  minStock: number;
  supplier: string;
  createdAt: string;
  updatedAt: string;
  image?: string;
}

export interface Transaction {
  id: string;
  type: 'sale' | 'purchase' | 'adjustment';
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  totalAmount: number;
  userId: string;
  userName: string;
  createdAt: string;
  notes?: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'error' | 'success';
  read: boolean;
  createdAt: string;
  userId?: string;
}

export interface DashboardStats {
  totalProducts: number;
  lowStockProducts: number;
  totalSales: number;
  totalPurchases: number;
  recentTransactions: Transaction[];
  stockLevels: Array<{
    category: string;
    stock: number;
    value: number;
  }>;
  salesTrend: Array<{
    date: string;
    sales: number;
    purchases: number;
  }>;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

export interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
}