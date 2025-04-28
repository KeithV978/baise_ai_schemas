// Data Resource Schema
const dataResourceSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  dataResourceName: { type: String, required: true },
  storageType: { type: String, enum: ["database", "storage bucket"], required: true },
  
  // database structure
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
});

// Project Schema
const projectSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  projectName: { type: String, required: true },
  projectDescription: String,
  projectStartDate: String,
  projectStartDateTimestamp: Number,
  originDataSource: {
    sourceType: { type: String, enum: ["file upload", "file storage", "database"] },
    
    // File Upload structure
    fileUploadDetails: [{
      _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
      fileStorageUrl: String,
      fileStorageKey: String,
      uploadDate: String,
      filename: String,
      isAddedToTask: Boolean
    }],
    
    // File Storage structure
    storageDetails: {
      sourceType: { type: String, enum: ["link to bucket", "existing data source"] },
      // Link to bucket structure
      bucketLink: String,
      // Existing data source structure
      dataResourceId: { type: mongoose.Schema.Types.ObjectId, ref: 'DataResource' }
    },
    
    databaseDetails: {
      dataResourceId: { type: mongoose.Schema.Types.ObjectId, ref: 'DataResource' },
      nameOfCollection: String,
      groupByColumn: String
    }
  },
  isMultipleTasks: Boolean,
  annotationCategoryType: String,
  annotationType: String,
  isAnnotationColumnFreeText: Boolean,
  annotationColumn: String,
  labels: [String],
  destinationDataSourceDetails: {
    hasDestinationStorageLocation: Boolean,
    // has_destination_storage_location: YES
    dataResourceId: { type: mongoose.Schema.Types.ObjectId, ref: 'DataResource' },
    dataResourceStorageType: String,
    // has_destination_storage_location: NO
    exportFormat: String
  },
  labellingMetrics: {
    timeTakenPerTaskInMinutes: Number,
    numberOfAnnotators: Number,
    numberOfQaReviewers: Number
  },
  estimatedCompletionTimeInMinutes: Number,
  estimatedPrice: Number,
  projectQuestionnaireId: { type: mongoose.Schema.Types.ObjectId, ref: 'Questionnaire' },
  labelStudioProjectId: String,
  createdByEmail: String,
  creationTimestamp: { type: Number, default: Date.now },
  updatedTimestamp: { type: Number, default: Date.now }
});

// Training Materials Schema
const trainingMaterialsSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
  materialType: { type: String, enum: ["file", "link"], required: true },
  // file
  fileUploadUrl: String,
  fileKey: String,
  // link
  materialName: String,
  materialUrl: String,
  
  createdByEmail: String,
  updated_by_email: String,
  creationTimestamp: { type: Number, default: Date.now },
  updatedTimestamp: { type: Number, default: Date.now }
});

// Questionnaire Schema
const questionnaireSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
  requiredPersonnels: [{ type: String, enum: ["qa", "annotator"] }],
  passScore: Number,
  retakesLimit: Number,
  creationTimestamp: { type: Number, default: Date.now },
  updatedTimestamp: { type: Number, default: Date.now }
});

// Questionnaire Questions Schema
const questionnaireQuestionsSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  questionnaireId: { type: mongoose.Schema.Types.ObjectId, ref: 'Questionnaire', required: true },
  questionSerialNumber: Number,
  question: String,
  correctOption: [String],
  questionOptions: [String],
  creationTimestamp: { type: Number, default: Date.now },
  updatedTimestamp: { type: Number, default: Date.now }
});

// Questionnaire Result Schema
const questionnaireResultSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  questionnaireId: { type: mongoose.Schema.Types.ObjectId, ref: 'Questionnaire' },
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
  personnelId: { type: mongoose.Schema.Types.ObjectId, ref: 'Personnel' },
  personnelRole: String,
  personnelEmail: String,
  percentageScore: Number,
  status: { type: String, enum: ["passed", "failed"] },
  questionnaireCompletionTimestamp: Number
});

// BAISE AI QA Testers Schema
const baiseAiQaTestersSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  firstName: String,
  lastName: String,
  email: { type: String, required: true, unique: true },
  sex: String,
  bio: String,
  dateOfBirth: Date,
  profileImageUrl: String,
  employmentStatus: { type: String, enum: ["active", "suspended", "deactivated"], default: "active" },
  educationalQualification: String,
  numberOfStrikes: { type: Number, default: 0 },
  postalAddress: String,
  address: String,
  country: String,
  city: String,
  creationTimestamp: { type: Number, default: Date.now },
  updatedTimestamp: { type: Number, default: Date.now }
});

