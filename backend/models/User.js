// models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: function() {
      return !this.googleId; // Password required only if not Google user
    }
  },
  googleId: {
    type: String,
    sparse: true // Allows multiple null values
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  wishlist: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Place'
  }],
  // Add fields for password migration
  isPasswordHashed: {
    type: Boolean,
    default: false
  },
  authMethod: {
    type: String,
    enum: ['local', 'google', 'both'],
    default: 'local'
  }
}, {
  timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password') || this.isPasswordHashed) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    this.isPasswordHashed = true;
    next();
  } catch (error) {
    next(error);
  }
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  if (!this.password) return false;
  
  // Handle legacy plain text passwords
  if (!this.isPasswordHashed) {
    if (this.password === candidatePassword) {
      // Migrate to hashed password
      this.password = candidatePassword;
      this.isPasswordHashed = false; // Will trigger hashing in pre-save
      await this.save();
      return true;
    }
    return false;
  }
  
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);