import { useState } from 'react';
import * as Clipboard from 'expo-clipboard';
import { View, Modal, ModalProps, Text, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';

import { MaterialIcons } from '@expo/vector-icons';
import { CheckCircle } from 'phosphor-react-native';

import { Heading } from '../Heading';

import { THEME } from '../../theme';

import { styles } from './styles';

interface Props extends ModalProps {
  discord: string;
  onClose: () => void;
}

export function DuoMatch({ discord, onClose, ...rest}: Props) {
  const [isCoping, setIsCoping] = useState(false);

  async function handleCopyDiscordToClipboard() {
    setIsCoping(true);
    await Clipboard.setStringAsync(discord);
    Alert.alert('Discord copiado!', 'Usuário copiado, cole no Discord para adicionar!');
    setIsCoping(false);
  }

  return (
    <Modal 
      transparent 
      statusBarTranslucent 
      animationType="fade"
      {...rest}
    >
      <View style={styles.container}>
        <View style={styles.content}>
          <TouchableOpacity 
            style={styles.closeIcon}
            onPress={onClose}
          >
            <MaterialIcons 
              name="close"
              size={20}
              color={THEME.COLORS.CAPTION_500}
            />
          </TouchableOpacity>
          <CheckCircle 
            size={64}
            color={THEME.COLORS.SUCCESS}
            weight="bold"
          />

          <Heading 
            title="Let's Play!"
            subtitle="Agora é só começar a jogar!"
            style={{ alignItems: 'center', marginTop: 24 }}
          />

          <Text style={styles.label}>
            Adicione no Discord
          </Text>

          <TouchableOpacity 
            style={styles.discordButton}
            onPress={handleCopyDiscordToClipboard}
            disabled={isCoping}
          >
            <Text style={styles.discord}>
              {isCoping ? <ActivityIndicator /> : discord}
            </Text>
          </TouchableOpacity>

        </View>
      </View>
    </Modal>
  );
}
