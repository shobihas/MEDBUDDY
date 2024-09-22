const btn = document.querySelector('.ai_voice')
const content = document.querySelector('.ai_voice')


function speak(text){
    const text_speak = new SpeechSynthesisUtterance(text);

    text_speak.rate = 1;
    text_speak.volume = 1;
    text_speak.pitch = 1;

    window.speechSynthesis.speak(text_speak);
}

function wishMe(){
    var day = new Date();
    var hour = day.getHours();

    if(hour>=0 && hour<12){
        speak("Good Morning Boss...")
    }

    else if(hour>12 && hour<17){
        speak("Good Afternoon Master...")
    }

    else{
        speak("Good Evenining Sir...")
    }

}

window.addEventListener('load', ()=>{
    speak("Initializing Med buddy..");
    wishMe();
});

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition =  new SpeechRecognition();

recognition.onresult = (event)=>{
    const currentIndex = event.resultIndex;
    const transcript = event.results[currentIndex][0].transcript;
    content.textContent = transcript;
    takeCommand(transcript.toLowerCase());

}

btn.addEventListener('click', ()=>{
    content.textContent = "Listening...."
    recognition.start();
})

function takeCommand(message){
    if(message.includes('hey') || message.includes('hello')){
        speak("Hello Sir, How May I Help You?");
    }
    else if(message.includes("open google")){
        window.open("https://google.com", "_blank");
        speak("Opening Google...")
    }
    else if(message.includes("open youtube")){
        window.open("https://youtube.com", "_blank");
        speak("Opening Youtube...")
    }
    else if(message.includes("open facebook")){
        window.open("https://facebook.com", "_blank");
        speak("Opening Facebook...")
    }

    else if(message.includes('what is') || message.includes('who is') || message.includes('what are')) {
        window.open('https://www.google.com/search?q=${message.replace(" ", "+")}', "_blank");
         const finalText = "This is what i found on internet regarding " + message;
	    speak(finalText);
  
    }

    else if(message.includes('wikipedia')) {
        window.open('https://en.wikipedia.org/wiki/${message.replace("wikipedia", "")}', "_blank");
        const finalText = "This is what i found on wikipedia regarding " + message;
        speak(finalText);
    }

    else if(message.includes('time')) {
        const time = new Date().toLocaleString(undefined, {hour: "numeric", minute: "numeric"})
        const finalText = time;
        speak(finalText);
    }

    else if(message.includes('date')) {
        const date = new Date().toLocaleString(undefined, {month: "short", day: "numeric"})
        const finalText = date;
        speak(finalText);
    }

    else if(message.includes('calculator')) {
        window.open('Calculator:///')
        const finalText = "Opening Calculator";
        speak(finalText);
    }
    else if (message.includes('diet plan')) {
        if (message.includes('morning')) {
            const dayOfWeek = getDayOfWeek();
            speak(`Here is your morning diet plan for ${dayOfWeek}:`);
            speak(getRandomDietPlan(dayOfWeek, 'morning'));
        } else if (message.includes('evening')) {
            const dayOfWeek = getDayOfWeek();
            speak(`Here is your evening diet plan for ${dayOfWeek}:`);
            speak(getRandomDietPlan(dayOfWeek, 'evening'));
        }
    }
    else {
        window.open('https://www.google.com/search?q=${message.replace(" ", "+")}', "_blank");
        const finalText = "I found some information for " + message + " on google";
        speak(finalText);
    }
}
function getRandomDietPlan(day, timeOfDay) {
    const dietPlans = dietPlan[day][timeOfDay];
    const randomIndex = Math.floor(Math.random() * dietPlans.length);
    return dietPlans[randomIndex];
}

// Diet plan data
const dietPlan = {
    "Monday": {
        "morning": [
            "Oatmeal topped with banana slices and a sprinkle of chia seeds"
        ],
        "evening": [
            "Stir-fried tofu with vegetables (bell peppers, snap peas, carrots) and brown rice"
        ]
    },
    "Tuesday": {
        "morning": [
            "Smoothie made with spinach, pineapple, banana, and almond milk"
        ],
        "evening": [
            "Grilled shrimp with a side of couscous and roasted asparagus"
        ]
    },
    "Wednesday": {
        "morning": [
            "Whole-grain toast with avocado and a poached egg"
        ],
        "evening": [
            "Baked chicken breast with sweet potato wedges and a side of green beans"
        ]
    },
    "Thursday": {
        "morning": [
            "Smoothie bowl with blended berries, banana, and topped with granola"
        ],
        "evening": [
            "Grilled steak with a side of mashed potatoes and steamed broccoli"
        ]
    },}