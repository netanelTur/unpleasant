import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const Reminder = (props) => {
  const themeColors = props.themeColors;

  return (
    <TouchableOpacity>
      <View style={[styles.item, { backgroundColor: themeColors.primary }]}>
        {/* Name */}
        <View style={styles.itemTop}>
          <Text numberOfLines={1} style={[styles.nameText, { color: themeColors.text }]}>{ props.name }</Text>
        </View>

        {/* Description */}
        <View style={styles.itemCenter}>
          <Text numberOfLines={3} style={[styles.descriptionText, { color: themeColors.text }]}>{ props.description }</Text>
        </View>

        {/* Date */}
        <View style={styles.itemBottom}>
          <Text style={[styles.dateText, { color: themeColors.secondary }]}>{ props.date }</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  item: {
    borderRadius: 20,
    width: 150,
    height: 120,
    paddingLeft: 10,
    marginBottom: 15,
    marginRight: 15
  },
  itemTop: {},
  nameText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18
  },
  itemCenter: {
    maxWidth: 120,
    position: 'absolute',
    top: 33,
    left: 10,
    flexWrap: 'nowrap'
  },
  descriptionText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12
  },
  itemBottom: {
    position: 'absolute',
    bottom: 7,
    alignSelf: 'center'
  },
  dateText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 12
  },
});

export default Reminder;
