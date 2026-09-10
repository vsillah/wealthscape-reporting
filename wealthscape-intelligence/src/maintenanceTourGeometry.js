export function maintenanceTourLayout(width, height, surfaceTop = 52, panelHeight) {
  const margin = 12;
  const compact = width < 1000;
  const maxHeight = Math.min(540, Math.floor(height * (compact ? 0.5 : 0.6)));
  const dialogHeight = Math.min(panelHeight || maxHeight, maxHeight);
  const dialogWidth = Math.min(440, width - margin * 2);
  const top = height - margin - dialogHeight;
  return {
    dialog: { left: width - margin - dialogWidth, top, width: dialogWidth, maxHeight },
    targetBand: { top: Math.max(surfaceTop + 16, 68), bottom: top - 18 },
  };
}

export function tourTargetRect(rect, band, width) {
  if (!rect || rect.width <= 0 || rect.height <= 0 || rect.top < band.top - 8 || rect.bottom > band.bottom + 8) return null;
  return { left: Math.max(4, rect.left - 5), top: rect.top - 5,
    width: Math.min(rect.width + 10, width - Math.max(4, rect.left - 5) - 4), height: rect.height + 10 };
}
