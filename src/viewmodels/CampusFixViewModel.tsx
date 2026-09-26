import {
  createContext,
  type ReactNode,
  useContext,
  useMemo,
  useState,
} from 'react';

import type { Priority, Report, ReportFilter } from '../models/Report';
import { buildReport, loadInitialReports } from '../services/reportService';

type CampusFixViewModelValue = {
  email: string;
  password: string;
  category: string;
  title: string;
  description: string;
  location: string;
  priority: Priority;
  evidence: boolean;
  error: string;
  reports: Report[];
  filter: ReportFilter;
  visibleReports: Report[];
  setEmail: (value: string) => void;
  setPassword: (value: string) => void;
  setCategory: (value: string) => void;
  setTitle: (value: string) => void;
  setDescription: (value: string) => void;
  setLocation: (value: string) => void;
  setPriority: (value: Priority) => void;
  setEvidence: (value: boolean) => void;
  setFilter: (value: ReportFilter) => void;
  clearError: () => void;
  signIn: () => boolean;
  validateReportInformation: () => boolean;
  submitReport: () => Report | null;
  getReportById: (id: string) => Report | undefined;
};

const CampusFixViewModelContext = createContext<CampusFixViewModelValue | null>(null);

export function CampusFixViewModelProvider({ children }: { children: ReactNode }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [category, setCategory] = useState('Infraestructura');
  const [title, setTitle] = useState('Luminaria averiada');
  const [description, setDescription] = useState(
    'La luminaria del pasillo parpadea y deja la zona con poca visibilidad.',
  );
  const [location, setLocation] = useState('Bloque C · primer piso');
  const [priority, setPriority] = useState<Priority>('Media');
  const [evidence, setEvidence] = useState(false);
  const [error, setError] = useState('');
  const [reports, setReports] = useState<Report[]>(loadInitialReports);
  const [filter, setFilter] = useState<ReportFilter>('Todos');

  const visibleReports = useMemo(
    () => filter === 'Todos' ? reports : reports.filter((report) => report.status === filter),
    [filter, reports],
  );

  const clearError = () => setError('');

  const signIn = () => {
    if (!email.trim() || !password.trim()) {
      setError('Ingresa el correo institucional y la contraseña.');
      return false;
    }

    clearError();
    return true;
  };

  const validateReportInformation = () => {
    if (!title.trim() || !description.trim()) {
      setError('Completa el título y la descripción del incidente.');
      return false;
    }

    clearError();
    return true;
  };

  const submitReport = () => {
    if (!location.trim()) {
      setError('Indica dónde ocurrió el incidente.');
      return null;
    }

    const created = buildReport(
      { title, category, description, location, priority, evidence },
      reports,
    );

    setReports((current) => [created, ...current]);
    clearError();
    return created;
  };

  const getReportById = (id: string) => reports.find((report) => report.id === id);

  const value: CampusFixViewModelValue = {
    email,
    password,
    category,
    title,
    description,
    location,
    priority,
    evidence,
    error,
    reports,
    filter,
    visibleReports,
    setEmail,
    setPassword,
    setCategory,
    setTitle,
    setDescription,
    setLocation,
    setPriority,
    setEvidence,
    setFilter,
    clearError,
    signIn,
    validateReportInformation,
    submitReport,
    getReportById,
  };

  return (
    <CampusFixViewModelContext.Provider value={value}>
      {children}
    </CampusFixViewModelContext.Provider>
  );
}

export function useCampusFixViewModel() {
  const context = useContext(CampusFixViewModelContext);

  if (!context) {
    throw new Error('useCampusFixViewModel debe utilizarse dentro del proveedor.');
  }

  return context;
}
