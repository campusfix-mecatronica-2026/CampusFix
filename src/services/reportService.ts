import { seedReports } from '../data/reportData';
import type { Report, ReportDraft } from '../models/Report';

export function loadInitialReports(): Report[] {
  return seedReports.map((report) => ({ ...report }));
}

export function buildReport(draft: ReportDraft, currentReports: Report[]): Report {
  const nextNumber = 19 + currentReports.length - seedReports.length;

  return {
    ...draft,
    id: `CF-2026-${String(nextNumber).padStart(3, '0')}`,
    title: draft.title.trim(),
    description: draft.description.trim(),
    location: draft.location.trim(),
    status: 'Abierto',
    date: 'Ahora',
  };
}
