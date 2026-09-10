import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { onAuthStateChanged } from 'firebase/auth';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { auth } from './firebaseConfig';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import AddTaskScreen from './screens/AddTaskScreen';
const Stack = createNativeStackNavigator();
export default function App() {
	const [user, setUser] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		return onAuthStateChanged(auth, (currentUser) => {
			setUser(currentUser);
			setIsLoading(false);
		});
	}, []);

	if (isLoading) {
		return (
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<ActivityIndicator size="large" accessibilityLabel="Loading account" />
			</View>
		);
	}

	return (
		<NavigationContainer>
			<Stack.Navigator>
				{user ? (
					<Stack.Screen
						name="AddTask"
						component={AddTaskScreen}
						options={{ title: 'My Tasks' }}
					/>
				) : (
					<>
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
					</>
				)}
			</Stack.Navigator>
		</NavigationContainer>
	);
}
