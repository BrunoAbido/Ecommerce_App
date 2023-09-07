// DetailsScreen.tsx
import React from 'react';
import { View, Text } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type DetailsParamList = {
  Details: { itemId: string }; 
};

type DetailsScreenRouteProp = RouteProp<DetailsParamList, 'Details'>;
type DetailsScreenNavigationProp = StackNavigationProp<DetailsParamList, 'Details'>;

interface Details {
  route: DetailsScreenRouteProp;
  navigation: DetailsScreenNavigationProp;
}

const Details: React.FC<Details> = ({ route }) => {
  const { itemId } = route.params; 

  return (
    <View>
      <Text>Details Screen</Text>
      <Text>Item ID: {itemId}</Text>
    </View>
  );
};

export default Details;
