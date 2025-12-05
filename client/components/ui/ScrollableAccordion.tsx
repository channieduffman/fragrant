import { useState, useEffect } from "react";
import { ScrollView, Text, TouchableOpacity, View, FlatList, StyleSheet, Touchable, TouchableWithoutFeedback } from "react-native";
import Accordion from "./Accordion";

type ScrollableAccordionProps = {
    sections: {
        title: string,
        content: string[],
    }[],
    handleSelect: any,
    handleDeselect: any,
}

export function ScrollableAccordion(props: ScrollableAccordionProps) {

    return (
        <View style={styles.container}>
            <ScrollView>
                {props.sections.map((item, key) => (
                    <Accordion
                        title={item.title}
                        vals={item.content}
                        handleSelect={props.handleSelect}
                        handleDeselect={props.handleDeselect}
                    />
                ))}
            </ScrollView>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});
