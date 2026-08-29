import { StatusBar } from 'expo-status-bar';
import { useMemo, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

type Screen = 'login' | 'home' | 'form' | 'evidence' | 'success' | 'reports' | 'detail';
type Priority = 'Baja' | 'Media' | 'Alta';
type ReportStatus = 'Abierto' | 'En proceso' | 'Resuelto';
type Report = {
  id: string;
  title: string;
  category: string;
  description: string;
  location: string;
  priority: Priority;
  status: ReportStatus;
  date: string;
  evidence: boolean;
};

const C = {
  navy: '#142D52', blue: '#2363B4', teal: '#009187', orange: '#E67E22',
  green: '#18895B', red: '#C63C4C', ink: '#1F2937', muted: '#667085',
  line: '#D9E1EA', canvas: '#EEF3F8', white: '#FFFFFF', softBlue: '#EAF3FF',
  softTeal: '#E7F7F4', softOrange: '#FFF3E6',
};

const seedReports: Report[] = [
  {
    id: 'CF-2026-018', title: 'Fuga de agua en bloque B', category: 'Infraestructura',
    description: 'Hay una fuga constante junto al laboratorio B-204.',
    location: 'Bloque B · segundo piso', priority: 'Alta', status: 'En proceso',
    date: 'Hoy, 8:20 a. m.', evidence: true,
  },
  {
    id: 'CF-2026-011', title: 'Proyector sin señal', category: 'Tecnología',
    description: 'El proyector del salón no reconoce ningún computador.',
    location: 'Salón A-103', priority: 'Media', status: 'Abierto',
    date: 'Ayer, 3:42 p. m.', evidence: false,
  },
];

const categories = ['Infraestructura', 'Tecnología', 'Seguridad', 'Limpieza'];
const priorities: Priority[] = ['Baja', 'Media', 'Alta'];

export default function App() {
  const [screen, setScreen] = useState<Screen>('login');
  const [email, setEmail] = useState('jorge@campus.edu.co');
  const [password, setPassword] = useState('campusfix');
  const [category, setCategory] = useState('Infraestructura');
  const [title, setTitle] = useState('Luminaria averiada');
  const [description, setDescription] = useState(
    'La luminaria del pasillo parpadea y deja la zona con poca visibilidad.',
  );
  const [location, setLocation] = useState('Bloque C · primer piso');
  const [priority, setPriority] = useState<Priority>('Media');
  const [evidence, setEvidence] = useState(false);
  const [error, setError] = useState('');
  const [reports, setReports] = useState<Report[]>(seedReports);
  const [selectedId, setSelectedId] = useState(seedReports[0].id);
  const [filter, setFilter] = useState<'Todos' | ReportStatus>('Todos');

  const selected = reports.find((item) => item.id === selectedId) ?? reports[0];
  const visibleReports = useMemo(
    () => filter === 'Todos' ? reports : reports.filter((item) => item.status === filter),
    [filter, reports],
  );

  const openReport = (id: string) => {
    setSelectedId(id);
    setScreen('detail');
  };

  const signIn = () => {
    if (!email.trim() || !password.trim()) {
      setError('Ingresa el correo institucional y la contraseña.');
      return;
    }
    setError('');
    setScreen('home');
  };

  const nextStep = () => {
    if (!title.trim() || !description.trim()) {
      setError('Completa el título y la descripción del incidente.');
      return;
    }
    setError('');
    setScreen('evidence');
  };

  const submitReport = () => {
    if (!location.trim()) {
      setError('Indica dónde ocurrió el incidente.');
      return;
    }
    const created: Report = {
      id: `CF-2026-${String(19 + reports.length - seedReports.length).padStart(3, '0')}`,
      title: title.trim(), category, description: description.trim(), location: location.trim(),
      priority, status: 'Abierto', date: 'Ahora', evidence,
    };
    setReports((current) => [created, ...current]);
    setSelectedId(created.id);
    setError('');
    setScreen('success');
  };

  return (
    <View style={s.stage}>
      <StatusBar style="dark" />
      <SafeAreaView style={s.phone}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={s.flex}>
          {screen === 'login' && (
            <Page>
              <View style={s.logo}><Text style={s.logoSmall}>CAMPUS</Text><Text style={s.logoBig}>FIX</Text></View>
              <Text style={s.loginTitle}>Tu campus, siempre en buen estado</Text>
              <Text style={s.loginCopy}>Reporta incidentes y consulta su solución desde un solo lugar.</Text>
              <View style={s.card}>
                <Text style={s.cardTitle}>Iniciar sesión</Text>
                <Label text="Correo institucional" />
                <TextInput value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" style={s.input} />
                <Label text="Contraseña" />
                <TextInput value={password} onChangeText={setPassword} secureTextEntry style={s.input} />
                <Error text={error} />
                <Button label="Ingresar" onPress={signIn} />
                <Text style={s.centerLink}>¿Olvidaste tu contraseña?</Text>
              </View>
              <Text style={s.prototype}>PROTOTIPO INTERACTIVO · SPRINT 2</Text>
            </Page>
          )}

          {screen === 'home' && (
            <Page>
              <View style={s.topRow}>
                <View><Text style={s.eyebrow}>CAMPUSFIX</Text><Text style={s.greeting}>Hola, Jorge</Text></View>
                <Pressable onPress={() => setScreen('login')} style={s.avatar}><Text style={s.avatarText}>JS</Text></Pressable>
              </View>
              <View style={s.hero}>
                <View style={s.plusBox}><Text style={s.plus}>+</Text></View>
                <Text style={s.heroTitle}>¿Encontraste un problema?</Text>
                <Text style={s.heroCopy}>Repórtalo en menos de dos minutos.</Text>
                <Button label="Crear nuevo reporte" onPress={() => setScreen('form')} light />
              </View>
              <Text style={s.section}>Resumen</Text>
              <View style={s.stats}>
                <Stat value={reports.filter((x) => x.status === 'Abierto').length} label="Abiertos" color={C.blue} />
                <Stat value={reports.filter((x) => x.status === 'En proceso').length} label="En proceso" color={C.orange} />
                <Stat value={reports.filter((x) => x.status === 'Resuelto').length} label="Resueltos" color={C.green} />
              </View>
              <View style={s.sectionRow}><Text style={s.section}>Actividad reciente</Text><Text onPress={() => setScreen('reports')} style={s.link}>Ver todos</Text></View>
              {reports.slice(0, 2).map((item) => <ReportCard key={item.id} report={item} onPress={() => openReport(item.id)} />)}
              <BottomNav active="home" home={() => undefined} reports={() => setScreen('reports')} create={() => setScreen('form')} />
            </Page>
          )}

          {screen === 'form' && (
            <Page>
              <Header title="Nuevo reporte" subtitle="Cuéntanos qué ocurrió" back={() => setScreen('home')} />
              <Progress step={1} />
              <Label text="Categoría" />
              <View style={s.choiceGrid}>
                {categories.map((item) => <Choice key={item} label={item} active={category === item} onPress={() => setCategory(item)} />)}
              </View>
              <Label text="Título del incidente" />
              <TextInput value={title} onChangeText={setTitle} placeholder="Ej. Luminaria averiada" placeholderTextColor="#98A2B3" style={s.input} />
              <Label text="Descripción" />
              <TextInput value={description} onChangeText={setDescription} multiline textAlignVertical="top" maxLength={240} style={[s.input, s.area]} />
              <Text style={s.helper}>{description.length}/240 caracteres</Text>
              <Error text={error} />
              <Button label="Continuar" onPress={nextStep} />
            </Page>
          )}

          {screen === 'evidence' && (
            <Page>
              <Header title="Evidencia y ubicación" subtitle="Últimos detalles" back={() => setScreen('form')} />
              <Progress step={2} />
              <Label text="Ubicación del incidente" />
              <TextInput value={location} onChangeText={setLocation} placeholder="Bloque, piso o salón" placeholderTextColor="#98A2B3" style={s.input} />
              <Text style={s.locationLink}>⌖  Usar mi ubicación actual</Text>
              <Label text="Prioridad percibida" />
              <View style={s.chipRow}>
                {priorities.map((item) => <Chip key={item} label={item} active={priority === item} onPress={() => setPriority(item)} />)}
              </View>
              <Text style={s.helper}>El equipo responsable validará la prioridad final.</Text>
              <Label text="Evidencia fotográfica (opcional)" />
              <Pressable onPress={() => setEvidence((value) => !value)} style={[s.photo, evidence && s.photoActive]}>
                <View style={[s.camera, evidence && s.cameraActive]}><Text style={s.cameraText}>{evidence ? '✓' : 'CAM'}</Text></View>
                <Text style={s.photoTitle}>{evidence ? 'Evidencia agregada' : 'Agregar una fotografía'}</Text>
                <Text style={s.helper}>{evidence ? 'Toca para reemplazarla' : 'Toca para abrir la cámara'}</Text>
              </Pressable>
              <Error text={error} />
              <Button label="Enviar reporte" onPress={submitReport} />
              <OutlineButton label="Volver" onPress={() => setScreen('form')} />
            </Page>
          )}

          {screen === 'success' && selected && (
            <View style={s.successPage}>
              <View style={s.successCircle}><Text style={s.successCheck}>✓</Text></View>
              <Text style={s.successTitle}>¡Reporte enviado!</Text>
              <Text style={s.successCopy}>Recibimos la información y notificaremos al equipo responsable.</Text>
              <View style={s.ticket}>
                <Text style={s.ticketLabel}>NÚMERO DE REPORTE</Text>
                <Text style={s.ticketId}>{selected.id}</Text>
                <View style={s.divider} />
                <Text style={s.ticketTitle}>{selected.title}</Text>
                <Badge status={selected.status} />
              </View>
              <View style={s.full}><Button label="Ver detalle" onPress={() => setScreen('detail')} /><OutlineButton label="Volver al inicio" onPress={() => setScreen('home')} /></View>
            </View>
          )}

          {screen === 'reports' && (
            <Page>
              <View style={s.topRow}>
                <View><Text style={s.eyebrow}>SEGUIMIENTO</Text><Text style={s.pageTitle}>Mis reportes</Text></View>
                <Pressable onPress={() => setScreen('form')} style={s.addButton}><Text style={s.addText}>+</Text></Pressable>
              </View>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={s.filterBar}>
                {(['Todos', 'Abierto', 'En proceso', 'Resuelto'] as const).map((item) => <Chip key={item} label={item} active={filter === item} onPress={() => setFilter(item)} />)}
              </ScrollView>
              {visibleReports.map((item) => <ReportCard key={item.id} report={item} onPress={() => openReport(item.id)} />)}
              {!visibleReports.length && <View style={s.card}><Text style={s.cardTitle}>No hay reportes en este estado</Text><Text style={s.helper}>Selecciona otro filtro.</Text></View>}
              <BottomNav active="reports" home={() => setScreen('home')} reports={() => undefined} create={() => setScreen('form')} />
            </Page>
          )}

          {screen === 'detail' && selected && (
            <Page>
              <Header title="Detalle del reporte" subtitle={selected.id} back={() => setScreen('reports')} />
              <View style={s.detailCard}>
                <View style={s.topRow}><Text style={s.category}>{selected.category}</Text><Badge status={selected.status} /></View>
                <Text style={s.detailTitle}>{selected.title}</Text>
                <Text style={s.detailCopy}>{selected.description}</Text>
                <Meta label="UBICACIÓN" value={selected.location} />
                <Meta label="PRIORIDAD" value={selected.priority} />
              </View>
              <Text style={s.section}>Seguimiento</Text>
              <Timeline title="Reporte recibido" copy={selected.date} done />
              <Timeline title="Validación del equipo" copy={selected.status === 'Abierto' ? 'Pendiente de asignación' : 'Asignado a Mantenimiento'} done={selected.status !== 'Abierto'} />
              <Timeline title="Solución y cierre" copy={selected.status === 'Resuelto' ? 'Incidente solucionado' : 'Pendiente'} done={selected.status === 'Resuelto'} last />
              <Text style={s.section}>Evidencia</Text>
              <View style={s.evidencePreview}><Text style={s.evidenceText}>{selected.evidence ? 'FOTOGRAFÍA ADJUNTA' : 'SIN FOTOGRAFÍA'}</Text></View>
              <Button label="Volver al inicio" onPress={() => setScreen('home')} />
            </Page>
          )}
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}

function Page({ children }: { children: React.ReactNode }) {
  return <ScrollView contentContainerStyle={s.page} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>{children}</ScrollView>;
}

function Header({ title, subtitle, back }: { title: string; subtitle: string; back: () => void }) {
  return <View style={s.header}><Pressable onPress={back} style={s.back}><Text style={s.backText}>←</Text></Pressable><View style={s.flex}><Text style={s.pageTitle}>{title}</Text><Text style={s.subtitle}>{subtitle}</Text></View></View>;
}

function Progress({ step }: { step: 1 | 2 }) {
  return <View style={s.progressWrap}><View style={s.progressTrack}><View style={[s.progressFill, { width: step === 1 ? '50%' : '100%' }]} /></View><Text style={s.progressText}>Paso {step} de 2</Text></View>;
}

function Label({ text }: { text: string }) { return <Text style={s.label}>{text}</Text>; }
function Error({ text }: { text: string }) { return text ? <Text style={s.error}>{text}</Text> : null; }

function Button({ label, onPress, light = false }: { label: string; onPress: () => void; light?: boolean }) {
  return <Pressable onPress={onPress} style={({ pressed }) => [s.button, light && s.buttonLight, pressed && s.pressed]}><Text style={[s.buttonText, light && s.buttonTextLight]}>{label}</Text></Pressable>;
}

function OutlineButton({ label, onPress }: { label: string; onPress: () => void }) {
  return <Pressable onPress={onPress} style={({ pressed }) => [s.outlineButton, pressed && s.pressed]}><Text style={s.outlineText}>{label}</Text></Pressable>;
}

function Choice({ label, active, onPress }: { label: string; active: boolean; onPress: () => void }) {
  return <Pressable onPress={onPress} style={[s.choice, active && s.choiceActive]}><View style={[s.dot, active && s.dotActive]} /><Text style={[s.choiceText, active && s.choiceTextActive]}>{label}</Text></Pressable>;
}

function Chip({ label, active, onPress }: { label: string; active: boolean; onPress: () => void }) {
  return <Pressable onPress={onPress} style={[s.chip, active && s.chipActive]}><Text style={[s.chipText, active && s.chipTextActive]}>{label}</Text></Pressable>;
}

function Stat({ value, label, color }: { value: number; label: string; color: string }) {
  return <View style={s.stat}><Text style={[s.statValue, { color }]}>{value}</Text><Text style={s.statLabel}>{label}</Text></View>;
}

function Badge({ status }: { status: ReportStatus }) {
  const palette = status === 'Resuelto' ? [C.green, '#E7F6EE'] : status === 'En proceso' ? ['#A9550B', C.softOrange] : [C.blue, C.softBlue];
  return <View style={[s.badge, { backgroundColor: palette[1] }]}><Text style={[s.badgeText, { color: palette[0] }]}>{status}</Text></View>;
}

function ReportCard({ report, onPress }: { report: Report; onPress: () => void }) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [s.reportCard, pressed && s.pressed]}>
      <View style={s.topRow}><Text style={s.reportId}>{report.id}</Text><Badge status={report.status} /></View>
      <Text style={s.reportTitle}>{report.title}</Text>
      <Text style={s.reportMeta}>{report.category} · {report.location}</Text>
      <View style={s.topRow}><Text style={s.reportDate}>{report.date}</Text><Text style={s.arrow}>›</Text></View>
    </Pressable>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return <View style={s.meta}><Text style={s.metaLabel}>{label}</Text><Text style={s.metaValue}>{value}</Text></View>;
}

