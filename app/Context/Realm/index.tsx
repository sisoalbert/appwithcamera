import {useEffect} from 'react';
import {useRealm} from '@realm/react';

const RealmContext = ({children}: any) => {
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

  return <RealmContext>{children}</RealmContext>;
};

export default RealmContext;
