import { Text, TextInput, View } from 'react-native';

import { ErrorMessage, Label, Page, PrimaryButton } from '../components/ui';
import type { AppScreenProps } from '../navigation/types';
import { styles } from '../theme/styles';
import { useCampusFixViewModel } from '../viewmodels/CampusFixViewModel';

export function LoginView({ navigation }: AppScreenProps<'Login'>) {
  const {
    email,
    password,
    error,
    setEmail,
    setPassword,
    signIn,
  } = useCampusFixViewModel();

  const handleSignIn = () => {
    if (signIn()) {
      navigation.reset({ index: 0, routes: [{ name: 'Home' }] });
    }
  };

  return (
    <Page>
      <View style={styles.logo}>
        <Text style={styles.logoSmall}>CAMPUS</Text>
        <Text style={styles.logoBig}>FIX</Text>
      </View>
      <Text style={styles.loginTitle}>Tu campus, siempre en buen estado</Text>
      <Text style={styles.loginCopy}>
        Reporta incidentes y consulta su solución desde un solo lugar.
      </Text>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Iniciar sesión</Text>
        <Label text="Correo institucional" />
        <TextInput
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          style={styles.input}
        />
        <Label text="Contraseña" />
        <TextInput
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
        />
        <ErrorMessage text={error} />
        <PrimaryButton label="Ingresar" onPress={handleSignIn} />
        <Text style={styles.centerLink}>¿Olvidaste tu contraseña?</Text>
      </View>
      <Text style={styles.prototype}>INCREMENTO FUNCIONAL · SPRINT 3</Text>
    </Page>
  );
}
