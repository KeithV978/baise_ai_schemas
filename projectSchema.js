 
const dataResourceSchema = new Schema({
    data_resource_name: {
      type: String,
      required: true,
      trim: true
    },
    storage_type: {
      type: String,
      required: true,
      trim: true
    },
    storage_location: {
      type: String,
      required: true,
      trim: true
    },
    storage_string: {
      type: String,
      required: true,
      trim: true
    },
  
  
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address']
    },
    password: {
      type: String,
      required: true,
      minlength: 6
    },
    age: {
      type: Number,
      min: 0,
      default: null
    },
    isActive: {
      type: Boolean,
      default: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    updatedAt: {
      type: Date,
      default: Date.now
    }
  });
    