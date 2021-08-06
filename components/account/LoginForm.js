import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Input, Button, Icon } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import { isEmpty } from 'lodash'

import { loginWithEmailAndPassword } from '../../utils/actions'
import { validateEmail } from '../../utils/helpers'
import Loading from '../Loading'

export default function LoginForm() {

    const navigation = useNavigation()

    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [errorEmail, setErrorEmail] = useState(null)
    const [errorPassword, setErrorPassword] = useState(null)
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)

    const doLogin = async() => {
        if(!validForm()) {
            return
        }

        setLoading(true)
        const result = await loginWithEmailAndPassword(email, password)
        setLoading(false)

        if(!result.statusResponse) {
            setErrorEmail(result.error)
            return
        }

        navigation.navigate("Games")
    }

    const validForm = () => {
        let isValid =  true
        setErrorEmail(false)
        setErrorPassword(false)

        if(!validateEmail(email)) {
            setErrorEmail("Debes ingresar un email válido.")
            isValid = false
        }

        if(isEmpty(password)) {
            setErrorPassword("Debes ingresar una contraseña.")
            isValid = false
        }

        return isValid
    }

    return (
        <View style = {styles.container}>
            <Input
                label = "Email"
                placeholder = "Ingrese su email..."
                keyboardType = "email-address"
                labelStyle = {styles.label}
                onChange = {(e) => setEmail(e.nativeEvent.text)}
                errorMessage = {errorEmail}
                defaultValue = {email}
            />
            <Input
                label = "Contraseña"
                placeholder = "Ingrese su contraseña..."
                password={true}
                secureTextEntry={!showPassword}
                labelStyle = {styles.label}
                onChange = {(e) => setPassword(e.nativeEvent.text)}
                errorMessage = {errorPassword}
                defaultValue = {password}
                rightIcon = {
                    <Icon
                        type = "material-community"
                        name = { showPassword ? "eye-off-outline" : "eye-outline" }
                        iconStyle = {styles.icon}
                        onPress = {() => setShowPassword(!showPassword)}
                    />
                }
            />
            <Button
                title = "Iniciar Sesión"
                onPress = {() => doLogin()}
                containerStyle = {styles.btnContainer}
                buttonStyle = {styles.btn}
            />
            <Text style = {styles.register}>
                ¿Aún no tienes una cuenta?{" "}
                <Text style = {styles.registerLink} onPress={() => navigation.navigate("Register")} >Regístrate</Text>
            </Text>
            <Loading isVisible={loading} text="Iniciando Sesión..." />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 50,
        width: "95%",
        alignSelf: "center"
    },
    label: {
        color: "black",
        marginBottom: 5
    },
    icon: {
        color: "#b2b2b2"
    },
    btnContainer: {
        marginTop: 20,
        width: "95%",
        alignSelf: "center"
    },
    btn: {
        backgroundColor: "tomato"
    },
    register: {
        marginTop: 20,
        alignSelf: "center"
    },
    registerLink: {
        fontWeight: "bold",
        color: "tomato"
    }

})
