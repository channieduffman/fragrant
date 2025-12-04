import { useState, useEffect } from "react";
import { Text, TouchableOpacity, View, FlatList, StyleSheet, Touchable } from "react-native";

type OptionProps = {
    name: string,
}

export function SelectableOption(props: OptionProps) {

    const [isSelected, setIsSelected] = useState<boolean>();

    const handlePress = (item: string) => {
        setIsSelected(!isSelected);
        console.log("Pressed: ", item);
    }

    // Initialize isSelected to false on mount
    useEffect(() => {
        setIsSelected(false);
    }, []);

    return (
        <TouchableOpacity onPress={() => handlePress(props.name)}>
            <View style={isSelected ? styles.selectedAccordionItem : styles.accordionItem}>
                <Text style={styles.accordionItemText}>{props.name}</Text>
            </View>
        </TouchableOpacity>
    );
}


const styles = StyleSheet.create({
    accordionItem: {
        padding: 10,
        margin: 5,
        borderWidth: 1,
        borderRadius: 24,
        borderColor: '#aaa',
        backgroundColor: '#aaa',
    },
    selectedAccordionItem: {
        padding: 10,
        margin: 5,
        borderWidth: 1,
        borderRadius: 24,
        borderColor: "#444",
        backgroundColor: "#444",
    },
    accordionItemText: {
        color: 'white',
    },
    listSection: {
        marginTop: 10,
        marginBottom: 20,
        padding: 5,
        maxHeight: 200,
        borderWidth: 1,
        borderColor: 'grey',
        borderRadius: 8,
    }
});
