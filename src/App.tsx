import { useEffect,useState } from 'react';


import * as C from './App.styles'
import logo from './assets/icons8-guerra-nas-estrelas-144.png'
import { Buttom } from './components/Button';
import  InfoItem  from './components/infoItem'
import RestartIcon from './svgs/restart.svg'
import { GridItemType } from './types/GridItemType';
import { items } from './data/items'
import { GridItem } from './components/GridItem';
import { formatTimeElapsed } from './helpers/formatTimeElapsed';



function App() {

		// UseStats //

	const [playing, setPlaying] = useState<boolean>(false);
	const [timeElapsed, setTimeElapsed] = useState<number>(0);
	const [moveCount, setMoveCount] = useState<number>(0);
	const [shownCount, setShownCount] = useState<number>(0);
	const [gridItems, setGridItems] = useState<GridItemType[]>([]);

		// UseEffects //

	useEffect(() => {
		resetAndCreateGrid()
	}, []);

	useEffect(() => {
		const timer = setInterval(() => {
			if (playing){
		  		setTimeElapsed(timeElapsed +1)
		  	}
		},1000)

		return () => clearInterval(timer)
	}, [playing, timeElapsed]);


	// Verify if opened are equal //

	useEffect(() => {
		if (shownCount === 2 ){
			let oponed = gridItems.filter(item => item.shown ===true)
			if(oponed.length === 2){

				

				if(oponed[0].item === oponed[1].item){

					// v1 - if both are equal, make every "shown" permanent
					let tmpGrid = [...gridItems]
					for(let i in tmpGrid){
						if(tmpGrid[i].shown){
							tmpGrid[i].permanentShown = true;
							tmpGrid[i].shown= false
						}
					}
					setGridItems(tmpGrid)
					setShownCount(0)
				}else{

					//v2 - if they are NOT equal, close all "shown"
					setTimeout(() => {
						let tmpGrid = [...gridItems]
						for(let i in tmpGrid){
							tmpGrid[i].shown = false
						}
						setGridItems(tmpGrid)
						setShownCount(0)
					}, 1000)

				}
				setMoveCount(moveCount => moveCount + 1)


			}
		}
	}, [shownCount, gridItems]);

	useEffect(() => {
		if(moveCount >0 && gridItems.every(item => item.permanentShown === true)){
			setPlaying(false)
		}
	}, [moveCount,gridItems]);





		//play game //

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
		if(playing && index !== null && shownCount < 2){
			let tmpGrind = [... gridItems]		
				if(tmpGrind[index].permanentShown === false && tmpGrind[index].shown === false){
					tmpGrind[index].shown = true
					setShownCount(shownCount + 1)
				}
				setGridItems(tmpGrind)
		}
	}

  return (
    <div >
		<C.Container>
			<C.Info>
				<C.LogoLink href=''>
					<img src={logo} width='200' height='150' alt="" />
				</C.LogoLink>
				<C.InfoArea>
					<InfoItem label='Tempo' value={formatTimeElapsed(timeElapsed)}/>
					<InfoItem label='Movimentos' value={moveCount.toString()}/>
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
