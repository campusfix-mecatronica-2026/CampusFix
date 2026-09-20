import { Text, View } from 'react-native';

import { OutlineButton, PrimaryButton, StatusBadge } from '../components/ui';
import type { AppScreenProps } from '../navigation/types';
import { styles } from '../theme/styles';
import { useCampusFixViewModel } from '../viewmodels/CampusFixViewModel';

export function SuccessView({ navigation, route }: AppScreenProps<'Success'>) {
  const { getReportById } = useCampusFixViewModel();
  const report = getReportById(route.params.reportId);

  if (!report) {
    return (
      <View style={styles.successPage}>
        <Text style={styles.successTitle}>Reporte no disponible</Text>
        <PrimaryButton
          label="Volver al inicio"
          onPress={() => navigation.reset({ index: 0, routes: [{ name: 'Home' }] })}
        />
      </View>
    );
  }

  return (
    <View style={styles.successPage}>
      <View style={styles.successCircle}>
        <Text style={styles.successCheck}>✓</Text>
      </View>
      <Text style={styles.successTitle}>¡Reporte enviado!</Text>
      <Text style={styles.successCopy}>
        Recibimos la información y notificaremos al equipo responsable.
      </Text>
      <View style={styles.ticket}>
        <Text style={styles.ticketLabel}>NÚMERO DE REPORTE</Text>
        <Text style={styles.ticketId}>{report.id}</Text>
        <View style={styles.divider} />
        <Text style={styles.ticketTitle}>{report.title}</Text>
        <StatusBadge status={report.status} />
      </View>
      <View style={styles.full}>
        <PrimaryButton
          label="Ver detalle"
          onPress={() => navigation.replace('ReportDetail', { reportId: report.id })}
        />
        <OutlineButton
          label="Volver al inicio"
          onPress={() => navigation.reset({ index: 0, routes: [{ name: 'Home' }] })}
        />
      </View>
    </View>
  );
}
