import { Document, Types } from "mongoose";

// all Enums

export enum UserRole {
  Admin = "Admin",
  Receptionist = "Receptionist",
  Doctor = "Doctor",
  Patient = "Patient",
  Nurse = "Nurse",
  LabStaff = "LabStaff"
}

export enum AppointmentType {
  Physical = "physical",
  Online = "online"
}

export enum BookingSource {
  WalkIn = "walk-in",
  Website = "website"
}

export enum AppointmentMode {
  FirstVisit = "first_visit",
  FollowUp = "followup"
}

export enum AppointmentStatus {
  Pending = "pending",
  Approved = "approved",
  Completed = "completed",
  Cancelled = "cancelled",
  NoShow = "no_show"
}

export enum PaymentStatus {
  Unpaid = "unpaid",
  Paid = "paid",
  Refunded = "refunded"
}

export enum RoomStatus {
  Available = "available",
  Occupied = "occupied",
  Maintenance = "maintenance"
}

export enum ConditionStatus {
  Stable = "stable",
  Critical = "critical",
  Recovering = "recovering",
  Discharged = "discharged"
}

export enum ReportStatus {
  Pending = "pending",
  Reviewed = "reviewed",
  Sent = "sent"
}

export enum PaymentMethod {
  Cash = "cash",
  Card = "card",
  MobileBanking = "mobile_banking",
  OnlineGateway = "online_gateway"
}

export enum AssetStatus {
  Available = "available",
  InUse = "in-use",
  Maintenance = "maintenance",
  Retired = "retired"
}

export enum CommunicationType {
  Email = "email",
  SMS = "sms",
  Push = "push"
}

export enum DeliveryStatus {
  Pending = "pending",
  Sent = "sent",
  Failed = "failed"
}

// ======================================================
// Users
// ======================================================

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
  role: UserRole;
  phone?: string;
  gender?: string;
  address?: string;
  profile_picture?: string;
  hospital_id?: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

// ======================================================
// Role-based Profiles
// ======================================================

export interface IDoctor extends Document {
  doctor_id: Types.ObjectId;
  department_id?: Types.ObjectId;
  specialization?: string[];
  qualification?: string[];
  experience_years?: number;
  consultation_fee?: number;
  availability_schedule?: string;
  date_of_joining?: Date;
  status?: "active" | "on_leave" | "resigned";
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IPatient extends Document {
  patient_id: Types.ObjectId;
  age?: number;
  blood_group?: string;
  height?: number;
  weight?: number;
  occupation?: string;
  emergency_contact?: string;
  date_of_birth?: Date;
  current_medication?: string;
  past_medical_history?: string;
  insurance_provider?: string;
  insurance_policy_number?: string;
  allergies?: string;
  is_walk_in?: boolean;
  guardian_name?: string;
  guardian_phone?: string;
  hospital_id?: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IReceptionist extends Document {
  receptionist_id: Types.ObjectId;
  assigned_department?: Types.ObjectId;
  shift_time?: string;
  experience_years?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface INurse extends Document {
  nurse_id: Types.ObjectId;
  assigned_department?: Types.ObjectId;
  assigned_room?: Types.ObjectId;
  shift?: string;
  qualifications?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ILabStaff extends Document {
  staff_id: Types.ObjectId;
  department_id?: Types.ObjectId;
  specialization?: string;
  shift?: string;
  certification?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IAdmin extends Document {
  admin_id: Types.ObjectId;
  designation?: string;
  access_level: "super_admin" | "hospital_admin";
  createdAt?: Date;
  updatedAt?: Date;
}

// ======================================================
// Core Operational Entities
// ======================================================

export interface IDepartment extends Document {
  department_id: Types.ObjectId;
  name: string;
  description?: string;
  head_doctor_id?: Types.ObjectId;
  created_by?: Types.ObjectId;
  hospital_id?: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IAppointment extends Document {
  appointment_id: Types.ObjectId;
  patient_id: Types.ObjectId;
  doctor_id: Types.ObjectId;
  department_id: Types.ObjectId;
  appointment_type: AppointmentType;
  booking_source: BookingSource;
  appointment_mode: AppointmentMode;
  is_followup: boolean;
  followup_of?: Types.ObjectId;
  date_time: Date;
  status: AppointmentStatus;
  approved_by?: Types.ObjectId;
  payment_status: PaymentStatus;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IPatientRecord extends Document {
  record_id: Types.ObjectId;
  appointment_id: Types.ObjectId;
  patient_id: Types.ObjectId;
  doctor_id: Types.ObjectId;
  diagnosis?: string;
  prescription?: string;
  treatment_notes?: string;
  condition_status: ConditionStatus;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ITestReport extends Document {
  report_id: Types.ObjectId;
  record_id: Types.ObjectId;
  test_name: string;
  result: string;
  file_url: string;
  uploaded_by: Types.ObjectId;
  verified_by?: Types.ObjectId;
  status: ReportStatus;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IPayment extends Document {
  payment_id: Types.ObjectId;
  appointment_id: Types.ObjectId;
  patient_id: Types.ObjectId;
  amount: number;
  method: PaymentMethod;
  status: "pending" | "completed" | "failed" | "refunded";
  transaction_id?: string;
  paid_at?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IRoom extends Document {
  room_id: Types.ObjectId;
  room_number: string;
  department_id: Types.ObjectId;
  capacity: number;
  status: RoomStatus;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IBedAllocation extends Document {
  allocation_id: Types.ObjectId;
  room_id: Types.ObjectId;
  patient_id: Types.ObjectId;
  start_date: Date;
  end_date?: Date;
  status: "active" | "discharged";
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IAsset extends Document {
  asset_id: Types.ObjectId;
  name: string;
  category: string;
  status: AssetStatus;
  assigned_to_room?: Types.ObjectId;
  created_by?: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ICommunication extends Document {
  message_id: Types.ObjectId;
  recipient_id: Types.ObjectId;
  type: CommunicationType;
  subject: string;
  body: string;
  related_appointment?: Types.ObjectId;
  delivery_status: DeliveryStatus;
  sent_at?: Date;
  createdAt?: Date;
}
