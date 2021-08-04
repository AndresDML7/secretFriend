import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Login from '../screens/Login'
import Register from '../screens/Register'
import Games from '../screens/game/Games'
import CreateGame from '../screens/game/CreateGame'

export default function Navigation() {

    const Stack = createStackNavigator()

    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerTitleAlign: "center",
                    headerTintColor: "white",
                    headerStyle: { backgroundColor: "tomato" }
                }}
            >
                <Stack.Screen
                    name="Login"
                    options={{ title: "Iniciar Sesión" }}
                    component={Login}
                />
                <Stack.Screen
                    name="Register"
                    options={{ title: "Crear Cuenta" }}
                    component={Register}
                />
                <Stack.Screen
                    name="Games"
                    options={{ title: "Juegos" }}
                    component={Games}
                />
                <Stack.Screen
                    name="CreateGame"
                    options={{ title: "Crear Juego" }}
                    component={CreateGame}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

const styles = StyleSheet.create({})
