import axios from 'axios';
import { User, Product, DashboardStats, LoginCredentials } from '../types';

// Configure axios
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Mock data for demo purposes
const MOCK_USERS = [
  {
    id: '1',
    email: 'manager@commodities.com',
    password: 'manager123',
    name: 'Rajesh Kumar',
    role: 'manager' as const,
  },
  {
    id: '2',
    email: 'keeper@commodities.com',
    password: 'keeper123',
    name: 'Priya Sharma',
    role: 'storekeeper' as const,
  },
];

const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Tata Tea Premium',
    category: 'Beverages',
    quantity: 150,
    price: 450.00,
    unit: 'kg',
    supplier: 'Tata Consumer Products',
    lastUpdated: new Date().toISOString(),
    status: 'in-stock',
  },
  {
    id: '2',
    name: 'Aashirvaad Atta (Whole Wheat Flour)',
    category: 'Grains',
    quantity: 8,
    price: 350.00,
    unit: 'kg',
    supplier: 'ITC Limited',
    lastUpdated: new Date().toISOString(),
    status: 'low-stock',
  },
  {
    id: '3',
    name: 'India Gate Basmati Rice',
    category: 'Grains',
    quantity: 500,
    price: 180.00,
    unit: 'kg',
    supplier: 'KRBL Limited',
    lastUpdated: new Date().toISOString(),
    status: 'in-stock',
  },
  {
    id: '4',
    name: 'Toor Dal (Arhar Dal)',
    category: 'Pulses',
    quantity: 0,
    price: 120.00,
    unit: 'kg',
    supplier: 'Mother Dairy',
    lastUpdated: new Date().toISOString(),
    status: 'out-of-stock',
  },
  {
    id: '5',
    name: 'Fortune Sunflower Oil',
    category: 'Oils',
    quantity: 75,
    price: 180.00,
    unit: 'liter',
    supplier: 'Adani Wilmar',
    lastUpdated: new Date().toISOString(),
    status: 'in-stock',
  },
  {
    id: '6',
    name: 'Everest Garam Masala',
    category: 'Spices',
    quantity: 12,
    price: 85.00,
    unit: 'kg',
    supplier: 'Everest Food Products',
    lastUpdated: new Date().toISOString(),
    status: 'low-stock',
  },
  {
    id: '7',
    name: 'Amul Milk Powder',
    category: 'Dairy',
    quantity: 35,
    price: 420.00,
    unit: 'kg',
    supplier: 'Gujarat Cooperative Milk Marketing Federation',
    lastUpdated: new Date().toISOString(),
    status: 'in-stock',
  },
  {
    id: '8',
    name: 'MDH Chana Masala',
    category: 'Spices',
    quantity: 45,
    price: 95.00,
    unit: 'kg',
    supplier: 'MDH Spices',
    lastUpdated: new Date().toISOString(),
    status: 'in-stock',
  },
];

// Authentication API
export const authAPI = {
  login: async (credentials: LoginCredentials): Promise<{ user: User; token: string }> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));

    const user = MOCK_USERS.find(
      u => u.email === credentials.email && u.password === credentials.password
    );

    if (!user) {
      throw new Error('Invalid email or password');
    }

    const { password, ...userWithoutPassword } = user;
    const token = `mock-token-${user.id}-${Date.now()}`;

    return {
      user: userWithoutPassword,
      token,
    };
  },
};

// Products API
export const productsAPI = {
  getAll: async (): Promise<Product[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return [...MOCK_PRODUCTS];
  },

  getById: async (id: string): Promise<Product> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const product = MOCK_PRODUCTS.find(p => p.id === id);
    if (!product) {
      throw new Error('Product not found');
    }
    return { ...product };
  },

  create: async (product: Omit<Product, 'id' | 'lastUpdated'>): Promise<Product> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const newProduct: Product = {
      ...product,
      id: Math.random().toString(36).substr(2, 9),
      lastUpdated: new Date().toISOString(),
    };
    MOCK_PRODUCTS.push(newProduct);
    return newProduct;
  },

  update: async (id: string, updates: Partial<Product>): Promise<Product> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const index = MOCK_PRODUCTS.findIndex(p => p.id === id);
    if (index === -1) {
      throw new Error('Product not found');
    }
    MOCK_PRODUCTS[index] = {
      ...MOCK_PRODUCTS[index],
      ...updates,
      lastUpdated: new Date().toISOString(),
    };
    return { ...MOCK_PRODUCTS[index] };
  },

  delete: async (id: string): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const index = MOCK_PRODUCTS.findIndex(p => p.id === id);
    if (index === -1) {
      throw new Error('Product not found');
    }
    MOCK_PRODUCTS.splice(index, 1);
  },
};

// Dashboard API
export const dashboardAPI = {
  getStats: async (): Promise<DashboardStats> => {
    await new Promise(resolve => setTimeout(resolve, 600));
    
    const products = MOCK_PRODUCTS;
    const totalValue = products.reduce((sum, p) => sum + (p.price * p.quantity), 0);
    const lowStockItems = products.filter(p => p.status === 'low-stock' || p.status === 'out-of-stock').length;
    const categories = new Set(products.map(p => p.category)).size;

    return {
      totalProducts: products.length,
      totalValue,
      lowStockItems,
      categories,
      recentActivity: [
        {
          id: '1',
          action: 'Updated',
          product: 'Tata Tea Premium',
          user: 'Rajesh Kumar',
          timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
        },
        {
          id: '2',
          action: 'Added',
          product: 'Amul Milk Powder',
          user: 'Priya Sharma',
          timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
        },
        {
          id: '3',
          action: 'Updated',
          product: 'India Gate Basmati Rice',
          user: 'Rajesh Kumar',
          timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
        },
      ],
    };
  },
};

export default api;
