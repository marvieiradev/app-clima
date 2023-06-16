const container = document.querySelector('.container')
const pesquisa = document.querySelector('.box-pesquisa button')
const boxClima = document.querySelector('.box-clima')
const detalhesClima = document.querySelector('.detalhes-clima')
const infoLocal = document.querySelector('.info-local')
const erro404 = document.querySelector('.not-found')

pesquisa.addEventListener('click', () => {
    const APIKey = '30e3280681620c8fa279ffbaaf28a16c'
    const cidade = document.querySelector('.box-pesquisa input').value

    if (cidade === '') {
        return
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cidade}&units=metric&APPID=${APIKey}&lang=pt_br`
    ).then(response => response.json()).then(json => {
        if (json.cod === '404') {
            container.style.heigth = '400px'
            boxClima.style.display = 'none'
            detalhesClima.style.display = 'none'
            infoLocal.style.display = 'none'
            erro404.style.display = 'block'
            erro404.classList.add('fadeIn')
            return
        }

        erro404.style.display = 'none'
        erro404.classList.remove('fadeIn')

        const image = document.querySelector('.box-clima img')
        const temperatura = document.querySelector('.box-clima .temperatura')
        const descricao = document.querySelector('.box-clima .descricao')
        const humidade = document.querySelector('.detalhes-clima .humidade span')
        const ventos = document.querySelector('.detalhes-clima .ventos span')
        const min = document.querySelector('.detalhes-clima .max span')
        const max = document.querySelector('.detalhes-clima .min span')
        const cidade = document.querySelector('.info-local .cidade')
        const dataHora = document.querySelector('.info-local .data-hora')
        image.style.background = '#277DD9'

        const data = { timezone: json.timezone };
        function pad(val) {
            return val.toString().padStart(2, '0');
        }

        const date = new Date();
        date.setTime(date.getTime() + data.timezone * 1000);

        const meses = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
        const semana = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"];

        let ano = date.getUTCFullYear();
        let mes = date.getMonth();
        let dia = date.getDate();
        let sem = date.getDay();
        let h = date.getUTCHours();
        let m = date.getUTCMinutes();
        let dataAtual = `${semana[sem]}, ${pad(dia)} ${meses[mes]} ${ano} | ${pad(h)}:${pad(m)}hs`

        let pfx = ''

        if (h <= 5 || h >= 18) {
            image.style.background = '#1F1F44'
            pfx = '-n'
        }

        switch (json.weather[0].main) {
            case 'Clear':
                image.src = 'imagens/clear' + pfx + '.svg'
                break

            case 'Clouds':
                image.src = 'imagens/clouds' + pfx + '.svg'
                break

            case 'Rain':
                image.src = 'imagens/rain.svg'
                break

            case 'Snow':
                image.src = 'imagens/snow.svg'
                break

            case 'Mist':
                image.src = 'imagens/mist.svg'
                break

            case 'Drizzle':
                image.src = 'imagens/drizzle.svg'
                break

            case 'Thunderstorm':
                image.src = 'imagens/thunder.svg'
                break

            case 'Tornado':
                image.src = 'imagens/tornado.svg'
                break

            default:
                image.src = 'imagens/default.svg'
        }

        temperatura.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`
        descricao.innerHTML = `${json.weather[0].description}`
        humidade.innerHTML = `${json.main.humidity}%`
        ventos.innerHTML = `${parseInt(json.wind.speed)}Km/h`
        min.innerHTML = `${parseInt(json.main.temp_min)}°`
        max.innerHTML = `${parseInt(json.main.temp_max)}°`

        cidade.innerHTML = `${json.name} - ${json.sys.country}`
        dataHora.innerHTML = `${dataAtual}`

        boxClima.style.display = '';
        detalhesClima.style.display = '';
        infoLocal.style.display = '';
        boxClima.classList.add('fadeIn')
        detalhesClima.classList.add('fadeIn')
        infoLocal.classList.add('fadeIn')
        container.style.height = '600px';

    })
})
