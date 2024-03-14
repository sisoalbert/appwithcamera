import {ActivityIndicator, Button, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {useAuth} from '@realm/react';

const ErrorComponent = ({error}: {error: Error}) => {
  return <Text>{error.message}</Text>;
};

const Loading = () => {
  return <ActivityIndicator size="large" color="#0000ff" />;
};

export const Login = () => {
  // `logInWithAnonymous` logs in a user using an
  // anonymous Realm Credential.
  // `result` gives us access to the result of the
  // current operation. In this case, `logInWithAnonymous`.
  const {logInWithAnonymous, result} = useAuth();

  // Log in an anyonmous user on component render.
  // On successful login, this fallback component unmounts.
  const performLogin = () => {
    logInWithAnonymous();
  };

  return (
    <View style={styles.container}>
      {!result.error && (
        <View>
          <Text>Please log in</Text>
          <Button title="Login" onPress={performLogin} />
        </View>
      )}
      <View>
        {result.pending && <Loading />}
        {result.error && <ErrorComponent error={result.error} />}
      </View>
    </View>
  );
};
export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'coral',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
