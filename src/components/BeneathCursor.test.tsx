import { act, cleanup, render } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import BeneathCursor from "./BeneathCursor";
import * as outline from "@/lib/liquid-outline";

afterEach(() => { cleanup(); vi.restoreAllMocks(); vi.unstubAllGlobals(); });

it("keeps drawing after repeated clicks and identical animation timestamps", () => {
  vi.spyOn(window, "matchMedia").mockImplementation(query => ({
    matches: !query.includes("reduced-motion"), media: query,
    addEventListener: vi.fn(), removeEventListener: vi.fn(),
  } as unknown as MediaQueryList));
  vi.spyOn(performance, "now").mockReturnValue(100);
  let nextId = 0;
  const frames = new Map<number, FrameRequestCallback>();
  vi.stubGlobal("requestAnimationFrame", (callback: FrameRequestCallback) => {
    frames.set(++nextId, callback); return nextId;
  });
  vi.stubGlobal("cancelAnimationFrame", (id: number) => frames.delete(id));
  const draw = vi.spyOn(outline, "liquidOutline");
  const pointer = (type: string, x: number, y: number) => {
    const event = new Event(type);
    Object.defineProperties(event, { pointerType: { value: "mouse" }, clientX: { value: x }, clientY: { value: y } });
    act(() => { window.dispatchEvent(event); });
  };
  const tick = (time: number) => {
    const pending = [...frames.values()]; frames.clear();
    act(() => pending.forEach(callback => callback(time)));
  };
  render(<BeneathCursor />);
  pointer("pointermove", 100, 100);
  for (let click=0; click<30; click++) pointer("pointerdown", 100, 100);
  tick(100);
  tick(100); // Rounded clocks may provide the same timestamp more than once.
  pointer("pointermove", 400, 200);
  tick(116); tick(132); tick(148);
  tick(2000); // Let every click splash expire before moving again.
  pointer("pointermove", 600, 250);
  tick(2016); tick(2032); tick(2048);
  const drops = draw.mock.calls.flatMap(([shapes]) => shapes);
  expect(drops.length).toBeGreaterThan(0);
  expect(drops.every(drop => [drop.x, drop.y, drop.radius].every(Number.isFinite))).toBe(true);
  expect(draw.mock.calls[draw.mock.calls.length - 1]?.[0].some(drop => drop.x > 100)).toBe(true);
});
