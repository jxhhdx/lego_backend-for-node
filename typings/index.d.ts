import 'egg';
import { Connection, Model } from 'mongoose';
import { UserProps } from '../app/model/user'
declare module 'egg' { 
  interface MongooseModels extends IModel {
    [key: string]: Model<any>
  }
 
}