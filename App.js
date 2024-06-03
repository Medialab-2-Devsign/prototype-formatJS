import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  FormattedDate,
  FormattedMessage,
  IntlProvider,
  useIntl,
} from "react-intl";
import { StyleSheet, Text, View, Button, useColorScheme } from "react-native";

export default function App() {
  function loadLocaleData(locale) {
    switch (locale) {
      case "nl":
        return import("./compiled-lang/nl.json");
      case "tr":
        return import("./compiled-lang/tr.json");
      default:
        return import("./compiled-lang/en.json");
    }
  }

  const changeLocale = () => {
    switch (userLocale) {
      case "en":
        return setUserLocale("nl");
      case "nl":
        return setUserLocale("tr");
      default:
        return setUserLocale("en");
    }
  };
  const [userLocale, setUserLocale] = useState(null);
  const [localeMessages, setLocaleMessages] = useState(null);

  useEffect(() => {
    (async () => {
      const msg = await loadLocaleData(userLocale);
      setLocaleMessages(msg);
    })();
  }, [userLocale]);

  useEffect(() => {
    setUserLocale("en");
    (async () => {
      const msg = await loadLocaleData(userLocale);
      setLocaleMessages(msg);
    })();
  }, []);

  return (
    <>
      {localeMessages && (
        <IntlProvider
          locale={userLocale}
          messages={localeMessages}
          defaultLocale="en"
        >
          <View style={styles.container}>
            <>
              <Text>Current Locale:</Text>
              <Text>{userLocale}</Text>
              <Text>Lets put up some text here:</Text>
              <Text>
                <FormattedMessage
                  description={"Welcome Message"}
                  defaultMessage={
                    "Welcome to my Tech Research into FormatJS. NOTE: This is the fallback message"
                  }
                />
              </Text>
              <Text>
                And a date formatted according to the chosen localization:
              </Text>
              <Text>
                <FormattedDate value={Date.now()} />
              </Text>
              <Button title="Change Language" onPress={changeLocale} />
            </>

            <StatusBar style="auto" />
          </View>
        </IntlProvider>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
