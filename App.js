// PCGarage Service Tracking App
// Haduwe: Gemini (Google AI)
// UI/UX Design: Professional & Clean

import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  TextInput,
  StatusBar,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Feather, Ionicons } from '@expo/vector-icons';

// --- Me libraries install karaganna one ---
// Terminal eke me commands run karanna:
// npm install @react-navigation/native @react-navigation/stack
// expo install react-native-gesture-handler react-native-screens react-native-safe-area-context

const Stack = createStackNavigator();

// --- App eke colors ---
const COLORS = {
  primary: '#007AFF', // Apple Blue
  secondary: '#F2F2F7', // Light Gray
  text: '#000000',
  textSecondary: '#8E8E93',
  white: '#FFFFFF',
  green: '#34C759',
  orange: '#FF9500',
  red: '#FF3B30',
  card: '#FFFFFF',
  background: '#F2F2F7',
};

// --- Mock Data (App eka test karanna data) ---
// Niyamith app ekaka, me data database ekakin (Firebase wage) ganna one.
const INITIAL_JOBS = [
  {
    id: '1',
    customerName: 'Nimal Perera',
    device: 'MacBook Pro 13"',
    issue: 'Display eka weda karanne ne.',
    status: 'In Progress', // 'Pending', 'In Progress', 'Completed'
    date: '2024-07-20',
  },
  {
    id: '2',
    customerName: 'Sunil Shantha',
    device: 'Dell Inspiron 15',
    issue: 'Windows boot wenne ne.',
    status: 'Pending',
    date: '2024-07-19',
  },
  {
    id: '3',
    customerName: 'Kamala Silva',
    device: 'HP Pavilion Gaming',
    issue: 'Keyboard eke "A" key eka weda ne.',
    status: 'Completed',
    date: '2024-07-18',
  },
];

// --- Status eka anuwa color eka wenas karana component eka ---
const StatusBadge = ({ status }) => {
  const statusStyle = {
    backgroundColor:
      status === 'Completed'
        ? COLORS.green
        : status === 'In Progress'
        ? COLORS.orange
        : COLORS.red,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
  };
  const textStyle = {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: 'bold',
  };
  return (
    <View style={statusStyle}>
      <Text style={textStyle}>{status}</Text>
    </View>
  );
};

// --- Home Screen (Mul Pituwa) ---
const HomeScreen = ({ navigation, jobs }) => {
  const renderJobCard = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('JobDetails', { job: item })}
    >
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>{item.device}</Text>
        <StatusBadge status={item.status} />
      </View>
      <Text style={styles.cardSubtitle}>Customer: {item.customerName}</Text>
      <Text style={styles.cardDate}>{item.date}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={jobs}
        renderItem={renderJobCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16 }}
        ListHeaderComponent={
          <Text style={styles.headerTitle}>Active Jobs</Text>
        }
      />
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('AddJob')}
      >
        <Feather name="plus" size={28} color={COLORS.white} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

// --- Job Details Screen (Job eke wisthara) ---
const JobDetailsScreen = ({ route }) => {
  const { job } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.detailsContainer}>
        <View style={styles.detailsHeader}>
          <Text style={styles.detailsTitle}>{job.device}</Text>
          <StatusBadge status={job.status} />
        </View>

        <View style={styles.detailsCard}>
          <View style={styles.detailRow}>
            <Ionicons name="person-outline" size={24} color={COLORS.primary} />
            <View style={styles.detailTextContainer}>
              <Text style={styles.detailLabel}>Customer Name</Text>
              <Text style={styles.detailValue}>{job.customerName}</Text>
            </View>
          </View>
        </View>

        <View style={styles.detailsCard}>
          <View style={styles.detailRow}>
            <Ionicons name="construct-outline" size={24} color={COLORS.primary} />
            <View style={styles.detailTextContainer}>
              <Text style={styles.detailLabel}>Getaluwa (Issue)</Text>
              <Text style={styles.detailValue}>{job.issue}</Text>
            </View>
          </View>
        </View>

        <View style={styles.detailsCard}>
          <View style={styles.detailRow}>
            <Ionicons name="calendar-outline" size={24} color={COLORS.primary} />
            <View style={styles.detailTextContainer}>
              <Text style={styles.detailLabel}>Date Received</Text>
              <Text style={styles.detailValue}>{job.date}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// --- Add Job Screen (Aluth Job ekak add karana thana) ---
