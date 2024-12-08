import React, { useState, useEffect } from "react";

const Bot = () => {
  const [inputText, setInputText] = useState("");
  const [messages, setMessages] = useState([]);
  const [lastSeen, setLastSeen] = useState("");

  useEffect(() => {
    setLastSeenMessage();
    respond("intro");
  }, []);

  const setLastSeenMessage = () => {
    const date = new Date();
    setLastSeen(`Last seen today at ${date.getHours()}:${date.getMinutes().toString().padStart(2, "0")}`);
  };

  const sendMsg = () => {
    if (inputText.trim() === "") return;

    const date = new Date();
    const newMessage = {
      type: "sent",
      text: inputText,
      time: `${date.getHours()}:${date.getMinutes().toString().padStart(2, "0")}`,
    };

    setMessages([...messages, newMessage]);
    setInputText("");

    setTimeout(() => respond(inputText), 1500);
  };

  const respond = (text) => {
    setLastSeen("Typing...");
    let responseText;

    switch (text.toLowerCase().trim()) {
      case "intro":
        responseText = `
          Hello! 👋🏻 I'm your virtual healthcare assistant.<br><br>
          My goal is to guide you on your wellness journey.<br><br>
          I can help you track your health, suggest exercises, recommend nutrition, and answer any health-related questions you might have.<br><br>
          Type <span class='font-bold'>help</span> for more options.<br>
        `;
        break;
      case "help":
        responseText = `
          Here are some things I can help with:<br><br>
          <span class='font-bold'>'exercise'</span> - To get exercise suggestions.<br>
          <span class='font-bold'>'diet'</span> - To receive diet recommendations.<br>
          <span class='font-bold'>'symptoms'</span> - To help with health symptoms.<br>
          <span class='font-bold'>'consultation'</span> - To book a consultation with a healthcare professional.<br>
          <span class='font-bold'>'clear'</span> - To clear this conversation.<br>
        `;
        break;
      case "exercise":
        responseText = `
          Exercise is essential for maintaining a healthy body! 🏋️‍♀️<br>
          Here are some exercises you can try:<br>
          - Walking or jogging for at least 30 minutes.<br>
          - Yoga to improve flexibility.<br>
          - Strength training twice a week.<br><br>
          Stay active and keep your body moving! 💪
        `;
        break;
      case "diet":
        responseText = `
          A balanced diet is key to staying healthy 🍏🥦!<br><br>
          Here's what you can include in your diet:<br>
          - Fruits and vegetables (5-7 servings daily).<br>
          - Lean protein (chicken, fish, tofu).<br>
          - Whole grains (brown rice, oats).<br><br>
          Drink plenty of water and avoid sugary drinks. 🍶
        `;
        break;
      case "symptoms":
        responseText = `
          Please let me know your symptoms, and I'll guide you on the next steps.<br><br>
          If you feel that you're in need of immediate attention, I recommend seeking professional medical help right away.
        `;
        break;
      case "consultation":
        responseText = `
          You can book a consultation with a healthcare professional directly through our platform.<br>
          Please provide your details, and I’ll assist you with booking an appointment.
        `;
        break;
      default:
        responseText = "I'm sorry, I couldn't quite understand. 😔<br>Send 'help' to know more about what I can assist with.";
    }

    setTimeout(() => {
      const date = new Date();
      const newMessage = {
        type: "received",
        text: responseText,
        time: `${date.getHours()}:${date.getMinutes().toString().padStart(2, "0")}`,
      };

      setMessages((prev) => [...prev, newMessage]);
      setLastSeenMessage();
      playSound();
    }, 2000);
  };

  const handleInputChange = (e) => setInputText(e.target.value);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") sendMsg();
  };

  const playSound = () => {
    // Optional: Play a sound to alert the user of a new message
  };

  return (
    <div className="w-full h-5/6 pb-6 p-6 bg-gray-50 ">
  <header className="text-center mb-4">
    <h2 className="text-2xl font-semibold">Virtual Healthcare Assistant</h2>
    <p id="lastseen" className="text-gray-500 text-sm">{lastSeen}</p>
  </header>
  <ul id="listUL" className="space-y-4 overflow-y-auto max-h-[calc(100vh-150px)]">
    {messages.map((msg, index) => (
      <li key={index} className="flex justify-between">
        <div className={msg.type === "sent" ? "bg-green-100 p-3 rounded-lg ml-auto max-w-md" : "bg-gray-200 p-3 rounded-lg mr-auto max-w-md"}>
          <span dangerouslySetInnerHTML={{ __html: msg.text }} />
          <label className="text-xs text-gray-400">{msg.time}</label>
        </div>
      </li>
    ))}
  </ul>
  <footer className="mt-6 flex justify-between">
    <input
      id="inputMSG"
      type="text"
      value={inputText}
      onChange={handleInputChange}
      onKeyDown={handleKeyDown}
      placeholder="Type your message"
      className="w-4/5 p-2 border border-gray-300 rounded-lg"
    />
    <button
      onClick={sendMsg}
      className="w-1/5 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600"
    >
      Send
    </button>
  </footer>
</div>

  );
};

export default Bot;
