import Realm from 'realm';

export type gasfillup = {
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

export const gasfillupSchema = {
  name: 'gasfillup',
  properties: {
    _id: 'objectId?',
    Currency: 'string?',
    FuelLevelAfter: 'double?',
    FuelLevelBefore: 'double?',
    Mileage: 'int?',
    TotalCost: 'double?',
    dateTaken: 'string?',
    imageUrl: 'string?',
    owner_id: 'string?',
  },
  primaryKey: '_id',
};

export type user = {
  _id: Realm.BSON.ObjectId;
  car_ownership: Realm.List<string>;
  name?: string;
  user_id?: string;
};

export const userSchema = {
  name: 'user',
  properties: {
    _id: 'objectId',
    car_ownership: 'string[]',
    name: 'string?',
    user_id: 'string?',
  },
  primaryKey: '_id',
};

export type userInfo = {
  _id: Realm.BSON.ObjectId;
  account_share: Realm.List<string>;
  user_id?: string;
};

export const userInfoSchema = {
  name: 'userInfo',
  properties: {
    _id: 'objectId',
    account_share: 'string[]',
    user_id: 'string?',
  },
  primaryKey: '_id',
};

export type vehicle = {
  _id: Realm.BSON.ObjectId;
  car_id?: string;
  car_make?: string;
  owner_id?: string;
};

export const vehicleSchema = {
  name: 'vehicle',
  properties: {
    _id: 'objectId',
    car_id: 'string?',
    car_make: 'string?',
    owner_id: 'string?',
  },
  primaryKey: '_id',
};

export const schemas = [
  gasfillupSchema,
  userSchema,
  userInfoSchema,
  vehicleSchema,
];
