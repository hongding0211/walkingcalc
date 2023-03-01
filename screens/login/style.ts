import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    justifyContent: 'center',
    padding: 40,
  },
  center: {
    flexDirection: 'column',
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: '500',
    marginBottom: 10,
  },
  subTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  img: {
    width: 35,
    height: 52,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  btnGroup: {
    flexDirection: 'column',
    position: 'absolute',
    bottom: 85,
    left: 20,
    right: 20,
  },
})
