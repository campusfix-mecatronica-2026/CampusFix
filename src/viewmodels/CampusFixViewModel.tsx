import {
  createContext,
  type ReactNode,
  useContext,
  useMemo,
  useState,
} from 'react';
import { FirebaseError } from 'firebase/app';

import type { Priority, Report, ReportFilter } from '../models/Report';
import {
  createReport,
  loadReports,
  signInUser,
  signOutUser,
} from '../services/reportService';

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
  loading: boolean;
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
  signIn: () => Promise<boolean>;
  signOut: () => Promise<void>;
  validateReportInformation: () => boolean;
  submitReport: () => Promise<Report | null>;
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
  const [reports, setReports] = useState<Report[]>([]);
  const [filter, setFilter] = useState<ReportFilter>('Todos');
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState('');

  const visibleReports = useMemo(
    () => filter === 'Todos' ? reports : reports.filter((report) => report.status === filter),
    [filter, reports],
  );

  const clearError = () => setError('');

  const signIn = async () => {
    if (!email.trim() || !password.trim()) {
      setError('Ingresa el correo institucional y la contraseña.');
      return false;
    }

    setLoading(true);
    clearError();

    try {
      const authenticatedUserId = await signInUser(email, password);
      const cloudReports = await loadReports(authenticatedUserId);
      setUserId(authenticatedUserId);
      setReports(cloudReports);
      setPassword('');
      return true;
    } catch (error) {
      const code = error instanceof FirebaseError ? error.code : 'error-desconocido';
      if (code === 'auth/invalid-credential' || code === 'auth/user-not-found' || code === 'auth/wrong-password') {
        setError('El correo o la contraseña no son correctos.');
      } else if (code === 'auth/too-many-requests') {
        setError('Se realizaron demasiados intentos. Espera un momento e intenta nuevamente.');
      } else {
        setError('No fue posible iniciar sesión. Verifica tu conexión e intenta nuevamente.');
      }
      return false;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    await signOutUser();
    setUserId('');
    setReports([]);
    setEmail('');
    setPassword('');
    setFilter('Todos');
    clearError();
  };

  const validateReportInformation = () => {
    if (!title.trim() || !description.trim()) {
      setError('Completa el título y la descripción del incidente.');
      return false;
    }

    clearError();
    return true;
  };

  const submitReport = async () => {
    if (!location.trim()) {
      setError('Indica dónde ocurrió el incidente.');
      return null;
    }

    if (!userId) {
      setError('Tu sesión expiró. Inicia sesión nuevamente.');
      return null;
    }

    setLoading(true);
    clearError();

    try {
      const created = await createReport(
        { title, category, description, location, priority, evidence },
        userId,
      );

      setReports((current) => [created, ...current]);
      setTitle('');
      setDescription('');
      setLocation('');
      setCategory('Infraestructura');
      setPriority('Media');
      setEvidence(false);
      return created;
    } catch {
      setError('No fue posible guardar el reporte en Firebase. Intenta nuevamente.');
      return null;
    } finally {
      setLoading(false);
    }
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
    loading,
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
    signOut,
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
