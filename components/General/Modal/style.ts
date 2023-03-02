import { Dimensions, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  mask: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    position: 'absolute',
    left: 20,
    right: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 5,
      height: -5,
    },
    shadowRadius: 16,
    shadowOpacity: 0.1,
  },
  title: {
    margin: 20,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleText: {
    fontSize: 24,
    fontWeight: '700',
  },
  content: {
    padding: 20,
    maxHeight: Dimensions.get('window').height * 0.8,
  },
})

export default styles
