import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue',
  },
  imageButton: {
    justifyContent: 'flex-start',
    margin: 10,
    width: 250,
    height: 50,
  },
  textForButton: {
    marginTop: -50,
    fontSize: 18,
    fontWeight: '500',
    color: 'yellow',
    textAlign: 'center',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    // margin: 5,
  },
});
