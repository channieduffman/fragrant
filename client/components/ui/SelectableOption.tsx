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
            <View style={[styles.accordionItem, isSelected ? styles.selectedAccordionItem : styles.deselectedAccordionItem]}>
                <Text>{props.name}</Text>
            </View>
        </TouchableOpacity>
    );
}


const styles = StyleSheet.create({
    accordionItem: {
        flex: 1,
        padding: 15,
        margin: 6,
        borderWidth: 1,
        borderRadius: 24,
    },
    selectedAccordionItem: {
        borderColor: "black",
        backgroundColor: "#e2d5d5ff",
    },
    deselectedAccordionItem: {
        borderColor: "black",
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
