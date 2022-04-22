import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import moment from 'moment';
import * as firebase from 'firebase';
import { Button } from 'react-native-elements';

export default function HomeScreen(props) {

    const setScreen = props.setScreen;
    const user = props.user;
    const [getTime, setGetTime] = React.useState(false);
    const [checkinData, setCheckinData] = React.useState(null);
    const [checkoutData, setCheckoutData] = React.useState(null);
    const [load, setLoad] = React.useState(true);
    let time = '';
    let currentTime = moment().utcOffset('+07:00').format('HH:mm');


    let year = new Date().getFullYear();
    let day = new Date().getDate();
    let month = new Date().getMonth() + 1;

    const onPress = () => setGetTime(true);

    function listScreen() {
        setScreen('ListScreen');
    }

    function homeScreen() {
        setScreen('HomeScreen');
    }

    function settingScreen() {
        setScreen('SettingScreen');
    }

    if (getTime) {
        time = currentTime;
        console.log('OK');
        setGetTime(false);
    }


    if (load) {

        if (checkinData !== null || checkinData === null) {
            firebase.database().ref('checkitout' + '/' + user.uid + '/' + year + '/' + month + '/' + day + '/' + 'checkin').on('value', (snapshot) => {
                setCheckinData(snapshot.val());
            })
        }
        if (checkinData !== null || checkinData === null) {
            firebase.database().ref('checkitout' + '/' + user.uid + '/' + year + '/' + month + '/' + day + '/' + 'checkout').on('value', (snapshot) => {
                setCheckoutData(snapshot.val());
            })
        }

        setLoad(false);
    }



    function checkIn() {
        if (checkinData !== null || checkinData === null) {
            firebase.database().ref('checkitout' + '/' + user.uid + '/' + year + '/' + month + '/' + day + '/' + 'checkin').on('value', (snapshot) => {
                setCheckinData(snapshot.val());
            })
        }
        if (checkinData === null) {
            const nowTime = moment().utcOffset('+07:00').format('HH:mm');
            firebase.database().ref('checkitout' + '/' + user.uid + '/' + year + '/' + month + '/' + day).update({
                checkin: nowTime,
            })
            alert('บันทึกเวลาสำเร็จ \n คุณเข้าทำงานเวลา ' + nowTime + ' น.');
        } else {
            alert('คุณเคยบันทึกเวลาเข้างานแล้ว');
        }
    }


    function checkOut() {

        if (checkinData !== null || checkinData === null) {
            firebase.database().ref('checkitout' + '/' + user.uid + '/' + year + '/' + month + '/' + day + '/' + 'checkout').on('value', (snapshot) => {
                setCheckoutData(snapshot.val());
            })
        }

        if (checkoutData === null) {
            const nowTime = moment().utcOffset('+07:00').format('HH:mm');
            firebase.database().ref('checkitout' + '/' + user.uid + '/' + year + '/' + month + '/' + day).update({
                checkout: nowTime,
            })
            alert('บันทึกเวลาสำเร็จ \n คุณเข้าทำงานเวลา ' + nowTime + ' น.');
        } else {
            alert('คุณเคยบันทึกเวลาเลิกงานแล้ว');
        }
    }


    return (
        <LinearGradient style={styles.container} colors={['#DAE0FF', 'transparent']} start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }}>
            <LinearGradient style={styles.header} colors={['#70B5FF', 'transparent']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} >
                <View style={{ marginBottom: 30 }}><Text style={{ color: '#fff', fontSize: 25, fontWeight: 'bold' }}>Check It Out</Text></View>
                <View style={styles.timeBox}>
                    <View style={styles.realTimeBox}>
                        <Text style={styles.textTimeHead}>วัน/เดือน/ปี</Text>
                        <Text style={styles.textTime}>{day}/{month}/{year}</Text>
                    </View>
                    <View style={styles.realTimeBox}>
                        <Text style={styles.textTimeHead}>เวลา</Text>
                        <Text style={styles.textTime}>{currentTime}</Text>
                    </View>
                </View>
                <TouchableOpacity
                    onPress={onPress}
                    style={styles.roundButton1}>
                    <Image style={{ width: 35, height: 35 }} source={{ uri: 'https://cdn.iconscout.com/icon/free/png-256/refresh-1781197-1518571.png' }} />
                </TouchableOpacity>
                <View style={styles.nameBox}>
                    <View style={styles.nameTag}>
                        <Text style={{ fontSize: 18, color: '#000', fontWeight: 'bold' }}>{user.displayName}</Text>
                    </View>
                </View>
            </LinearGradient>
            <View style={styles.content}>
                <TouchableOpacity
                    onPress={() => checkIn()}
                    style={styles.box}>
                    <Image style={{ width: 50, height: 50 }} source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/check-it-out-6170e.appspot.com/o/log-in.png?alt=media&token=5184f173-d451-4fb0-9b83-ec48a2c0f364' }} />
                    <Text></Text>
                    <Text style={{ color: 'white', fontWeight: 'bold', fontFamily: 'Kanit-Black' }}>เข้างาน</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => checkOut()}
                    style={styles.box}>
                    <Image style={{ width: 50, height: 50 }} source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/check-it-out-6170e.appspot.com/o/log-out.png?alt=media&token=c70c0f93-edc2-446d-86b2-cc6338d64c6b' }} />
                    <Text></Text>
                    <Text style={{ color: 'white', fontWeight: 'bold' }}>เลิกงาน</Text>
                </TouchableOpacity>
            </View>
            <LinearGradient style={styles.menubar} colors={['#70B5FF', 'transparent']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
                <TouchableOpacity style={styles.btnBar} onPress={() => homeScreen()}>
                    <Image style={{ width: 50, height: 50 }} source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/check-it-out-6170e.appspot.com/o/home.png?alt=media&token=439e7b57-0229-4a72-b310-1a13fb236c4e' }} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnBar} onPress={() => listScreen()}>
                    <Image style={{ width: 50, height: 50, opacity: 0.5 }} source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/check-it-out-6170e.appspot.com/o/notes.png?alt=media&token=46fbb798-4cf6-4e46-b194-057e57807ff6' }} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnBar} onPress={() => settingScreen()} >
                    <Image style={{ width: 50, height: 50, opacity: 0.5 }} source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/check-it-out-6170e.appspot.com/o/man.png?alt=media&token=5b1cbfea-70e5-47ad-b99d-d0ab7dbc788a' }} />
                </TouchableOpacity>
            </LinearGradient>
        </LinearGradient >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#D3DAFF',
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        flex: 1,
        position: 'absolute',
        top: 0,
        left: 0,
        backgroundColor: '#8A2BE2',
        height: 300,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomLeftRadius: 100,
        borderBottomRightRadius: 100,
    },
    nameBox: {
        height: 20,
        width: '100%',
        position: 'absolute',
        bottom: 0,
        left: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    nameTag: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '80%',
        height: 50,
        backgroundColor: '#fff',
        borderRadius: 50,
    },
    body: {
        justifyContent: "center",
        alignItems: 'center',
        backgroundColor: '#000',
        width: '100%',
        flex: 1,
    },
    timeBox: {
        flexDirection: 'row',
        flexWrap: 'nowrap',
    },
    realTimeBox: {
        width: '50%',
        alignItems: 'center',
    },
    textTime: {
        fontSize: 22,
        color: '#fff',
        fontWeight: 'bold'
    },
    textTimeHead: {
        fontSize: 16,
        color: '#fff',
    },
    roundButton1: {
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderRadius: 100,
        backgroundColor: 'white',
    },
    content: {
        flexDirection: 'row',
        flexWrap: 'nowrap',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 200,
    },
    box: {
        width: 150,
        height: 150,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
        marginLeft: 10,
        backgroundColor: '#9370DB',
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 10,
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
        justifyContent: 'center',

    },
    btnBarActive: {
        width: '33%',
        alignItems: 'center',
        justifyContent: 'center'
    }
});


