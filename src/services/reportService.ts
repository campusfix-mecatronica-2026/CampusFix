import { signInWithEmailAndPassword, signOut as firebaseSignOut } from 'firebase/auth';
import {
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  Timestamp,
  where,
  writeBatch,
} from 'firebase/firestore';

import { auth, db } from '../config/firebase';
import type { Report, ReportDraft } from '../models/Report';

const categoryIds: Record<string, string> = {
  Aseo: 'aseo',
  Infraestructura: 'infraestructura',
  Seguridad: 'seguridad',
  Tecnología: 'tecnologia',
};

const categoryNames: Record<string, string> = {
  aseo: 'Aseo',
  infraestructura: 'Infraestructura',
  seguridad: 'Seguridad',
  tecnologia: 'Tecnología',
};

function dateLabel(value: unknown): string {
  if (value instanceof Timestamp) {
    return value.toDate().toLocaleString('es-CO', {
      day: 'numeric',
      month: 'short',
      hour: 'numeric',
      minute: '2-digit',
    });
  }

  return 'Ahora';
}

function toReport(id: string, data: Record<string, unknown>): Report {
  const location = data.location as { label?: string } | undefined;

  return {
    id,
    title: String(data.title ?? 'Reporte sin título'),
    category: categoryNames[String(data.categoryId ?? '')] ?? String(data.categoryId ?? ''),
    description: String(data.description ?? ''),
    location: location?.label ?? 'Ubicación no registrada',
    priority: data.priority === 'Baja' || data.priority === 'Alta' ? data.priority : 'Media',
    status: data.status === 'En proceso' || data.status === 'Resuelto' ? data.status : 'Abierto',
    date: dateLabel(data.createdAt),
    evidence: Boolean(data.evidencePath),
  };
}

export async function signInUser(email: string, password: string): Promise<string> {
  const credential = await signInWithEmailAndPassword(auth, email.trim(), password);
  return credential.user.uid;
}

export async function signOutUser(): Promise<void> {
  await firebaseSignOut(auth);
}

export async function loadReports(userId: string): Promise<Report[]> {
  const snapshot = await getDocs(query(
    collection(db, 'reports'),
    where('reporterId', '==', userId),
    orderBy('createdAt', 'desc'),
  ));

  return snapshot.docs.map((item) => toReport(item.id, item.data()));
}

export async function createReport(draft: ReportDraft, userId: string): Promise<Report> {
  const reportRef = doc(collection(db, 'reports'));
  const historyRef = doc(collection(reportRef, 'history'));
  const batch = writeBatch(db);
  const createdAt = Timestamp.now();
  const reportData = {
    title: draft.title.trim(),
    description: draft.description.trim(),
    categoryId: categoryIds[draft.category] ?? draft.category.toLowerCase(),
    priority: draft.priority,
    status: 'Abierto',
    reporterId: userId,
    assigneeId: null,
    evidencePath: null,
    resolvedAt: null,
    location: { label: draft.location.trim() },
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };

  batch.set(reportRef, reportData);
  batch.set(historyRef, {
    type: 'created',
    actorId: userId,
    previousStatus: null,
    newStatus: 'Abierto',
    comment: 'Reporte creado desde la aplicación CampusFix.',
    createdAt: serverTimestamp(),
  });
  await batch.commit();

  return toReport(reportRef.id, { ...reportData, createdAt });
}
