// DataResourceSchema
const DataResourceSchema = new mongoose.Schema({
  dataResourceName: { type: String, required: true },
  storageType: { 
    type: String, 
    enum: ["database", "storage bucket"],
    required: true 
  },
  
  // Database structure
  storageLocation: String,
  connectionString: String,
  
  // Google Cloud storage bucket structure
  storageBucketName: String,
  cloudProjectId: String,
  privateKeyId: String,
  privateKey: String,
  certUrl: String,
  
  // Azure Blob storage structure
  storageAccountKey: String,
  blobSasUrl: String,
  containerName: String,
  
  // AWS S3 storage structure
  awsKeyId: String,
  awsSecretAccessKey: String,
  awsRegion: String,
  bucketName: String,
  
  isActive: { type: Boolean, default: true },
  dataResourceDescription: String,
  customerEmail: String,
  customerId: String,
  creationTimestamp: { type: Number, default: Date.now },
  updatedTimestamp: { type: Number, default: Date.now }
}, {
  timestamps: { 
    createdAt: 'creationTimestamp',
    updatedAt: 'updatedTimestamp'
  }
});

// ProjectSchema
const ProjectSchema = new mongoose.Schema({
  projectName: { type: String, required: true },
  projectDescription: String,
  projectStartDate: String,
  projectStartDateTimestamp: Number,
  originDataSource: {
    sourceType: { 
      type: String, 
      enum: ["file upload", "file storage", "database"],
      required: true 
    },
    
    // File Upload structure
    fileUploadDetails: [{
      fileStorageUrl: String,
      fileStorageKey: String,
      uploadDate: String,
      filename: String,
      isAddedToTask: { type: Boolean, default: false }
    }],
    
    // File Storage structure
    storageDetails: {
      sourceType: { 
        type: String, 
        enum: ["link to bucket", "existing data source"] 
      },
      bucketLink: String,
      dataResourceId: String
    },
    
    // Database details structure
    databaseDetails: {
      dataResourceId: String,
      nameOfCollection: String,
      groupByColumn: String
    }
  },
  
  isMultipleTasks: { type: Boolean, default: false },
  labellingTemplate: String,
  annotationCategoryType: String,
  annotationType: String,
  isAnnotationColumnFreeText: { type: Boolean, default: false },
  annotationColumn: String,
  labels: [String],
  
  destinationDataSourceDetails: {
    hasDestinationStorageLocation: { type: Boolean, default: false },
    dataResourceId: String,
    dataResourceStorageType: String,
    exportFormat: String
  },
  
  labellingMetrics: {
    timeTakenPerTaskInMinutes: Number,
    numberOfAnnotators: Number,
    numberOfQaReviewers: Number
  },
  
  estimatedCompletionTimeInMinutes: Number,
  estimatedPrice: Number,
  projectQuestionnaireId: String,
  labelStudioProjectId: String,
  createdByEmail: String,
  creationTimestamp: { type: Number, default: Date.now },
  updatedTimestamp: { type: Number, default: Date.now }
}, {
  timestamps: { 
    createdAt: 'creationTimestamp',
    updatedAt: 'updatedTimestamp'
  }
});

// TrainingMaterialsSchema
const TrainingMaterialsSchema = new mongoose.Schema({
  projectId: { type: String, required: true },
  materialType: { 
    type: String, 
    enum: ["file", "link"],
    required: true 
  },
  
  // File structure
  fileUploadUrl: String,
  fileKey: String,
  
  // Link structure
  materialName: String,
  materialUrl: String,
  
  createdByEmail: String,
  updated_by_email: String,
  creationTimestamp: { type: Number, default: Date.now },
  updatedTimestamp: { type: Number, default: Date.now }
}, {
  timestamps: { 
    createdAt: 'creationTimestamp',
    updatedAt: 'updatedTimestamp'
  }
});

// QuestionnaireSchema
const QuestionnaireSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  projectId: { type: String, required: true },
  requiredPersonnels: {
    type: [String],
    enum: ["qa", "annotator"]
  },
  passScore: Number,
  retakesLimit: Number,
  creationTimestamp: { type: Number, default: Date.now },
  updatedTimestamp: { type: Number, default: Date.now }
}, {
  timestamps: { 
    createdAt: 'creationTimestamp',
    updatedAt: 'updatedTimestamp'
  }
});

// QuestionnaireQuestionsSchema
const QuestionnaireQuestionsSchema = new mongoose.Schema({
  questionnaireId: { type: String, required: true },
  questionSerialNumber: Number,
  question: { type: String, required: true },
  correctOption: [String],
  questionOptions: [String],
  creationTimestamp: { type: Number, default: Date.now },
  updatedTimestamp: { type: Number, default: Date.now }
}, {
  timestamps: { 
    createdAt: 'creationTimestamp',
    updatedAt: 'updatedTimestamp'
  }
});

