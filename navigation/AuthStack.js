import React from 'react';
import View from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import HomeScreen from '../screens/HomeScreen';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const Stack = createStackNavigator();

const AuthStack = () => {
  return (
      <Stack.Navigator initialRouteName={routeName}>
        <Stack.Screen 
            name="Login" 
            component={LoginScreen}
            options={{header: () => null}}
        />
        <Stack.Screen 
            name="Signup" 
            component={SignupScreen} 
            options={({navigation}) => ({
                title: '',
                headerStyle: {
                    backgroundColor: '#f9fafd',
                },
                headerLeft: () => (
                    <View style={{marginLeft: 10}}>
                        <FontAwesome.Button
                            name="short-arrow-left"
                            size={25}
                            backgroundColor="#f9fafd"
                            color="#333"
                            onPress={() => navigation.navigate('Login')}
                        />
                    </View>
                ),
            })}
        />
      </Stack.Navigator>
    );
};

export default AuthStack;