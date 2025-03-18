export interface Product {
    id: string;
    name: string;
    price: string;
    description: string;
    banner: string;
    created_at: string;
    updated_at: string;
    category_id: string;
}

export interface OrderItem {
    id: string;
    amount: number;
    created_at: string;
    updated_at: string;
    order_id: string;
    product_id: string;
    product: Product;
}

export interface OrderDetail {
    id: string;
    table: number;
    status: boolean;
    draft: boolean;
    name: string | null;
    created_at: string;
    updated_at: string;
    items: OrderItem[];
}