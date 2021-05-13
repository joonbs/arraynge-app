import React, {useState} from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import * as firebase from 'firebase';

export default LoginScreen = ({navigation}) => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    {/*const handleLogin = () => {
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(() => {
                navigation.navigate('Home');
            })
    }
    */}
    return (
        <View style={styles.container}>
            <Image 
                source={require('../assets/logo.png')} 
                style={styles.logo}
            />
            
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
                buttonTitle="Sign in"
                onPress={() => navigation.navigate('Home')}
            />

            <TouchableOpacity
                style={styles.signUpButton}
                onPress={() => navigation.navigate('Signup')}>
                <Text style={styles.navButtonText}>
                    No account? Click here to sign up!
                </Text>
            </TouchableOpacity>
            {/*
            <View style={{ flex: 1, paddingTop: 100 }}>
                <Text>
                    {Device.manufacturer}: {Device.modelName}
                </Text>
            </View>
            */}
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
    logo: {
        height: 83,
        minWidth: "100%",
        marginBottom: 30,
        resizeMode: 'cover',
    },
    text: {
        //fontFamily
        fontSize: 28,
        marginBottom: 10,
        color: '#051d5f',
    },
    navButton: {
        marginTop: 15,
    },
    signUpButton: {
        marginVertical: 35,
    },
    navButtonText: {
        fontSize: 15,
        fontWeight: '500',
        color: '#2e64e5',
        
    },
});