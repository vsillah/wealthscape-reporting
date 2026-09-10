import { useEffect, useRef, useState } from "react";
import {
  BookOpen,
  Target,
  RotateCcw,
  X,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import { guideSteps, guideGate } from "./maintenanceGuide.js";
import { outcomes } from "./LifecycleExperience.jsx";
import "./MaintenanceGuide.css";

export default function MaintenanceGuide({
  guide,
  item,
  reports,
  profile,
  onStep,
  onClose,
  onRestart,
}) {
  const [expanded, setExpanded] = useState(false);
  const copyRef = useRef(null);
  const steps = guideSteps(guide.mode);
  const step = steps[guide.step];
  const primaryOutcome = Number(step.outcomes.split(",")[0]);
  const allowed = guideGate(step, item, reports);
  useEffect(() => {
    setExpanded(false);
    copyRef.current?.scrollTo({ top: 0, behavior: "instant" });
    let target;
    const highlight = () => {
      const found = document.querySelector(
        `[data-maintenance-guide="${step.target}"]`,
      );
      if (!found || found === target) return;
      target?.classList.remove("mg-highlight");
      target = found;
      target.classList.add("mg-highlight");
      target.scrollIntoView({ behavior: "instant", block: "start" });
    };
    const surface = document.querySelector(".mg-surface");
    const observer = new MutationObserver(highlight);
    if (surface) observer.observe(surface, { childList: true, subtree: true });
    highlight();
    return () => {
      observer.disconnect();
      target?.classList.remove("mg-highlight");
    };
  }, [guide.step, guide.mode, guide.runId, step.target]);
  return (
    <aside className="mg-guide" aria-label="Account maintenance guide">
      <div className="mg-top">
        <span>
          <BookOpen size={16} /> Maintenance{" "}
          {guide.mode === "scenario" ? "scenario" : "tour"} · {guide.step + 1}/
          {steps.length}
        </span>
        <button aria-label="Exit maintenance guide" onClick={onClose}>
          <X size={18} />
        </button>
      </div>
      <div className="mg-copy" ref={copyRef}>
        <p className="mg-scope">
          {profile.label || profile.shell.role} · Isolated synthetic case
        </p>
        <h2>{step.title}</h2>
        <p className="mg-outcomes">
          <Target size={15} /> Target outcomes {step.outcomes}
        </p>
        <p className="mg-outcome-label">
          {primaryOutcome}. {outcomes[primaryOutcome - 1][0]}
        </p>
        <p className="mg-insight">
          <strong>Research insight</strong> {step.insight}
        </p>
        <p>{step.ux}</p>
        <details
          open={expanded}
          onToggle={(e) => setExpanded(e.currentTarget.open)}
        >
          <summary>Production boundary & source</summary>
          <p>{step.proposal}</p>
          <small>{step.source} · 18 Aug 2026 snapshot</small>
          <p>
            <a
              href="https://www.kitces.com/kitces-report-independent-financial-advisor-technology-fintech-software-tools-research-2025/"
              target="_blank"
              rel="noreferrer"
            >
              Kitces research ↗
            </a>
          </p>
        </details>
        <p className="mg-action" role="status">
          {guide.notice ||
            (allowed && step.gate
              ? "Step complete. Continue when ready."
              : step.action)}
        </p>
        <p className="mg-safety">
          {guide.mode === "tour" &&
            "Read-only tour. Run Scenario to try the checks. "}
          Exit or Restart discards only this guide. Your session work stays
          intact. No documents or requests are sent.
        </p>
      </div>
      <div className="mg-controls">
        <button
          disabled={guide.step === 0}
          onClick={() => onStep(guide.step - 1)}
        >
          <ArrowLeft size={15} /> Previous
        </button>
        <button
          className="mg-next"
          disabled={!allowed}
          onClick={() =>
            guide.step === steps.length - 1 ? onClose() : onStep(guide.step + 1)
          }
        >
          {guide.step === steps.length - 1 ? "Return to research" : "Next"}
          <ArrowRight size={15} />
        </button>
        <button onClick={onRestart}>
          <RotateCcw size={14} /> Restart
        </button>
      </div>
    </aside>
  );
}
