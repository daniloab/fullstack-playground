import mongoose, { Document, Model } from 'mongoose';

const Schema = new mongoose.Schema(
  {
    name: {
      type: String,
      description: 'Tenant name',
      required: true,
      trim: true,
      es_indexed: true,
    },
    domainName: {
      type: String,
      description: 'The name of the domain to be used on application',
      unique: true,
      lowercase: true,
      trim: true,
      es_indexed: true,
    },
    active: {
      type: Boolean,
      default: true,
      required: true,
      description: 'Defines if this company is active or not',
      es_indexed: true,
    },
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
    collection: 'Tenant',
  },
);

export interface ITenant extends Document {
  name: string;
  domainName: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const TenantModel: Model<ITenant> = mongoose.model('Tenant', Schema);

export default TenantModel;
