import {Button, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {useAuth, useUser, useQuery, useRealm} from '@realm/react';
import FuelLogFlatList from './components/FuelCardList';
import {
  Camera,
  useCodeScanner,
  useCameraPermission,
  useCameraDevice,
} from 'react-native-vision-camera';

const CameraScreen = () => {
  const {hasPermission, requestPermission} = useCameraPermission();

  useEffect(() => {
    console.log('hasPermission', hasPermission);

    if (!hasPermission) {
      requestPermission();
    }
  }, []);

  const device = useCameraDevice('back');

  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: codes => {
      console.log(`Scanned ${codes.length} codes!`);
      console.log(codes);
    },
  });

  if (device == null)
    return (
      <View>
        <Text>no camera</Text>
      </View>
    );
  return (
    <Camera
      style={{flex: 1}}
      device={device}
      isActive={true}
      codeScanner={codeScanner}
    />
  );
};

const Home = () => {
  const realm = useRealm();
  const [isCameraOpen, setIsCameraOpen] = React.useState(false);
  function UserInformation() {
    const user = useUser();
    const {logOut} = useAuth();

    const performLogout = () => {
      logOut();
    };

    const performCamera = () => {
      setIsCameraOpen(!isCameraOpen);
    };

    return (
      <View>
        <Text>{user?.profile.name}</Text>
        <Text>{user?.profile.email}</Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Button title="Logout" onPress={performLogout} />
          <Button
            title={isCameraOpen ? 'Close Camera' : ' Camera'}
            onPress={performCamera}
          />
        </View>
      </View>
    );
  }

  useEffect(() => {
    console.log('Running RealmContext...');
    const createSubscription = async () => {
      // Create subscription for filtered results.
      await realm.subscriptions.update(mutableSubs => {
        mutableSubs.add(realm.objects('gasfillup'), {name: 'gas fill ups'});
      });
    };
    createSubscription().catch(console.error);
    // Set to state variable.
  }, []);

  return (
    <View style={styles.container}>
      <UserInformation />
      {isCameraOpen ? <CameraScreen /> : <FuelLogFlatList />}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
