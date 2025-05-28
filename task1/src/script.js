console.log("Hello world - view me in the Console of developer tools");
/**
 * Get the context in each input box
 */
const User_FullName = document.querySelector("#fullName");
const User_StudentID = document.querySelector("#studentId");
const User_GraduationDate = document.querySelector("#graduationDate");
const User_Major = document.getElementById("major");
const User_FavoriteLanguage = document.getElementById("selectAll");
const Reset_btn = document.getElementById("resetButton")

/**
 * Implement rendering of User_FullName, User_StudentID, User_graduationdate and major
 */
User_FullName.addEventListener("blur", function(){
    render_result();
});
User_StudentID.addEventListener("blur", function(){
    render_result();
});
User_GraduationDate.addEventListener("blur", function(){
    render_result();
});
User_Major.onchange = function(){
    render_result();
}
/**
 * favorite language render, the first is to achieve checked all or unchecked all.
 */
User_FavoriteLanguage.onchange = function(){
    document.querySelectorAll('ul [type="checkbox"]').forEach(function(language){
        if(User_FavoriteLanguage.checked){
            language.checked = true;
        }else{
            language.checked = false;
        };
    });

    // achieve checked all language the selectall checkbox also checked, and if not checked all language the selectall checkbox unchecked automically.
    Array.from(document.querySelectorAll('ul [type="checkbox"]')).forEach(function(language){
        language.onchange = function(){
            const favorite_language = Array.from(document.querySelectorAll('ul [type="checkbox"]'))
            if(!language.checked){
                document.getElementById("selectAll").checked = false
            }
            if(favorite_language.every(feature => feature.checked)){
                document.getElementById("selectAll").checked = true
            };
            render_result();
        };
    });
    render_result();
}
// Perform a reset configuration, and all elements return to blank or default state
Reset_btn.onclick = function(){
    User_FullName.value = '';
    User_StudentID.value = '';
    User_GraduationDate.value = '';
    User_Major.value = 'Computer Science';
    User_FavoriteLanguage.checked = false;
    document.querySelectorAll('ul [type="checkbox"]').forEach(function(language){
        language.checked = false
    });
    document.getElementById("outputText").value = '';
};

//Function to judge validity and final display of content
function render_result(){
    // Get the context of outputText
    const Final_Output = document.querySelector("#outputText")
    // check if the input's length between 3 and 50
    if(User_FullName.value.length < 3 || User_FullName.value.length > 50){
        Final_Output.value = "Please input a valid full name";
        return;
    };

    // check if the input is a vaild student ID
    if(!(/^z[0-9]{7}$/.test(User_StudentID.value))){
        Final_Output.value = "Please input a valid student ID";
        return;
    };

    // check whether the graduation date input is valid
    if(!(/[0-9]{2}\/[0-9]{2}\/[0-9]{4}/.test(User_GraduationDate.value)) || !test_GraduationDATE()){
        Final_Output.value = "Please input a valid graduation date";
        return;
    };

    Final_Output.value = `My name is ${User_FullName.value} (${User_StudentID.value}), and ${graduation_past_now_today()} ${User_Major.value}, and ${ouput_favorite_language()}`;

}

function test_GraduationDATE(){
    // get the user graduation date and transfer it into Array
    const GraduationDate_Array = User_GraduationDate.value.split("/");
    // change the location of array[0] and array[1], because the date function in Js is MM/DD/YYYY.
    const change_graduationdate_array = [GraduationDate_Array[1], GraduationDate_Array[0], GraduationDate_Array[2]];
    // then make the array display as mm/dd/yyyy
    const final_graduationdate = change_graduationdate_array.join("/").toString();
    // finally check graduationdate is valid or not
    return !isNaN(Date.parse(final_graduationdate)); 
};

// calculate the days between graduation date and today and select the temporal.
function graduation_past_now_today(){
    // get the current date and adjust the time to 00:00:00 for easy calculation
    const today_time = new Date();
    today_time.setHours(0,0,0,0);

    // change location which satisfy js MM/DD/YYYY then get the graduation date and adjust the time to 00:00:00 for easy calculation
    const [day, month, year] = User_GraduationDate.value.split("/");
    const graduation_time = new Date(year, month-1, day);
    graduation_time.setHours(0,0,0,0);

    // calculate the difference between graduation date and today
    const millisecond_time_difference = graduation_time.getTime() - today_time.getTime();
    const day_time_difference = millisecond_time_difference / (1000 * 60 * 60 * 24);

    // select the temporal and output the context
    if(day_time_difference > 0){
        return "I graduate in " + day_time_difference + " days. I major";
    }
    else if(day_time_difference === 0){
        return "I graduate in today. I major";
    }
    else{
        return "I graduated " + Math.abs(day_time_difference) + " days ago. I majored";
    }

}

//Determine how many functions you like and output them
function ouput_favorite_language(){
    // list all possible languages ​​that can be selected
    language_array = Array.from(document.querySelectorAll('ul [type="checkbox"]'))
    //Filter the selected languages
    choice_language = language_array.filter((language) => language.checked).map(language => language.name)
    //Measure quantity and output it in different tenses according to the quantity
    Number_of_favorite_language = choice_language.length

    switch(Number_of_favorite_language){
        case 1:
            return `my favourite programming language is ${choice_language[0]}.`;
        case 2:
            return `my favourite programming languages are ${choice_language[0]}, and ${choice_language[1]}.`;
        case 3:
            return `my favourite programming languages are ${choice_language[0]}, ${choice_language[1]}, and ${choice_language[2]}.`;
        default:
            return "I have no favourite programming language.";
    }
}
