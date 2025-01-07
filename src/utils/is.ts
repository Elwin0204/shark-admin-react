const toString = Object.prototype.toString;

/**
 * @description: 判断值是否为某个特定类型
 * @param val - 需要判断的值
 * @param type - 目标类型字符串
 * @returns 如果值的类型匹配目标类型，则返回 true；否则返回 false。
 */
export function is(val: unknown, type: string): boolean {
  return toString.call(val) === `[object ${type}]`;
}

/**
 * @description: 检查值是否为函数
 * @param val - 需要检查的值
 * @returns 如果值是函数，则返回 true；否则返回 false。
 */
export function isFunction(val: unknown): val is (...args: any[]) => any {
  return typeof val === 'function' || is(val, 'Function');
}

/**
 * @description: 检查值是否为对象（非 null）
 * @param val - 需要检查的值
 * @returns 如果值是对象，则返回 true；否则返回 false。
 */
export function isObject(val: unknown): val is Record<any, any> {
  return val !== null && typeof val === 'object';
}

/**
 * @description: 检查值是否为数组
 * @param val - 需要检查的值
 * @returns 如果值是数组，则返回 true；否则返回 false。
 */
export function isArray<T>(val: unknown): val is Array<T> {
  return Array.isArray(val);
}

/**
 * @description: 检查值是否为字符串
 * @param val - 需要检查的值
 * @returns 如果值是字符串，则返回 true；否则返回 false。
 */
export function isString(val: unknown): val is string {
  return typeof val === 'string';
}

/**
 * @description: 检查值是否为数字
 * @param val - 需要检查的值
 * @returns 如果值是数字，则返回 true；否则返回 false。
 */
export function isNumber(val: unknown): val is number {
  return typeof val === 'number' && !isNaN(val);
}

/**
 * @description: 检查值是否为布尔值
 * @param val - 需要检查的值
 * @returns 如果值是布尔值，则返回 true；否则返回 false。
 */
export function isBoolean(val: unknown): val is boolean {
  return typeof val === 'boolean';
}