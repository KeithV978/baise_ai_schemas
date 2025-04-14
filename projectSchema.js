const projectSchema = new Schema({
  project_name: {
    type: String,
    required: true,
    trim: true,
  },
  project_description: {
    type: String,
    required: true,
    trim: true,
  },
  project_start_date: {
    type: Date,
    default: Date.now,
    required: true,
  },
  project_start_date_timestamp: {
    type: String,
    default: Date.now,
    required: true,
  },
  origin_data_source: {
    type: Schema.Types.ObjectId,
    ref: "dataSource",
    required: true,
  },
  treat_as: {
    type: String,
    enum: ["single", "multi"],
    default: "single",
    required: true,
  },
  annotation_type_category: {
    type: String,
    required: true,
  },
  annotation_type: {
    type: String,
    required: true,
  },
  is_annotation_column_free_text: {
    type: Boolean,
    required: true,
  },
  annotation_column: {
    type: String,
    required: true,
  },
  labels: {
    type: Array,
    required: true,
  },
  destination_data_source: {
    type: Schema.Types.ObjectId,
    ref: "dataSource",
    required: true,
  },
  destination_data_source_storage_type: {
    type: String,
    required: true,
  },
  is_being_annotated: {
    type: Boolean,
    default: false,
  },
  annotation_task_id:{
    type: String,
    required: true,
  },
  annotator_id:{
    type: String,
    required: true,
  },
  annotation_timestamp:{
    type: String,
    required: true,
  },
  is_being_qaed: {
    type: Boolean,
    default: false,
  },
  qa_id:{
    type: String,
    required: true,
  },
  created_by: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
});
