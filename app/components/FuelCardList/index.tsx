import React from 'react';
import {StyleSheet, Text, View, FlatList, Image} from 'react-native';
import {useQuery} from '@realm/react';

type gasfillup = {
  _id?: Realm.BSON.ObjectId;
  Currency?: string;
  FuelLevelAfter?: number;
  FuelLevelBefore?: number;
  Mileage?: number;
  TotalCost?: number;
  dateTaken?: string;
  imageUrl?: string;
  owner_id?: string;
};

const FuelLogFlatList = () => {
  // get all fillups
  const fillups = useQuery('gasfillup');
  console.log(fillups);

  const renderItem = ({item}: any) => (
    <View style={styles.item}>
      <View style={styles.infoContainer}>
        <Text style={styles.text}>Currency: {item.Currency}</Text>
        <Text style={styles.text}>Fuel Level After: {item.FuelLevelAfter}</Text>
        <Text style={styles.text}>
          Fuel Level Before: {item.FuelLevelBefore}
        </Text>
        <Text style={styles.text}>Mileage: {item.Mileage}</Text>
        <Text style={styles.text}>Total Cost: {item.TotalCost}</Text>
        <Text style={styles.text}>Date Taken: {item.dateTaken}</Text>
        <Text style={styles.text}>Owner ID: {item.owner_id || 'N/A'}</Text>
      </View>
      {/* {item.imageUrl && (
        <View style={styles.imageContainer}>
          <Image source={{uri: item.imageUrl}} style={styles.image} />
        </View>
      )} */}
    </View>
  );

  return (
    <FlatList
      data={fillups}
      keyExtractor={item => item._id}
      renderItem={renderItem}
      style={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  item: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  infoContainer: {
    flex: 1,
  },
  imageContainer: {
    marginLeft: 16,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  text: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
  },
});

export default FuelLogFlatList;
