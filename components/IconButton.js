import { Pressable, StyleSheet, Text } from "react-native";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';


export default function IconButton({ icon, label, onPress }) {
    if (icon === "add-circle-outline") {
        iconSize = 60;
    } else {
        iconSize = 40;
    }
    return (
        <Pressable style={styles.iconButton} onPress={onPress}>
            <MaterialIcons name={icon} size={iconSize} color="#7f7f7f" />
        </Pressable>
    );
}


const styles = StyleSheet.create({
    iconButton: {
      justifyContent: 'center',
      alignItems: 'center',
      padding: 15,
    },
    iconButtonLabel: {
      color: '#fff',
      marginTop: 12,
    },
  });