import {Button, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {useAuth, useUser, useQuery, useRealm} from '@realm/react';
import FuelLogFlatList from './components/FuelCardList';
function UserInformation() {
  const user = useUser();
  const {logOut} = useAuth();

  const performLogout = () => {
    logOut();
  };

  return (
    <View>
      <Text>{user?.profile.name}</Text>
      <Text>{user?.profile.email}</Text>
      <Button title="Logout" onPress={performLogout} />
    </View>
  );
}

const Home = () => {
  const realm = useRealm();

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
      <Text>Home</Text>
      <UserInformation />
      <FuelLogFlatList />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
