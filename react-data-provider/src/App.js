import './App.css';
import DataPresenter from "./DataPresenter";
import {useState} from "react";

let presenterNo = 0;

function App() {
	let [presenters, setPresenters] = useState([])
	function handleAddPresenter(e) {
		presenterNo += 1;
		let newPresenterParams = {
			name: `Presenter no ${presenterNo}`
		};
		setPresenters(presenters.concat([newPresenterParams]));
		e.preventDefault();
	}
	function handleRemovePresenter(e, idx) {
		//it is important to create new object to cause rerender
		let newPresenters = presenters.slice();
		newPresenters.splice(idx, 1);
		setPresenters(newPresenters);
		e.preventDefault();
	}

	return (
		<div className="App">
			<div className="presenter-top-container">
				<div className="presenter-container-header">
					<button onClick={handleAddPresenter}>Add data presenter</button>
				</div>
				<div className="presenter-container">
					{presenters.map((pres, idx)=>(
						<div className="presenter-wrapper">
							<DataPresenter name={pres.name} onRemove={(e) => {
								handleRemovePresenter(e, idx);
							}}></DataPresenter>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

export default App;
