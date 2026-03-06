const form = document.getElementById("travelForm");
const message = document.getElementById("message");

form.addEventListener("submit", async function(e){

e.preventDefault();

const name = document.getElementById("name").value.trim();
const email = document.getElementById("email").value.trim();
const phone = document.getElementById("phone").value.trim();
const destination = document.getElementById("destination").value.trim();
const startDate = document.getElementById("startDate").value;
const endDate = document.getElementById("endDate").value;
const travelers = parseInt(document.getElementById("travelers").value);
const budget = document.getElementById("budget").value;
const notes = document.getElementById("notes").value.trim();

message.textContent = "";
message.style.color = "red";

if(!name || !email || !destination || !startDate || !endDate){
message.textContent = "Please fill in all required fields.";
return;
}

if(new Date(startDate) >= new Date(endDate)){
message.textContent = "Your start date must be before end date.";
return;
}

if(travelers <= 0 || travelers > 20){
message.textContent = "Number of travelers must be between 1 and 20.";
return;
}
  
const data = {
name,
email,
phone,
destination,
startDate,
endDate,
travelers,
budget,
notes
};

try{

const response = await fetch("YOUR_BACKEND_ENDPOINT",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body: JSON.stringify(data)
});

if(response.ok){

message.style.color = "green";
message.textContent = "Inquiry submitted successfully!";
form.reset();

}else{

message.textContent = "Server error. Please try again.";

}

}catch(error){

message.textContent = "Network error. Could not submit form.";

}

});
