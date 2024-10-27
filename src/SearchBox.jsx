import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import "./SearchBox.css"
import { useState } from 'react';
export default function SearchBox({updateInfo}) {
    let [city, setCity] = useState("");
    let[error,setError] = useState(false);
    const API_URL = "https://api.openweathermap.org/data/2.5/weather";
    const API_KEY =  '0965f73dfc036f6e67af6d57d818416c';
    let getWeatherInfo = async () => {
       try{
        let res = await fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`);
        let jsonRes = await res.json();
        console.log(jsonRes);
        let result = {
            city:jsonRes.name,
            temp:jsonRes.main.temp,
            tempMin:jsonRes.main.temp_min,
            tempMax:jsonRes.main.temp_max,
            humidity:jsonRes.main.humidity,
            feelsLike:jsonRes.main.feels_like,
            weather:jsonRes.weather[0].description,
      
        }
        return result;
       }catch(err){
         throw err;
       }
    }



    let handleChange = (event) => {
        setCity(event.target.value);
    }
    let handleSubmit = async (event) => {
       try{
        event.preventDefault();
        console.log(city);
        setCity("");
      let Newinfo=    await getWeatherInfo();
      updateInfo(Newinfo)
       }catch(err){
        setError(true)
       }
    }

    return <div className='SearchBox'>
      
        <form onSubmit={handleSubmit} action="">
            <TextField id="city" onChange={handleChange} value={city} label="Search for city or airport" variant="outlined" required /> <br /> <br />

            <Button type="submit" variant="contained" >Search</Button>
           {error && <p style={{color:"red"}}>No such place exists!</p>}

        </form>
    </div>
}