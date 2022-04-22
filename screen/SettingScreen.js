import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Button } from 'react-native-elements';
import moment from 'moment';
import * as firebase from 'firebase';

export default function ListScreen(props) {

    const setScreen = props.setScreen;
    const user = props.user;

    function listScreen() {
        setScreen('ListScreen');
    }

    function homeScreen() {
        setScreen('HomeScreen');
    }

    function settingScreen() {
        setScreen('SettingScreen');
    }

    function logout() {
        Alert.alert(
            'ลงชื่อออกจากระบบ',
            'คุณต้องการออกจากระบบ ?',
            [

                { text: 'ยกเลิก', onPreess: () => console.log('cancel'), style: 'cancel' },
                { text: "ตกลง", onPress: () => firebase.auth().signOut() }
            ],
            {
                cancelable: true
            }
        )
    }


    return (
        <View style={styles.container}>
            <LinearGradient style={styles.header} colors={['#70B5FF', 'transparent']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} >
                <View style={{ height: 150, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontSize: 26, fontWeight: 'bold', color: 'white' }}>โปรไฟล์</Text>
                </View>
                <View style={styles.row}>
                    <View>
                        <Image source={{ uri: user.photoURL }} style={styles.profile} />
                    </View>
                    <View style={{ padding: 25 }}>
                        <Text style={{ fontSize: 22, color: '#fff' }}>{user.displayName}</Text>
                        <Text style={{ fontSize: 14, color: '#fff', fontWeight: 'bold' }}>{user.email}</Text>
                    </View>
                </View>
            </LinearGradient>
            <View style={styles.content}>
                <TouchableOpacity style={{ width: 200, height: 50, marginTop: 170, alignItems: 'center' }} onPress={() => logout()}>
                    <Text style={{ fontSize: 26, fontWeight: 'bold', textDecorationLine: 'underline' }}>ออกจากระบบ</Text>
                </TouchableOpacity>
            </View>
            <LinearGradient style={styles.menubar} colors={['#70B5FF', 'transparent']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
                <TouchableOpacity style={styles.btnBar} onPress={() => homeScreen()}>
                    <Image style={{ width: 50, height: 50, opacity: 0.5 }} source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/check-it-out-6170e.appspot.com/o/home.png?alt=media&token=439e7b57-0229-4a72-b310-1a13fb236c4e' }} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnBar} onPress={() => listScreen()}>
                    <Image style={{ width: 50, height: 50, opacity: 0.5 }} source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/check-it-out-6170e.appspot.com/o/notes.png?alt=media&token=46fbb798-4cf6-4e46-b194-057e57807ff6' }} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnBar} onPress={() => settingScreen()} >
                    <Image style={{ width: 50, height: 50 }} source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/check-it-out-6170e.appspot.com/o/man.png?alt=media&token=5b1cbfea-70e5-47ad-b99d-d0ab7dbc788a' }} />
                </TouchableOpacity>
            </LinearGradient>
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#ECEFFF',
    },
    row: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        height: 140,
        justifyContent: 'center',
        alignItems: 'center',
    },
    profile: {
        width: 80,
        height: 80,
        borderRadius: 100,
        elevation: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    header: {
        flex: 1,
        position: 'absolute',
        top: 0,
        left: 0,
        backgroundColor: '#8A2BE2',
        height: 280,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomLeftRadius: 100,
        borderBottomRightRadius: 100,
    },
    content: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
    },
    menubar: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        height: 70,
        width: '100%',
        backgroundColor: '#9370DB',
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        elevation: 50,
    },
    btnBar: {
        width: '33%',
        alignItems: 'center',
        justifyContent: 'center'
    }
});


