import { useEffect, useState } from 'react';
import { Image, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

import { GameCard } from '../../components/GameCard';
import { Heading } from '../../components/Heading';

import logoImg from '../../assets/logo-nlw-esports.png';

import { styles } from './styles';
import { Background } from '../../components/Background';

interface Game {
  id: string;    
  title: string;
  bannerUrl: string;
  _count: {
      ads: number;
  }
}

export function Home() {
  const [gamesList, setGamesList] = useState<Game[]>();

  const navigation = useNavigation();

  useEffect(() => {
    fetch('http://192.168.1.102:3000/games')
      .then((respose) => respose.json())
      .then((data) => {
        setGamesList(data);
      });
  }, []);

  function handleOpenGame({ id, title, bannerUrl }: Game) {
    navigation.navigate('game', { id, title, bannerUrl });
  }

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <Image 
          source={logoImg}
          style={styles.logo}
        />

        <Heading  
          title="Encontre seu duo!" 
          subtitle="Selecione o game que deseja jogar..."
        />
      
        <FlatList
          data={gamesList}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <GameCard 
              data={item}
              onPress={() => handleOpenGame(item)}
            />
          )}
          showsHorizontalScrollIndicator={false}
          horizontal
          contentContainerStyle={styles.contentList}
        />
      </SafeAreaView> 
    </Background>
  );
}
