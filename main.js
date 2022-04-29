window.onload = () => {

  // Get IP info
  axios.get('https://get.geojs.io/v1/ip/geo.json').then(({data}) => {

    getEl('ip').innerHTML = data.ip
    getEl('city').innerHTML = data.city
    getEl('country').innerHTML = data.country
    getEl('provider').innerHTML = data.organization_name
    getEl('timezone').innerHTML = data.timezone
  }).catch((error) => {

    console.error(error)
    alert('Возникла ошибка: ' + error.message)
  })

  // Get current timestamp
  setInterval(() => {
    getEl('timestamp').innerHTML = (new Date()).toLocaleString('ru')
  },1000)

  // Get system info
  getEl('screen-resolution').innerHTML = `${screen.width}x${screen.height}`
  getEl('ram').innerHTML = navigator.deviceMemory ? `${navigator.deviceMemory} Гб` : '<i>Не известно</i>'
  getEl('hardware-concurrency').innerHTML = navigator.hardwareConcurrency
  getEl('gpu-info').innerHTML = (() => {

    const canvas = document.createElement('canvas')
    const context = canvas.getContext('webgl') || canvas.getContext('webgl-experimental')

    const gpuInfo = context.getExtension('WEBGL_debug_renderer_info')

    return context.getParameter(gpuInfo.UNMASKED_RENDERER_WEBGL)
  })()
  getEl('is-touch-screen').innerHTML = navigator.maxTouchPoints ? 'Да' : 'Нет'

  const browserInfo = new UAParser()
  getEl('os').innerHTML = `${browserInfo.getOS().name} ${browserInfo.getOS().version || ''}`
  getEl('browser').innerHTML = `${browserInfo.getBrowser().name} ${browserInfo.getBrowser().version}`

  // Get network speed
  let dl = navigator.connection.downlink
  const commonInfoEl = document.getElementById('commonInfo')

  if(dl) {

    const div = document.createElement('div')

    const span1 = document.createElement('span')
    span1.innerHTML = `${dl} Мбит/сек`

    const span2 = document.createElement('span')
    span2.innerHTML = 'Скорость интернета'

    div.appendChild(span1)
    div.appendChild(span2)

    commonInfoEl.appendChild(div)
  }


}

function getEl(field) {
  return document.querySelector(`[data-field=${field}]`)
}
