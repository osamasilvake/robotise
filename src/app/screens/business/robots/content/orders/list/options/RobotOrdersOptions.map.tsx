import { CANCELLABLE_ORDERS } from './RobotOrdersOptions.list';

/**
 * is cancellable order
 * @param orders
 * @returns
 */
export const isOrderCancellable = (status: string) => CANCELLABLE_ORDERS.includes(status);
