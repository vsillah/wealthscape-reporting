import { createContext, useContext, useEffect, useState } from "react";
import GeneratedReportPreview from "./GeneratedReportPreview.jsx";
import { reportTemplateId } from "./generatedReports.js";
const ReportPreviewContext = createContext(null);
export function useReportPreview() {
  return useContext(ReportPreviewContext);
}
export default function ReportPreviewProvider({ profile, scopeKey, children }) {
  const [preview, setPreview] = useState(null);
  useEffect(() => setPreview(null), [scopeKey]);
  const open = (template = "quarterly", returnLabel = "Close report") =>
    setPreview({ template: reportTemplateId(template), returnLabel });
  return (
    <ReportPreviewContext.Provider value={open}>
      {children}
      {preview && (
        <GeneratedReportPreview
          key={preview.template}
          profile={profile}
          template={preview.template}
          returnLabel={preview.returnLabel}
          onClose={() => setPreview(null)}
        />
      )}
    </ReportPreviewContext.Provider>
  );
}
