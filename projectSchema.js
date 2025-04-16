const dataResourceSchema = {
  data_resource_name: {
    type: String,
    required: true,
  },
  storage_type: {
    type: String,
    enum: ["database", "storage bucket"],
    required: true,
  },
  storage_location: {
    type: String,
    required: true,
  },
  connection_string: {
    type: String,
    required: true,
  },
  is_valid: {
    type: Boolean,
    default: false,
    required: true,
  },
  is_selected_for_project: {
    type: Boolean,
    default: false,
    required: true,
  },
  data_resource_description: {
    type: String,
    required: true,
  },
  created_by_email: {
    type: String,
    required: true,
  },
  updated_by_email: {
    type: String,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
};

const projectSchema = {
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
    origin_data_source_type: {
      type: String,
      enum: ["File Upload", "File Storage", "Database"],
      required: true,
    },
    origin_file_upload_detaiils: {
      storage_url:{
        type: String,
      }
  },
  origin_file_storage_details: {
    origin_file_source_type:{
      type: String,
      enum: ["Link to bucket", "Existing data source"],
      required: true,
    },
    origin_file_source: {
      type: String,
      required: true,
    },
  },
  
  origin_file_storage_details: {
    origin_database_data_source_id: {
      type: String,
      required: true,
    },
    origin_database: {
      type: String,
    },
    origin_database_table: {
      type: String,
    },
  },
},
  treat_as: {
    type: String,
    enum: ["single", "multi"],
    default: "single",
  },
  annotation_details: {
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
  },
  destination_data_source_details:{

    has_destination_storage_location: {
      type: Boolean,
      required: true,
    },
  destination_data_export_format: {
    type: String,
    required: true,
  },
  destination_data_source_id: {
    type: Schema.Types.ObjectId,
    ref: "dataSource",
    required: true,
  },
},
  labelling_metrics: {
    time_taken_per_task_in_minutes: {
      type: Number,
      default: 1,
      reqired: true,
    },
    number_of_annotators: {
      type: Number,
      default: 1,
      reqired: true,
    },
    number_of_qa_testers: {
      type: Number,
      default: 1,
      reqired: true,
    },
  },
  estimated_completion_time_in_minutes: {
    type: Number,
    default: 0,
    required: true,
  },
  estimated_price: {
    type: Number,
    default: 0,
    required: true,
  },
  destination_data_source_storage_type: {
    type: String,
    required: true,
  },
  training_materials: [
    {
      material_type: {
        type: String,
        enum: ["file", "link"],
        required: true,
      },
      material_name: {
        type: String,
        required: true,
      },
      material_key: {
        type: String,
        required: true,
      },
      material_url: {
        type: String,
        required: true,
      },
    },
  ],
  project_questionnaire: {
    type: Schema.Types.ObjectId,
    ref: "questionnaireSchema",
    required: true,
  },
  tasks_lists: {
    type: Array,
    ref: "tasksList",
    required: true,
  },
  annotation_task_id: {
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
};

const taskSchema = {
  customer_review_status: {
    type: String,
  },
  is_being_annotated: {
    type: Boolean,
    default: false,
    required: true,
  },
  annotator_id: {
    type: String,
    required: true,
  },
  annotation_timestamp: {
    type: String,
    required: true,
  },
  qa_id: {
    type: String,
    required: true,
  },
  is_being_qa_reviewed: {
    type: Boolean,
    default: false,
    required: true,
  },
  qa_timestamp: {
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
};

const questionnaireSchema = {
  project_id: {
    type: Schema.Types.ObjectId,
    ref: "projectSchema",
  },
  question_serial_number: {
    type: Number,
  },
  question: {
    type: String,
  },
  qustion_options: [
    {
      option: {
        type: String,
      },
    },
  ],
  correct_option: {
    type: String,
  },
  for_annotator: {
    type: Boolean,
  },
  for_qa: {
    type: Boolean,
  },
};
