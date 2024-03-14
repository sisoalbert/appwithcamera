import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {AppProvider, RealmProvider, UserProvider} from '@realm/react';
import Login from './app/Login';
import Home from './app/Home';
import {mongoAppId} from './mongokey.config';
import {schemas} from './app/models/schemas';
import RealmContext from './app/Context/Realm';

const Loading = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="red" />
    </View>
  );
};

const App = () => {
  return (
    <AppProvider id={mongoAppId}>
      {/* The component set as the `fallback` prop will be rendered if a user has
    not been authenticated. In this case, we will show the login screen. */}
      <UserProvider fallback={<Login />}>
        <RealmProvider
          // The fallback component will be rendered until the realm is opened.
          fallback={Loading}
          schema={schemas}
          sync={{
            flexible: true,
          }}>
          {/* <RealmContext> */}
          <Home />
          {/* </RealmContext> */}
        </RealmProvider>
      </UserProvider>
    </AppProvider>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
