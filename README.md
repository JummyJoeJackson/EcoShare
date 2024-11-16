# EcoShare - A Social Media for Environmental Change

EcoShare is a social media platform designed to inspire and motivate individuals to take action toward a more sustainable future. Our goal is to create a community of environmentally-conscious users who share their eco-friendly actions, collaborate on green initiatives, and raise awareness about climate change.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
- [Coming Soon](#coming-soon)
- [Installation](#installation)




## Features

- **Eco-Friendly Actions Feed:** Share your sustainable actions like recycling, reducing waste, using renewable energy, and planting trees.
- **User Authentication:** Secure login and registration system to store user log-ins.
- **Photo Upload Support:** Attach images to each eco-action post to showcase initiative visually.
- **Post Eco-Friendly Actions:** Users can post descriptions of their eco-friendly actions along with photos.
- **Labelled Posts:** Posts show the user which uploaded them.





## Getting Started

To get started, create an account and connect with other like-minded individuals who are passionate about sustainability. Start by sharing your eco-friendly habits, like switching to reusable products or reducing your energy consumption.




## Coming Soon
- **Like and Comment:** Show support for others' actions by liking or commenting on their posts.
- **Follow Users:** Follow users whose actions and ideas resonate with you. Stay updated on their latest posts and activities.
-  **Direct Messaging:** Start conversations with other environmentally-conscious users to share experiences, exchange eco-friendly tips, and discuss projects.
- **Group Discussions:** Join group chats focused on specific topics like sustainable living, renewable energy, or local environmental initiatives.




## Installation
To install you must either go to the expo-snack link: https://snack.expo.dev/@jummyjoejackson/ecoshare or do the following!

## Setting Up and Running a React Native Project Outside of Expo Snack

### 1. **Install Prerequisites**
Ensure you have the following installed on your system:
- **Node.js** (Recommended: Latest LTS version)  
  [Download Node.js](https://nodejs.org/)
- **npm** or **yarn** (Comes with Node.js)
- **React Native CLI** (if using React Native CLI instead of Expo)
  ```bash
  npm install -g react-native-cli

  ```
- **Android Studio** (for Android emulator):  
  Install Android Studio and set up the Android SDK.
- **Xcode** (for iOS development, Mac only):  
  Install Xcode from the Mac App Store and set up Command Line Tools.

---

## 2. Create a New React Native Project
If you're starting a fresh project:
```bash
npx react-native init YourProjectName
```

If you’re using Expo:
```bash
npx create-expo-app YourProjectName
```

---

## 3. Navigate to Your Project Directory
```bash
cd YourProjectName
```

---

## 4. Install Required Dependencies
Install dependencies for React Native and your project:
```bash
npm install
```

For example, if you’re using `@react-native-async-storage/async-storage` and `expo-image-picker`:
```bash
npm install @react-native-async-storage/async-storage
npm install expo-image-picker
```

---

## 5. Add Permissions for Image Picking (if using Expo)
Update `app.json` (for Expo):
```json
{
  "expo": {
    "permissions": [
      "CAMERA",
      "CAMERA_ROLL"
    ]
  }
}
```

---

## 6. Running Your Project

### For Expo:
Start the Expo server:
```bash
npx expo start
```
- Scan the QR code using the Expo Go app on your mobile device.

### For React Native CLI:
#### iOS (Mac only):
```bash
npx react-native run-ios
```

#### Android:
Start an Android emulator or connect an Android device, then run:
```bash
npx react-native run-android
```

---

## 7. Clearing AsyncStorage for Testing
To clear all data in AsyncStorage, use the following code snippet:
```javascript
import AsyncStorage from '@react-native-async-storage/async-storage';

const clearAsyncStorage = async () => {
  try {
    await AsyncStorage.clear();
    console.log('AsyncStorage cleared successfully.');
  } catch (error) {
    console.error('Error clearing AsyncStorage:', error);
  }
};

clearAsyncStorage();
```

---





