// import './App.css';
import { Layout } from 'antd'
import HeaderContainer from './containers/headerContainer'
import ImageGridContainer from './containers/imageGridContainer';


const { Header, Content } = Layout;

function App() {
	return (
		<div className="App">
			<Layout>

				<Header style={{
					position: "fixed",
					zIndex: 1,
					width: "100%",
				}}>
					<HeaderContainer
						style={{ position: "fixed", zIndex: 1, width: "100%" }}
					/>
				</Header>

				<Content style={{
					padding: "0 10px",
					marginTop: 70,
					overflow: "initial",
				}}>
					<ImageGridContainer
						style={{ height: "100%", backgroundColor: "white" }}
					/>

				</Content>

			</Layout>
		</div>
	);
}

export default App;
