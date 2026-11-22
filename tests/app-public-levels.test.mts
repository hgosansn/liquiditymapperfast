import test from 'node:test';
import assert from 'node:assert/strict';
import { liveView, FREE_VIEW } from '../src/app/liq-view.ts';
import { PUBLIC_LIQ_ACCESS, freeFrom } from '../src/app/liq-access.ts';
import { LiqHistory, DAY_MS } from '../src/app/liq-history.ts';
import { liqMenuItems } from '../src/app/liq-menu.ts';

test('old paid layer settings resolve to public liquidations without an upgrade prompt', () => {
  assert.deepEqual(liveView({ kind: 'both', takes: true, group: 'profitable' }), FREE_VIEW);
  assert.deepEqual(liveView({ kind: 'stops', takes: true, group: 'all' }), FREE_VIEW);
  assert.ok(liqMenuItems().every(row => !row.locked && !row.tag));
});

test('history spanning the paid boundary requests only public days and sends no pass', async () => {
  const now = Date.UTC(2026, 10, 22, 12), boundary = freeFrom(now);
  assert.equal(boundary, Date.UTC(2026, 10, 15));
  assert.equal(PUBLIC_LIQ_ACCESS.pass(now), null);
  const asked: { url: string; pass: string | null | undefined }[] = [];
  const history = new LiqHistory(async (url, pass) => {
    asked.push({ url, pass });
    return null;
  }, PUBLIC_LIQ_ACCESS);
  history.ensure(boundary - 4 * DAY_MS, now, now, () => {});
  await new Promise(resolve => setTimeout(resolve, 0));
  assert.ok(asked.length > 0);
  assert.ok(asked.every(({url, pass}) => !url.includes('/plus/') && !pass));
  assert.ok(asked.every(({url}) => !/2026-11-(?:0\d|1[0-4])\.json/.test(url)));
});
