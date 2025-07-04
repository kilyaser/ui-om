/**
 * Generated by orval v7.3.0 🍺
 * Do not edit manually.
 * order-manager
 * API order-manager
 * OpenAPI spec version: 1.0.0
 */

/**
 * Доступные статусы заказа для назначения.
 * @maxLength 500
 */
export type UiOrderAvailableStateActionAvailableStateItem = typeof UiOrderAvailableStateActionAvailableStateItem[keyof typeof UiOrderAvailableStateActionAvailableStateItem];


// eslint-disable-next-line @typescript-eslint/no-redeclare
export const UiOrderAvailableStateActionAvailableStateItem = {
  NEW: 'NEW',
  IN_WORK: 'IN_WORK',
  READY: 'READY',
  SHIPPED: 'SHIPPED',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED',
} as const;
