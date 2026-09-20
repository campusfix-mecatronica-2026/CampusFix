import { Pressable, Text, TextInput, View } from 'react-native';

import {
  Chip,
  ErrorMessage,
  Header,
  Label,
  OutlineButton,
  Page,
  PrimaryButton,
  Progress,
} from '../components/ui';
import { priorities } from '../data/reportData';
import type { AppScreenProps } from '../navigation/types';
import { styles } from '../theme/styles';
import { useCampusFixViewModel } from '../viewmodels/CampusFixViewModel';

export function EvidenceView({ navigation }: AppScreenProps<'Evidence'>) {
  const {
    location,
    priority,
    evidence,
    error,
    setLocation,
    setPriority,
    setEvidence,
    submitReport,
  } = useCampusFixViewModel();

  const handleSubmit = () => {
    const created = submitReport();

    if (created) {
      navigation.replace('Success', { reportId: created.id });
    }
  };

  return (
    <Page>
      <Header
        title="Evidencia y ubicación"
        subtitle="Últimos detalles"
        back={() => navigation.goBack()}
      />
      <Progress step={2} />
      <Label text="Ubicación del incidente" />
      <TextInput
        value={location}
        onChangeText={setLocation}
        placeholder="Bloque, piso o salón"
        placeholderTextColor="#98A2B3"
        style={styles.input}
      />
      <Text style={styles.locationLink}>⌖  Usar mi ubicación actual</Text>
      <Label text="Prioridad percibida" />
      <View style={styles.chipRow}>
        {priorities.map((item) => (
          <Chip
            key={item}
            label={item}
            active={priority === item}
            onPress={() => setPriority(item)}
          />
        ))}
      </View>
      <Text style={styles.helper}>El equipo responsable validará la prioridad final.</Text>
      <Label text="Evidencia fotográfica (opcional)" />
      <Pressable
        onPress={() => setEvidence(!evidence)}
        style={[styles.photo, evidence && styles.photoActive]}
      >
        <View style={[styles.camera, evidence && styles.cameraActive]}>
          <Text style={styles.cameraText}>{evidence ? '✓' : 'CAM'}</Text>
        </View>
        <Text style={styles.photoTitle}>
          {evidence ? 'Evidencia agregada' : 'Agregar una fotografía'}
        </Text>
        <Text style={styles.helper}>
          {evidence ? 'Toca para reemplazarla' : 'Toca para abrir la cámara'}
        </Text>
      </Pressable>
      <ErrorMessage text={error} />
      <PrimaryButton label="Enviar reporte" onPress={handleSubmit} />
      <OutlineButton label="Volver" onPress={() => navigation.goBack()} />
    </Page>
  );
}
