const helper = {
  name: 'Helper',
  ping() {
    console.log('Ping')
  },
}

export default ({ app }, inject) => {
  inject('helper', helper)
}
