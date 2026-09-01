import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { colors } from '../theme/styles';
import { EvidenceView } from '../views/EvidenceView';
import { HomeView } from '../views/HomeView';
import { LoginView } from '../views/LoginView';
import { ReportDetailView } from '../views/ReportDetailView';
import { ReportFormView } from '../views/ReportFormView';
import { ReportsView } from '../views/ReportsView';
import { SuccessView } from '../views/SuccessView';
import type { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

const navigationTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.canvas,
    card: colors.white,
    primary: colors.blue,
    text: colors.ink,
    border: colors.line,
  },
};

export function AppNavigator() {
  return (
    <NavigationContainer theme={navigationTheme}>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
          contentStyle: { backgroundColor: colors.canvas },
        }}
      >
        <Stack.Screen name="Login" component={LoginView} />
        <Stack.Screen name="Home" component={HomeView} />
        <Stack.Screen name="ReportForm" component={ReportFormView} />
        <Stack.Screen name="Evidence" component={EvidenceView} />
        <Stack.Screen name="Success" component={SuccessView} />
        <Stack.Screen name="Reports" component={ReportsView} />
        <Stack.Screen name="ReportDetail" component={ReportDetailView} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
