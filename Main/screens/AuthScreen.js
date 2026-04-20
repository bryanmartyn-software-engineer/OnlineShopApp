import React, { useState, useContext } from 'react';
import {
    ScrollView,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { ShopContext } from '../context/ShopContext';
import { TouchableHighlight } from 'react-native-gesture-handler';

const InputWithLabel = (props) => {
    const [touched, setTouched] = useState(false);
    const { darkMode } = useContext(ShopContext);

    let showError = touched && !props.validateRule;

    return (
        <View style={styles.section}>
            <Text style={[styles.label, darkMode && styles.darkLabel]}>{props.label}</Text>

            <TextInput
                style={[
                    styles.input,
                    darkMode && styles.darkInput,
                    showError && { borderColor: 'red' }
                ]}
                placeholderTextColor={darkMode ? '#999' : '#666'}
                onBlur={() => {setTouched(true)}}
                {...props}
            />

            <View length={12} style={{ marginTop: 5 }}>
                {showError && (
                    <Text style={styles.message}>
                        {props.message}
                    </Text>
                )}
            </View>
        </View>
    );
};

export default function AuthScreen({ route, navigation }){
    const { darkMode, isLogin } = useContext(ShopContext);
    const {type} = route.params;
    const [auth, setAuth] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });  //login:{email,password},registration:{name,email,password,confirmPassword}

    const checkAuth = () => {
        if (type === 'login') {

        }
        else if (type === 'registration') {

        }
    }

    
    
    return (
        <ScrollView style={[styles.container, darkMode && styles.darkContainer]}>
            <TouchableHighlight onPress={() => navigation.goBack()} style={[styles.back, darkMode && styles.darkBack]}>
                <Text style={styles.backText}>{'<'} Back</Text>
            </TouchableHighlight>
            <View style={styles.section}>
                <View style={styles.title}>
                    <Text style={[styles.titleText, darkMode && styles.darkTitleText]}>
                        {type === 'login' ? 'Login' : 'Create Account'}
                    </Text>
                </View>
                {
                    type === 'login' ?
                    (
                        <View style={styles.form}>
                            <InputWithLabel
                                label={'Email'}
                                keyboardType='email-address'
                                placeholder='Enter your email'
                                value={auth.email}
                                autoComplete="email"        
                                onChangeText={(value) => setAuth(auth => ({...auth,email:value}))}
                                validateRule={!!auth.email && /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(auth.email)}
                                message='Please enter a valid email address.'
                            />
                            <InputWithLabel
                                label={'Password'}
                                secureTextEntry
                                placeholder='Enter your password'
                                value={auth.password}
                                onChangeText={(value) => setAuth(auth => ({...auth,password:value}))}
                                validateRule={!!auth.password && auth.password.length >= 8}
                                message='The password should contain at least 8 characters.'
                            />
                        </View>
                    ) :
                    (
                        <View style={styles.form}>
                            <InputWithLabel
                                label={'Email'}
                                keyboardType='email-address'
                                placeholder='Enter your email'
                                value={auth.email}
                                onChangeText={(value) => setAuth(auth => ({...auth,email:value}))}
                                validateRule={!!auth.email && /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(auth.email)}
                                message='Please enter a valid email address.'
                            />
                            <InputWithLabel
                                label={'Name'}
                                keyboardType='default'
                                placeholder='Enter your username'
                                value={auth.name}
                                onChangeText={(value) => setAuth(auth => ({...auth,name:value}))}
                                validateRule={!!auth.name && auth.name.length >= 1}
                                message='Username should be at least 1 character long.'
                            />
                            <InputWithLabel
                                label={'Password'}
                                secureTextEntry
                                placeholder='Enter your password'
                                value={auth.password}
                                onChangeText={(value) => setAuth(auth => ({...auth,password:value}))}
                                validateRule={!!auth.password && auth.password.length >= 8}
                                message='The password should contain at least 8 characters.'
                            />
                            <InputWithLabel
                                label={'Confirm Password'}
                                secureTextEntry
                                placeholder='Enter your password'
                                value={auth.confirmPassword}
                                onChangeText={(value) => setAuth(auth => ({...auth,confirmPassword:value}))}
                                validateRule={auth.confirmPassword && auth.password === auth.confirmPassword}
                                message='Passwords do not match.'
                            />
                        </View>
                    )
                }
            </View>
            <View style={styles.section}>
                <TouchableOpacity style={styles.button} onPress={ checkAuth } >
                    <Text style={{ color: '#FFF', fontWeight: 'bold', fontSize: 20 }}>
                        {type === 'registration' ? 'Register' : 'Login'}
                    </Text>
                </TouchableOpacity>
                <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
                    <Text style={{fontSize:16, color: darkMode ?'#FFF' : '#000'}}>
                        {type === 'registration' ? 'Already have an account? ' : 'Don\'t have an account? '}
                    </Text>
                    <TouchableOpacity style={styles.link} onPress={() => {
                        setAuth({});
                        navigation.replace('AuthScreen', { type: type === 'login' ? 'registration' : 'login' });
                    }}>
                        <Text style={styles.textButton}>{type === 'login' ? 'Create Account' : 'Login'}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#F7F8FA',
        paddingHorizontal: 20,
    },
    darkContainer: {
        backgroundColor: '#121212',
    },

    back: {
        marginTop: 10,
        marginBottom: 10,
    },

    backText:{
        color: '#6C63FF',
        fontWeight: 'bold',
        fontSize: 20,
    },

    section: {
        marginTop: 20,
    },

    title: {
        alignItems: 'center',
        marginBottom: 20,
    },

    titleText: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 32,
    },
    darkTitleText:{
        color: '#FFF'
    },

    form: {
        gap: 5,
    },

    label: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
        paddingLeft: 5,
        marginBottom: 5,
    },
    darkLabel: {
        color: '#FFF'
    },

    input: {
        borderWidth: 1,
        borderColor: '#DDD',
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 12,
        backgroundColor: '#FFF',
        fontSize: 16,
    },
    darkInput: {
        backgroundColor: '#1e1e1e',
        borderColor: '#555',
        color: '#FFF',
    },

    message: {
        color: 'red',
        fontSize: 12,
    },

    button: {
        backgroundColor: '#6C63FF',
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },

    textButton: {
        color: '#6C63FF',
        fontWeight: 'bold',
        fontSize: 16,
    },
});