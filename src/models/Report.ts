export type Priority = 'Baja' | 'Media' | 'Alta';

export type ReportStatus = 'Abierto' | 'En proceso' | 'Resuelto';

export type ReportFilter = 'Todos' | ReportStatus;

export type Report = {
  id: string;
  title: string;
  category: string;
  description: string;
  location: string;
  priority: Priority;
  status: ReportStatus;
  date: string;
  evidence: boolean;
};

export type ReportDraft = Pick<
  Report,
  'title' | 'category' | 'description' | 'location' | 'priority' | 'evidence'
>;
