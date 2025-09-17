import React from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
} from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';

export default function CommentsModal({ visible, onClose, comments }) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerText}>Commentaires</Text>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.closeText}>Fermer</Text>
            </TouchableOpacity>
          </View>

          {/* Liste des commentaires */}
          <FlatList
            data={comments}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.commentRow}>
                {/* Avatar */}
                <Image source={{ uri: item.avatar }} style={styles.avatar} />

                {/* Bloc texte */}
                <View style={styles.commentContent}>
                  {/* Nom utilisateur */}
                  <Text style={styles.userName}>{item.user}</Text>

                  {/* Texte du commentaire */}
                  <Text style={styles.commentText}>{item.text}</Text>

                  {/* Infos meta */}
                  <View style={styles.commentMeta}>
                    <Text style={styles.time}>{item.timeAgo}</Text>
                    <View style={styles.likesContainer}>
                      <Ionicons name="heart" size={14} color="red" />
                      <Text style={styles.likes}>{item.likes}</Text>
                    </View>
                  </View>
                </View>
              </View>
            )}
          />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: "66%", // 2/3 de l’écran
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  closeText: {
    color: "#007AFF",
    fontWeight: "600",
  },
  commentRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 15,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  commentContent: {
    flex: 1,
  },
  userName: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 2,
  },
  commentText: {
    fontSize: 15,
    marginBottom: 5,
  },
  commentMeta: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  time: {
    fontSize: 12,
    color: "gray",
  },
  likesContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  likes: {
    fontSize: 12,
    color: "red",
    fontWeight: "600",
    marginLeft: 4,
  },
});
