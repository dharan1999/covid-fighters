import React from 'react';
import { Cards,Chart,CountryPicker} from './components';
import styles from './App.module.css';
import { fetchData } from './api';
import logo from './images/logo1.png';
// import Particles from './components/Particles/Particles.js';
import { render } from "react-dom";
// import { back1 } from './background/back.js';
import Particles from 'react-particles-js';
import ParticlesBg from 'particles-bg';
import MouseParticles from 'react-mouse-particles'


class App extends React.Component {
    state = {
        data: {},
        country: '',
    }
    async componentDidMount(){
        const fetchedData = await fetchData();
        this.setState({ data:fetchedData });
       
    }
    handleCountryChange = async (country) => {
        const data = await fetchData(country);
    
        this.setState({ data, country: country });
      }
    render() {
        const {data,country} = this.state
        return( 
        
             <div className={styles.container}>
                 <MouseParticles g={5} color="random" cull="col,image-wrapper"/>
             <ParticlesBg type="cobweb" num={100} bg={true} color="#ffffff"/>
             {/* <Particles 
                params={{ 
                particles: { 
                    number: { 
                    value: 200, 
                    density: { 
                        enable: true, 
                        value_area: 1000, 
                    } 
                    }, 
                }, 
                }} 
            />  */}

                <img className={styles.logo} src={logo} alt="COVID-19" />
                
                <Cards data={data}/>
                <CountryPicker handleCountryChange={this.handleCountryChange}/>
                <Chart data={data} country={country} /> 
                {/* <Particles 
                params={{ 
                particles: { 
                    number: { 
                    value: 200, 
                    density: { 
                        enable: true, 
                        value_area: 1000, 
                    } 
                    }, 
                }, 
                }} 
            />  */}
            </div>
            
        )
    }
}

export default App;