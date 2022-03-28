import { useEffect,useState } from 'react';


import * as C from './App.styles'
import logo from './assets/devmemory_logo.png'
import { Buttom } from './components/Button';
import  InfoItem  from './components/infoItem'
import RestartIcon from './svgs/restart.svg'
import { GridItemType } from './types/GridItemType';
import { items } from './data/items'
import { GridItem } from './components/GridItem';



function App() {

	const [playing, setPlaying] = useState<boolean>(false);
	const [timeElapsed, setTimeElapsed] = useState<number>(0);
	const [moveCount, setMoveCount] = useState<number>(0);
	const [shownCount, setShownCount] = useState<number>(0);
	const [gridItems, setGridItems] = useState<GridItemType[]>([]);


	useEffect(() => {
		resetAndCreateGrid()
	}, []);

	const resetAndCreateGrid = () => {
	//step 1 - resetar o jogo 

		setTimeElapsed(0);
		setMoveCount(0);
		setShownCount(0);
	  
	//step 2 - criar grid e começar o jogo

	// 2.1 - criar um grind vazio
		let tempGrid : GridItemType[] = []

		for(let i =0;i < (items.length * 2); i++){
			tempGrid.push({
				item:null,
				shown:false,
				permanentShown:false
			})
		}

	// 2.2 - preencher o grid
		
		for(let w = 0; w < 2; w++){
			for(let i = 0; i < items.length; i++){
				let pos = -1;
				while(pos < 0 ||tempGrid[pos].item !== null){
					pos = Math.floor(Math.random() * (items.length * 2));
				}
				tempGrid[pos].item =i;
			}
		}
	
	// 2.3 - jogar no state
	
		setGridItems(tempGrid);

	//step 3 - começar o jogo
		setPlaying(true)
	  




	}

	const handleItemClick = (index: number) => {
	  
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
				<C.Grid>
					{gridItems.map((item, index)=>(
						<GridItem 
							key={index}
							item={item}
							onClick={() => handleItemClick(index)}

						/>
					))}
				</C.Grid>
			</C.GridArea>
		</C.Container>
    </div>
  );
}

export default App;
