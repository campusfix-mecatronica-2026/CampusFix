import { Text, TextInput, View } from 'react-native';

import {
  Choice,
  ErrorMessage,
  Header,
  Label,
  Page,
  PrimaryButton,
  Progress,
} from '../components/ui';
import { categories } from '../data/reportData';
import type { AppScreenProps } from '../navigation/types';
import { styles } from '../theme/styles';
import { useCampusFixViewModel } from '../viewmodels/CampusFixViewModel';

export function ReportFormView({ navigation }: AppScreenProps<'ReportForm'>) {
  const {
    category,
    title,
    description,
    error,
    setCategory,
    setTitle,
    setDescription,
    validateReportInformation,
  } = useCampusFixViewModel();

  const continueToEvidence = () => {
    if (validateReportInformation()) {
      navigation.navigate('Evidence');
    }
  };

  return (
    <Page>
      <Header
        title="Nuevo reporte"
        subtitle="Cuéntanos qué ocurrió"
        back={() => navigation.goBack()}
      />
      <Progress step={1} />
      <Label text="Categoría" />
      <View style={styles.choiceGrid}>
        {categories.map((item) => (
          <Choice
            key={item}
            label={item}
            active={category === item}
            onPress={() => setCategory(item)}
          />
        ))}
      </View>
      <Label text="Título del incidente" />
      <TextInput
        value={title}
        onChangeText={setTitle}
        placeholder="Ej. Luminaria averiada"
        placeholderTextColor="#98A2B3"
        style={styles.input}
      />
      <Label text="Descripción" />
      <TextInput
        value={description}
        onChangeText={setDescription}
        multiline
        textAlignVertical="top"
        maxLength={240}
        style={[styles.input, styles.area]}
      />
      <Text style={styles.helper}>{description.length}/240 caracteres</Text>
      <ErrorMessage text={error} />
      <PrimaryButton label="Continuar" onPress={continueToEvidence} />
    </Page>
  );
}
