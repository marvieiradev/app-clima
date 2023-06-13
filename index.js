const container = document.querySelector('.container')
const pesquisa = document.querySelector('.box-pesquisa button')
const boxClima = document.querySelector('.box-clima')
const detalhesClima = document.querySelector('.detalhes-clima')
const erro404 = document.querySelector('.not-found')

pesquisa.addEventListener('click', () => {
    const APIKey = '30e3280681620c8fa279ffbaaf28a16c'
    const cidade = document.querySelector('.box-pesquisa input').value

    if (cidade === '') {
        return
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cidade}&units=metric&APPID=${APIKey}`
    ).then(response => response.json()).then(json => {
        if (json.cod === '404' || json.cod === '401') {
            container.style.heigth = '400px'
            boxClima.style.display = 'none'
            detalhesClima.style.display = 'none'
            erro404.style.display = 'block'
            erro404.classList.add('fadeIn')
            return
        }

        erro404.style.display = 'none'
        erro404.classList.remove('fadeIn')

        const image = document.querySelector('.blox-clima img')
        const temperatura = document.querySelector('.blox-clima temperatura')
        const descricao = document.querySelector('.blox-clima descricao')
        const humidade = document.querySelector('.detalhes-clima humidade span')
        const ventos = document.querySelector('.detalhes-clima ventos span')

        switch (json.weather[0].main) {
            case 'Clear':
                image.src = 'imagens/clear.png'
                break

            case 'Rain':
                image.src = 'imagens/rain.png'
                break

            case 'Snow':
                image.src = 'imagens/snow.png'
                break

            case 'Clouds':
                image.src = 'imagens/cloud.png'
                break

            case 'Haze':
                image.src = 'imagens/mist.png'
                break

            default:
                image.src = ''
        }

        temperatura.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`
        descricao.innerHTML = `${json.weather[0].description}`
        humidade.innerHTML = `${json.main.humidity}%`
        ventos.innerHTML = `${parseInt(json.wind.speed)}Km/h`

        boxClima.style.display = '';
        detalhesClima.style.display = '';
        boxClima.classList.add('fadeIn')
        detalhesClima.classList.add('fadeIn')
        container.style.heigth = '590px';

    })



})
