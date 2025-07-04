/**
 * Generated by orval v7.3.0 🍺
 * Do not edit manually.
 * order-manager
 * API order-manager
 * OpenAPI spec version: 1.0.0
 */

/**
 * CreateCounterpartyRequest
 */
export interface CreateCounterpartyRequest {
  /**
   * е-mail контрагента
   * @maxLength 255
   */
  email?: string;
  /**
   * Полное наименование контрагента
   * @maxLength 255
   */
  fullName?: string;
  /**
   * ИНН контрагента
   * @maxLength 255
   */
  inn?: string;
  /**
   * Краткое наименование контрагента
   * @maxLength 255
   */
  name: string;
  /**
   * Телефон контрагента
   * @maxLength 255
   * @pattern ^\+\d{5,15}$
   */
  phone?: string;
}
