import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Note } from "../../../models/note.model";
import colors from "../../../utils/constants/colors";
import { getFormattedDate } from "../../../utils/date";

export const NoteDetails = ({ note }: { note: Note }) => {
  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <Text style={styles.itemTitle}>Title</Text>
        <Text style={styles.itemBody}>{note.title}</Text>
      </View>
      <View style={styles.item}>
        <Text style={styles.itemTitle}>Description</Text>
        <Text style={styles.itemBody}>{note.description}</Text>
      </View>
      <View style={styles.item}>
        <Text style={styles.itemTitle}>Date</Text>
        <Text style={styles.itemBody}>{getFormattedDate(note.date)}</Text>
      </View>
      <View style={styles.item}>
        <Text style={styles.itemTitle}>Note</Text>
        <Text style={styles.itemBody}>{note.note}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 20,
    height: "100%",
    flexGrow: 1,
    flex: 1,
  },
  item: {
    marginBottom: 20,
  },
  itemTitle: {
    fontSize: 18,
    color: colors.gray,
    paddingBottom: 5,
  },
  itemBody: {
    fontSize: 20,
    color: "#000000",
  },
});
