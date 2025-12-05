import Accordion from "@/components/ui/Accordion";
import { useState, useEffect } from "react";
import { ScrollView, Text, TouchableOpacity, View, FlatList, StyleSheet } from "react-native";
import { blue } from "react-native-reanimated/lib/typescript/Colors";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {

  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState<any>();

  const [families, setFamilies] = useState<string[]>([]);
  const [accords, setAccords] = useState<string[]>([]);
  const [notes, setNotes] = useState<string[]>([]);

  const fetchFamilies = async () => {
    try {
      setError(null);
      setLoading(true);

      const response = await fetch('http://100.64.34.31:3000/api/fragrances/get-terms/Family');
      const json = await response.json();
      setFamilies(json);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
        console.error("Error fetching families", err.message);
      }
    } finally {
      setLoading(false);
    }
  }

  const fetchAccords = async () => {
    try {
      setError(null);
      setLoading(true);

      const response = await fetch('http://100.64.34.31:3000/api/fragrances/get-terms/Accord');
      const json = await response.json();
      setAccords(json);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
        console.error("Error fetching families", err.message);
      }
    } finally {
      setLoading(false);
    }
  }

  const fetchNotes = async () => {
    try {
      setError(null);
      setLoading(true);

      const response = await fetch('http://100.64.34.31:3000/api/fragrances/get-terms/Note');
      const json = await response.json();
      setNotes(json);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
        console.error("Error fetching families", err.message);
      }
    } finally {
      setLoading(false);
    }
  }


  // const fetchFragrancesAnd = async () => {
  //   try {
  //     setError(null);
  //     setLoading(true);

  //     const response = await fetch(`http://100.64.34.31:3000/api/fragrances/and?${}`);
  //     const json = await response.json();
  //     setNotes(json);
  //   } catch (err: unknown) {
  //     if (err instanceof Error) {
  //       setError(err.message);
  //       console.error("Error fetching fragrances", err.message);
  //     }
  //   } finally {
  //     setLoading(false);
  //   }
  // }

  useEffect(() => {
    fetchFamilies();
    fetchAccords();
    fetchNotes();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
      }}
    >
      <View style={styles.headingContainer}>
        <Text style={{ textAlign: 'center' }}>Select notes below to search for matching fragrances.</Text>
      </View>
      <ScrollView >
        <Accordion title="Families" vals={families}></Accordion>
        <Accordion title="Accords" vals={accords}></Accordion>
        <Accordion title="Notes" vals={notes}></Accordion>
      </ScrollView>
    </View >
  );
}

const styles = StyleSheet.create({
  headingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: 320,
    minHeight: 100,
    maxHeight: 100,
    marginBottom: 20,
  },
  fragranceContainer: {
    padding: 20,
    margin: 5,
    borderRadius: 6,
    borderColor: 'black',
    borderWidth: 2,
  },
  chipHeading: {
    fontSize: 20,
    fontWeight: 600,
    marginBottom: 3,
  },
  chipSub: {
    fontSize: 14,
    fontWeight: 400,
  },

});
