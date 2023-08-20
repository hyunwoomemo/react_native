import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.header}>
        <Text style={styles.btnText}>Work</Text>
        <Text style={styles.btnText}>Travel</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingHorizontal: 20
  },
  header: {
    flex: 1,
    justifyContent: 'space-between',
    marginTop: 100,
    flexDirection: 'row'
  },
  btnText: {
    fontSize: 38,
    fontWeight: "600",
    color: 'white'
  }
});
