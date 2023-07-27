import { useState } from 'react'


function App() {
  const [city, setCity] = useState("")
  const [weatherForecast, setWeatherForecast] = useState(null)

  const handleChange = (e) => {
    setCity(e.target.value)
  }

  
  const handlesSearch  = () => {
    fetch(`http://api.weatherapi.com/v1/current.json?key=49272eff51944c22aae185400232607&q=${city}&lang=pt`)
    .then((response) => {
      if(response.status === 200){
        return response.json()
      }
    })
    .then((data) => {
      console.log(data)
      setWeatherForecast(data)
    });
  };

  return (
    <div>
      <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-5 ">
      <a className="navbar-brand text-white " href="#top">
        Consultor de Clima
      </a>
      </nav>

      <main className="container ">
      
        <div className="jumbotron ">
          <h1>
            Verifique o tempo da sua cidade:
          </h1>
          <p className="lead">
            Digite o nome da sua cidade:
          </p>

          <div className="row mb-4">
            <div className="col-md-6">
              <input 
              onChange={handleChange}
              className="form-control" value={city}/>
            </div>
          </div>

          <button onClick={handlesSearch} className="btn btn-dark">
            Pesquisar
          </button>


        {
          weatherForecast ? (
            <div>
            <div className='mt-4 d-flex align-items-center'>
              <div>
                <img src={weatherForecast.current.condition.icon}/>
              </div>
              <div>
                <h3> {weatherForecast.current.condition.text}</h3>
                <p className='lead'>
                  Temp.: {weatherForecast.current.temp_c} Cº
                </p>
                <p className='lead'>
                  Umidade do Ar: {weatherForecast.current.humidity}%
                </p>
              </div>

            </div>
          </div>
          ) : null
        }
          
        </div> 
      </main>
    </div>
  );
}

export default App;

