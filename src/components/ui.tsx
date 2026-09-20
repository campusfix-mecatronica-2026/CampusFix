import type { ReactNode } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';

import type { Report, ReportStatus } from '../models/Report';
import { colors, styles } from '../theme/styles';

export function Page({ children }: { children: ReactNode }) {
  return (
    <ScrollView
      contentContainerStyle={styles.page}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      {children}
    </ScrollView>
  );
}

export function Header({
  title,
  subtitle,
  back,
}: {
  title: string;
  subtitle: string;
  back: () => void;
}) {
  return (
    <View style={styles.header}>
      <Pressable onPress={back} style={styles.back}>
        <Text style={styles.backText}>←</Text>
      </Pressable>
      <View style={styles.flex}>
        <Text style={styles.pageTitle}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
    </View>
  );
}

export function Progress({ step }: { step: 1 | 2 }) {
  return (
    <View style={styles.progressWrap}>
      <View style={styles.progressTrack}>
        <View style={[styles.progressFill, { width: step === 1 ? '50%' : '100%' }]} />
      </View>
      <Text style={styles.progressText}>Paso {step} de 2</Text>
    </View>
  );
}

export function Label({ text }: { text: string }) {
  return <Text style={styles.label}>{text}</Text>;
}

export function ErrorMessage({ text }: { text: string }) {
  return text ? <Text style={styles.error}>{text}</Text> : null;
}

export function PrimaryButton({
  label,
  onPress,
  light = false,
}: {
  label: string;
  onPress: () => void;
  light?: boolean;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        light && styles.buttonLight,
        pressed && styles.pressed,
      ]}
    >
      <Text style={[styles.buttonText, light && styles.buttonTextLight]}>{label}</Text>
    </Pressable>
  );
}

export function OutlineButton({ label, onPress }: { label: string; onPress: () => void }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.outlineButton, pressed && styles.pressed]}
    >
      <Text style={styles.outlineText}>{label}</Text>
    </Pressable>
  );
}

export function Choice({
  label,
  active,
  onPress,
}: {
  label: string;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable onPress={onPress} style={[styles.choice, active && styles.choiceActive]}>
      <View style={[styles.dot, active && styles.dotActive]} />
      <Text style={[styles.choiceText, active && styles.choiceTextActive]}>{label}</Text>
    </Pressable>
  );
}

export function Chip({
  label,
  active,
  onPress,
}: {
  label: string;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable onPress={onPress} style={[styles.chip, active && styles.chipActive]}>
      <Text style={[styles.chipText, active && styles.chipTextActive]}>{label}</Text>
    </Pressable>
  );
}

export function Stat({ value, label, color }: { value: number; label: string; color: string }) {
  return (
    <View style={styles.stat}>
      <Text style={[styles.statValue, { color }]}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

export function StatusBadge({ status }: { status: ReportStatus }) {
  const palette = status === 'Resuelto'
    ? [colors.green, '#E7F6EE']
    : status === 'En proceso'
      ? ['#A9550B', colors.softOrange]
      : [colors.blue, colors.softBlue];

  return (
    <View style={[styles.badge, { backgroundColor: palette[1] }]}>
      <Text style={[styles.badgeText, { color: palette[0] }]}>{status}</Text>
    </View>
  );
}

export function ReportCard({ report, onPress }: { report: Report; onPress: () => void }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.reportCard, pressed && styles.pressed]}
    >
      <View style={styles.topRow}>
        <Text style={styles.reportId}>{report.id}</Text>
        <StatusBadge status={report.status} />
      </View>
      <Text style={styles.reportTitle}>{report.title}</Text>
      <Text style={styles.reportMeta}>{report.category} · {report.location}</Text>
      <View style={styles.topRow}>
        <Text style={styles.reportDate}>{report.date}</Text>
        <Text style={styles.arrow}>›</Text>
      </View>
    </Pressable>
  );
}

export function Meta({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.meta}>
      <Text style={styles.metaLabel}>{label}</Text>
      <Text style={styles.metaValue}>{value}</Text>
    </View>
  );
}

export function Timeline({
  title,
  copy,
  done,
  last = false,
}: {
  title: string;
  copy: string;
  done: boolean;
  last?: boolean;
}) {
  return (
    <View style={styles.timeline}>
      <View style={styles.rail}>
        <View style={[styles.timelineDot, done && styles.timelineDone]}>
          <Text style={styles.timelineCheck}>{done ? '✓' : ''}</Text>
        </View>
        {!last && <View style={[styles.line, done && styles.lineDone]} />}
      </View>
      <View style={styles.timelineCopy}>
        <Text style={styles.timelineTitle}>{title}</Text>
        <Text style={styles.helper}>{copy}</Text>
      </View>
    </View>
  );
}

export function BottomNavigation({
  active,
  home,
  reports,
  create,
}: {
  active: 'home' | 'reports';
  home: () => void;
  reports: () => void;
  create: () => void;
}) {
  return (
    <View style={styles.nav}>
      <Pressable onPress={home} style={styles.navItem}>
        <Text style={[styles.navIcon, active === 'home' && styles.navActive]}>⌂</Text>
        <Text style={[styles.navLabel, active === 'home' && styles.navActive]}>Inicio</Text>
      </Pressable>
      <Pressable onPress={create} style={styles.navCreate}>
        <Text style={styles.navCreateText}>+</Text>
      </Pressable>
      <Pressable onPress={reports} style={styles.navItem}>
        <Text style={[styles.navIcon, active === 'reports' && styles.navActive]}>▤</Text>
        <Text style={[styles.navLabel, active === 'reports' && styles.navActive]}>Reportes</Text>
      </Pressable>
    </View>
  );
}
