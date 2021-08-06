import React, { useState } from 'react'
import { StyleSheet, Text, View, FlatList, ScrollView } from 'react-native'
import { Button, Input, Icon, Divider } from 'react-native-elements'
import { isEmpty, size } from 'lodash'

export default function CreateGame({ navigation }) {

    const [name, setName] = useState(null)
    const [members, setMembers] = useState([])
    const [defaultMember, setDefaultMember] = useState(null)
    const [errorName, setErrorName] = useState(null)
    const [errorDefaultMember, setErrorDefaultMember] = useState(null)

    const addMember = () => {
        if(isEmpty(defaultMember)) {
            setErrorDefaultMember("Debes ingresar un nombre.")
            return
        }

        setMembers([...members, defaultMember ])
        setErrorDefaultMember(null)
        setDefaultMember(null)
    }

    const validForm = () => {
        let isValid = true
        setErrorName(null)
        setErrorMemebers(null)

        if(isEmpty(name)) {
            setErrorName("Debes ingresar un nombre para el juego.")
            isValid = false
        }

        if(isEmpty(members)) {
            setErrorMemebers("Debes ingresar un número de participantes.")
            isValid = false
        }

        return isValid
    }
    
    return (
        <ScrollView>
            <View style={styles.container}>
                <Input
                    label = "Nombre del juego:"
                    placeholder = "Ingrese un nombre..."
                    labelStyle = {styles.label}
                    onChange = {(e) => setName(e.nativeEvent.text)}
                    errorMessage = {errorName}
                    defaultValue = {name}
                />
                <Input
                    label = "Añadir jugador:"
                    placeholder = "Ingrese un participante..."
                    labelStyle = {styles.label}
                    onChange = {(e) => setDefaultMember(e.nativeEvent.text)}
                    errorMessage = {errorDefaultMember}
                    defaultValue = {defaultMember}
                />
                <Icon
                    type = "material-community"
                    name = "plus"
                    size = {15}
                    color = "tomato"
                    reverse
                    containerStyle = {styles.iconContainer}
                    onPress = {() => addMember()}
                />
                <Text style={styles.title}>Participantes: </Text>
                {
                    size(members) > 0 ? (
                        <View>
                            <FlatList
                                style = {styles.list}
                                data = {members}
                                keyExtractor = {(item, index) => index.toString() }
                                renderItem = {(member) => (
                                    <Member member = {member} members = {members} setMembers = {setMembers} />
                                )}
                            />
                        </View>
                    ) : (
                        <Text style={styles.notMembers}>
                            Aún no hay participantes.
                        </Text>
                    )
                }
                <Button
                    title = "Siguiente"
                    onPress = {() => console.log("Members: ", members)}
                    containerStyle = {styles.btnContainer}
                    buttonStyle = {styles.btn}
                />
            </View>
        </ScrollView>
    )
}

function Member({ member, members, setMembers }) {

    const removeMember = () => {
        const filteredMembers = members.filter(element => element !== member.item)
        setMembers(filteredMembers)
    }

    return(
        <View>
            <Text style={styles.memberText}>
                {member.item}
            </Text>
            <Icon
                    type = "material-community"
                    name = "trash-can"
                    size = {25}
                    color = "#b2b2b2"
                    containerStyle = {styles.memberIcon}
                    onPress = {() => removeMember()}
                />
            <Divider/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 30,
        alignSelf: "center",
        width: "95%"
    },
    label: {
        color: "black",
        marginBottom: 5
    },
    btnContainer: {
        marginTop: 20,
        marginBottom: 30,
        width: "95%",
        alignSelf: "center"
    },
    btn: {
        backgroundColor: "tomato"
    },
    title: {
        marginLeft: 10,
        marginBottom: 20,
        fontSize: 16.2,
        fontWeight: "bold"
    },
    iconContainer: {
        position: "absolute",
        top: 122,
        left: 335
    },
    memberText: {
        fontSize: 18,
        paddingLeft: 10,
        paddingRight: 60,
        paddingVertical: 12
    },
    memberIcon: {
        position: "absolute",
        left: 335,
        top: 15
    },
    list: {
        borderWidth: 1, 
        borderRadius: 7, 
        width: "95%", 
        alignSelf: "center", 
        borderColor: "#b2b2b2"
    },
    notMembers: {
        borderWidth: 1, 
        borderColor: "#b2b2b2", 
        fontSize: 18, 
        width: "95%", 
        alignSelf: "center", 
        borderRadius: 7, 
        paddingVertical: 5, 
        paddingLeft: 10
    }
    
})
