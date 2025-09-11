// backend/scripts/migratePasswords.js
const mongoose = require('mongoose');
const User = require('../models/User');
require('dotenv').config();

const migratePasswords = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Find users with unhashed passwords
    const users = await User.find({ isPasswordHashed: { $ne: true } });
    console.log(`Found ${users.length} users with unhashed passwords`);

    for (const user of users) {
      if (user.password && !user.isPasswordHashed) {
        // The pre-save middleware will hash the password
        user.isPasswordHashed = false; // Trigger hashing
        await user.save();
        console.log(`Migrated password for user: ${user.email}`);
      }
    }

    console.log('Password migration completed!');
    process.exit(0);
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
};

migratePasswords();