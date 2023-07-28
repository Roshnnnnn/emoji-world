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

export default function App() {
	const [emojiMeaning, setEmojiMeaning] = useState("");

	const emojiInput = (e) => {
		var inputChange = e.target.value;
		var emojiMeaning = emojiDictionary[inputChange];

		if (emojiMeaning === undefined) {
			emojiMeaning = "Sorry this emoji is not available in our emoji world";
		}

		setEmojiMeaning(emojiMeaning);
	};

	return (
		<div className="App">
			<h1>Inside Outtt !</h1>
			<input onChange={emojiInput}></input>
			<h2>{emojiMeaning}</h2>
		</div>
	);
}
