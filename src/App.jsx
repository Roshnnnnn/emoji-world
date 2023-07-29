import "./App.css";
import { useState } from "react";

const emojiDictionary = {
	"😊": "Smiling",
	"😮": "Disbelief",
	"😔": "Sad",
	"🥡": "Takeout-box",
	"❤️": "Heart",
	"😑": "Annoyance",
};

var emojiData = Object.keys(emojiDictionary);

export default function App() {
	const [emojiMeaning, setEmojiMeaning] = useState("");

	const emojiInput = (e) => {
		var inputChange = e.target.value;
		var emojiMean = emojiDictionary[inputChange];

		if (emojiMean === undefined) {
			emojiMean = "Emoji not found";
		}
		setEmojiMeaning(emojiMean);
		console.log(inputChange);
	};

	const emojiName = (emoji) => {
		var item = emojiDictionary[emoji];
		setEmojiMeaning(item || "Emoji not found");
	};

	return (
		<div className="App">
			<h1>Inside Outtt !</h1>
			<input onChange={emojiInput}></input>
			<h3>Emoji we have</h3>
			{emojiData.map((item) => (
				<span
					onClick={() => emojiName(item)}
					key={item}
					style={{ fontSize: "larger", padding: " 0.5rem", cursor: "pointer" }}
				>
					{item}
				</span>
			))}
			<h2>{emojiMeaning}</h2>
			{/* <h2>{emojiData}</h2> */}
		</div>
	);
}
