import mongoose, { Schema, model, models } from 'mongoose';

// Wedding Settings Model
const WeddingSchema = new Schema({
  groomName: { type: String, required: true },
  groomFullName: { type: String, required: true },
  brideName: { type: String, required: true },
  brideFullName: { type: String, required: true },
  eventDate: { type: Date, required: true },
  akadTime: { type: String, required: true },
  resepsiTime: { type: String, required: true },
  locationName: { type: String, required: true },
  locationAddress: { type: String, required: true },
  mapsLink: { type: String, required: true },
  loveStory: [{
    year: String,
    title: String,
    content: String
  }],
  gallery: [String], // URLs of images
  bankDetails: [{
    bankName: String,
    accountNumber: String,
    accountHolder: String,
    qrCode: String
  }],
  musicUrl: String,
  themeColor: { type: String, default: '#C5A059' },
  primaryFont: { type: String, default: 'Inter' }
}, { timestamps: true });

export const Wedding = models.Wedding || model('Wedding', WeddingSchema);

// RSVP Model
const RSVPSchema = new Schema({
  name: { type: String, required: true },
  guestCount: { type: Number, default: 1 },
  attendance: { type: String, enum: ['Hadir', 'Tidak Hadir'], required: true },
  message: String,
  invitedAs: String // Name of guest from the URL
}, { timestamps: true });

export const RSVP = models.RSVP || model('RSVP', RSVPSchema);