// BAISE AI Annotators Schema
const baiseAiAnnotatorsSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  firstName: String,
  lastName: String,
  email: { type: String, required: true, unique: true },
  sex: String,
  bio: String,
  dateOfBirth: Date,
  profileImageUrl: String,
  employmentStatus: { type: String, enum: ["active", "suspended", "deactivated"], default: "active" },
  educationalQualification: String,
  address: String,
  postalAddress: String,
  country: String,
  city: String,
  creationTimestamp: { type: Number, default: Date.now },
  updatedTimestamp: { type: Number, default: Date.now }
});

// Resume Metadata Schema
const resumeMetadataSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  personnelId: { type: mongoose.Schema.Types.ObjectId, refPath: 'personnelModel' },
  personnelModel: { type: String, enum: ['QaTester', 'Annotator'] },
  documentName: String,
  fileType: String,
  fileSise: String, // Note: There's a typo in the original "fileSise"
  uploadedTimestamp: Number,
  documentLocationUrl: String,
  documentUploadKey: String
});

// Customer Schema
const customerSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  customerName: String,
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
  projectsId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project' }],
  paymentsId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Payment' }],
  creationTimestamp: { type: Number, default: Date.now },
  updatedTimestamp: { type: Number, default: Date.now }
});

// QA Testers Projects Schema
const qaTestersProjectsSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  staffEmail: String,
  staffId: { type: mongoose.Schema.Types.ObjectId, ref: 'QaTester' },
  projectName: String,
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
  numberOfStrikes: { type: Number, default: 0 },
  numberOfLabelledDatasets: { type: Number, default: 0 },
  averageAnnotationsPerMinutes: Number,
  reviewTime: Number,
  projectStartTimestamp: Number,
  terminatedTimestamp: Number,
  completionTimestamp: Number,
  creationTimestamp: { type: Number, default: Date.now },
  updatedTimestamp: { type: Number, default: Date.now }
});

// Annotators Projects Schema
const annotatorsProjectsSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  staffEmail: String,
  staffId: { type: mongoose.Schema.Types.ObjectId, ref: 'Annotator' },
  projectName: String,
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
  numberOfStrikes: { type: Number, default: 0 },
  numberOfLabelledDatasets: { type: Number, default: 0 },
  averageAnnotationsPerMinutes: Number,
  projectStartTimestamp: Number,
  terminatedTimestamp: Number,
  completionTimestamp: Number,
  creationTimestamp: { type: Number, default: Date.now },
  updatedTimestamp: { type: Number, default: Date.now }
});

// Tasks Schema
const tasksSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
  labelStudioTaskId: String,
  taskType: { type: String, enum: ["annotation", "qa review"] },
  taskTypeCategory: { type: String, enum: ["text", "image", "video", "audio"] },
  taskTypeSubcategory: { 
    type: String, 
    enum: [
      "text classification", 
      "text generation", 
      "image classification", 
      "image segmentation", 
      "video classification", 
      "audio classification"
    ] 
  },
  taskStatus: { 
    type: String, 
    enum: ["in progress", "qa review", "customer review", "completed"],
    default: "in progress"
  },
  taskCreationTimestamp: { type: Number, default: Date.now },
  isAnnotated: { type: Boolean, default: false },
  annotatorCompletionTimestamp: Number,
  isQaReviewed: { type: Boolean, default: false },
  qaReviewCompletionTimestamp: Number,
  annotatorEmail: String,
  annotatorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Annotator' },
  qaTesterEmail: String,
  qaTesterrId: { type: mongoose.Schema.Types.ObjectId, ref: 'QaTester' },
  annotationStartTimestamp: Number,
  annotationEndTimestamp: Number,
  annotationDuration: Number,
  qaStartTimestamp: Number,
  qaEndTimestamp: Number,
  qaReviewDuration: Number,
  customerEmail: String,
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
  customerReviewStatus: String,
  customerReviewTimestamp: Number,
  creationTimestamp: { type: Number, default: Date.now },
  updatedTimestamp: { type: Number, default: Date.now }
});

// Batch Schema
const batchSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  batchNumber: Number,
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
  isUploaded: { type: Boolean, default: false },
  status: { type: String, enum: ["pending upload", "batch uploaded"], default: "pending upload" },
  qaTesterId: { type: mongoose.Schema.Types.ObjectId, ref: 'QaTester' },
  creationTimestamp: { type: Number, default: Date.now },
  updatedTimestamp: { type: Number, default: Date.now },
  taskIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }]
});

// Payments Schema
const paymentsSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
  customerEmail: String,
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
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
  paymentTimestamp: Number
});

// Personnel Payout Schema
const personnelPayoutSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  personnelId: { type: mongoose.Schema.Types.ObjectId, refPath: 'personnelModel' },
  personnelModel: { type: String, enum: ['QaTester', 'Annotator'] },
  projectName: String,
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
  numberOfAnnotatedTasks: Number,
  hoursWorked: Number,
  amountPaid: Number,
  status: String
});
 