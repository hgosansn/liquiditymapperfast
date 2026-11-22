/** Only public liquidation levels are available in this fork. */
import type { Store } from './store.ts';
import { t } from './i18n.ts';
import { openMenu, type MenuItem } from './menu.ts';
import { showGuide } from './help.ts';

export const LIQ_KINDS_GUIDE = 'liq-levels';
export function liqMenuItems(): MenuItem[] {
  return [
    { id: 'public', label: t('Liquidation levels'), checked: true },
    { id: 'guide', label: t('What these are'), action: true },
  ];
}
export function openLiqMenu(anchor: HTMLElement, _store: Store, align: 'left' | 'right' = 'left'): { close(): void } {
  return openMenu(anchor, liqMenuItems(), '', {
    onPreview: () => {},
    onSelect: id => { if (id === 'guide') showGuide(LIQ_KINDS_GUIDE); },
  }, align, { title: t('Liquidation levels') });
}
