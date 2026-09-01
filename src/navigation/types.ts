import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  ReportForm: undefined;
  Evidence: undefined;
  Success: { reportId: string };
  Reports: undefined;
  ReportDetail: { reportId: string };
};

export type AppScreenProps<RouteName extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, RouteName>;
