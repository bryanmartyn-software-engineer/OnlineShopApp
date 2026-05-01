import React, { useState, useContext, useEffect } from 'react';
import {
    ScrollView,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    FlatList,
    ActivityIndicator,
    Image
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { ShopContext } from '../context/ShopContext';
import { Colors } from '../styles/colors';

const InputWithLabel = (props) => {
    const [touched, setTouched] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const { darkMode } = useContext(ShopContext);

    let showError = touched && !props.validateRule;
    const isPassword = props.secureTextEntry;

    return (
        <View style={styles.section}>
            <Text style={[styles.label, darkMode && styles.darkLabel]}>
                {props.label}
            </Text>

            <View style={{ position: 'relative' }}>
                <TextInput
                    {...props}
                    style={[
                        styles.input,
                        darkMode && styles.darkInput,
                        showError && { borderColor: 'red' },
                        isPassword && { paddingRight: 40 }
                    ]}
                    placeholderTextColor={darkMode ? Colors.darkSubText : Colors.lightSubText}
                    secureTextEntry={isPassword && !showPassword}
                    onBlur={() => setTouched(true)}
                />

                {isPassword && (
                    <TouchableOpacity
                        onPress={() => setShowPassword(prev => !prev)}
                        style={{
                            position: 'absolute',
                            right: 10,
                            top: '50%',
                            transform: [{ translateY: -12 }]
                        }}
                    >
                        <MaterialIcons
                            name={showPassword ? 'visibility' : 'visibility-off'}
                            size={24}
                            color={darkMode ? Colors.darkSubText : Colors.lightSubText}
                        />
                    </TouchableOpacity>
                )}
            </View>

            <View style={{ marginTop: 5 }}>
                {showError && (
                    <Text style={styles.message}>
                        {props.message}
                    </Text>
                )}
            </View>
        </View>
    );
};

export default function AuthScreen({ route, navigation }) {
    const { darkMode, isLogin, login, register, updateUser, userData } = useContext(ShopContext);
    const { type } = route.params;
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [auth, setAuth] = useState({
        name: type === 'edit' ? userData?.name || '' : '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    // login:{email,password},
    // registration:{name,email,password,confirmPassword}
    // verify:{password}
    // edit:{name,password}

    // for triggering button state
    const [isAuth, setIsAuth] = useState(false);
    useEffect(() => {
        let valid = false;

        if (type === 'login') {
            valid =
                /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(auth.email) &&
                auth.password.length >= 8;
        } else if (type === 'registration') {
            valid =
                /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(auth.email) &&
                auth.name.length >= 1 &&
                auth.password.length >= 8 &&
                auth.password === auth.confirmPassword;
        } else if (type === 'verify') {
            valid = auth.password.length >= 8;
        } else if (type === 'edit') {
            valid =
                auth.name.length >= 1 &&
                auth.password.length >= 8 &&
                auth.password === auth.confirmPassword;
        }
        setIsAuth(valid);
    }, [auth, type]);

    const checkAuth = async () => {
        setLoading(true);
        setError('');

        let result;
        if (type === 'login') {
            result = await login(auth.email, auth.password);
        } else if (type === 'registration') {
            result = await register(auth.name, auth.email, auth.password);
        } else if (type === 'edit') {
            result = await updateUser(userData.userId, auth.name, auth.password);
        }

        setLoading(false);
        if (result && result.success) {
            if (type === 'edit') {
                navigation.goBack();
            } else if (route.params?.returnTo) {
                navigation.navigate(route.params.returnTo, route.params.returnToParams || {});
            } else {
                // For login/registration, explicitly navigate to ProfileScreen to ensure stack update
                navigation.navigate('ProfileScreen');
            }
        } else {
            setError(result?.error || 'Authentication failed');
        }
    }

    return (
        <ScrollView style={[styles.container, darkMode && styles.darkContainer]}>
            <TouchableOpacity
                onPress={() => {
                    if (type === 'registration') {
                        navigation.replace('Login', { type: 'login' });
                    } else if (isLogin) {
                        navigation.goBack();
                    } else {
                        navigation.navigate('Home');
                    }
                }}
                style={[styles.backButton, darkMode && styles.darkBackButton]}>
                <MaterialIcons
                    name="arrow-back"
                    size={24}
                    color={darkMode ? Colors.darkText : Colors.lightText}
                />
            </TouchableOpacity>
            <View style={styles.section}>
                <View style={styles.header}>
                    <View style={styles.logoContainer}>
                        <Image
                            source={require('../../images/logo.png')}
                            style={styles.logo}
                            resizeMode="contain"
                        />
                    </View>
                    <View style={styles.headerTextContainer}>
                        <Text style={[styles.brandText, darkMode && styles.darkTitleText]}>OnlineShopApp</Text>
                        <Text style={[styles.taglineText, darkMode && styles.darkSubText]}>Your shop, your favorites.</Text>
                    </View>
                </View>

                <View style={styles.title}>
                    <Text style={[styles.formTitle, darkMode && styles.darkTitleText]}>
                        {
                            type === 'login' ? 'Welcome Back!'
                                : type === 'registration' ? 'Create Account'
                                    : type === 'verify' ? 'Verify Account'
                                        : type === 'edit' && 'Edit Profile'
                        }
                    </Text>
                    {error ? <Text style={styles.errorText}>{error}</Text> : null}
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
                                    onChangeText={(value) => setAuth(auth => ({ ...auth, email: value }))}
                                    validateRule={!!auth.email && /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(auth.email)}
                                    message='Please enter a valid email address.'
                                />
                                <InputWithLabel
                                    label={'Password'}
                                    secureTextEntry
                                    placeholder='Enter your password'
                                    value={auth.password}
                                    onChangeText={(value) => setAuth(auth => ({ ...auth, password: value }))}
                                    validateRule={!!auth.password && auth.password.length >= 8}
                                    message='The password should contain at least 8 characters.'
                                />

                            </View>
                        ) : type === 'registration' ?
                            (
                                <View style={styles.form}>
                                    <InputWithLabel
                                        label={'Email'}
                                        keyboardType='email-address'
                                        placeholder='Enter your email'
                                        value={auth.email}
                                        onChangeText={(value) => setAuth(auth => ({ ...auth, email: value }))}
                                        validateRule={!!auth.email && /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(auth.email)}
                                        message='Please enter a valid email address.'
                                    />
                                    <InputWithLabel
                                        label={'Name'}
                                        keyboardType='default'
                                        placeholder='Enter your username'
                                        value={auth.name}
                                        onChangeText={(value) => setAuth(auth => ({ ...auth, name: value }))}
                                        validateRule={!!auth.name && auth.name.length >= 1}
                                        message='Username should be at least 1 character long.'
                                    />
                                    <InputWithLabel
                                        label={'Password'}
                                        secureTextEntry
                                        placeholder='Enter your password'
                                        value={auth.password}
                                        onChangeText={(value) => setAuth(auth => ({ ...auth, password: value }))}
                                        validateRule={!!auth.password && auth.password.length >= 8}
                                        message='The password should contain at least 8 characters.'
                                    />
                                    <InputWithLabel
                                        label={'Confirm Password'}
                                        secureTextEntry
                                        placeholder='Enter your password'
                                        value={auth.confirmPassword}
                                        onChangeText={(value) => setAuth(auth => ({ ...auth, confirmPassword: value }))}
                                        validateRule={auth.confirmPassword && auth.password === auth.confirmPassword}
                                        message='Passwords do not match.'
                                    />
                                </View>
                            ) : type === 'verify' ?
                                (
                                    <View style={styles.form}>
                                        <InputWithLabel
                                            label={'Password'}
                                            secureTextEntry
                                            placeholder='Enter your password'
                                            value={auth.password}
                                            onChangeText={(value) => setAuth(auth => ({ ...auth, password: value }))}
                                            validateRule={!!auth.password && auth.password.length >= 8}
                                            message='The password should contain at least 8 characters.'
                                        />
                                    </View>
                                ) : type === 'edit' &&
                                (
                                    <View style={styles.form}>
                                        <InputWithLabel
                                            label={'Name'}
                                            keyboardType='default'
                                            placeholder='Enter your username'
                                            value={auth.name}
                                            onChangeText={(value) => setAuth(auth => ({ ...auth, name: value }))}
                                            validateRule={!!auth.name && auth.name.length >= 1}
                                            message='Username should be at least 1 character long.'
                                        />
                                        <InputWithLabel
                                            label={'Password'}
                                            secureTextEntry
                                            placeholder='Enter your new password'
                                            value={auth.password}
                                            onChangeText={(value) => setAuth(auth => ({ ...auth, password: value }))}
                                            validateRule={!!auth.password && auth.password.length >= 8}
                                            message='The password should contain at least 8 characters.'
                                        />
                                        <InputWithLabel
                                            label={'Confirm Password'}
                                            secureTextEntry
                                            placeholder='Confirm your new password'
                                            value={auth.confirmPassword}
                                            onChangeText={(value) => setAuth(auth => ({ ...auth, confirmPassword: value }))}
                                            validateRule={auth.confirmPassword && auth.password === auth.confirmPassword}
                                            message='Passwords do not match.'
                                        />
                                    </View>
                                )
                }
            </View>
            <View style={styles.section}>
                <TouchableOpacity style={[styles.button, (!isAuth || loading) && { opacity: 0.5 }]}
                    disabled={!isAuth || loading} onPress={checkAuth} >
                    {loading ? (
                        <ActivityIndicator color="#FFF" />
                    ) : (
                        <Text style={{ color: '#FFF', fontWeight: 'bold', fontSize: 20 }}>
                            {
                                type === 'login' ? 'Login'
                                    : type === 'registration' ? 'Register'
                                        : type === 'verify' ? 'Verify Account'
                                            : type === 'edit' && 'Save Changes'
                            }
                        </Text>
                    )}
                </TouchableOpacity>
                {
                    (type === 'login' || type === 'registration') &&
                    (
                        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
                            <Text style={{ fontSize: 16, color: darkMode ? Colors.darkText : Colors.lightText }}>
                                {type === 'login' ? 'Don\'t have an account? '
                                    : 'Already have an account? '}
                            </Text>
                            <TouchableOpacity style={styles.link} onPress={() => {
                                setAuth({});
                                navigation.replace('Login', {
                                    type: type === 'login' ? 'registration'
                                        : 'login'
                                });
                            }}>
                                <Text style={styles.textButton}>
                                    {type === 'login' ? 'Create Account'
                                        : 'Login'}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    )
                }
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.lightBackground,
        paddingHorizontal: 20,
    },
    darkContainer: {
        backgroundColor: Colors.darkBackground,
    },

    backButton: {
        marginTop: 20,
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: Colors.lightSurface,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        borderWidth: 1,
        borderColor: Colors.lightBorder,
    },
    darkBackButton: {
        backgroundColor: Colors.darkSurface,
        borderColor: Colors.darkBorder,
    },

    section: {
        marginTop: 20,
    },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 15,
        marginBottom: 30,
        marginTop: 20,
    },

    logoContainer: {
        backgroundColor: '#FFFFFF',
        padding: 6,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },

    logo: {
        width: 60,
        height: 60,
    },

    headerTextContainer: {
        flex: 0,
    },

    errorText: {
        color: Colors.error,
        marginTop: 10,
        fontSize: 14,
        textAlign: 'center',
    },

    brandText: {
        fontSize: 26,
        fontWeight: '800',
        color: Colors.lightText,
        lineHeight: 28,
    },

    taglineText: {
        fontSize: 14,
        color: Colors.lightSubText,
        marginTop: 2,
        fontWeight: '500',
    },

    title: {
        alignItems: 'center',
        marginBottom: 20,
    },

    formTitle: {
        color: Colors.lightText,
        fontWeight: '700',
        fontSize: 24,
    },

    darkTitleText: {
        color: Colors.darkText
    },

    form: {
        gap: 5,
    },

    label: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.lightText,
        paddingLeft: 5,
        marginBottom: 5,
    },
    darkLabel: {
        color: Colors.darkText
    },

    input: {
        borderWidth: 1,
        borderColor: Colors.lightBorder,
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 12,
        backgroundColor: Colors.lightSurface,
        fontSize: 16,
    },
    darkInput: {
        backgroundColor: Colors.darkSurface,
        borderColor: Colors.darkBorder,
        color: Colors.darkText,
    },

    message: {
        color: Colors.error,
        fontSize: 12,
    },

    button: {
        backgroundColor: Colors.primary,
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 10,
        shadowColor: Colors.black,
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },

    textButton: {
        color: Colors.primary,
        fontWeight: 'bold',
        fontSize: 16,
    },
});