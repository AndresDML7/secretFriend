import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Input, Button, Icon } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import { isEmpty } from 'lodash'

import { registerUser } from '../../utils/actions'
import { validateEmail } from '../../utils/helpers'
import Loading from '../Loading'

export default function RegisterForm() {

    const navigation = useNavigation()

    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [confirmPassword, setConfirmPassword] = useState(null)
    const [errorEmail, setErrorEmail] = useState(null)
    const [errorPassword, setErrorPassword] = useState(null)
    const [errorConfirmPassword, setErrorConfirmPassword] = useState(null)
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [loading, setLoading] = useState(false)

    const doRegister = async() => {
        if(!validForm()) {
            return
        }

        setLoading(true)
        const result = await registerUser(email, password)
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
        setErrorConfirmPassword(false)

        if(!validateEmail(email)) {
            setErrorEmail("Debes ingresar un email válido.")
            isValid = false
        }

        if(isEmpty(password)) {
            setErrorPassword("Debes ingresar una contraseña.")
            isValid = false
        }

        if(password !== confirmPassword) {
            setErrorConfirmPassword("Las contraseñas no coinciden.")
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
            <Input
                label = "Confirmación"
                placeholder = "Confirme su contraseña..."
                password={true}
                secureTextEntry={!showConfirmPassword}
                labelStyle = {styles.label}
                onChange = {(e) => setConfirmPassword(e.nativeEvent.text)}
                errorMessage = {errorConfirmPassword}
                defaultValue = {confirmPassword}
                rightIcon = {
                    <Icon
                        type = "material-community"
                        name = { showConfirmPassword ? "eye-off-outline" : "eye-outline" }
                        iconStyle = {styles.icon}
                        onPress = {() => setShowConfirmPassword(!showConfirmPassword)}
                    />
                }
            />
            <Button
                title = "Registrarse"
                onPress = {() => doRegister()}
                containerStyle = {styles.btnContainer}
                buttonStyle = {styles.btn}
            />
            <Loading isVisible={loading} text="Creando Cuenta..." />
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
