import { Pressable, Text, View } from 'react-native';

import {
  BottomNavigation,
  Page,
  PrimaryButton,
  ReportCard,
  Stat,
} from '../components/ui';
import type { AppScreenProps } from '../navigation/types';
import { colors, styles } from '../theme/styles';
import { useCampusFixViewModel } from '../viewmodels/CampusFixViewModel';

export function HomeView({ navigation }: AppScreenProps<'Home'>) {
  const { reports, clearError } = useCampusFixViewModel();

  const openReport = (reportId: string) => {
    navigation.navigate('ReportDetail', { reportId });
  };

  const createReport = () => {
    clearError();
    navigation.navigate('ReportForm');
  };

  const signOut = () => {
    clearError();
    navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
  };

  return (
    <Page>
      <View style={styles.topRow}>
        <View>
          <Text style={styles.eyebrow}>CAMPUSFIX</Text>
          <Text style={styles.greeting}>Hola, Jorge</Text>
        </View>
        <Pressable onPress={signOut} style={styles.avatar}>
          <Text style={styles.avatarText}>JS</Text>
        </Pressable>
      </View>

      <View style={styles.hero}>
        <View style={styles.plusBox}>
          <Text style={styles.plus}>+</Text>
        </View>
        <Text style={styles.heroTitle}>¿Encontraste un problema?</Text>
        <Text style={styles.heroCopy}>Repórtalo en menos de dos minutos.</Text>
        <PrimaryButton label="Crear nuevo reporte" onPress={createReport} light />
      </View>

      <Text style={styles.section}>Resumen</Text>
      <View style={styles.stats}>
        <Stat
          value={reports.filter((report) => report.status === 'Abierto').length}
          label="Abiertos"
          color={colors.blue}
        />
        <Stat
          value={reports.filter((report) => report.status === 'En proceso').length}
          label="En proceso"
          color={colors.orange}
        />
        <Stat
          value={reports.filter((report) => report.status === 'Resuelto').length}
          label="Resueltos"
          color={colors.green}
        />
      </View>

      <View style={styles.sectionRow}>
        <Text style={styles.section}>Actividad reciente</Text>
        <Text onPress={() => navigation.navigate('Reports')} style={styles.link}>Ver todos</Text>
      </View>
      {reports.slice(0, 2).map((report) => (
        <ReportCard
          key={report.id}
          report={report}
          onPress={() => openReport(report.id)}
        />
      ))}

      <BottomNavigation
        active="home"
        home={() => undefined}
        reports={() => navigation.navigate('Reports')}
        create={createReport}
      />
    </Page>
  );
}
