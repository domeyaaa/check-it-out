import * as React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import { LinearGradient } from 'expo-linear-gradient';
import { Card, Button } from 'react-native-paper';
import * as firebase from 'firebase';
import * as Google from 'expo-google-app-auth';
import HomeScreen from "./screen/HomeScreen";
import ListScreen from "./screen/ListScreen";
import SettingScreen from './screen/SettingScreen';

var firebaseConfig = {
  apiKey: 'AIzaSyBsVFHeKyPKm4y82nLy2vBaWbqMFfh8yNc',
  authDomain: 'check-it-out-6170e.firebaseapp.com',
  databaseURL: 'https://check-it-out-6170e-default-rtdb.firebaseio.com',
  projectId: 'check-it-out-6170e',
  storageBucket: 'check-it-out-6170e.appspot.com',
  messagingSenderId: '876971889623',
  appId: '1:876971889623:web:3751800d3c6f67067db192',
  measurementId: 'G-GTLY6HPLKC',
};

if (!firebase.inited) {
  firebase.inited = true;
  firebase.initializeApp(firebaseConfig);
}

async function signInWithGoogle() {
  const config = {
    androidClientId:
      '611575512184-euajmqnblsqpfsgroohfvcc2p1sdvrfb.apps.googleusercontent.com',
    iosClientId:
      '611575512184-0ehf76ge3ju3stofkk3m8up5rhmdaqla.apps.googleusercontent.com',
    scopes: ['profile', 'email'],
  };
  try {
    var res = await Google.logInAsync(config);
    if (res.type == 'success') {
      await firebase
        .auth()
        .setPersistence(firebase.auth.Auth.Persistence.LOCAL);
      // Set persistent auth state
      const credential = firebase.auth.GoogleAuthProvider.credential(
        res.idToken,
        res.accessToken
      );
      global.googleProfileData = await firebase
        .auth()
        .signInAndRetrieveDataWithCredential(credential);
      return Promise.resolve(true);
    } else {
      return Promise.reject(false);
    }
  } catch (error) {
    alert(error);
    return Promise.reject(false);
  }
}

export default function App() {
  const [user, setUser] = React.useState(null);
  const [inited, setInited] = React.useState(false);
  const [screen, setScreen] = React.useState('HomeScreen');

  if (!inited) {
    setInited(true);
    firebase.auth().onAuthStateChanged((guser) => {
      setUser(guser);
      setScreen('HomeScreen');
    });
  }



  if (user == null) {
    return <LoginScreen />
  }
  if (screen == 'HomeScreen') {
    return <HomeScreen user={user} setScreen={setScreen} />
  }
  if (screen == 'ListScreen') {
    return <ListScreen user={user} setScreen={setScreen} />
  }
  if (screen == 'SettingScreen') {
    return <SettingScreen user={user} setScreen={setScreen} />
  }
  else {
    return <LoginScreen />
  }

}

function LoginScreen() {
  return (
    <LinearGradient style={styles.container} colors={['#70B5FF', '#8A2BE2']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} >
      <View>
        <View style={styles.cardLogo}>
          <Image
            style={styles.logo}
            source={{
              uri:
                'https://firebasestorage.googleapis.com/v0/b/check-it-out-6170e.appspot.com/o/logo.png?alt=media&token=100acf8b-b03f-409c-a7a9-e1fb27ebb3fd',
            }}
          />
        </View>

        <Card style={styles.card}>
          <TouchableOpacity
            style={styles.btnLogin}
            onPress={() => signInWithGoogle()}>
            <Image style={{ width: 30, height: 30, marginRight: 10 }} source={{ uri: 'https://cdn2.iconfinder.com/data/icons/font-awesome/1792/google-512.png' }} />
            <Text style={{ color: 'black', fontSize: 18 }}>LOGIN WITH GOOGLE</Text>
          </TouchableOpacity>
        </Card>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 5,
    marginRight: 40,
    marginLeft: 40,
    marginTop: 4,
    borderRadius: 50,
    backgroundColor: '#FFFCED',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,

  },
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    padding: 8,
    justifyContent: 'center',
    backgroundColor: '#ECEFFF',
    fontFamily: 'Kanit-Thin',
  },
  btnLogin: {
    padding: 5,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  logo: {
    height: 180,
    width: 180,
    marginBottom: 10,
  },
  cardLogo: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  },

});
