import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import lightColors from '../assets/colors/lightcolors';
import darkColors from '../assets/colors/darkcolors';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Reminder from './Reminder';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = () => {
  const [themeColors, setThemeColors] = useState(lightColors);
  const [reminders, setReminders] = useState([]);
  const navigation = useNavigation();

  useFocusEffect(
    React.useCallback(() => {
      getReminders();
    }, [])
  );
  
  const getReminders = () => {
    AsyncStorage.getItem("reminders").then((reminders) => {
      setReminders(JSON.parse(reminders));
    })
  }

  const deleteReminders = async () => {
    AsyncStorage.clear();
    getReminders(); //setReminders([]) works but requires refreshing
  }

  const toggleMode = () => {
    if(themeColors == lightColors) {
      setThemeColors(darkColors);
    } else {
      setThemeColors(lightColors);
    }
  }

  const renderItem = ({ item }) => (
    <Reminder id={item.id} themeColors={themeColors} name={"John Doe"} description={item.description} date={item.date} />
  )

  const listHeader = () => {
    const clearTextColor = themeColors == lightColors ? darkColors.background : themeColors.pink;
    return (
      <View style={styles.headerWrapper}>
        <Text style={[styles.subTitle, { color: themeColors.text }]}>Reminders</Text>
        {reminders && <TouchableOpacity onPress={deleteReminders} style={styles.clearAllButton}>
          <Text style={[styles.clearAllText, { color: clearTextColor }]}>Clear all</Text>
        </TouchableOpacity>}
      </View>
    );
  }

  const handleEmpty = () => {
    return (
      <View style={styles.noRemindersWrapper}>
        <Icon name="calendar-clock" size={64} color={themeColors.secondary} />
        <Text style={[styles.noRemindersText, {color: themeColors.secondary}]}>No reminders here yet</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: themeColors.background }]}>
      {/* Title */}
      <View style={styles.topWrapper}>
        <Text style={[styles.topTitle, { color: themeColors.text }]}>Unpleasant</Text>
        <TouchableOpacity onPress={toggleMode} style={styles.modeButton} >
          <Feather name={themeColors == lightColors ? "sun" : "moon"} size={40} color={themeColors.text} />
        </TouchableOpacity>
      </View>

      {/* Reminders list */}
      <View style={styles.remindersWrapper}>
        <FlatList
          data={reminders}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.remindersList}
          ListHeaderComponent={listHeader}
          ListEmptyComponent={handleEmpty}
          numColumns={2}
        />
      </View>

      {/* Add reminder button */}
      <TouchableOpacity onPress={() => navigation.navigate("Details", { themeColors: themeColors })} style={styles.button}>
        <View style={[styles.addWrapper, { backgroundColor: themeColors == lightColors ? themeColors.primary : themeColors.pink }]}>
          <Icon name="plus" size={35} color={themeColors.text} />
        </View>
      </TouchableOpacity>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 70
  },
  topWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  topTitle: {
    paddingLeft: 30,
    fontFamily: 'Poppins-Bold',
    fontSize: 36
  },
  modeButton: {
    paddingRight: 30
  },
  remindersWrapper: {
    flex: 1,
    flexGrow: 1,
    paddingTop: 85,
    paddingLeft: 30
  },
  headerWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  subTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 24
  },
  clearAllButton: {
    paddingRight: 30
  },
  clearAllText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14
  },
  remindersList: {
    paddingTop: 10,
    flexDirection: 'column', //row
  },
  noRemindersWrapper: {
    marginLeft: -30, // For fixing remindersWrapper paddingLeft.
    paddingTop: 80,
    alignItems: 'center',
  },
  noRemindersText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16
  },
  button: {
    position: 'absolute',
    bottom: 35,
    alignSelf: 'center'
  },
  addWrapper: {
    width: 64,
    height: 64,
    borderRadius: 64,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'rgba(0,0,0, .4)', // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
    elevation: 2, // Android
  },

});

export default Home;
