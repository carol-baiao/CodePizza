import prismaClient from "../../prisma";

interface DetailOrderRequest {
    order_id: string;
}

class DetailOrderService {
    async execute({ order_id }: DetailOrderRequest) {
        const order = await prismaClient.order.findUnique({
            where: {
                id: order_id
            },
            include: {
                items: {
                    include: {
                        product: true
                    }
                }
            }
        });

        return order;
    }
}

export { DetailOrderService };