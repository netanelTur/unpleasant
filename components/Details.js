import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import lightColors from '../assets/colors/lightcolors';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from "moment";
import uuid from 'react-native-uuid';

const Details = () => {
  const [description, setDescription] = useState("");
  const [messageDate, setMessageDate] = useState(new Date());
  const [messageTime, setMessageTime] = useState(new Date());

  const navigation = useNavigation();
  const route = useRoute();
  const { themeColors } = route.params;

  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onDateTimeChange = (event, selectedDate) => {
    setShow(Platform.OS === 'ios');
    const currentDate = selectedDate || new Date();
    
    if(mode == 'date') {
      setMessageDate(currentDate);
    } else {
      setMessageTime(currentDate);
    }
  };
  
  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };
  
  const showDatepicker = () => {
    showMode('date');
  };
  
  const showTimepicker = () => {
    showMode('time');
  };

  const handleAddReminder = async () => {
    const reminder = {
      id: uuid.v4(),
      description: description,
      date: moment(messageDate).format("ll"),
      time: moment(messageTime).format("H:mm")
    };
    const value = await AsyncStorage.getItem("reminders");
    const reminders = value ? JSON.parse(value) : [];
    reminders.push(reminder);
    await AsyncStorage.setItem("reminders", JSON.stringify(reminders))
    .then(() => navigation.navigate("Home"));
  }

  return (
    <View style={[styles.container, { backgroundColor: themeColors.background }]}>
      {/* Title */}
      <View style={styles.topWrapper}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="chevron-thin-left" size={30} color={themeColors.text}/>
        </TouchableOpacity>
        <Text style={[styles.title, { color: themeColors.text }]}>New reminder</Text>
      </View>

      {/* Contact */}
      <View style={styles.contactWrapper}>
        <Text style={[styles.contactTitle, { color: themeColors.text }]}>Who to remind?</Text>
        <TouchableOpacity>
          <View style={[styles.contactButton, { backgroundColor: themeColors.primary }]}>
            <Text style={[styles.contactText, { color: themeColors.secondary }]}>choose contact</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Description */}
      <View style={styles.descriptionWrapper}>
        <Text style={[styles.descriptionTitle, { color: themeColors.text }]}>Description</Text>
        <TextInput
        style={[styles.input, { backgroundColor: themeColors.primary, color: themeColors.text }]}
        multiline={true}
        numberOfLines={4}
        onChangeText={(text) => setDescription(text)}
        /*value={description}*/ />
      </View>

      {/* Time */}
      <View style={styles.timeWrapper}>
        <Text style={[styles.timeTitle, { color: themeColors.text }]}>Time</Text>
        <View style={styles.timeButtonsWrapper}>
          <View style={[styles.datePicker, { backgroundColor: themeColors.primary }]}>
            <TouchableOpacity onPress={showDatepicker}>
              <View style={styles.dateButton}>
                <Text style={[styles.dateButtonText, { color: themeColors.text }]}>{moment(messageDate).format("ll")}</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={[styles.timePicker, { backgroundColor: themeColors.primary }]}>
            <TouchableOpacity onPress={showTimepicker}>
              <View style={styles.timeButton}>
                <Text style={[styles.timeButtonText, { color: themeColors.text }]}>{moment(messageTime).format("H:mm")}</Text>
              </View>
            </TouchableOpacity>
          </View>
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={new Date(messageDate)}
              mode={mode}
              is24Hour={true}
              display="default"
              onChange={onDateTimeChange}
            />
          )}
        </View>
      </View>

      {/* Add reminder button */}
      <TouchableOpacity onPress={handleAddReminder} style={styles.button}>
        <View style={[styles.addWrapper, { backgroundColor: themeColors == lightColors ? themeColors.primary : '#FF90A1' }]}>
          <Text style={[styles.buttonText, { color: themeColors.text }]}>Add reminder</Text>
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
    alignItems: 'center',
    paddingLeft: 25
  },
  title: {
    paddingLeft: 15,
    fontFamily: 'Poppins-Medium',
    fontSize: 24
  },
  contactWrapper: {
    paddingTop: 50,
    paddingHorizontal: 10
  },
  contactTitle: {
    paddingBottom: 5,
    fontFamily: 'Poppins-Medium',
    fontSize: 18
  },
  contactButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 60,
    borderRadius: 10
  },
  contactText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 20
  },
  descriptionWrapper: {
    paddingTop: 30,
    paddingHorizontal: 10
  },
  descriptionTitle: {
    paddingBottom: 5,
    fontFamily: 'Poppins-Medium',
    fontSize: 18
  },
  input: {
    width: '100%',
    borderRadius: 10,
    padding: 5,
    textAlignVertical: 'top'
  },
  timeWrapper: {
    paddingTop: 30,
    paddingHorizontal: 10,
  },
  
  timeTitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 18
  },
  timeButtonsWrapper: {
    paddingTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  datePicker: {
    borderRadius: 40,
    width: '45%',
  },
  timePicker: {
    borderRadius: 40,
    width: '45%',
  },
  dateButton: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  timeButton: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  dateButtonText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20
  },
  timeButtonText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20
  },
  button: {
    width: '100%',
    paddingHorizontal: 10,
    position: 'absolute',
    bottom: 35,
    alignSelf: 'center'
  },
  addWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 40,
    height: 50,
    shadowColor: 'rgba(0,0,0, .4)', // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
    elevation: 2, // Android
  },
  buttonText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18
  },
});

export default Details;
