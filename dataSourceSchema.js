 
const dataSourceSchema = new Schema({
  data_resource_name: {
    type: String,
    required: true, 
  },
  storage_type: {
    type: String,
    required: true, 
  },
  storage_location: {
    type: String,
    required: true, 
  },
  storage_string: {
    type: String,
    required: true, 
  },
  is_bucke: {
    type: String,
    required: true, 
  },
  file_source_type: {
    type: String,  
  },
  is_selected_for_project: {
    type: Boolean,
    default: false,
    required: true, 
  },
  created_by: {
    type: String,
    required: true, 
  },
  updated_by: {
    type: String, 
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
});
  