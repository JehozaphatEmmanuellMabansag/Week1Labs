import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import WelcomeScreen from './screens/WelcomeScreen';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import AddTaskScreen from './screens/AddTaskScreen';
const Stack = createNativeStackNavigator();
export default function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName="Login">
				<Stack.Screen
					name="Login"
					component={LoginScreen}
					options={{ title: 'Log In' }}
				/>
				<Stack.Screen
					name="Signup"
					component={SignupScreen}
					options={{ title: 'Sign Up' }}
				/>
				<Stack.Screen
					name="Welcome"
					component={WelcomeScreen}
					options={{ title: 'Week1Labs' }}
				/>
				<Stack.Screen
					name="AddTask"
					component={AddTaskScreen}
					options={{ title: 'My Tasks' }}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
}