function Timeline({ title, copy, done, last = false }: { title: string; copy: string; done: boolean; last?: boolean }) {
  return <View style={s.timeline}><View style={s.rail}><View style={[s.timelineDot, done && s.timelineDone]}><Text style={s.timelineCheck}>{done ? '✓' : ''}</Text></View>{!last && <View style={[s.line, done && s.lineDone]} />}</View><View style={s.timelineCopy}><Text style={s.timelineTitle}>{title}</Text><Text style={s.helper}>{copy}</Text></View></View>;
}

function BottomNav({ active, home, reports, create }: { active: 'home' | 'reports'; home: () => void; reports: () => void; create: () => void }) {
  return <View style={s.nav}><Pressable onPress={home} style={s.navItem}><Text style={[s.navIcon, active === 'home' && s.navActive]}>⌂</Text><Text style={[s.navLabel, active === 'home' && s.navActive]}>Inicio</Text></Pressable><Pressable onPress={create} style={s.navCreate}><Text style={s.navCreateText}>+</Text></Pressable><Pressable onPress={reports} style={s.navItem}><Text style={[s.navIcon, active === 'reports' && s.navActive]}>▤</Text><Text style={[s.navLabel, active === 'reports' && s.navActive]}>Reportes</Text></Pressable></View>;
}

