        const chatMessages = document.getElementById('chat-messages');
        const userInput = document.getElementById('user-input');
        const sendButton = document.getElementById('send-button');
        const typingIndicator = document.getElementById('typing-indicator');
        
        // API Configuration for Gemini API
        const API_KEY = "AIzaSyD7CYdPGvda-lSzPLOZ7nC61dPXgIqy1Kk"; // Gemini API key from Google Studio
        const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent";
        
        // List of allowed topics
        const allowedTopics = [
            'Paano kumuha ng Cedula at Permits?',
            'Saan pwedeng humingi ng medical assistance sa lungsod?',
            'Paano mag-apply ng scholarship sa CHED at kung ano ang mga requirements?',
            'Paano mag-apply sa AICS?',
            'Philhealth E-Consulta'
        ];
        
        // System prompt to restrict responses
        const systemPrompt = `You are a helpful assistant focused only on city services in the Philippines. ` +
                            `Do not answer anything unrelated to this topic. Only provide helpful, accurate, and brief information ` +
                            `about government services, documents, taxes, healthcare, education, or assistance programs available to citizens. ` +
                            `If the question is not about Filipino city services, politely explain that you can only help with questions about Filipino city services. ` +
                            `Specifically, you are knowledgeable about: how to get Cedula and permits, where to get medical assistance in the city, ` +
                            `how to apply for CHED scholarships and requirements, how to apply for AICS, and Philhealth E-Consulta. ` +
                            `Keep your responses brief and helpful.`;
        
        // Function to add a message to the chat
        function addMessage(message, isUser = false) {
            const messageContainer = document.createElement('div');
            messageContainer.className = isUser ? 'user-container' : 'message-container';
            
            const avatar = document.createElement('div');
            avatar.className = isUser ? 'avatar user-avatar' : 'avatar';
            avatar.textContent = isUser ? 'Y' : 'Q';
            
            const messageElement = document.createElement('div');
            messageElement.className = `message ${isUser ? 'user' : 'bot'}`;
            messageElement.textContent = message;
            
            messageContainer.appendChild(avatar);
            messageContainer.appendChild(messageElement);
            chatMessages.appendChild(messageContainer);
            
            // Scroll to the bottom
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
        
        // Function to show typing indicator
        function showTypingIndicator() {
            typingIndicator.style.display = 'block';
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
        
        // Function to hide typing indicator
        function hideTypingIndicator() {
            typingIndicator.style.display = 'none';
        }
        
        // Function to check if message is related to allowed topics
        function isRelatedToAllowedTopics(message) {
            message = message.toLowerCase();
            
            const keywords = [
                'cedula', 'permit', 'medical', 'assistance', 'scholarship', 'ched', 
                'aics', 'philhealth', 'e-consulta', 'city', 'services', 'filipino',
                'philippines', 'government', 'health', 'education', 'documents',
                'requirements', 'apply', 'kumuha', 'lungsod', 'tulong', 'mag-apply',
                'humingi', 'saan', 'paano'
            ];
            
            return keywords.some(keyword => message.includes(keyword.toLowerCase()));
        }
        
        // Function to handle API call to Gemini
        async function fetchGeminiResponse(userMessage) {
            try {
                const requestBody = {
                    contents: [
                        {
                            role: "user",
                            parts: [
                                { text: systemPrompt },
                                { text: userMessage }
                            ]
                        }
                    ],
                    generationConfig: {
                        temperature: 0.2,
                        maxOutputTokens: 200
                    }
                };
                
                const response = await fetch(`${API_URL}?key=${API_KEY}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(requestBody)
                });
                
                if (!response.ok) {
                    throw new Error(`API request failed with status ${response.status}`);
                }
                
                const data = await response.json();
                
                // Extract text from Gemini response
                if (data.candidates && data.candidates[0] && data.candidates[0].content && 
                    data.candidates[0].content.parts && data.candidates[0].content.parts[0]) {
                    return data.candidates[0].content.parts[0].text;
                } else {
                    throw new Error("Unexpected response format from Gemini API");
                }
            } catch (error) {
                console.error("Error fetching response:", error);
                return "Sorry, I'm having trouble connecting right now. Please try again later.";
            }
        }
        
        // Predefined responses for allowed topics
        const topicResponses = {
            'cedula': "Para kumuha ng Cedula (Community Tax Certificate), pumunta sa City Treasurer's Office sa inyong city/municipal hall. Magdala ng valid ID at bayaran ang fee (usually P30 para sa mga indibidwal). Para sa business permits, pumunta sa Business Permits and Licensing Office (BPLO) sa city hall. Kakailanganin ang DTI/SEC registration, barangay clearance, at iba pang dokumento depende sa uri ng negosyo.",
            'medical': "Para sa medical assistance sa lungsod, maaari kang pumunta sa: 1) City Social Welfare and Development Office (CSWDO) para sa financial assistance, 2) City Health Office para sa libreng konsultasyon, 3) Malasakit Centers sa public hospitals para sa tulong medikal, o 4) Philippine Charity Sweepstakes Office (PCSO) para sa medical assistance program. Magdala ng medical abstract, reseta, valid ID, at barangay certificate of indigency.",
            'scholarship': "Para mag-apply ng CHED scholarship: 1) Bisitahin ang website ng CHED o pumunta sa regional office. 2) Requirements karaniwang kasama ang: Form 138/report card, certificate of good moral character, birth certificate, proof of income ng magulang, valid ID. 3) Kumpletuhin ang application form at isumite ang lahat ng dokumento bago ang deadline. 4) May iba't ibang programs gaya ng State Scholarship at Grant-in-Aid. Para sa kumpletong impormasyon, bisitahin ang www.ched.gov.ph.",
            'aics': "Para mag-apply sa AICS (Assistance to Individuals in Crisis Situation): 1) Pumunta sa pinakamalapit na DSWD office. 2) Magdala ng mga sumusunod: valid ID, medical certificate/abstract kung para sa medical assistance, certificate of indigency mula sa barangay, at iba pang supporting documents base sa iyong kailangan. 3) Kukumpletuhin ka ng social worker ng assessment at interview. 4) Antayin ang approval at payout schedule.",
            'philhealth': "Para sa Philhealth E-Consulta: 1) Bisitahin ang website ng Philhealth o i-download ang Philhealth mobile app. 2) Mag-register at mag-login sa iyong account. 3) Piliin ang E-Consulta service at pumili ng available na doktor. 4) Kumpletuhin ang appointment form at maghintay ng confirmation. 5) Sa appointment time, mag-login ulit para sa virtual consultation. Kailangan ng active Philhealth membership at internet connection para sa serbisyong ito."
        };
        
        // Function to get predefined response based on keywords
        function getPredefinedResponse(message) {
            message = message.toLowerCase();
            
            if (message.includes('cedula') || message.includes('permit')) {
                return topicResponses.cedula;
            } else if (message.includes('medical') || message.includes('assistance') || message.includes('tulong') || message.includes('medical assistance')) {
                return topicResponses.medical;
            } else if (message.includes('scholarship') || message.includes('ched')) {
                return topicResponses.scholarship;
            } else if (message.includes('aics')) {
                return topicResponses.aics;
            } else if (message.includes('philhealth') || message.includes('e-consulta') || message.includes('consulta')) {
                return topicResponses.philhealth;
            }
            
            return "Mawalang-galang po, pero ang tanong niyo ay hindi ko masagot. Tumutulong lamang po ako sa mga katanungan tungkol sa mga serbisyo ng gobyerno tulad ng pagkuha ng Cedula at permits, medical assistance, CHED scholarships, AICS, at Philhealth E-Consulta.";
        }
        
        // Function to handle user input
        async function handleUserInput() {
            const message = userInput.value.trim();
            if (message === '') return;
            
            // Add user message
            addMessage(message, true);
            userInput.value = '';
            
            // Show typing indicator
            showTypingIndicator();
            
            // Check if message is related to allowed topics
            if (!isRelatedToAllowedTopics(message)) {
                setTimeout(() => {
                    hideTypingIndicator();
                    addMessage("Mawalang-galang po, pero ang tanong niyo ay hindi ko masagot. Tumutulong lamang po ako sa mga katanungan tungkol sa mga serbisyo ng gobyerno tulad ng pagkuha ng Cedula at permits, medical assistance, CHED scholarships, AICS, at Philhealth E-Consulta.");
                }, 1500);
                return;
            }
            
            // Check if API key is configured
            if (API_KEY === "AIzaSyD7CYdPGvda-lSzPLOZ7nC61dPXgIqy1Kk") {
                // Use predefined responses if API key isn't set
                setTimeout(() => {
                    hideTypingIndicator();
                    const response = getPredefinedResponse(message);
                    addMessage(response);
                }, 1500);
            } else {
                // Get response from Gemini API
                try {
                    const botResponse = await fetchGeminiResponse(message);
                    hideTypingIndicator();
                    addMessage(botResponse);
                } catch (error) {
                    hideTypingIndicator();
                    addMessage("Sorry, I couldn't process your request. Please try again.");
                    console.error(error);
                }
            }
        }
        
        // Event listeners
        sendButton.addEventListener('click', handleUserInput);
        userInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                handleUserInput();
            }
        });
        
        // Focus on input field when the page loads
        window.onload = () => {
            userInput.focus();
            
            // Update welcome message
            const firstMessage = chatMessages.querySelector('.message.bot');
            if (firstMessage) {
                firstMessage.textContent = "Kumusta! Ako si Quibs, ang iyong virtual assistant para sa mga serbisyong panlungsod ng Pilipinas. Maaari kitang tulungan sa mga katanungan tungkol sa Cedula, permits, medical assistance, CHED scholarships, AICS, at Philhealth E-Consulta.";
            }
            
            // Add a note if API key isn't configured
            if (API_KEY === "YOUR_GEMINI_API_KEY") {
                const apiNote = document.createElement('div');
                apiNote.className = "message bot";
                apiNote.style.backgroundColor = "#fff3cd";
                apiNote.style.border = "1px solid #ffeeba";
                apiNote.textContent = "Note: Gemini API key not configured. Using predefined responses. Replace 'YOUR_GEMINI_API_KEY' with an actual API key to enable real responses.";
                chatMessages.appendChild(apiNote);
            }
        };