const AddJobScreen = ({ navigation, addJob }) => {
  const [customerName, setCustomerName] = useState('');
  const [device, setDevice] = useState('');
  const [issue, setIssue] = useState('');

  const handleSave = () => {
    if (customerName && device && issue) {
      const newJob = {
        id: Date.now().toString(),
        customerName,
        device,
        issue,
        status: 'Pending',
        date: new Date().toISOString().split('T')[0],
      };
      addJob(newJob);
      navigation.goBack();
    } else {
      alert('Please fill all fields.'); // Simple validation
    }
  };

  return (
    <SafeAreaView style={styles.container}>
       <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.formContainer}>
          <Text style={styles.formTitle}>Aluth Job Ekak Add Karanna</Text>
          <TextInput
            style={styles.input}
            placeholder="Kustomerge Nama (Customer's Name)"
            value={customerName}
            onChangeText={setCustomerName}
            placeholderTextColor={COLORS.textSecondary}
          />
          <TextInput
            style={styles.input}
            placeholder="Upangaya (Device e.g., MacBook Pro)"
            value={device}
            onChangeText={setDevice}
            placeholderTextColor={COLORS.textSecondary}
          />
          <TextInput
            style={[styles.input, { height: 120, textAlignVertical: 'top' }]}
            placeholder="Getaluwa (Issue Description)"
            value={issue}
            onChangeText={setIssue}
            multiline
            placeholderTextColor={COLORS.textSecondary}
          />
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Job Eka Save Karanna</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

// --- Mul App Component Eka ---
export default function App() {
  const [jobs, setJobs] = useState(INITIAL_JOBS);

  const addJob = (newJob) => {
    setJobs([newJob, ...jobs]);
  };

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: COLORS.white,
              elevation: 0, // Android
              shadowOpacity: 0, // iOS
            },
            headerTintColor: COLORS.text,
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerBackTitleVisible: false,
          }}
        >
          <Stack.Screen name="PCGarage" options={{
             headerTitle: () => (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Ionicons name="build" size={26} color={COLORS.primary} />
                    <Text style={{ fontSize: 22, fontWeight: 'bold', marginLeft: 10, color: COLORS.text }}>PCGarage</Text>
                </View>
             )
          }}>
            {(props) => <HomeScreen {...props} jobs={jobs} />}
          </Stack.Screen>
          <Stack.Screen
            name="JobDetails"
            component={JobDetailsScreen}
            options={{ title: 'Job Wisthara' }}
          />
          <Stack.Screen name="AddJob">
            {(props) => <AddJobScreen {...props} addJob={addJob} />}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

// --- App eke Styles ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 16,
  },
  // Card Styles
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    flex: 1,
  },
  cardSubtitle: {
    fontSize: 15,
    color: COLORS.textSecondary,
    marginBottom: 4,
  },
  cardDate: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginTop: 8,
  },
  // FAB (Floating Action Button)
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 30,
    backgroundColor: COLORS.primary,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 8,
  },
  // Details Screen Styles
  detailsContainer: {
    padding: 20,
  },
  detailsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  detailsTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: COLORS.text,
    flex: 1,
  },
  detailsCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailTextContainer: {
    marginLeft: 16,
  },
  detailLabel: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 17,
    color: COLORS.text,
    fontWeight: '500',
  },
  // Add Job Form Styles
  formContainer: {
    padding: 20,
    flexGrow: 1,
  },
  formTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    color: COLORS.text,
  },
  input: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#EFEFEF',
  },
  saveButton: {
    backgroundColor: COLORS.primary,
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 16,
  },
  saveButtonText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
});
