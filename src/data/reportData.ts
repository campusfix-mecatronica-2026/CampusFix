import type { Priority, Report } from '../models/Report';

export const categories = ['Infraestructura', 'Tecnología', 'Seguridad', 'Limpieza'];

export const priorities: Priority[] = ['Baja', 'Media', 'Alta'];

export const seedReports: Report[] = [
  {
    id: 'CF-2026-018',
    title: 'Fuga de agua en bloque B',
    category: 'Infraestructura',
    description: 'Hay una fuga constante junto al laboratorio B-204.',
    location: 'Bloque B · segundo piso',
    priority: 'Alta',
    status: 'En proceso',
    date: 'Hoy, 8:20 a. m.',
    evidence: true,
  },
  {
    id: 'CF-2026-011',
    title: 'Proyector sin señal',
    category: 'Tecnología',
    description: 'El proyector del salón no reconoce ningún computador.',
    location: 'Salón A-103',
    priority: 'Media',
    status: 'Abierto',
    date: 'Ayer, 3:42 p. m.',
    evidence: false,
  },
];
