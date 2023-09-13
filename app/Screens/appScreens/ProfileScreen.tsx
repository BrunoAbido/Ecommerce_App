import React, { useEffect, useState } from "react";
import { View, Text, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";

// ...

 function ProfileScreen({ route }: { route: any }) {
  const { userId } = route.params;
  const [user, setUser] = useState<any>(null);
  const navigation = useNavigation();

  useEffect(() => {
    // Procurar o usuário com base no userId passado
    const foundUser = user.find((u: { userId: any; }) => u.userId === userId);

    if (foundUser) {
      // Define o usuário encontrado no estado
      setUser(foundUser);
    }
  }, [userId]);

  return (
    <View>
      {user ? (
        <View>
          <Text>Nome: {user.name}</Text>
          <Text>Email: {user.email}</Text>
        </View>
      ) : (
        <Text>Usuário não encontrado.</Text>
      )}
      <Button title="Voltar" onPress={() => navigation.goBack()} />
    </View>
  );
}

export default ProfileScreen
