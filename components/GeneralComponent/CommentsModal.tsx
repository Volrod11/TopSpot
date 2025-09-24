import React, { useEffect, useState } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  TextInput,
} from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import { supabase } from "../../lib/supabase";
import { useUser } from "../../context/UserContext";

type CommentsModalProps = {
  visible: boolean,
  onClose: () => void,
  picture_or_garage_id: string,
  content_type: "picture" | "garage"
  ,
  onCommentsChange?: (count: number) => void;
};

type Comment = {
  comment_id: string,
  user_id: string,
  username: string,
  avatar_url: string,
  comment: string,
  created_at: string
};

const fetchPictureComments = async (picture_id: string) => {
  const { data, error } = await supabase.rpc("get_picture_comments", { p_picture_id: picture_id });

  if (error) {
    console.error("Error fetching picture comments", error);
  }

  return data as Comment[];
};


const fetchGarageComments = async (garage_id: string) => {
  const { data, error } = await supabase.rpc("get_garage_comments", { p_garage_id: garage_id });

  if (error) {
    console.error("Error fetching garage comments", error);
  }

  return data as Comment[];
};


const insertPictureComment = async (picture_id: string, comment: string) => {
  const { data, error } = await supabase.rpc("insert_comment_in_picture", {
    p_picture_id: picture_id,
    p_comment: comment
  });

  if (error) {
    console.error("Error adding comment", error);
  }

  return { data, error };
};


const insertGarageComment = async (garage_id: string, comment: string) => {
  const { data, error } = await supabase.rpc("insert_comment_in_garage", {
    p_garage_id: garage_id,
    p_comment: comment
  });

  if (error) {
    console.error("Error adding comment", error);
  }

  return { data, error };
};


export default function CommentsModal({ visible, onClose, picture_or_garage_id, content_type, onCommentsChange }: CommentsModalProps) {
  const { currentUserId, username, avatarUrl } = useUser();

  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [nbNewComment, setNbNewComment] = useState(0);


  useEffect(() => {
    const fetchPictureCommentsFromDatabase = async () => {
      const loadedComments =
      content_type === "picture"
      ? await fetchPictureComments(picture_or_garage_id)
      : await fetchGarageComments(picture_or_garage_id);

      setComments(loadedComments || []);
    };

    fetchPictureCommentsFromDatabase();
  }, [picture_or_garage_id]);

  useEffect(() => {
    // Notifie le parent du nombre actuel de commentaires
    onCommentsChange?.(comments.length);
  }, [comments]);

  const handleSendComment = async () => {
    if (!newComment.trim()) return;
    setLoading(true);

    let error;
    if (content_type === "picture") {
      ({ error } = await insertPictureComment(picture_or_garage_id, newComment));
    } else {
      ({ error } = await insertGarageComment(picture_or_garage_id, newComment));
    }

    if (!error) {
      const tempComment: Comment = {
        comment_id: Math.random().toString(),
        user_id: currentUserId,
        username: username,
        avatar_url: avatarUrl,
        comment: newComment,
        created_at: new Date().toISOString(),
      };

      setComments(prev => {
        const updated = [tempComment, ...prev]
        onCommentsChange?.(updated.length);
        return updated;
      });
      setNewComment("");
    }

    setLoading(false);
  };

  return (
    <Modal animationType="slide" transparent visible={visible} onRequestClose={onClose}>
      <KeyboardAvoidingView
        style={styles.modalOverlay}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.modalContent}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerText}>Commentaires</Text>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.closeText}>Fermer</Text>
            </TouchableOpacity>
          </View>

          {/* Contenu */}
          {comments.length > 0 ? (
            <FlatList
              data={comments}
              keyExtractor={(item) => item.comment_id}
              renderItem={({ item }) => (
                <View style={styles.commentRow}>
                  <Image source={{ uri: item.avatar_url ||  "https://i.pravatar.cc/100?img=9"}} style={styles.avatar} />
                  <View style={styles.commentContent}>
                    <Text style={styles.userName}>{item.username}</Text>
                    <Text style={styles.commentText}>{item.comment}</Text>
                    <View style={styles.commentMeta}>
                      <Text style={styles.time}>{new Date(item.created_at).toLocaleString()}</Text>
                      <Ionicons name="heart" size={14} color="red" />
                    </View>
                  </View>
                </View>
              )}
            />
          ) : (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>Soyez le premier à commenter !</Text>
            </View>
          )}

          {/* Input en bas */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={newComment}
              onChangeText={setNewComment}
              placeholder="Ajouter un commentaire..."
              returnKeyType="send"
              onSubmitEditing={handleSendComment}
              editable={!loading}
            />
            <TouchableOpacity onPress={handleSendComment} disabled={loading}>
              <Ionicons name="send" size={22} color="#007AFF" />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
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
    paddingHorizontal: 20,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: "66%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold"
  },
  closeText: {
    color: "#007AFF",
    fontWeight: "600"
  },
  commentRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 15
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10
  },
  commentContent: {
    flex: 1
  },
  userName: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 2
  },
  commentText: {
    fontSize: 15,
    marginBottom: 5
  },
  commentMeta: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  time: {
    fontSize: 12,
    color: "gray"
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  emptyText: {
    fontSize: 16,
    color: "gray",
    fontStyle: "italic"
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    marginBottom: "5%"
  },
  input: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    marginRight: 8
  },
});