import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Icon } from 'react-native-elements'

export default function Games({ navigation }) {
    return (
        <View style = {styles.container}>
            <Text>Games...</Text>
            <Icon
                type = "material-community"
                name = "plus"
                color = "tomato"
                reverse
                containerStyle = {styles.btnContainer}
                onPress = {() => navigation.navigate("CreateGame")}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    btnContainer: {
        position: "absolute",
        bottom: 20,
        right: 10,
        shadowColor: "black",
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.5
    },
})
