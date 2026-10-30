import { memo, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { liquidOutline, type LiquidDrop } from "@/lib/liquid-outline";

type Particle = LiquidDrop & { born: number; vx: number; vy: number; life: number; seed: number };

function BeneathCursor() {
  const lensRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const lens = lensRef.current, ring = ringRef.current;
    if (!lens || !ring) return;
    const pointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let enabled = false, visible = false, frame = 0;
    let x = 0, y = 0, targetX = 0, targetY = 0, energy = 0, previousTime = 0;
    let lastBirth = 0;
    let idleTimer: ReturnType<typeof setTimeout> | undefined;
    let particles: Particle[] = [];
    const hide = () => {
      visible = false; particles = []; energy = 0;
      clearTimeout(idleTimer);
      lens.style.opacity = "0"; ring.style.opacity = "0";
      cancelAnimationFrame(frame); frame = 0; previousTime = 0;
    };
    const configure = () => {
      enabled = pointer.matches && !reduced.matches;
      document.documentElement.classList.toggle("fluid-cursor-enabled", enabled);
      if (!enabled) hide();
    };
    const draw = (time: number) => {
      frame = 0;
      if (!enabled || !visible) return;
      // Rounded or repeated frame timestamps must never produce a zero divisor.
      const dt = Math.max(1, Math.min(32, previousTime ? time - previousTime : 16.67));
      previousTime = time;
      const follow = 1 - Math.exp(-dt / 65);
      const dx = targetX-x, dy = targetY-y;
      const oldX = x, oldY = y;
      x += dx*follow; y += dy*follow;
      const vx = (x-oldX) / dt, vy = (y-oldY) / dt;
      const velocity = Math.hypot(vx,vy);
      energy += (Math.min(1, velocity / 0.65) - energy) * (1-Math.exp(-dt/100));
      if (velocity > 0.06 && time-lastBirth > 35) {
        particles.push({ x, y, radius: 22 + energy*22, born: time, vx: vx*0.12, vy: vy*0.12,
          life: 700 + Math.random()*250, seed: Math.random()*Math.PI*2 });
        particles = particles.slice(-24); lastBirth = time;
      }
      particles = particles.filter(p => time-p.born < p.life);
      const drops: LiquidDrop[] = [];
      for (const particle of particles) {
        const age = Math.max(0, (time-particle.born)/particle.life);
        // Drift, surface tension and tapered lifetimes create necks and detached droplets.
        const curlX = Math.sin(particle.y*0.015 + time*0.0018 + particle.seed);
        const curlY = Math.cos(particle.x*0.014 - time*0.0013 + particle.seed);
        particle.x += (particle.vx + curlX*0.018)*dt;
        particle.y += (particle.vy + curlY*0.018)*dt;
        particle.vx *= Math.exp(-dt/160); particle.vy *= Math.exp(-dt/160);
        if (velocity < 0.03) {
          particle.x += (targetX-particle.x)*dt*0.0009*(1-age);
          particle.y += (targetY-particle.y)*dt*0.0009*(1-age);
        }
        const radius = particle.radius * Math.pow(1-age, 1.5);
        if (radius > 0.8) drops.push({x:particle.x,y:particle.y,radius});
      }
      if (energy > 0.015) drops.push({x,y,radius:48*energy});
      const path = liquidOutline(drops,window.innerWidth,window.innerHeight);
      lens.style.clipPath = path ? `path("${path}")` : "circle(0px at 0 0)";
      lens.style.opacity = path ? "1" : "0";
      if (Math.abs(dx)+Math.abs(dy)>0.1 || particles.length || energy>0.01) frame=requestAnimationFrame(draw);
      else previousTime=0;
    };
    const schedule=()=>{if(!frame) frame=requestAnimationFrame(draw);};
    const trackPointer = (event: PointerEvent) => {
      if (!enabled || event.pointerType !== "mouse") return false;
      targetX = event.clientX; targetY = event.clientY;
      clearTimeout(idleTimer);
      ring.style.transition = "opacity 90ms ease-out, scale 90ms ease-out";
      ring.style.opacity = "0";
      ring.style.scale = "0.94";
      ring.style.transform = `translate3d(${targetX-48}px,${targetY-48}px,0)`;
      idleTimer = setTimeout(() => {
        if (!enabled || !visible) return;
        ring.style.transition = "opacity 550ms ease-out, scale 650ms cubic-bezier(.22,1,.36,1)";
        ring.style.scale = "1";
        ring.style.opacity = "0.6";
      }, 320);
      if (!visible) { x = targetX; y = targetY; previousTime = 0; }
      visible = true;
      return true;
    };
    const move = (event: PointerEvent) => {
      if (trackPointer(event)) schedule();
    };
    const press = (event: PointerEvent) => {
      // A click can arrive without a new move after DOM changes or window focus.
      if (!trackPointer(event)) return;
      const time = performance.now();
      for (let i=0; i<5; i++) {
        const angle=i*Math.PI*2/5;
        particles.push({x:targetX,y:targetY,radius:18,born:time,life:600,
          vx:Math.cos(angle)*0.25,vy:Math.sin(angle)*0.25,seed:angle});
      }
      particles = particles.slice(-24);
      schedule();
    };
    // Listen to an actual viewport exit, not bubbling exits from replaced text nodes.
    const leave = () => hide();
    const visibility=()=>{if(document.hidden)hide();};
    configure();
    pointer.addEventListener("change",configure); reduced.addEventListener("change",configure);
    window.addEventListener("pointermove",move,{passive:true});
    window.addEventListener("pointerdown",press,{passive:true});
    document.documentElement.addEventListener("pointerleave",leave); window.addEventListener("blur",hide);
    document.addEventListener("visibilitychange",visibility);
    return()=>{
      hide(); document.documentElement.classList.remove("fluid-cursor-enabled");
      pointer.removeEventListener("change",configure); reduced.removeEventListener("change",configure);
      window.removeEventListener("pointermove",move); window.removeEventListener("pointerdown",press);
      document.documentElement.removeEventListener("pointerleave",leave); window.removeEventListener("blur",hide);
      document.removeEventListener("visibilitychange",visibility);
    };
  },[]);
  return createPortal(<><div ref={lensRef} className="beneath-cursor" aria-hidden="true" /><div ref={ringRef} className="fluid-pointer-ring" aria-hidden="true" /></>,document.body);
}

export default memo(BeneathCursor);
