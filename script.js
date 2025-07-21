function toggleChat() {
  const overlay = document.getElementById("chatOverlay");
  overlay.style.display = overlay.style.display === "flex" ? "none" : "flex";
}



async function sendMessage() {
  const input = document.getElementById("userInput");
  const message = input.value.trim();
  if (!message) return;

  const chatBody = document.getElementById("chatBody");

  // Append user message
  const userMsg = document.createElement("div");
  userMsg.className = "user-message";
  userMsg.textContent = message;
  chatBody.appendChild(userMsg);

  // Show typing indicator
  const typing = document.createElement("div");
  typing.className = "typing";
  typing.textContent = "Typing...";
  chatBody.appendChild(typing);
  input.value = "";
  chatBody.scrollTop = chatBody.scrollHeight;

  
  const myBio = `My name is Srijoni Sarkar. I'm a B.Tech CSE (AI/ML) student.I'm a student in Sister Nivedita University. I love drawing, singing, and exploring creative technologies.My favourite color is pink`;

  
  const prompt = `User_message: ${message}. Reply naturally and shortly, as if you are Srijoni herself, based on the following information about Srijoni: ${myBio}. Focus only on responding to the user's message as Srijoni would, without reiterating the full bio unless asked.`;


  try {
    const response = await fetch("https://my-portfolio-backend-api.onrender.com/ask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt })
    });

    
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.reply || `HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    typing.remove();

    const botReply = document.createElement("div");
    botReply.className = "bot-message";
    botReply.textContent = data.reply || "Sorry, I couldn't get a response from the AI."; 
    chatBody.appendChild(botReply);
    chatBody.scrollTop = chatBody.scrollHeight;

  } catch (error) {
    typing.remove();
    const errorMsg = document.createElement("div");
    errorMsg.className = "bot-message";
    errorMsg.textContent = "Bot is waking up, please wait a few minutes."; 
    chatBody.appendChild(errorMsg);
    chatBody.scrollTop = chatBody.scrollHeight;
    console.error("Frontend Fetch Error:", error);
  }
}

// Toggle dark/light mode
document.getElementById("modeToggle").addEventListener("change", function () {
  document.body.classList.toggle("dark", this.checked);
});