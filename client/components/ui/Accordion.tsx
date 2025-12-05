import { useState, useEffect, useRef } from "react";
import { ScrollView, Text, TouchableOpacity, View, FlatList, StyleSheet, Animated, LayoutAnimation, TouchableWithoutFeedback, Easing } from "react-native";
import { SelectableOption } from "./SelectableOption";

type AccordionProps = {
    title: string,
    vals: string[],
    handleSelect: any,
    handleDeselect: any,
}

export default function Accordion(props: AccordionProps) {
    const [isExpanded, setIsExpanded] = useState<boolean>(false);

    // driver value for aniamtions
    const animationDriver = useRef(new Animated.Value(0)).current;

    const toggleExpand = (item: string) => {
        setIsExpanded(!isExpanded);
    }

    useEffect(() => {
        Animated.timing(animationDriver, {
            toValue: isExpanded ? 1 : 0,
            duration: 250,
            easing: Easing.ease,
            useNativeDriver: false,
        }).start();
    }, [isExpanded]);

    const animatedHeight = animationDriver.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 200],
    });

    const animatedOpacity = animationDriver.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 100],
    });

    const animatedMargins = animationDriver.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 10],
    });

    return (
        <View style={styles.container}>
            <TouchableWithoutFeedback onPress={() => { toggleExpand(props.title) }}>
                <View style={styles.accordionTitle}>
                    <Text>{props.title}</Text>
                </View>
            </TouchableWithoutFeedback>
            <Animated.View
                style={
                    [
                        styles.listSection,
                        {
                            height: animatedHeight,
                            opacity: animatedOpacity,
                            marginBottom: animatedMargins,
                            borderRadius: 8,
                            overflow: 'hidden'
                        }
                    ]
                }
            >
                <ScrollView
                    nestedScrollEnabled={true}
                    style={{ flexGrow: 0 }}
                >
                    {props.vals.map((item, index) => (
                        <SelectableOption name={item} handleSelect={props.handleSelect} handleDeselect={props.handleDeselect} />
                    ))}
                </ScrollView>
            </Animated.View>
        </View >
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
    listSection: {
        marginTop: 10,
        marginBottom: 20,
        borderWidth: 2,
        paddingLeft: 5,
        paddingRight: 5,
        maxHeight: 200,
    }
});