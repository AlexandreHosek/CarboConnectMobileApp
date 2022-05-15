/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  NativeModules,
  Alert,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const Section: React.FC<{
  title: string;
}> = ({children, title}) => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

const App = () => {
  const getDataUsage = () => {
    if (NativeModules.DataUsageModule) {
      // Get data usage of all installed apps in current device
      // Parameters "startDate" and "endDate" are optional (works only with Android 6.0 or later). Declare empty object {} for no date filter.
      NativeModules.DataUsageModule.listDataUsageByApps(
        {
          startDate: new Date(2017, 4, 22, 0, 0, 0, 0).getTime(), // 1495422000000 = Mon May 22 2017 00:00:00
          endDate: new Date().getTime(),
        },
        (err, jsonArrayStr) => {
          if (!err) {
            var apps = JSON.parse(jsonArrayStr);
            console.log(apps);
            for (var i = 0; i < apps.length; i++) {
              var app = apps[i];
              console.log(
                'App name: ' +
                  app.name +
                  '\n' +
                  'Package name: ' +
                  app.packageName +
                  '\n' +
                  'Received bytes: ' +
                  app.rx +
                  'bytes\n' +
                  'Transmitted bytes: ' +
                  app.tx +
                  'bytes\n' +
                  'Received MB: ' +
                  app.rxMb +
                  '\n' +
                  'Transmitted MB: ' +
                  app.txMb,
              );
            }
          }
        },
      );

      // Get data usage of specific list of installed apps in current device
      // Example: get data usage for Facebook, YouTube and WhatsApp.
      // Parameters "startDate" and "endDate" are optional (works only with Android 6.0 or later)
      NativeModules.DataUsageModule.getDataUsageByApp(
        {
          packages: [
            'com.facebook.katana',
            'com.google.android.youtube',
            'com.whatsapp',
          ],
          startDate: new Date(2017, 4, 22, 0, 0, 0, 0).getTime(), // 1495422000000 = Mon May 22 2017 00:00:00
          endDate: new Date().getTime(),
        },
        (err, jsonArrayStr) => {
          if (!err) {
            var apps = JSON.parse(jsonArrayStr);
            console.log(apps);
            for (var i = 0; i < apps.length; i++) {
              var app = apps[i];
              console.log(
                'App name: ' +
                  app.name +
                  '\n' +
                  'Package name: ' +
                  app.packageName +
                  '\n' +
                  'Received bytes: ' +
                  app.rx +
                  'bytes\n' +
                  'Transmitted bytes: ' +
                  app.tx +
                  'bytes\n' +
                  'Received MB: ' +
                  app.rxMb +
                  '\n' +
                  'Transmitted MB: ' +
                  app.txMb,
              );
            }
          }
        },
      );

      // Check if app has permission to access data usage by apps
      // This way will not ask for permissions (check only)
      // If you pass "requestPermission": "true", then app will ask for permissions.
      NativeModules.DataUsageModule.requestPermissions(
        {requestPermission: 'false'},
        (err, result) => {
          var permissionObj = JSON.parse(result);
          if (!permissionObj.permissions) {
            Alert.alert(
              'Give Permission',
              'You need to enable data usage access for this app. Please, enable it on the next screen.',
              [
                {text: 'Cancel', style: 'cancel', onPress: () => Actions.pop()},
                {
                  text: 'Give permission',
                  onPress: () => this.requestPermissions(),
                },
              ],
              {cancelable: false},
            );
          }
        },
      );
    }

    return true;
  };

  const isDarkMode = getDataUsage() === true;

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Section title="Step One">
            Edit <Text style={styles.highlight}>App.tsx</Text> to change this
            screen and then come back to see your edits.
          </Section>
          <Section title="See Your Changes">
            <ReloadInstructions />
          </Section>
          <Section title="Debug">
            <DebugInstructions />
          </Section>
          <Section title="Learn More">
            Read the docs to discover what to do next:
          </Section>
          <LearnMoreLinks />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
