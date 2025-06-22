import { createStackNavigator } from "@react-navigation/stack";
import CameraScreen from "../screens/CameraScreen";
import PhotoDetailsScreen from "../screens/modals/PhotoDetailsScreen";
import { Camera } from "expo-camera";
import { CameraScreenStackParamList } from "../../types";

const CameraScreenStack = createStackNavigator<CameraScreenStackParamList>();

const CameraScreenNavigation = ({ route }) => {
    const { user_id } = route.params;
    return (
        <CameraScreenStack.Navigator>
            <CameraScreenStack.Screen name="CameraScreen" component={CameraScreen} initialParams={{ user_id }} />
            <CameraScreenStack.Screen name="PhotoDetailsScreen" component={PhotoDetailsScreen} />
        </CameraScreenStack.Navigator>
    );
};

export default CameraScreenNavigation;