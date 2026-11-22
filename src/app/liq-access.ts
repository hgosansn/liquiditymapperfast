/** The upstream service exposes today and the previous seven UTC days without membership. */
import { DAY_MS, type LiqAccess } from './liq-history.ts';
export const FREE_DAYS = 7;
export const freeFrom = (now: number): number => Math.floor(now / DAY_MS) * DAY_MS - FREE_DAYS * DAY_MS;
/** Never attach credentials or request paid history in this fork. The server still enforces its own boundary. */
export const PUBLIC_LIQ_ACCESS: LiqAccess = { freeFrom, pass: () => null, refused: () => {} };
