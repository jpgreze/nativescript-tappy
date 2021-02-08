# NativeScript Tappy

{N} plugin for integrating with the iOS sdk and Android SDK for the TapTrack NFC Scanner.

See https://github.com/TapTrack/TCMPTappy-iOS and https://github.com/TapTrack/TCMPTappy-Android.

To build the plugin, follow these instructions:

1. cd src
2. npm run build
3. npm run pack

These steps will create the plugin file and place it into the publish/package directory.

## Demo

The demo app displays a set of buttons to test the plugin. To build it, follow these
steps:

1. cd src
2. npm run demoprep
3. cd ../demo
4. npm install
5. npm platform add ios|android
6. npm run ios|android

IOS Notes:

Within your own apps, you must add the keys NSBluetoothAlwaysUsageDescription and
NSBluetoothPeripheralUsageDescription to your Info.plist file.

Android Notes:

Android requires API level 23 or higher. Edit the app.gradle file in your
App_Resources folder/Android folder to modify this.

Android also requires the following privileges be added to the AndroidManifest.xml file:
<uses-permission-sdk-23 android:name="android.permission.ACCESS_COARSE_LOCATION"/>
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION"/>
<uses-permission android:name="android.permission.ACCESS_BACKGROUND_LOCATION" />
<uses-feature android:name="android.hardware.bluetooth_le" android:required="true"/>
<uses-permission android:name="android.permission.BLUETOOTH"/>
<uses-permission android:name="android.permission.BLUETOOTH_ADMIN"/>

## License

Apache License Version 2.0, January 2004
