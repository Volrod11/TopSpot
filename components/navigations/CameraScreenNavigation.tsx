import { createStackNavigator } from "@react-navigation/stack";
import CameraScreen from "../screens/CameraScreen";
import PhotoDetailsScreen from "../screens/modals/PhotoDetailsScreen";
import { Camera } from "expo-camera";
import { CameraScreenStackParamList } from "../../types";

const CameraScreenStack = createStackNavigator<CameraScreenStackParamList>();

const CameraScreenNavigation = () => {
    return (
        <CameraScreenStack.Navigator>
            <CameraScreenStack.Screen name="CameraScreen" component={CameraScreen} />
            <CameraScreenStack.Screen name="PhotoDetailsScreen" component={PhotoDetailsScreen} />
        </CameraScreenStack.Navigator>
    );
};

export default CameraScreenNavigation;