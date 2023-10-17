import { StatusBar } from 'expo-status-bar';
import { AntDesign, Feather } from '@expo/vector-icons';
import { SafeAreaView, ScrollView, StyleSheet, View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import { loginCall } from '../../services/api';
import logo from '../../assets/images/logo.png';

export default function LoginScreen() {

    const navigation = useNavigation();

    const [ hidePass, setHidePass ] = useState(true);
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');

    return(
        <SafeAreaView style={styles.homeScreenContainer}>
            <StatusBar style="auto" />
            <ScrollView style={styles.scrollViewContent}>
                <View style={{alignItems: 'center'}}>
                    <Image style={{width: 200, height: 200}} source={logo} />
                    <Text style={styles.title}>ENTRAR</Text>
                </View>
                <View>
                    <View style={styles.inputSearch}>
                        <TextInput style={styles.input} placeholder="E-mail" value={email} autoCapitalize='none' keyboardType='email-address' placeholderTextColor={'#fff'} onChangeText={(value) => setEmail(value)} />
                    </View>
                    <View style={styles.inputSearch}>
                        <TextInput style={styles.input} placeholder="Senha" value={password} autoCapitalize='none' secureTextEntry={hidePass} placeholderTextColor={'#fff'} onChangeText={(value) => setPassword(value)} />
                        <TouchableOpacity style={styles.searchIcon} onPress={() => setHidePass(hidePass ? false : true)}>
                            {
                                hidePass ? <Feather name="eye-off" size={24} color="white" /> : <AntDesign name="eye" size={24} color="white" />
                            }
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{marginTop: 32}}>
                    <TouchableOpacity style={styles.btn} onPress={async () => {

                        const isSuccess = await loginCall(email, password);

                        if (isSuccess.status === true) {

                            navigation.navigate('Main');
                        } else {

                            alert(isSuccess.msg);
                        }
                    }}>
                        <Text style={{textAlign: 'center', fontFamily: 'Poppins-Bold', fontSize: 20, color: '#fff'}}>ENTRAR</Text>
                    </TouchableOpacity>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center', gap: 24, marginTop: 32}}>
                    <View style={styles.line}>
                    </View>
                    <Text style={{fontFamily: 'Poppins-Light'}}>OU</Text>
                    <View style={styles.line}>
                    </View>
                </View>
                <View style={{marginTop: 32}}>
                    <TouchableOpacity onPress={() => {
                        setEmail('');
                        setPassword('');
                        setHidePass(true);
                        
                        navigation.navigate('Register')
                    }}>
                        <Text style={{fontSize: 16, fontFamily: 'Poppins-Bold', textAlign: 'center'}}>CADASTRAR-SE</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    homeScreenContainer: {
        flex: 1,
        backgroundColor: '#fff',
    },

    scrollViewContent: {
        paddingVertical: 40,
        paddingHorizontal: 20,
    },

    title: {
        fontSize: 24,
        fontFamily: 'Poppins-Bold'
    },

    inputSearch: {
        position: 'relative',
        marginTop: 32,
    },

    input: {
        borderWidth: 1,
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        fontSize: 16,
        fontFamily: 'Poppins-Regular',
        backgroundColor: '#242A37',
        color: '#fff',
    },

    searchIcon: {
        position: 'absolute',
        right: 16,
        top: 10,
    },

    btn: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#FE8A07',
        paddingVertical: 12,
        borderRadius: 16,
        backgroundColor: '#FE8A07'
    },

    line: {
        height: 1,
        flexGrow: 1,
        backgroundColor: '#000'
    }
});