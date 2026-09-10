import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { X, ArrowLeft, ArrowRight, RotateCcw, Target } from "lucide-react";
import { guideSteps } from "./maintenanceGuide.js";
import { maintenanceTourLayout, tourTargetRect } from "./maintenanceTourGeometry.js";

export default function MaintenanceTour({ guide, profile, onStep, onClose, onRestart }) {
  const steps = guideSteps("tour"), step = steps[guide.step];
  const id = useId(), panelRef = useRef(null), bodyRef = useRef(null);
  const closeRef = useRef(onClose); closeRef.current = onClose;
  const [expanded, setExpanded] = useState(false);
  const [position, setPosition] = useState(null);
  const [retry, setRetry] = useState(0);
  const key = `${guide.step}-${guide.runId}`;
  const current = position?.key === key ? position : null;

  useEffect(() => {
    const root = document.getElementById("root");
    const previousInert = root?.inert;
    const previousFocus = document.activeElement;
    if (root) root.inert = true;
    document.documentElement.classList.add("mg-tour-active");
    panelRef.current?.focus();
    const keydown = event => {
      if (event.key === "Escape") { event.preventDefault(); closeRef.current(); return; }
      if (event.key !== "Tab") return;
      const controls = [...panelRef.current.querySelectorAll('button:not(:disabled), a[href], summary, [tabindex="0"]')].filter(el => el.getClientRects().length);
      const first = controls[0], last = controls.at(-1);
      if (event.shiftKey && (document.activeElement === first || document.activeElement === panelRef.current)) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && (document.activeElement === last || document.activeElement === panelRef.current)) { event.preventDefault(); first?.focus(); }
    };
    document.addEventListener("keydown", keydown, true);
    return () => {
      if (root) root.inert = previousInert;
      document.documentElement.classList.remove("mg-tour-active");
      document.removeEventListener("keydown", keydown, true);
      requestAnimationFrame(() => {
        const destination = previousFocus?.isConnected && previousFocus !== document.body ? previousFocus : document.querySelector('[data-maintenance-guide-launch="tour"]');
        destination?.focus({ preventScroll: true });
      });
    };
  }, []);

  useEffect(() => {
    setExpanded(false);
    bodyRef.current?.scrollTo({ top: 0, behavior: "instant" });
    let frame, stopped = false, observedTarget;
    const surface = document.querySelector(".mg-surface");
    const resize = new ResizeObserver(() => schedule());
    const update = () => {
      if (stopped) return;
      const target = surface?.querySelector(`[data-maintenance-tour="${step.target}"]`);
      if (target !== observedTarget) {
        if (observedTarget) resize.unobserve(observedTarget);
        observedTarget = target;
        if (target) resize.observe(target);
      }
      const width = window.innerWidth, height = window.innerHeight;
      const layout = maintenanceTourLayout(width, height, surface?.getBoundingClientRect().top || 52, panelRef.current?.getBoundingClientRect().height);
      let rect = target?.getBoundingClientRect();
      if (rect && surface && rect.height <= layout.targetBand.bottom - layout.targetBand.top) {
        const desired = layout.targetBand.top + Math.max(0, (layout.targetBand.bottom - layout.targetBand.top - rect.height) / 2);
        if (rect.top < layout.targetBand.top || rect.bottom > layout.targetBand.bottom) {
          surface.scrollTop += rect.top - desired;
          rect = target.getBoundingClientRect();
        }
      }
      const spotlight = tourTargetRect(rect, layout.targetBand, width);
      const next = { key, ...layout, spotlight, missing: !target ? "Waiting for this tour target to appear." : !spotlight ? "The target needs more visible space. Recenter it or enlarge the window." : null };
      setPosition(previous => JSON.stringify(previous) === JSON.stringify(next) ? previous : next);
    };
    const schedule = () => { cancelAnimationFrame(frame); frame = requestAnimationFrame(update); };
    const mutation = new MutationObserver(schedule);
    if (surface) { mutation.observe(surface, { childList: true, subtree: true }); resize.observe(surface); }
    if (panelRef.current) resize.observe(panelRef.current);
    window.addEventListener("resize", schedule);
    window.addEventListener("scroll", schedule, true);
    schedule();
    return () => { stopped = true; cancelAnimationFrame(frame); mutation.disconnect(); resize.disconnect(); window.removeEventListener("resize", schedule); window.removeEventListener("scroll", schedule, true); };
  }, [key, step.target, retry]);

  const fallbackLayout = maintenanceTourLayout(window.innerWidth, window.innerHeight);
  const dialog = current?.dialog || fallbackLayout.dialog;
  return createPortal(<div className="mt-overlay">
    <div className={`mt-blocker ${current?.spotlight ? "" : "mt-waiting"}`} aria-hidden="true" />
    {current?.spotlight && <div className="mt-spotlight" data-tour-target={step.target} style={current.spotlight} aria-hidden="true" />}
    <section className="mt-dialog" role="dialog" aria-modal="true" aria-labelledby={`${id}-title`} tabIndex={-1} ref={panelRef} style={{ left: dialog.left, bottom: 12, width: dialog.width, maxHeight: dialog.maxHeight }}>
      <div className="mt-progress" role="progressbar" aria-label="Tour progress" aria-valuemin={0} aria-valuemax={steps.length} aria-valuenow={guide.step + 1}><span style={{ width: `${(guide.step + 1) / steps.length * 100}%` }} /></div>
      <header className="mt-header"><div><span>Maintenance tour · {guide.step + 1} of {steps.length}</span><h2 id={`${id}-title`}>{step.title}</h2></div><button aria-label="Exit maintenance tour" onClick={onClose}><X size={18}/></button></header>
      <div className="mt-body" ref={bodyRef}>
        <p className="mt-scope">{profile.label || profile.shell.role} · Read-only synthetic case</p>
        <section className="mt-outcome"><h3><Target size={13}/> Proposed desired result · {step.outcomes}</h3><p>{step.desiredOutcome}</p></section>
        <section className="mt-gap"><h3>Current gap · research signal</h3><p>{step.gap}</p></section>
        <section className="mt-solution"><h3>UI solution</h3><p>{step.ux}</p></section>
        <details open={expanded} onToggle={event => setExpanded(event.currentTarget.open)}><summary>Sources & production boundaries</summary><p>{step.insight}</p><p>{step.proposal}</p><small>{step.source} · 18 Aug 2026 snapshot</small><p><a href="https://www.kitces.com/kitces-report-independent-financial-advisor-technology-fintech-software-tools-research-2025/" target="_blank" rel="noreferrer">Kitces research ↗</a></p><p>Exit or Restart discards only this guide. Your session work stays intact. No documents, requests, completed checks, or reports are created by this tour.</p></details>
        <p className="mt-target-status" role="status">{current?.missing || (current?.spotlight ? "Highlighted: " + step.targetLabel : "Locating the next target…")}</p>
        {!current?.spotlight && <button className="mt-recover" onClick={() => { onStep(guide.step); setRetry(value => value + 1); }}>Recenter / retry this step</button>}
      </div>
      <footer className="mt-footer"><button disabled={guide.step === 0} onClick={()=>onStep(guide.step - 1)}><ArrowLeft size={14}/> Previous</button><button onClick={onRestart} aria-label="Restart maintenance tour"><RotateCcw size={14}/> Restart</button><button className="mt-next" disabled={!current?.spotlight} onClick={()=>guide.step === steps.length - 1 ? onClose() : onStep(guide.step + 1)}>{guide.step === steps.length - 1 ? "Finish" : "Next"}<ArrowRight size={14}/></button></footer>
    </section>
  </div>, document.body);
}
