import { Pressable, ScrollView, Text, View } from 'react-native';

import {
  BottomNavigation,
  Chip,
  Page,
  ReportCard,
} from '../components/ui';
import type { ReportFilter } from '../models/Report';
import type { AppScreenProps } from '../navigation/types';
import { styles } from '../theme/styles';
import { useCampusFixViewModel } from '../viewmodels/CampusFixViewModel';

const filters: ReportFilter[] = ['Todos', 'Abierto', 'En proceso', 'Resuelto'];

export function ReportsView({ navigation }: AppScreenProps<'Reports'>) {
  const { filter, visibleReports, setFilter, clearError } = useCampusFixViewModel();

  const createReport = () => {
    clearError();
    navigation.navigate('ReportForm');
  };

  return (
    <Page>
      <View style={styles.topRow}>
        <View>
          <Text style={styles.eyebrow}>SEGUIMIENTO</Text>
          <Text style={styles.pageTitle}>Mis reportes</Text>
        </View>
        <Pressable onPress={createReport} style={styles.addButton}>
          <Text style={styles.addText}>+</Text>
        </Pressable>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterBar}>
        {filters.map((item) => (
          <Chip
            key={item}
            label={item}
            active={filter === item}
            onPress={() => setFilter(item)}
          />
        ))}
      </ScrollView>

      {visibleReports.map((report) => (
        <ReportCard
          key={report.id}
          report={report}
          onPress={() => navigation.navigate('ReportDetail', { reportId: report.id })}
        />
      ))}
      {!visibleReports.length && (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>No hay reportes en este estado</Text>
          <Text style={styles.helper}>Selecciona otro filtro.</Text>
        </View>
      )}

      <BottomNavigation
        active="reports"
        home={() => navigation.navigate('Home')}
        reports={() => undefined}
        create={createReport}
      />
    </Page>
  );
}
