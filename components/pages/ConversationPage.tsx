import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Image,
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useUser } from "../../context/UserContext";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Message = {
  id: string;
  conversationId: string;
  expediteur: string;
  date: string;
  message: string;
};

// Faux "backend" : toutes les conversations
const allMessages: Message[] = [
  { id: "1", conversationId: "conv1", expediteur: "user1", date: "2025-09-10T14:05:00Z", message: "Salut !" },
  { id: "2", conversationId: "conv1", expediteur: "7bf70660-c247-4617-b5d8-36240223cc34", date: "2025-09-10T14:06:00Z", message: "Hey, ça va ?" },
  { id: "3", conversationId: "conv1", expediteur: "user1", date: "2025-09-10T14:07:00Z", message: "Oui nickel, et toi ?" },
  { id: "4", conversationId: "conv1", expediteur: "7bf70660-c247-4617-b5d8-36240223cc34", date: "2025-09-10T14:08:00Z", message: "Top ! Tu fais quoi ?" },
];

type ConversationProps = {
  conversation_id: string; // ✅ en camelCase
};

const ConversationScreen: React.FC<ConversationProps> = ({ conversation_id }) => {
  const [text, setText] = useState("");
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const { currentUserId } = useUser();

  const insets = useSafeAreaInsets();

  // "Simulation" de requête SQL : on filtre dans allMessages
  useEffect(() => {
    const msgs = allMessages;
    setChatMessages([...msgs].reverse()); // on inverse pour FlatList inverted
  }, [conversation_id]);

  const handleSend = () => {
    if (text.trim().length === 0) return;
    const newMessage: Message = {
      id: Date.now().toString(),
      conversationId: conversation_id, // ✅ on rattache à la bonne conversation
      expediteur: currentUserId,
      date: new Date().toISOString(),
      message: text.trim(),
    };
    setChatMessages([newMessage, ...chatMessages]);
    setText("");
  };

  const renderItem = ({ item }: { item: Message }) => {
    const isMe = item.expediteur === currentUserId;

    return (
      <View
        style={[
          styles.messageRow,
          isMe ? styles.rowMe : styles.rowOther,
        ]}
      >
        {!isMe && (
          <Image
            source={{ uri: "https://i.pravatar.cc/150?img=3" }}
            style={styles.avatar}
          />
        )}
        <View
          style={[
            styles.bubble,
            isMe ? styles.bubbleMe : styles.bubbleOther,
          ]}
        >
          <Text style={[styles.text, isMe ? styles.textMe : styles.textOther]}>
            {item.message}
          </Text>
          <Text style={[styles.date, isMe ? styles.dateMe : styles.dateOther]}>
            {new Date(item.date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { paddingTop: insets.top }]}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={80}
    >
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={{ uri: "https://i.pravatar.cc/150?img=3" }}
          style={styles.headerAvatar}
        />
        <Text style={styles.headerTitle}>Test</Text>
      </View>

      {/* Messages */}
      <FlatList
        data={chatMessages}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        inverted
      />

      {/* Zone de saisie */}
      <View style={styles.inputContainer}>
        <TextInput
          value={text}
          onChangeText={setText}
          placeholder="Écrire un message..."
          style={styles.input}
        />
        <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
          <Ionicons name="send" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    backgroundColor: "#6366f1",
  },
  headerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  headerTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
  listContent: {
    paddingVertical: 10,
  },
  messageRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginVertical: 6,
    marginHorizontal: 10,
  },
  rowMe: {
    flexDirection: "row-reverse",
  },
  rowOther: {
    flexDirection: "row",
  },
  avatar: {
    width: 35,
    height: 35,
    borderRadius: 20,
    marginRight: 8,
  },
  bubble: {
    padding: 12,
    borderRadius: 20,
    maxWidth: "75%",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  bubbleMe: {
    backgroundColor: "#6366f1",
  },
  bubbleOther: {
    backgroundColor: "#f3f4f6",
  },
  text: {
    fontSize: 16,
  },
  textMe: {
    color: "white",
  },
  textOther: {
    color: "#111827",
  },
  date: {
    fontSize: 11,
    marginTop: 4,
    textAlign: "right",
  },
  dateMe: {
    color: "#e0e7ff",
  },
  dateOther: {
    color: "#6b7280",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
    backgroundColor: "white",
  },
  input: {
    flex: 1,
    backgroundColor: "#f3f4f6",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 25,
    fontSize: 16,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: "#6366f1",
    borderRadius: 50,
    padding: 10,
  },
});

export default ConversationScreen;