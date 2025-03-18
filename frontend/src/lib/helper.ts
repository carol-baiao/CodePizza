import { OrderItem } from "@/providers/OrderDetail.types";

export function calculateTotalPrice(items: OrderItem[]) {
    return items.reduce((total, item) => {
        const itemTotal = parseFloat(item.product.price) * item.amount;
        return total + itemTotal;
    }, 0)
}