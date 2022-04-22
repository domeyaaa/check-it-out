import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import moment from 'moment';
import * as firebase from 'firebase';
import DatePicker from 'react-native-datepicker';
import { Button } from 'react-native-elements';

export default function ListScreen(props) {

    const setScreen = props.setScreen;
    const user = props.user;

    const [date, setDate] = React.useState('โปรดเลือกวันที่ต้องการค้นหา');
    const [searchDatain, setSearchDatain] = React.useState('-');
    const [searchDataout, setSearchDataout] = React.useState('-');
    const [y, setY] = React.useState(null);
    const [m, setM] = React.useState(null);
    const [d, setD] = React.useState(null);

    function listScreen() {
        setScreen('ListScreen');
    }

    function homeScreen() {
        setScreen('HomeScreen');
    }

    function settingScreen() {
        setScreen('SettingScreen');
    }

    function splitDate(date) {
        var str = date;
        var res = str.split('-');
        var a = parseInt(res[0]);
        var b = parseInt(res[1]);
        var c = parseInt(res[2]);
        setD(a);
        setM(b);
        setY(c);
    }

    let year = new Date().getFullYear();
    let day = new Date().getDate();
    let month = new Date().getMonth() + 1;
    const now = day + '-' + month + '-' + year;

    function searchTime(date) {

        setDate(date);
        splitDate(date);

        if (searchDatain === '' || searchDatain === null || searchDatain === '-' || searchDatain !== null) {
            firebase.database().ref('checkitout' + '/' + user.uid + '/' + y + '/' + m + '/' + d + '/' + 'checkin').once('value', (snapshot) => {
                var i = snapshot.val();
                setSearchDatain(i);
                if (i === null) {
                    setSearchDatain('ไม่พบข้อมูล');
                }
                console.log(searchDatain);
            })
        }
        if (searchDataout === '' || searchDataout === null || searchDataout === '-' || searchDataout !== null) {
            firebase.database().ref('checkitout' + '/' + user.uid + '/' + y + '/' + m + '/' + d + '/' + 'checkout').once('value', (snapshot) => {
                var o = snapshot.val();
                setSearchDataout(o);
                if (o === null) {
                    setSearchDataout('ไม่พบข้อมูล');
                }
                console.log(searchDataout);
            })
        }
        console.log('--------');
        console.log(searchDatain);
        console.log(searchDataout);
    }

    return (
        <LinearGradient style={styles.container} colors={['#70B5FF', 'transparent']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
            <LinearGradient style={styles.header} colors={['#70B5FF', 'transparent']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} >
                <View>
                    <Text style={{ fontSize: 26, fontWeight: 'bold', color: 'white' }}>ประวัติเวลาการทำงาน</Text>
                </View>
            </LinearGradient>
            <DatePicker
                style={styles.datePickerStyle}
                mode="date"
                placeholder="เลือก วัน/เดือน/ปี"
                format="DD-MM-YYYY"
                minDate="01-01-2016"
                maxDate={now}
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                    dateIcon: {
                        position: 'absolute',
                        left: 78,
                        top: 0,
                    },
                    dateInput: {
                        marginTop: 70,
                        backgroundColor: 'white',
                        borderRadius: 30,
                    },
                }}
                onDateChange={(date) => searchTime(date)}
            />
            <View style={styles.content}>
                <View style={styles.result}>
                    <Text></Text>
                    <Text style={{ fontWeight: 'bold', fontSize: 22, color: 'black' }}>{date}</Text>
                    <View style={styles.row}>
                        <View style={styles.inRow}>
                            <Text style={{ fontSize: 18, color: '#00074B' }}>เวลาเข้าทำงาน</Text>
                            <Text style={{ fontWeight: 'bold', fontSize: 26, color: '#006BDE' }}>{searchDatain}</Text>
                        </View>
                        <View style={styles.inRow}>
                            <Text style={{ fontSize: 18, color: '#00074B' }}>เวลาเลิกทำงาน</Text>
                            <Text style={{ fontWeight: 'bold', fontSize: 26, color: '#006BDE' }}>{searchDataout}</Text>
                        </View>
                    </View>
                </View>
            </View>
            <LinearGradient style={styles.menubar} colors={['#70B5FF', 'transparent']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
                <TouchableOpacity style={styles.btnBar} onPress={() => homeScreen()}>
                    <Image style={{ width: 50, height: 50, opacity: 0.5 }} source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/check-it-out-6170e.appspot.com/o/home.png?alt=media&token=439e7b57-0229-4a72-b310-1a13fb236c4e' }} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnBar} onPress={() => listScreen()}>
                    <Image style={{ width: 50, height: 50 }} source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/check-it-out-6170e.appspot.com/o/notes.png?alt=media&token=46fbb798-4cf6-4e46-b194-057e57807ff6' }} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnBar} onPress={() => settingScreen()} >
                    <Image style={{ width: 50, height: 50, opacity: 0.5 }} source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/check-it-out-6170e.appspot.com/o/man.png?alt=media&token=5b1cbfea-70e5-47ad-b99d-d0ab7dbc788a' }} />
                </TouchableOpacity>
            </LinearGradient>
        </LinearGradient >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#8A2BE2',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'nowrap',
        marginTop: 100,
    },
    inRow: {
        width: '50%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        backgroundColor: '#8A2BE2',
        height: 200,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10000,
    },
    result: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 888,
        height: '100%',
        marginBottom: 140,
    },
    nameBox: {
        height: 20,
        width: '100%',
        position: 'absolute',
        bottom: -10,
        left: 0,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    nameTag: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '80%',
        height: 50,
        backgroundColor: '#cfcfcf',
        elevation: 20,
    },
    body: {
        justifyContent: "center",
        alignItems: 'center',
        backgroundColor: '#000',
        width: '100%',
        flex: 1,
    },
    content: {
        flexDirection: 'row',
        flexWrap: 'nowrap',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f9f7f7',
        width: '100%',
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        flex: 1,
        marginTop: 200,
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
    },
    datePickerStyle: {
        width: 200,
        color: 'black',
    },
});