const s = StyleSheet.create({
  flex: { flex: 1 }, full: { width: '100%' }, pressed: { opacity: 0.78 },
  stage: { flex: 1, backgroundColor: '#D9E2EC', alignItems: 'center' },
  phone: { flex: 1, width: '100%', maxWidth: 480, backgroundColor: C.canvas, paddingTop: Platform.OS === 'android' ? 26 : 0 },
  page: { flexGrow: 1, paddingHorizontal: 20, paddingTop: 24, paddingBottom: 36 },
  logo: { width: 94, height: 94, borderRadius: 26, backgroundColor: C.navy, alignItems: 'center', justifyContent: 'center', alignSelf: 'center', marginTop: 28, marginBottom: 24 },
  logoSmall: { color: '#A8D8FF', fontSize: 13, fontWeight: '800', letterSpacing: 1.8 },
  logoBig: { color: C.white, fontSize: 29, fontWeight: '900' },
  loginTitle: { color: C.navy, fontSize: 28, lineHeight: 34, fontWeight: '800', textAlign: 'center' },
  loginCopy: { color: C.muted, fontSize: 15, lineHeight: 22, textAlign: 'center', marginTop: 10, marginBottom: 24 },
  card: { backgroundColor: C.white, borderRadius: 22, padding: 22, borderWidth: 1, borderColor: '#E5EAF0', elevation: 2 },
  cardTitle: { color: C.ink, fontSize: 20, fontWeight: '800', marginBottom: 6 },
  label: { color: C.ink, fontSize: 14, fontWeight: '700', marginTop: 17, marginBottom: 8 },
  input: { backgroundColor: '#F8FAFC', borderColor: C.line, borderWidth: 1, borderRadius: 13, minHeight: 50, paddingHorizontal: 15, color: C.ink, fontSize: 15 },
  area: { minHeight: 118, paddingTop: 14, paddingBottom: 14 },
  helper: { color: C.muted, fontSize: 12, lineHeight: 18, marginTop: 6 },
  error: { color: C.red, fontSize: 13, lineHeight: 18, marginTop: 10 },
  button: { minHeight: 52, borderRadius: 14, backgroundColor: C.blue, alignItems: 'center', justifyContent: 'center', marginTop: 20, paddingHorizontal: 18 },
  buttonLight: { backgroundColor: C.white }, buttonText: { color: C.white, fontSize: 16, fontWeight: '800' }, buttonTextLight: { color: C.navy },
  outlineButton: { minHeight: 50, borderRadius: 14, borderWidth: 1, borderColor: C.line, backgroundColor: C.white, alignItems: 'center', justifyContent: 'center', marginTop: 10 },
  outlineText: { color: C.navy, fontSize: 15, fontWeight: '800' }, centerLink: { color: C.blue, fontSize: 14, fontWeight: '700', textAlign: 'center', marginTop: 17 },
  prototype: { color: '#8996A8', fontSize: 10, fontWeight: '800', letterSpacing: 1.2, textAlign: 'center', marginTop: 22 },
  topRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }, eyebrow: { color: C.teal, fontSize: 11, fontWeight: '900', letterSpacing: 1.4, marginBottom: 4 },
  greeting: { color: C.navy, fontSize: 27, fontWeight: '800' }, avatar: { width: 46, height: 46, borderRadius: 16, backgroundColor: C.navy, alignItems: 'center', justifyContent: 'center' }, avatarText: { color: C.white, fontWeight: '900' },
  hero: { backgroundColor: C.navy, borderRadius: 24, padding: 22, marginTop: 22, marginBottom: 24 }, plusBox: { width: 48, height: 48, borderRadius: 15, backgroundColor: C.teal, alignItems: 'center', justifyContent: 'center', marginBottom: 16 }, plus: { color: C.white, fontSize: 31, lineHeight: 34 },
  heroTitle: { color: C.white, fontSize: 22, fontWeight: '800' }, heroCopy: { color: '#C8D8EA', fontSize: 14, marginTop: 7 },
  section: { color: C.navy, fontSize: 18, fontWeight: '800', marginTop: 7, marginBottom: 13 }, sectionRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 20 }, link: { color: C.blue, fontSize: 14, fontWeight: '700' },
  stats: { flexDirection: 'row', gap: 9 }, stat: { flex: 1, backgroundColor: C.white, borderRadius: 16, padding: 14, borderWidth: 1, borderColor: '#E7ECF2' }, statValue: { fontSize: 24, fontWeight: '900' }, statLabel: { color: C.muted, fontSize: 11, fontWeight: '700', marginTop: 3 },
  reportCard: { backgroundColor: C.white, borderRadius: 18, padding: 17, marginBottom: 12, borderWidth: 1, borderColor: '#E3E9F0', elevation: 1 }, reportId: { color: C.muted, fontSize: 12, fontWeight: '800' }, reportTitle: { color: C.ink, fontSize: 17, fontWeight: '800', marginTop: 10, marginBottom: 7 }, reportMeta: { color: C.muted, fontSize: 13 }, reportDate: { color: '#8A95A5', fontSize: 12, marginTop: 12 }, arrow: { color: C.blue, fontSize: 27, marginTop: 4 },
  badge: { borderRadius: 999, paddingHorizontal: 10, paddingVertical: 6 }, badgeText: { fontSize: 11, fontWeight: '800' },
  nav: { marginTop: 16, backgroundColor: C.white, borderRadius: 22, minHeight: 76, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', borderWidth: 1, borderColor: '#E1E8EF' }, navItem: { minWidth: 82, alignItems: 'center', paddingVertical: 10 }, navIcon: { color: C.muted, fontSize: 22 }, navLabel: { color: C.muted, fontSize: 11, fontWeight: '700' }, navActive: { color: C.blue }, navCreate: { width: 52, height: 52, borderRadius: 18, backgroundColor: C.blue, alignItems: 'center', justifyContent: 'center' }, navCreateText: { color: C.white, fontSize: 29 },
  header: { flexDirection: 'row', alignItems: 'center', gap: 13, marginBottom: 20 }, back: { width: 43, height: 43, borderRadius: 14, backgroundColor: C.white, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: C.line }, backText: { color: C.navy, fontSize: 24 }, pageTitle: { color: C.navy, fontSize: 24, fontWeight: '800' }, subtitle: { color: C.muted, fontSize: 13, marginTop: 2 },
  progressWrap: { marginBottom: 8 }, progressTrack: { height: 6, borderRadius: 99, backgroundColor: '#DCE5EF', overflow: 'hidden' }, progressFill: { height: '100%', backgroundColor: C.teal }, progressText: { color: C.muted, fontSize: 11, fontWeight: '700', textAlign: 'right', marginTop: 6 },
  choiceGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 9 }, choice: { width: '48%', minHeight: 55, borderRadius: 14, backgroundColor: C.white, borderWidth: 1, borderColor: C.line, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 13 }, choiceActive: { borderColor: C.blue, backgroundColor: C.softBlue }, dot: { width: 13, height: 13, borderRadius: 9, borderWidth: 2, borderColor: '#AAB4C2', marginRight: 9 }, dotActive: { borderColor: C.blue, backgroundColor: C.blue }, choiceText: { color: C.ink, fontSize: 12, fontWeight: '700', flexShrink: 1 }, choiceTextActive: { color: C.blue },
  chipRow: { flexDirection: 'row', gap: 4 }, chip: { backgroundColor: C.white, borderColor: C.line, borderWidth: 1, borderRadius: 99, paddingVertical: 10, paddingHorizontal: 15, marginRight: 7 }, chipActive: { backgroundColor: C.navy, borderColor: C.navy }, chipText: { color: C.muted, fontSize: 13, fontWeight: '700' }, chipTextActive: { color: C.white }, locationLink: { color: C.teal, fontSize: 13, fontWeight: '800', marginTop: 11 },
  photo: { minHeight: 156, borderWidth: 1.5, borderStyle: 'dashed', borderColor: '#AEBBC9', borderRadius: 18, backgroundColor: '#F8FAFC', alignItems: 'center', justifyContent: 'center', padding: 18 }, photoActive: { borderColor: C.teal, backgroundColor: C.softTeal }, camera: { width: 52, height: 52, borderRadius: 18, backgroundColor: C.navy, alignItems: 'center', justifyContent: 'center', marginBottom: 10 }, cameraActive: { backgroundColor: C.teal }, cameraText: { color: C.white, fontSize: 13, fontWeight: '900' }, photoTitle: { color: C.ink, fontSize: 15, fontWeight: '800' },
  successPage: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 }, successCircle: { width: 88, height: 88, borderRadius: 30, backgroundColor: C.teal, alignItems: 'center', justifyContent: 'center', marginBottom: 22 }, successCheck: { color: C.white, fontSize: 48, fontWeight: '800' }, successTitle: { color: C.navy, fontSize: 28, fontWeight: '900' }, successCopy: { color: C.muted, fontSize: 15, lineHeight: 22, textAlign: 'center', marginTop: 10, marginBottom: 22 }, ticket: { width: '100%', backgroundColor: C.white, borderRadius: 20, padding: 21, alignItems: 'center', borderWidth: 1, borderColor: C.line }, ticketLabel: { color: C.muted, fontSize: 10, fontWeight: '900', letterSpacing: 1.3 }, ticketId: { color: C.blue, fontSize: 25, fontWeight: '900', marginTop: 4 }, divider: { height: 1, backgroundColor: C.line, width: '100%', marginVertical: 16 }, ticketTitle: { color: C.ink, fontSize: 16, fontWeight: '800', marginBottom: 11 },
  addButton: { width: 45, height: 45, borderRadius: 15, backgroundColor: C.blue, alignItems: 'center', justifyContent: 'center' }, addText: { color: C.white, fontSize: 28 }, filterBar: { marginVertical: 18, flexGrow: 0 },
  detailCard: { backgroundColor: C.white, borderRadius: 22, padding: 20, borderWidth: 1, borderColor: C.line, marginBottom: 22 }, category: { color: C.teal, fontSize: 12, fontWeight: '900', textTransform: 'uppercase' }, detailTitle: { color: C.navy, fontSize: 22, lineHeight: 28, fontWeight: '900', marginTop: 13 }, detailCopy: { color: C.muted, fontSize: 14, lineHeight: 21, marginTop: 9 }, meta: { borderTopWidth: 1, borderTopColor: '#ECF0F4', paddingTop: 11, marginTop: 11 }, metaLabel: { color: '#8995A6', fontSize: 9, fontWeight: '900', letterSpacing: 1 }, metaValue: { color: C.ink, fontSize: 13, fontWeight: '700', marginTop: 4 },
  timeline: { flexDirection: 'row', minHeight: 68 }, rail: { width: 38, alignItems: 'center' }, timelineDot: { width: 24, height: 24, borderRadius: 20, borderWidth: 2, borderColor: '#BBC5D1', backgroundColor: C.canvas, alignItems: 'center', justifyContent: 'center' }, timelineDone: { backgroundColor: C.teal, borderColor: C.teal }, timelineCheck: { color: C.white, fontSize: 12, fontWeight: '900' }, line: { width: 2, flex: 1, backgroundColor: '#C9D2DC' }, lineDone: { backgroundColor: C.teal }, timelineCopy: { flex: 1, paddingBottom: 18 }, timelineTitle: { color: C.ink, fontSize: 14, fontWeight: '800' },
  evidencePreview: { minHeight: 120, borderRadius: 17, backgroundColor: C.navy, alignItems: 'center', justifyContent: 'center' }, evidenceText: { color: '#CDE0F3', fontSize: 11, fontWeight: '900', letterSpacing: 1.2 },
});
