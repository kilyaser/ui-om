/**
 * Generated by orval v7.3.0 🍺
 * Do not edit manually.
 * order-manager
 * API order-manager
 * OpenAPI spec version: 1.0.0
 */

/**
 * Статус заказа.
 * @maxLength 255
 */
export type UiOrderShortOrderState = typeof UiOrderShortOrderState[keyof typeof UiOrderShortOrderState];


// eslint-disable-next-line @typescript-eslint/no-redeclare
export const UiOrderShortOrderState = {
  NEW: 'NEW',
  IN_WORK: 'IN_WORK',
  READY: 'READY',
  SHIPPED: 'SHIPPED',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED',
} as const;