// QuestionnaireResultSchema
const QuestionnaireResultSchema = new mongoose.Schema({
  questionnaireId: { type: String, required: true },
  projectId: { type: String, required: true },
  personnelId: Number,
  personnelRole: String,
  personnelEmail: String,
  percentageScore: Number,
  status: { 
    type: String, 
    enum: ["passed", "failed"] 
  },
  questionnaireCompletionTimestamp: { type: Number, default: Date.now }
});

// BaiseAiQaTestersSchema
const BaiseAiQaTestersSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  sex: String,
  bio: String,
  dateOfBirth: Date,
  profileImageUrl: String,
  employmentStatus: { 
    type: String, 
    enum: ["active", "suspended", "deactivated"],
    default: "active"
  },
  educationalQualification: String,
  numberOfStrikes: { type: Number, default: 0 },
  postalAddress: String,
  address: String,
  country: String,
  city: String,
  creationTimestamp: { type: Number, default: Date.now },
  updatedTimestamp: { type: Number, default: Date.now }
}, {
  timestamps: { 
    createdAt: 'creationTimestamp',
    updatedAt: 'updatedTimestamp'
  }
});

// BaiseAiAnnotatorsSchema
const BaiseAiAnnotatorsSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  sex: String,
  bio: String,
  dateOfBirth: Date,
  profileImageUrl: String,
  employmentStatus: { 
    type: String, 
    enum: ["active", "suspended", "deactivated"],
    default: "active"
  },
  educationalQualification: String,
  address: String,
  postalAddress: String,
  country: String,
  city: String,
  creationTimestamp: { type: Number, default: Date.now },
  updatedTimestamp: { type: Number, default: Date.now }
}, {
  timestamps: { 
    createdAt: 'creationTimestamp',
    updatedAt: 'updatedTimestamp'
  }
});

// ResumeMetadataSchema
const ResumeMetadataSchema = new mongoose.Schema({
  personnelId: { type: String, required: true },
  documentName: String,
  fileType: String,
  fileSise: String, // Note: There's a typo in the original schema (fileSise instead of fileSize)
  uploadedTimestamp: { type: Number, default: Date.now },
  documentLocationUrl: String,
  documentUploadKey: String
});

// CustomerSchema
const CustomerSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  profileImageUrl: String,
  phoneNumber: String,
  address: {
    country: String,
    state: String,
    zipCode: Number,
    street: String,
    streetNumber: Number
  },
  projectsId: [String],
  paymentsId: [String],
  creationTimestamp: { type: Number, default: Date.now },
  updatedTimestamp: { type: Number, default: Date.now }
}, {
  timestamps: { 
    createdAt: 'creationTimestamp',
    updatedAt: 'updatedTimestamp'
  }
});

// QaTestersProjectsSchema
const QaTestersProjectsSchema = new mongoose.Schema({
  staffEmail: { type: String, required: true },
  projectName: String,
  projectId: { type: String, required: true },
  numberOfStrikes: { type: Number, default: 0 },
  numberOfReviewedDatasets: { type: Number, default: 0 },
  averageAnnotationsPerMinutes: Number,
  reviewTime: Number,
  projectStartTimestamp: Number,
  terminatedTimestamp: Number,
  completionTimestamp: Number,
  creationTimestamp: { type: Number, default: Date.now },
  updatedTimestamp: { type: Number, default: Date.now }
}, {
  timestamps: { 
    createdAt: 'creationTimestamp',
    updatedAt: 'updatedTimestamp'
  }
});

// AnnotatorsProjectsSchema
const AnnotatorsProjectsSchema = new mongoose.Schema({
  staffEmail: { type: String, required: true },
  projectName: String,
  projectId: { type: String, required: true },
  numberOfAnnotatedTasks: { type: Number, default: 0 },
  numberOfStrikes: { type: Number, default: 0 },
  numberOfLabelledDatasets: { type: Number, default: 0 },
  averageAnnotationsPerMinutes: Number,
  projectStartTimestamp: Number,
  terminatedTimestamp: Number,
  completionTimestamp: Number,
  creationTimestamp: { type: Number, default: Date.now },
  updatedTimestamp: { type: Number, default: Date.now }
}, {
  timestamps: { 
    createdAt: 'creationTimestamp',
    updatedAt: 'updatedTimestamp'
  }
});

