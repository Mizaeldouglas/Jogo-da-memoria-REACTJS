import * as C from './App.styles'
import logo from './assets/devmemory_logo.png'
import { Buttom } from './components/Button';
import  InfoItem  from './components/infoItem'

import RestartIcon from './svgs/restart.svg'

function App() {

	const resetAndCreateGrid = () => {
	  
	}

  return (
    <div >
		<C.Container>
			<C.Info>
				<C.LogoLink href=''>
					<img src={logo} width='200' alt="" />
				</C.LogoLink>
				<C.InfoArea>
					<InfoItem label='Tempo' value='00:00'/>
					<InfoItem label='Movimentos' value='0'/>
				</C.InfoArea>

				<Buttom icon={RestartIcon} onClick={resetAndCreateGrid} label='Reiniciar'/>
			</C.Info>
			<C.GridArea>
				
			</C.GridArea>
		</C.Container>
    </div>
  );
}

export default App;
