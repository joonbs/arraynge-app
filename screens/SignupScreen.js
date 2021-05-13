import React, {useState} from 'react';
import { View, Text, TextInput, StyleSheet, Alert } from 'react-native';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import * as firebase from 'firebase';


export default SignupScreen = ({navigation}) => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

const handleSignUp = () => {
    firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => navigation.navigate('Home'))
}

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Create account</Text>
            
            <FormInput
                labelValue={email} 
                onChangeText={(userEmail) => setEmail(userEmail)}
                placeholderText="Email"
                iconType="user"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
            />
            <FormInput
                labelValue={password} 
                onChangeText={(userPassword) => setPassword(userPassword)}
                placeholderText="Password"
                iconType="lock"
                secureTextEntry={true}
            />

            <FormButton
                buttonTitle="Sign up"
                onPress={handleSignUp}
            />
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    text: {
        fontSize: 28,
        marginBottom: 10,
        color: '#051d5f',
    },
    navButton: {
        marginTop: 15,
    },
    navButtonText: {
        fontSize: 10,
        fontWeight: '500',
        color: '#2e64e5',
    },
});