// TasksSchema
const TasksSchema = new mongoose.Schema({
  projectId: { type: String, required: true },
  seriesId: String,
  oderBy: String, // Note: There's a typo in the original schema (oderBy instead of orderBy)
  index: Number,
  groupByColumn: String,
  taskTypeCategory: { 
    type: String, 
    enum: ["text", "image", "video", "audio"],
    required: true
  },
  data: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  },
  taskTypeSubcategory: { 
    type: String, 
    enum: ["text classification", "text generation", "image classification", "image segmentation", "video classification", "audio classification"] 
  },
  taskStatus: { 
    type: String, 
    enum: ["pending", "in progress", "pending qa review", "qa review in progress", "customer review", "completed"],
    default: "pending"
  },
  taskCreationTimestamp: { type: Number, default: Date.now },
  annotatorCompletionTimestamp: Number,
  qaReviewCompletionTimestamp: Number,
  annotatorEmail: String,
  qaTesterEmail: String,
  annotationStartTimestamp: Number,
  annotationEndTimestamp: Number,
  annotationDuration: Number,
  qaStartTimestamp: Number,
  qaEndTimestamp: Number,
  qaReviewDuration: Number,
  customerEmail: String,
  customerReviewStatus: String,
  customerReviewTimestamp: Number,
  creationTimestamp: { type: Number, default: Date.now },
  updatedTimestamp: { type: Number, default: Date.now },
  series_id: Number,
  series_index: Number
}, {
  timestamps: { 
    createdAt: 'creationTimestamp',
    updatedAt: 'updatedTimestamp'
  }
});

// BatchSchema
const BatchSchema = new mongoose.Schema({
  batchNumber: { type: Number, required: true },
  projectId: { type: String, required: true },
  customerId: { type: String, required: true },
  isUploaded: { type: Boolean, default: false },
  status: { 
    type: String, 
    enum: ["pending upload", "batch uploaded"],
    default: "pending upload"
  },
  qaTesterId: String,
  creationTimestamp: { type: Number, default: Date.now },
  updatedTimestamp: { type: Number, default: Date.now },
  taskIds: [String]
}, {
  timestamps: { 
    createdAt: 'creationTimestamp',
    updatedAt: 'updatedTimestamp'
  }
});

// PaymentsSchema
const PaymentsSchema = new mongoose.Schema({
  customerId: { type: String, required: true },
  customerEmail: { type: String, required: true },
  projectId: { type: String, required: true },
  paymentDescription: String,
  paymentMethod: String,
  status: String,
  paymentAmount: Number,
  inhouzPaymentId: String,
  stripeIntentId: String,
  transactionId: String,
  extraFees: Number,
  paymentTotalAmount: Number,
  paymentCurrency: String,
  paymentTimestamp: { type: Number, default: Date.now }
});

// PersonnelPayoutSchema
const PersonnelPayoutSchema = new mongoose.Schema({
  projectName: String,
  numberOfAnnotatedTasks: { type: Number, default: 0 },
  hoursWorked: Number,
  amountPaid: Number,
  status: String
});

// Create models from schemas
const DataResource = mongoose.model('DataResource', DataResourceSchema);
const Project = mongoose.model('Project', ProjectSchema);
const TrainingMaterials = mongoose.model('TrainingMaterials', TrainingMaterialsSchema);
const Questionnaire = mongoose.model('Questionnaire', QuestionnaireSchema);
const QuestionnaireQuestions = mongoose.model('QuestionnaireQuestions', QuestionnaireQuestionsSchema);
const QuestionnaireResult = mongoose.model('QuestionnaireResult', QuestionnaireResultSchema);
const BaiseAiQaTester = mongoose.model('BaiseAiQaTester', BaiseAiQaTestersSchema);
const BaiseAiAnnotator = mongoose.model('BaiseAiAnnotator', BaiseAiAnnotatorsSchema);
const ResumeMetadata = mongoose.model('ResumeMetadata', ResumeMetadataSchema);
const Customer = mongoose.model('Customer', CustomerSchema);
const QaTestersProjects = mongoose.model('QaTestersProjects', QaTestersProjectsSchema);
const AnnotatorsProjects = mongoose.model('AnnotatorsProjects', AnnotatorsProjectsSchema);
const Task = mongoose.model('Task', TasksSchema);
const Batch = mongoose.model('Batch', BatchSchema);
const Payment = mongoose.model('Payment', PaymentsSchema);
const PersonnelPayout = mongoose.model('PersonnelPayout', PersonnelPayoutSchema);

module.exports = {
  DataResource,
  Project,
  TrainingMaterials,
  Questionnaire,
  QuestionnaireQuestions,
  QuestionnaireResult,
  BaiseAiQaTester,
  BaiseAiAnnotator,
  ResumeMetadata,
  Customer,
  QaTestersProjects,
  AnnotatorsProjects,
  Task,
  Batch,
  Payment,
  PersonnelPayout
};