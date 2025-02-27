import { Request, Response } from "express";
import { ListSentOrdersService } from "../../services/order/ListSentOrdersService"; 

class ListSentOrdersController {
    async handle(req: Request, res: Response) {
        const listSentOrdersService = new ListSentOrdersService();

        const orders = await listSentOrdersService.execute();

        res.json(orders);
    }
}

export { ListSentOrdersController }