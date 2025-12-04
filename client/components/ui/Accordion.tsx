import { useState, useEffect } from "react";
import { ScrollView, Text, TouchableOpacity, View, FlatList, StyleSheet, Animated, LayoutAnimation, TouchableWithoutFeedback } from "react-native";
import { SelectableOption } from "./SelectableOption";

type AccordionProps = {
    title: string,
    vals: string[],
}

export default function Accordion(props: AccordionProps) {
    const [isExpanded, setIsExpanded] = useState<boolean>(false);

    const toggleExpand = (item: string) => {
        setIsExpanded(!isExpanded);
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        console.log('Pressed', item);
    }

    return (
        <View style={styles.container}>
            <TouchableWithoutFeedback onPress={() => { toggleExpand(props.title) }}>
                <View style={styles.accordionTitle}>
                    <Text>{props.title}</Text>
                </View>
            </TouchableWithoutFeedback>
            {isExpanded && (
                <View style={styles.listSection}>
                    <ScrollView
                        nestedScrollEnabled={true}
                        style={{ flexGrow: 0 }}
                    >
                        {props.vals.map((item, index) => (
                            <SelectableOption name={item} />
                        ))}
                    </ScrollView>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 10,
    },
    accordionTitle: {
        width: 320,
        padding: 15,
        borderWidth: 2,
        borderRadius: 8,
        borderColor: 'black',
    },
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
        borderRadius: 8,
        borderWidth: 2,
        padding: 5,
        height: 200,
        maxHeight: 200,
    }
});