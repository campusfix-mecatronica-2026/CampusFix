import { StatusBar } from 'expo-status-bar';
import { KeyboardAvoidingView, Platform, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import { AppNavigator } from './src/navigation/AppNavigator';
import { styles } from './src/theme/styles';
import { CampusFixViewModelProvider } from './src/viewmodels/CampusFixViewModel';

export default function App() {
  return (
    <SafeAreaProvider>
      <View style={styles.stage}>
        <StatusBar style="dark" />
        <SafeAreaView style={styles.phone} edges={['top', 'bottom']}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            style={styles.flex}
          >
            <CampusFixViewModelProvider>
              <AppNavigator />
            </CampusFixViewModelProvider>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </View>
    </SafeAreaProvider>
  );
}
