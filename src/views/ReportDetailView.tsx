import { Text, View } from 'react-native';

import {
  Header,
  Meta,
  Page,
  PrimaryButton,
  StatusBadge,
  Timeline,
} from '../components/ui';
import type { AppScreenProps } from '../navigation/types';
import { styles } from '../theme/styles';
import { useCampusFixViewModel } from '../viewmodels/CampusFixViewModel';

export function ReportDetailView({ navigation, route }: AppScreenProps<'ReportDetail'>) {
  const { getReportById } = useCampusFixViewModel();
  const report = getReportById(route.params.reportId);

  if (!report) {
    return (
      <Page>
        <Header
          title="Detalle del reporte"
          subtitle="No disponible"
          back={() => navigation.goBack()}
        />
        <View style={styles.card}>
          <Text style={styles.cardTitle}>No encontramos este reporte</Text>
        </View>
      </Page>
    );
  }

  return (
    <Page>
      <Header
        title="Detalle del reporte"
        subtitle={report.id}
        back={() => navigation.goBack()}
      />
      <View style={styles.detailCard}>
        <View style={styles.topRow}>
          <Text style={styles.category}>{report.category}</Text>
          <StatusBadge status={report.status} />
        </View>
        <Text style={styles.detailTitle}>{report.title}</Text>
        <Text style={styles.detailCopy}>{report.description}</Text>
        <Meta label="UBICACIÓN" value={report.location} />
        <Meta label="PRIORIDAD" value={report.priority} />
      </View>

      <Text style={styles.section}>Seguimiento</Text>
      <Timeline title="Reporte recibido" copy={report.date} done />
      <Timeline
        title="Validación del equipo"
        copy={report.status === 'Abierto' ? 'Pendiente de asignación' : 'Asignado a Mantenimiento'}
        done={report.status !== 'Abierto'}
      />
      <Timeline
        title="Solución y cierre"
        copy={report.status === 'Resuelto' ? 'Incidente solucionado' : 'Pendiente'}
        done={report.status === 'Resuelto'}
        last
      />

      <Text style={styles.section}>Evidencia</Text>
      <View style={styles.evidencePreview}>
        <Text style={styles.evidenceText}>
          {report.evidence ? 'FOTOGRAFÍA ADJUNTA' : 'SIN FOTOGRAFÍA'}
        </Text>
      </View>
      <PrimaryButton
        label="Volver al inicio"
        onPress={() => navigation.reset({ index: 0, routes: [{ name: 'Home' }] })}
      />
    </Page>
  );
}
