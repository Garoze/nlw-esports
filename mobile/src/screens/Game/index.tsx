import { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';

import { Entypo } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, TouchableOpacity, Image, FlatList, Text } from 'react-native';

import { GameParams } from '../../@types/navigation';

import { Heading } from '../../components/Heading';
import { DuoCard, DuoCardProps } from '../../components/DuoCard';
import { Background } from '../../components/Background';

import { THEME } from '../../theme';

import logoImg from '../../assets/logo-nlw-esports.png';

import { styles } from './styles';

export function Game() {
  const route = useRoute();

  const [duosList, setDuosList] = useState<DuoCardProps[]>([]);

  const game = route.params as GameParams;
  const navigation = useNavigation();

  useEffect(() => {
    fetch(`http://192.168.1.102:3000/games/${game.id}/ads`)
      .then((respose) => respose.json())
      .then((data) => setDuosList(data));
  }, []);

  function handleGoBack() {
    navigation.goBack();
  }

  function handleConnect() {
    console.log('Conectou!');
  }

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleGoBack} >
            <Entypo
              name="chevron-thin-left"
              color={THEME.COLORS.CAPTION_300}
              size={20}
            />
          </TouchableOpacity>

          <Image 
            source={logoImg}
            style={styles.logo}
          />

          <View style={styles.right}/>
        </View>

        <Image 
          source={{ uri: game.bannerUrl }}
          style={styles.cover}
          resizeMode="cover"
        />

        <Heading 
          title={game.title}
          subtitle="Conecte-se e comece a jogar!"
        />
        
        <FlatList 
          data={duosList}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <DuoCard 
              data={item}
              onConnect={() => handleConnect}
            />
          )}
          horizontal
          style={styles.containerList}
          contentContainerStyle={duosList.length > 0  ? styles.contentList:  styles.emptyListContent}
          showsHorizontalScrollIndicator={false}
          ListEmptyComponent={() => (
            <Text style={styles.emptyListText}>
              Não há anúncios publicados ainda.
            </Text>
          )}
        />
      </SafeAreaView>
    </Background>
  );
}
