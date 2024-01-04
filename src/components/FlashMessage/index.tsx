import React, {useEffect} from 'react';
import {Modal, Text, View, StyleSheet} from 'react-native';
import {AntDesign, Feather} from '@expo/vector-icons';
import {useAppDispatch, useAppSelector} from '../../redux/store';
import {hideFlashMessage} from '../../redux/reducers/general/generalSlice';
import {Colors} from '../../utils/colors';
import {MessageTypes} from '../../redux/reducers/general/generalnterface';

const FlashMessage = () => {
  const generalState = useAppSelector(state => state.general);
  const dispatch = useAppDispatch();
  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    if (generalState.flashMessage) {
      timeoutId = setTimeout(function () {
        dispatch(hideFlashMessage());
      }, 4000);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [generalState.flashMessage]);

  const getIcon = () => {
    switch (generalState.flashMessage.messageType) {
      case MessageTypes.Success:
        return <Feather name="check" size={20} color="black" />;
      case MessageTypes.Fail:
        return <AntDesign name="warning" size={20} color="black" />;
      //TODO: If warning situation added, we will change this icon
      case MessageTypes.Warning:
        return <AntDesign name="warning" size={20} color="black" />;
    }
  };

  return (
    <Modal
      animationType="fade"
      transparent
      visible={generalState.flashMessage.visibility}>
      <View
        style={styles.flashMessageContainer}
        onTouchStart={() => {
          dispatch(hideFlashMessage());
        }}>
        <View
          style={[
            styles.icon,
            generalState.flashMessage.messageType === MessageTypes.Fail
              ? {backgroundColor: Colors.Red}
              : {backgroundColor: Colors.Green},
          ]}>
          {getIcon()}
        </View>
        <Text style={styles.flashMessageText}>
          {generalState.flashMessage.message}
        </Text>
      </View>
    </Modal>
  );
};

export const styles = StyleSheet.create({
  flashMessageContainer: {
    display: 'flex',
    top: 30,
    backgroundColor: Colors.Black,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    borderRadius: 8,
    margin: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  flashMessageText: {
    alignSelf: 'center',
    marginHorizontal: 12,
    flex: 1,
    color: Colors.White,
    fontSize: 14,
  },
  icon: {
    alignItems: 'center',
    alignSelf: 'center',
    padding: 4,
    justifyContent: 'center',
    borderRadius: 20,
  },
});

export default FlashMessage;
