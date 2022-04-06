//import * from './Equipment.js';

/* Backend Script for the FDtS Character Generator */

// Adjective List for random Concepts
const CONCEPT_LIST_1 = ["Swift", "Mystic", "Wandering", "Heroic", "Skilled", "Legendary", "Wise", "Clever", "Strong", "Charismatic"];
// Noun List for random Concepts
const CONCEPT_LIST_2 = ["Noble", "Slayer", "Demagogue", "Hero", "Swashbuckler", "Sage", "Warrior", "Adventurer", "Explorer", "Rogue"];
// Qualifier List for random Concepts
const CONCEPT_LIST_3 = ["Extraordinaire", "of Nature", "of the People", "on the Run", "who Stands Alone", "of the Divine", "from Another Time", "Betrayed", "of Dragons", "Lost"];
// Flaw List for random Flaws
const FLAW_LIST = ["Shortsighted", "Prideful", "Loss of sanity", "Paranoid", "Lust for Power", "Obsessive", "Stubborn", "Dismissive", "Unlucky", "Overly Trusting"];
// List of random Names
const NAME_LIST = ["Firefang", "Grayhood", "Greenfield", "Julius", "Tremblelance", "Stranger", "Lash", "Thorne", "Ratcatcher", "Mumbler", "Marked One", "The Forgotten", "Stonewell", "Bell Ringer", "Lane", "Ironblade", "Oswyn", "Leofe", "Mina", "Longvale", "Ando"];
// List of random Notes
const NOTES_LIST = ["Follow the fireflies", "Holding a broken ring", "Has a smoking habit", "Looking for lost family", "How long can you run?", "Seeking vengeance", "Don't trust the man in red", "Found a dog collar, but no sign of the dog", 
	"Canteen full of sand", "No memories, but a vague sense of anger", "Regret has put me on this path, how can I atone?", "I must return to my home", "Interested in uncovering the Spiral's secrets", "\"They will pay\"", 
	"My comrades are my life", "Denies the Spiral", "The answer is \"the self\", but what is the question?"];
// List of random Trinkets
const TRINKETS_LIST = ["Bottle", "Canteen", "Waterskin", "Cloak", "Fancy hat", "Goggles", "Journal", "Tome", "Scroll",
                     "Ring", "Necklace", "Earring", "Bracelet", "Dice", "Cards", "Game pieces", "Candle",
                     "Musical Instrument", "Paintbrush", "Chalk", "Skillet", "Pan", "Charm", "Amulet", "Pet Mouse",
                     "Pet Sparrow", "Pet Cricket", "Broken Handle", "Broken Strap", "Broken Music Box", "Unknown Key"];

// Remaining Points (Initialized at 20)
var points = 20;
// Initialize global varaibles for Attributes (0 = Body, 1 = Mind, 2 = Soul, 3 = Teq, 4 = Capacity, 5 = Wealth, 6 = Decay)
var attributes = [3, 3, 3, 3, 4, 3, 0];
var attributes_string = ["<span class=\"body_text\">Body</span>", "<span class=\"mind_text\">Mind</span>", "<span class=\"soul_text\">Soul</span>", "<span class=\"teq_text\">Teq</span>", "<span class=\"capacity_text\">Capacity</span>",
	 "<span class=\"wealth_text\">Wealth</span>", "<span class=\"decay_text\">Decay</span>"];

// Total number of Skills (initialized at 0)
var numSkills = 0;

// Total weight of all Equipment
var weight = 0;
// List of all purchased Equipment
var equipList = new Map();
// Flag to determine if the user has selected a free weapon (Free Sling or Free Dagger)
var freeWep = false;

// Total Rhetoric Ranks
var ranks = 0;
// List of all added Rhetoric
var rhetList = new Map();

// List of all added Trinkets
var trinketList = [];

// Generates and sets random Concept
function randomize_concept() {
	// Initialize Concept variable
	let con = new String("");
	
	// Choose the first random word
	var i = Math.floor(Math.random() * CONCEPT_LIST_1.length);
	con = con.concat(CONCEPT_LIST_1[i]);
	
	// Choose the second random word
	i = Math.floor(Math.random() * CONCEPT_LIST_2.length);
	con = con.concat(" ", CONCEPT_LIST_2[i]);
	
	// Choose the third random word
	i = Math.floor(Math.random() * CONCEPT_LIST_3.length);
	con = con.concat(" ", CONCEPT_LIST_3[i]);
	
	// Update the Concept field
	const field = document.getElementById('concept');
	field.value = con;
	
	// Update the Character Sheet
	update_cs_concept();
}
	
// Generates and sets a random Flaw
function randomize_flaw() {
	// Initialize Flaw variable
	let flw = new String("");
	
	// Choose a random Flaw
	i = Math.floor(Math.random() * FLAW_LIST.length);
	flw = FLAW_LIST[i]; 
	
	// Update the Flaw field
	const field = document.getElementById('flaw');
	field.value = flw;
	
	// Update the Character Sheet
	update_cs_flaw();
}

// Updates the passed in Attribute
function update_attribute(attr, rank) {
	// First check if it's plus or minus
	if(rank == 1) {
		// Plus
		// If the Attribute is not Decay
		if(attr != 6) {
			// Check if there are enough remaining points
			if(points < attributes[attr]+1) {
				// Not enough points remaining
				alert("You don't have enough points remaining to increase this Attribute.");
				return;
			} else if (attributes[attr] >= 6) {
				// Attribute is already max
				alert("The maximum Rank at Character Creation is 6.");
				return;
			} else {
				// Otherwise update the Attribute, Remaining Points, and HTML
				attributes[attr]++;
				points -= attributes[attr];
				update_remaining_points();
			
				// Update the Rank field
				let id = "rank" + attr;
				const field = document.getElementById(id);
				field.innerHTML = attributes[attr];
			}
		} else {
			// For Decay
			// Check if Decay is already at the maximum (3)
			if(attributes[attr] >= 3) {
				// Attribute is already max
				alert("The maximum Rank for Decay is 3.");
				return;
			} else {
				// Otherwise update the Attribute, Remaining Points, and HTML
				attributes[attr]++;
				points += 5;
				update_remaining_points();
			
				// Update the Rank field
				let id = "rank" + attr;
				const field = document.getElementById(id);
				field.innerHTML = attributes[attr];
			}
		}
	} else {
		// Minus
		// If the Attribute is not Decay
		if(attr != 6) {
			// Check if the Rank isn't already 1
			if (attributes[attr] <= 1) {
				alert("The minimum Rank of an Attribute is 1.");
				return;
			} else {
				// Otherwise update the Attribute, Remaining Points, and HTML
				points += attributes[attr];
				attributes[attr]--;
				update_remaining_points();
			
				// Update the Rank field
				let id = "rank" + attr;
				const field = document.getElementById(id);
				field.innerHTML = attributes[attr];
			}
		} else {
			// For Decay
			// Check if Decay is already at the minimum (0)
			if(attributes[attr] == 0) {
				// Attribute is already min
				alert("Decay cannot go lower than 0.");
				return;
			} else {
				// Check that lowering Decay wouldn't result in negative points
				if((points - 5) < 0) {
					// If there would be negative points, send a notification
					alert("Lowering Decay will result in negative Points. Please ensure you have at least 5 points remaining before lowering Decay.");
				} else {	
					// Otherwise update the Attribute, Remaining Points, and HTML
					points -= 5;
					attributes[attr]--;
					update_remaining_points();
			
					// Update the Rank field
					let id = "rank" + attr;
					const field = document.getElementById(id);
					field.innerHTML = attributes[attr];
				}
			}
		}
	}
	// Update the Character Sheet
	update_cs_attributes();
}

// Generates and sets a random array of Primary Attributes
function randomize_attributes() {
	// First reset all Attributes
	reset_attributes();
	
	// Loop until no Attribute can be increased
	while(true) {
		// Select a random Attribute
		var i = Math.floor(Math.random() * 4);
		// Check if enough Points are left to increase it
		if(points >= (attributes[i] + 1)) {
			// Update the points and Attribute
			attributes[i]++;
			points -= attributes[i];	
			// Continue the loop
			continue;
		}
		// Check if the other Attributes can't be increased
		if(points<attributes[0]+1 && points<attributes[1]+1 && points<attributes[2]+1 && points<attributes[3]+1) {
			// No Attribute can be increased, so exit the loop
			break;
		} 
	}
	
	// Update the Remaining Points field
	update_remaining_points();
	
	// Update the Attribute labels
	for(i=0; i<4; i++) {
		// Update the Rank field
		let id = "rank" + i;
		const field = document.getElementById(id);
		field.innerHTML = attributes[i];
	}
	
	// Finally update the Skill and Capacity fields
	update_skills();
	update_capacity();
	
	// Update the Character Sheet
	update_cs_attributes();
}

// Updates the Remaining Points label
function update_remaining_points() {
	// Update the Remaining Points field
	const field = document.getElementById('remainPoints');
	field.innerHTML = points;
}

// Sets all Attributes to the default value (3) and resets all labels
function reset_attributes() {
	// Reset Points
	points = 20;
	update_remaining_points();
	
	// Reset the Attributes Array
	for(i=0; i<4; i++) {
		// Reset the value
		attributes[i] = 3;
		// Update the Rank field
		let id = "rank" + i;
		const field = document.getElementById(id);
		field.innerHTML = attributes[i];
	}
	
	// Reset Decay
	attributes[6] = 0;
	// Update the Rank field
	let id = "rank6";
	const field = document.getElementById(id);
	field.innerHTML = attributes[6];
	
	// Update Num Skills and Capacity
	update_skills();
	update_capacity();
	
	// Update the Character Sheet
	update_cs_attributes();
}

// Resets all Skills
function reset_skills() {
	// Initialize local variables
	var field;
	let id = "";
	
	// Loop through all skills and uncheck the boxes
	for(i=1; i<9; i++) {
		// Body
		id = "bodySkill" + i;
		field = document.getElementById(id);
		field.checked = false;

		// Mind
		id = "mindSkill" + i;
		field = document.getElementById(id);
		field.checked = false;
		
		// Soul
		id = "soulSkill" + i;
		field = document.getElementById(id);
		field.checked = false;
		
		// Teq
		id = "teqSkill" + i;
		field = document.getElementById(id);
		field.checked = false;
	}
	
	// Custom Skill loop
	for(i=1; i<5; i++) {
		// Uncheck checkbox
		id = "customSkill" + i;
		field = document.getElementById(id);
		field.checked = false;
		field.value = "Custom Skill";
		
		// Clear text field
		id = "customSkillName" + i;
		field = document.getElementById(id);
		field.value = "";
	}
	
	// Reset remaining Skills
	field = document.getElementById("remainSkills");
	field.innerHTML = (attributes[1] + 1);
	numSkills = 0;
	
	// Finally update the Character Sheet
	id = document.getElementById("cs_skills");
	id.innerHTML = "";
}

// When a Skill Checkbox is clicked, updates remaining Skills
function check_skills(id) {
	// Get the checkbox object
	check = document.getElementById(id);
	// If the box is checked, increase numSkills, otherwise decrease
	if(check.checked) {
		// Now check if there are any remaining skills
		if(numSkills >= (attributes[1] + 1)) {
			// Uncheck the box and send a notice
			check.checked = false;
			alert("You cannot choose any more Skills. To select this Skill, please deselect another.");
			return;
		} else {
			// Else increase the number of Skills
			numSkills++;
		}
	} else {
		// Decrease the number of Skills
		numSkills--;
	}
	update_skills();
	update_cs_skills();
}

// Updates the value of the Custom Skills
function update_custom_skill(field) {
	// Get the corresponding checkbox and set its value
	console.log(field);
	var box = field.previousElementSibling;
	console.log(box);
	box.value = field.value;
	update_cs_skills();
}

// Updates the Remaining Skills label
function update_skills() {
	// Update RemainingSkills Label
	field = document.getElementById("remainSkills");
	field.innerHTML = (attributes[1] + 1) - numSkills;
}

// Generates and assigns Skills randomly
function randomize_skills() {
	// Initialize variables
	var i, j, id;
	// Reset all Skills
	reset_skills();
	
	// Loop until all Skills have been assigned
	while(numSkills < (attributes[1] + 1)) {
		// Choose a random Attribute
		i = Math.floor(Math.random() * 4);
		switch(i) {
			// Body
			case 0:
				// Choose a random Skill and check it if it is not already checked
				j = Math.floor(Math.random() * 8) + 1;
				id = "bodySkill" + j;
				field = document.getElementById(id);
				if(!field.checked) {
					// Check the button and update Skills
					field.checked = true;
					numSkills++;
				}
				break;
			// Mind
			case 1:
				// Choose a random Skill and check it if it is not already checked
				j = Math.floor(Math.random() * 8) + 1;
				id = "mindSkill" + j;
				field = document.getElementById(id);
				if(!field.checked) {
					// Check the button and update Skills
					field.checked = true;
					numSkills++;
				}
				break;
			// Soul
			case 2:
				// Choose a random Skill and check it if it is not already checked
				j = Math.floor(Math.random() * 8) + 1;
				id = "soulSkill" + j;
				field = document.getElementById(id);
				if(!field.checked) {
					// Check the button and update Skills
					field.checked = true;
					numSkills++;
				}
				break;
			// Teq
			case 3:
				// Choose a random Skill and check it if it is not already checked
				j = Math.floor(Math.random() * 8) + 1;
				id = "teqSkill" + j;
				field = document.getElementById(id);
				if(!field.checked) {
					// Check the button and update Skills
					field.checked = true;
					numSkills++;
				}
				break;
		}
	}
	// Finally update the fields
	update_skills();
	update_cs_skills();
}

// Updates the Capacity variable and label
function update_capacity() {
	// Update Capacity variable
	attributes[4] = attributes[0] + 1;
	
	// Update Remaining Capacity label
	update_capacity_label();
}

// Attempts to add the passed in Equipment to the Equip List
function add_equipment(equip_name, equip_ability, equip_cost, equip_weight, equip_wep) {
	// Check to see if it has already been added
	if(equipList.has(equip_name)) {
		// Already purchased
		alert("You have already purchased this Equipment.");
		return;
	}
	
	// Check to see if there is enough Wealth
	if(attributes[5] < equip_cost) {
		// Not enough Wealth
		alert("You don't have enough Wealth to purchase this Equipment.");
		return;
	}
	
	// Check if there is enough Capacity
	if((weight + equip_weight) > attributes[4]) {
		// Not enough Capacity
		alert("You don't have enough Capacity to carry this Equipment.");
		return;
	}

	// Check for Free Weapon
	if(equip_name.includes("Free")) {
		// Check if there is another weapon
		for(const key of equipList.keys()) {
			if(equipList.get(key).wep == 1){
				alert("You cannot choose a free weapon if you already have a weapon selected.");
				return;
			}
		}
		// No other weapons, so set the free weapon flag to true
		freeWep = true;
	} else if(equip_wep == 1 && freeWep) {
		// If there is already a free weapon selected
		alert("You may only choose a free weapon if you have no other weapons.\nPlease remove the free weapon to purchase another.");
		return;
	}

	// The Equipment may be purchased, so add it to the Equipment List and update Attributes
	equipList.set(equip_name, {ability: equip_ability, cost: equip_cost, weight: equip_weight, wep: equip_wep});
	weight += equip_weight;
	attributes[5] -= equip_cost; 
	
	// Finally, create a listing in the Currently Purchased Equipment box
	var table = document.getElementById("curr_equip");
	var row = table.insertRow();
	var cell1 = row.insertCell(0);
	var cell2 = row.insertCell(1);
	cell1.innerHTML = "<u>" + equip_name + "</u> - " + equip_ability;
	cell2.innerHTML = "<button type=\"button\" onclick=\"remove_equipment(\'" + equip_name + "\', this)\">Remove</button>";
	
	// Update remaining Wealth and Capacity fields
	update_wealth_label();
	update_capacity_label();
	
	// Update the Character Sheet
	update_cs_equipment();
}

// Removes the passed in Equipment
function remove_equipment(equip_name, button) {
	// First, update Wealth and Weight
	attributes[5] += equipList.get(equip_name).cost;
	weight -= equipList.get(equip_name).weight;
	
	// Remove the Equipment from the List
	equipList.delete(equip_name);
	
	// If it was a Free Weapon, reset the flag
	if(equip_name.includes("Free")) {
		freeWep = false;	
	}
	
	// Remove from the Currently Selected Equipment table
	var table = document.getElementById("curr_equip");
	table.deleteRow(button.parentNode.parentNode.rowIndex);
	
	// Update remaining Wealth and Capacity fields
	update_wealth_label();
	update_capacity_label();
	
	// Update Character Sheet
	update_cs_equipment();
}

// Updates remaining Wealth and Capacity labels in the Equipment Tab
function update_wealth_label() {
	// Update Wealth
	var id = document.getElementById("remainWealth");
	id.innerHTML = attributes[5];
	
	// Update Character Sheet Wealth
	id = document.getElementById("cs_wealth");
	id.innerHTML = attributes[5];
}

// Updates remaining Capacity label in the Equipment tab
function update_capacity_label() {
	// Update Capacity Label
	var id = document.getElementById("remainCapacity");
	id.innerHTML = Math.ceil(attributes[4] - weight);
	
	// Update Character Sheet Capacity
	id = document.getElementById("cs_capacity");
	id.innerHTML = Math.ceil(attributes[4] - weight);
}

// Clears the Equipment List and resets Wealth and Weight
function reset_equipment() {
	// Clear Equipment List
	equipList = new Map();
	freeWep = false;
	
	// Reset Wealth and Weight
	attributes[5] = 3;
	weight = 0;
	
	// Update Wealth and Capacity Fields
	update_wealth_label();
	update_capacity_label();
	
	// Remove all rows from the Equipment Table
	var table = document.getElementById("curr_equip");
	table.innerHTML = "";
	
	// Remove all rows from the Equipment Table on the Character Sheet
	var table = document.getElementById("cs_equipment");
	table.innerHTML = "";
}

// Randomly assigns Equipment until all Wealth has been spent
function randomize_equipment() {
	// Initialize local variables
	var eqpList;  // Equipment List pointer
	var i, eqp;   // Index and Equipment pointer
	var armor_flg = false; // Flag that shows an Armor has been added
	var escape = 0; // Used to prevent infinite loops
	
	// Reset Equipment
	reset_equipment();
	
	// Randomly determine whether to add a Melee or Ranged weapon
	if(Math.floor(Math.random() * 2) == 0) {
		// Add a random Melee Weapon
		eqpList = MELEE_LIST;
	} else {
		// Add a random Ranged Weapon
		eqpList = RANGED_LIST;
	}
	
	// Add a random weapon from the list
	i = Math.floor(Math.random() * eqpList.length);
	eqp = eqpList[i];
	add_equipment(eqp.get_name(), eqp.get_ability(), eqp.get_cost(), eqp.get_weight());
	
	// Check if the added Equipment was a Dagger or Sling; if so, restore 1 Wealth
	if(eqp.get_name() == "Dagger" || eqp.get_name() == "Sling") {
		attributes[5]++;
	}
	
	// Loop until all Wealth has been spent OR Capacity is full
	while (attributes[5] > 0 || weight < attributes[4]) {
		// Choose a random equipment
		if(armor_flg == false) {
			// If no armor has been added, randomly choose armor OR item
			if(Math.floor(Math.random() * 2) == 0) {
				// Armor List
				eqpList = ARMOR_LIST;
				
				// Set the flag to true
				armor_flg = true;
			} else {
				eqpList = ITEMS_LIST;
			}
		} else {
			eqpList = ITEMS_LIST;
		}
		
		// Generate a random equipment from the list
		i = Math.floor(Math.random() * eqpList.length);
		eqp = eqpList[i];
	
		// Check to see if the equipment can be added (The Equipment is not already added, there is enough Wealth, there is enough Capacity)
		if(!equipList.has(eqp.get_name()) && attributes[5] >= eqp.get_cost() && attributes[4] >= weight + eqp.get_weight()) {
			// Add the equipment
			add_equipment(eqp.get_name(), eqp.get_ability(), eqp.get_cost(), eqp.get_weight());
		} else {
			escape++;
			if(escape > 10) {
				break;
			}
		}
	}
	
	// Update Wealth and Capacity Fields
	update_wealth_label();
	update_capacity_label();
	
	// Resize the collapsible content
	var cont = document.getElementById("equip_content");
	cont.style.maxHeight = cont.scrollHeight + "px";
	
	// Update the Character Sheet
	update_cs_equipment();
}

// Attempts to add the passed in Rhetoric to the Rhetoric List
function add_rhetoric(rhet_name, rhet_rank, rhet_descr) {
	// Check to see if it has already been added
	if(rhetList.has(rhet_name)) {
		// Already purchased
		alert("You have already added this Rhetoric.");
		return;
	}
	
	// Check to see if there are enough Ranks left (max 3 Ranks)
	if((ranks + rhet_rank) > 3) {
		// Not enough Ranks
		alert("You don't have enough remaining Ranks to add this Rhetoric.");
		return;
	}

	// The Rhetoric may be added, so add it to the Rhetoric List
	rhetList.set(rhet_name, {rank: rhet_rank, descr: rhet_descr});
	ranks += rhet_rank;
	
	// Finally, create a listing in the Currently Added Rhetoric box
	var table = document.getElementById("curr_rhet");
	var row = table.insertRow();
	var cell1 = row.insertCell(0);
	var cell2 = row.insertCell(1);
	cell1.innerHTML = "<u>" + rhet_name + " (" + rhet_rank + ")</u> - " + rhet_descr;
	cell2.innerHTML = "<button type=\"button\" onclick=\"remove_rhetoric(\'" + rhet_name + "\', this)\">Remove</button>";
	
	// Update remaining Ranks Field
	update_ranks();
	
	// Update the Character Sheet
	update_cs_rhetoric();
}

// Removes the passed in Rhetoric
function remove_rhetoric(rhet_name, button) {
	// First, update remaining Ranks
	ranks -= rhetList.get(rhet_name).rank;
	
	// Remove the Rhetoric from the List
	rhetList.delete(rhet_name);
	
	// Remove from the Currently Selected Rhetoric table
	var table = document.getElementById("curr_rhet");
	table.deleteRow(button.parentNode.parentNode.rowIndex);
	
	// Update remaining Ranks field
	update_ranks();
	
	// Update the Character Sheet
	update_cs_rhetoric();
}

// Updates remaining Wealth and Capacity labels in the Equipment Tab
function update_ranks() {
	// Update Ranks label
	var id = document.getElementById("remainRanks");
	id.innerHTML = 3 - ranks;
}

// Clears the Rhetoric List and resets remaining Ranks
function reset_rhetoric() {
	// Clear Rhetoric List
	rhetList = new Map();
	
	// Reset Ranks
	ranks = 0;
	
	// Update remaining Ranks field
	update_ranks();
	
	// Remove all rows from the Rhetoric Table
	var table = document.getElementById("curr_rhet");
	table.innerHTML = "";
	
	// Remove all rows from the Rhetoric Table on the Character Sheet
	table = document.getElementById("cs_rhetoric");
	table.innerHTML = "";
}

// Randomly assigns Rhetoric until all Ranks have been spent
function randomize_rhetoric() {
	// Initialize local variables
	var arch;  // Equipment List pointer
	var i, j, rhet;   // Index and Equipment pointer
	var escape = 0; // Used to prevent infinite loops
	
	// Reset Equipment
	reset_rhetoric();
	
	// Loop until all Ranks have been spent
	while (ranks < 3) {
		// Choose a random Archetype
		i = Math.floor(Math.random() * MASTER_LIST.length);
		arch = MASTER_LIST[i];
		
		// Choose a random Rhetoric from the Archetype
		j = Math.floor(Math.random() * arch.length);
		rhet = arch[j];
		// Check to see if the Rhetoric can be added (the Rhetoric is not already added and there are enough Ranks remaining)
		if(!rhetList.has(rhet.get_name()) && (ranks + rhet.get_rank()) <= 3) {
			// Add the Rhetoric
			add_rhetoric(rhet.get_name(), rhet.get_rank(), rhet.get_descr());
		} else {
			escape++;
			if(escape > 10) {
				break;
			}
		}
	}
	
	// Update Rank Field
	update_ranks();
	
	// Resize the collapsible content
	var cont = document.getElementById("rhetoric_content");
	cont.style.maxHeight = cont.scrollHeight + "px";
	
	// Update the Character Sheet
	update_cs_rhetoric();
}

// Sets a random Name
function randomize_name() {
	// Choose a random Name
	i = Math.floor(Math.random() * NAME_LIST.length);
	var name = NAME_LIST[i]; 
	
	// Update the Flaw field
	const field = document.getElementById('char_name');
	field.value = name;
	
	// Update the Character Sheet
	update_cs_name();
}

// Sets random Notes
function randomize_notes() {
	// Choose random Notes
	i = Math.floor(Math.random() * NOTES_LIST.length);
	var note = NOTES_LIST[i]; 
	
	// Update the Note field
	const field = document.getElementById('notes');
	field.value = note;
	
	// Update Character Sheet
	update_cs_notes();
}

// Creates the Trinket tab
function openTrinkets(evt) {
	// Initialize local variables
	var i, tabcontent, tablink;
	
	// Get all elements with class="tabcontent" and hide them
	tabcontent = document.getElementsByClassName("tabcontent");
	for(i=0; i<tabcontent.length; i++) {
		tabcontent[i].style.display = "none";
	}
	
	// Get all elements with class="tablinks" and remove the class "active"
	tablink = document.getElementsByClassName("tablinks");
	for(i=0; i<tablink.length; i++) {
    	tablink[i].className = tablink[i].className.replace(" active", "");
  }
  
	// Show the current tab
	document.getElementById("trinket").style.display = "block";
	evt.currentTarget.className += "active";
	
	// Create the table header
	var table = "<table class=\"even\">";
	table += "<th>Trinket</th>";

	// Loop through each Trinket and add it to the table
	for (let trinket of TRINKETS_LIST) {
		// Add the Trinket data
		table += "<tr>";
  		table += "<td>" + trinket + "</td>";
  		// Create the Add Button
  		table += "<td><button type=\"button\" onclick=\"add_trinket(\'" + trinket + "\')\">Add</button></td>";
  		table += "</tr>";
    }
    
    // Close the table and add it to the page
    table += "</table>";
    document.getElementById("trinket_list").innerHTML = table;
	
	// Resize the collapsible content
	var cont = document.getElementById("notes_content");
	cont.style.maxHeight = cont.scrollHeight + "px";
}

// Attempts to add the passed in Trinket to the Trinket List
function add_trinket(trinket) {
	// Check to see if it has already been added
	if(trinketList.includes(trinket)) {
		// Already purchased
		alert("You have already added this Trinket.");
		return;
	}
	
	// Check to see if there are too many Trinkets (max of 2)
	if(trinketList.length == 2) {
		// Too many Trinkets
		alert("You may only choose up to 2 Trinkets.\nPlease remove one to choose this Trinket.");
		return;
	}

	// The Trinket may be added, so add it to the List
	trinketList.push(trinket);
	
	// Finally, create a listing in the Currently Added Trinket box
	var table = document.getElementById("curr_trinkets");
	var row = table.insertRow();
	var cell1 = row.insertCell(0);
	var cell2 = row.insertCell(1);
	cell1.innerHTML = trinket;
	cell2.innerHTML = "<button type=\"button\" onclick=\"remove_trinket(\'" + trinket + "\', this)\">Remove</button>";
	
	// Update Character Sheet
	update_cs_notes();
	
	// Resize the collapsible content
	var cont = document.getElementById("notes_content");
	cont.style.maxHeight = cont.scrollHeight + "px";
}

// Removes the passed in Trinket
function remove_trinket(trinket, button) {
	// Remove the Trinket from the List
	const i = trinketList.indexOf(trinket);
	trinketList.splice(i, 1);
	
	// Remove from the Currently Selected Trinket table
	var table = document.getElementById("curr_trinkets");
	table.deleteRow(button.parentNode.parentNode.rowIndex);
	
	// Update Character Sheet
	update_cs_notes();
}

// Clears the Trinket List and resets remaining Ranks
function reset_trinkets() {
	// Clear Trinkets List
	trinketList = [];
	
	// Remove all rows from the Rhetoric Table
	var table = document.getElementById("curr_trinkets");
	table.innerHTML = "";
	
	// Update Character Sheet
	update_cs_notes();
}

// Randomly assigns two Trinkets
function randomize_trinkets() {
	// Initialize local variables
	var i, trinket;   // Index and Trinket pointer
	var escape = 0; // Used to prevent infinite loops
	
	// Reset Trinkets
	reset_trinkets();
	// Loop until 2 unique trinkets have been selected
	while(trinketList.length < 2 && escape < 10) {
		i = Math.floor(Math.random() * TRINKETS_LIST.length);
		trinket = TRINKETS_LIST[i];
		if(trinketList.indexOf(trinket) == -1) {
			// If it hasn't been added already, add it
			add_trinket(trinket);
			continue;
		}
		escape++;
	}
	
	// Resize the collapsible content
	var cont = document.getElementById("notes_content");
	cont.style.maxHeight = cont.scrollHeight + "px";
}

// Randomizes all aspects of the character in one go
function randomize_all() {
	var cont;
	
	// First ensure the user knows everything will be deleted
	if(!confirm("Warning: This will delete all progress and randomize all aspects of the character. Is that ok?")) {
		// No, so return
		return;
	}
	
	// Randomize all
	randomize_concept();
	cont = document.getElementById("concept_content");
	cont.style.maxHeight = cont.scrollHeight + "px";
	
	randomize_flaw();
	cont = document.getElementById("flaw_content");
	cont.style.maxHeight = cont.scrollHeight + "px";
	
	randomize_attributes();
	cont = document.getElementById("attributes_content");
	cont.style.maxHeight = cont.scrollHeight + "px";
	
	randomize_skills();
	cont = document.getElementById("skills_content");
	cont.style.maxHeight = cont.scrollHeight + "px";
	
	randomize_equipment();
	randomize_rhetoric();
	
	randomize_name();
	cont = document.getElementById("name_content");
	cont.style.maxHeight = cont.scrollHeight + "px";
	
	randomize_notes();
	randomize_trinkets();
}

// Returns a list of errors (if any) with the character
function check_character() {
	var id, i;  // ID for the HTML element, index
	var error_list = [];  // List of errors
	
	// Check to see if Concept has been filled
	id = document.getElementById('concept');
	if(id.value == "") {
		error_list.push("Please set your <b>Concept</b>.");
	}
	
	// Check to see if Flaw has been filled
	id = document.getElementById('flaw');
	if(id.value == "") {
		error_list.push("Please set your <b>Flaw</b>.");
	} 
	
	// Check if any Attribute points can still be spent
	var tmp = [];
	for(i=0; i<4; i++) {
		if(points >= (attributes[i] +1)) {
			tmp.push(attributes_string[i]);
		}
	}
	// If there were any Attributes that can still be raised
	if(tmp.length > 0) {
		var attr_lst = "";
		var j = 1;
		for(let attr of tmp) {
			if (j == 1) {
				attr_lst += attr;
				j++;
			} else {
				attr_lst += ", " + attr;
			}
		}
		error_list.push("You have enough points to increase <b>Attributes</b> (" + attr_lst + ").");
	}
	
	// Check if Attribute points are negative
	if(points < 0) {
		error_list.push("You have spent too many <b>Attribute Points</b>. Please lower some Attributes until you have at least 0 points remaining.");
	}
	
	// Check if all Skills have been spent
	if(numSkills < (attributes[1] + 1)) {
		error_list.push("You still have unassigned <b>Skills</b>.");
	}
	
	// Check if there are negative unspent Skills
	if(numSkills > (attributes[1] + 1)) {
		error_list.push("You have assigned too many <b>Skills</b>.");
	}
	
	// Check if Capacity is negative
	if(weight > attributes[4]) {
		error_list.push("You are carrying too much <b>Equipment</b>. Please remove some until you are no longer at negative <span class=\"capacity_text\">Capacity</span>.");
	}
	
	// Check if all Rhetoric Ranks have been assigned
	if(ranks < 3) {
		error_list.push("You still have unassigned <b>Rhetoric Ranks</b>.");
	}
	
	// Check if the Name has been assigned
	id = document.getElementById('char_name');
	if(id.value == "") {
		error_list.push("Please set your character's <b>Name</b>.");
	}

	var table = document.getElementById("error_table");  // List of all Errors
	var row, cell;  // Row and cell variables
	
	// Clear the table
	table.innerHTML = "";
	if(error_list.length > 0) {
		// Loop through all Errors and create a row for it
		for(let error of error_list) {
			row = table.insertRow();
			cell = row.insertCell(0);
			cell.innerHTML = error;
		}
	} else {
		// No errors
		row = table.insertRow();
		cell = row.insertCell(0);
		cell.innerHTML = "No errors found.";
	}

	return error_list;
}

// Updates the Concept on the Character Sheet
function update_cs_concept() {
	// Concept field (Step 1)
	var conc = document.getElementById('concept');
	// Character Sheet Concept
	var cs = document.getElementById('cs_concept');
	cs.innerHTML = conc.value;
	
	// Check for errors
	check_character();
}

// Updates the Flaw on the Character Sheet
function update_cs_flaw() {
	// Flaw field (Step 2)
	var flaw = document.getElementById('flaw');
	// Character Sheet Flaw
	var cs = document.getElementById('cs_flaw');
	cs.innerHTML = flaw.value;
	
	// Check for errors
	check_character();
}

// Updates the Name on the Character Sheet
function update_cs_name() {
	// Name field (Step 7)
	var name = document.getElementById('char_name');
	// Character Sheet Name
	var cs = document.getElementById('cs_name');
	cs.innerHTML = name.value;
	
	// Check for errors
	check_character();
}

// Updates the Attributes on the Character Sheet
function update_cs_attributes() {
	var label;
	
	// Body
	label = document.getElementById("cs_body");
	label.innerHTML = attributes[0];
	
	// Mind
	label = document.getElementById("cs_mind");
	label.innerHTML = attributes[1];
	
	// Soul
	label = document.getElementById("cs_soul");
	label.innerHTML = attributes[2];
	
	// Teq
	label = document.getElementById("cs_teq");
	label.innerHTML = attributes[3];
	
	// Decay
	label = document.getElementById("cs_decay");
	label.innerHTML = attributes[6];
	
	// Check for errors
	check_character();
}

// Updates the Skills List on the Character Sheet
function update_cs_skills() {
	var skillList = [];  // Array of all currently checked Skills
	
	// Loop through all skill boxes and add all checked off boxes to the list
	var boxes = document.getElementsByClassName("skillCheck");
	for(let skill of boxes) {
		// If the Skill is check off, add it to skillList
		if(skill.checked)
			skillList.push(skill.value);
	}
	
	// Add all Skills into one string
	var skillString = "";
	var i = 1;
	for(let skill of skillList) {
		if(i==1) {
			skillString = skill;
			i++; 
		} else {
			skillString += ", " + skill;
		}
	}
	
	// Finally update the Character Sheet
	var id = document.getElementById("cs_skills");
	id.innerHTML = skillString;
	
	// Check for errors
	check_character();
}

// Updates the Equipment List on the Character Sheet
function update_cs_equipment() {
	var table = document.getElementById("cs_equipment");  // Table of all Equipment
	
	// Clear the table
	table.innerHTML = "";
	
	var row, cell;  // Row and cell variables
	// Loop through all Equipment and create a row for it
	for(let equip of equipList.keys()) {
		row = table.insertRow();
		cell = row.insertCell(0);
		cell.innerHTML = "<u>" + equip + "</u> - " + equipList.get(equip).ability;
	}
	
	// Check for errors
	check_character();
}

// Updates the Rhetoric List on the Character Sheet
function update_cs_rhetoric() {
	var table = document.getElementById("cs_rhetoric");  // Table of all Rhetoric
	
	// Clear the table
	table.innerHTML = "";
	
	var row, cell;  // Row and cell variables
	// Loop through all Equipment and create a row for it
	for(let rhet of rhetList.keys()) {
		row = table.insertRow();
		cell = row.insertCell(0);
		cell.innerHTML = "<u>" + rhet + " (" + rhetList.get(rhet).rank + ")" + "</u> - " + rhetList.get(rhet).descr;
	}
	
	// Check for errors
	check_character();
}

// Updates the Notes on the Character Sheet
function update_cs_notes() {
	var notes_full = "";  // All the Notes as a single string
	
	// Add the Notes input
	var notes = document.getElementById("notes");
	notes_full += notes.value;
	
	// Loop through the Trinkets list and add it
	for(let trinket of trinketList) {
		notes_full += "<br>" + trinket;
	}
	
	// Update the Notes
	var id = document.getElementById("cs_notes");  // Notes label
	id.innerHTML = notes_full;
	
	// Check for errors
	check_character();
}

// If the character has no errors, exports it to PDF
function exportPDF() {
	// Check the character
	const error_list = check_character();
	
	// If there are errors, send a notice and quit
	if(error_list.length > 0) {
		alert("You must resolve all errors before the character can be exported to PDF.");
		return;
	}
	
	// Load the character sheet template
	
}

const { PDFDocument } = PDFLib

// Exports the character to the editable PDF if the character has no errors
async function exportPDF() {
	// First ensure the character has no errors
	const error_list = check_character();
	
	// If there are errors, send a notice and quit
	if(error_list.length > 0) {
		alert("You must resolve all errors before the character can be exported to PDF.");
		return;
	}
	
	var id;  // Variable for HTML element id
	
	// Fetch the PDF with form fields
	const formUrl = './FDtS Editable Character Sheet.pdf';
	const formPdfBytes = await fetch(formUrl).then(res => res.arrayBuffer());

	// Load a PDF with form fields
	const pdfDoc = await PDFDocument.load(formPdfBytes);

	// Get the form containing all the fields
	const form = pdfDoc.getForm();

	// Get all fields in the PDF by their names
	const nameField = form.getTextField('Name');
	const conceptField = form.getTextField('Concept');
	const flawField = form.getTextField('Flaw');

	const bodyField = form.getTextField('Body');
	const mindField = form.getTextField('Mind');
	const soulField = form.getTextField('Soul');
	const teqField = form.getTextField('Teq');
	const capacityField = form.getTextField('Capacity');
	const wealthField = form.getTextField('Wealth');
	const decayField = form.getTextField('Decay');
	
	const skillsField = form.getTextField('Skills');
	const equipmentField = form.getTextField('Equipment');
	const rhetoricField = form.getTextField('Rhetoric');
	const notesField = form.getTextField('Notes');

	// Fill in the basic info fields
	// Name
	id = document.getElementById('char_name');
	nameField.setText(id.value);
	
	// Concept
	id = document.getElementById('concept');
	conceptField.setText(id.value);
	
	// Flaw
	id = document.getElementById('flaw');
	flawField.setText(id.value);
	
	console.log("Set Name,Concept,Flaw");
	
	// Attributes
	bodyField.setText("" + attributes[0]);
	mindField.setText("" + attributes[1]);
	soulField.setText("" + attributes[2]);
	teqField.setText("" + attributes[3]);
	capacityField.setText("" + Math.ceil(attributes[4] - weight));
	wealthField.setText("" + attributes[5]);
	decayField.setText("" + attributes[6]);
	
	console.log("Set Attributes");
	
	// Skills
	var skillList = [];  // Array of all currently checked Skills
	
	// Loop through all skill boxes and add all checked off boxes to the list
	var boxes = document.getElementsByClassName("skillCheck");
	for(let skill of boxes) {
		// If the Skill is check off, add it to skillList
		if(skill.checked)
			skillList.push(skill.value);
	}
	// Assign all Skills into one string
	var skillsFull = "";
	var i = 1;
	for(let skill of skillList) {
		if(i==1) {
			skillsFull = skill;
			i++;
		} else {
			skillsFull += ", " + skill;
		}
	}
	skillsField.setText(skillsFull);
	
	// Equipment
	var equipFull = "";
	i = 1;
	for(let equip of equipList.keys()) {
		if(i==1) {
			equipFull = equip + " - " + equipList.get(equip).ability;
			i++;
		} else {
			equipFull += "\n" + equip + " - " + equipList.get(equip).ability;
		}
	}
	equipmentField.setText(equipFull);
	
	// Rhetoric
	var rhetFull = "";
	i = 1;
	for(let rhet of rhetList.keys()) {
		if(i==1) {
			rhetFull = rhet + " (" + rhetList.get(rhet).rank + ") - " + rhetList.get(rhet).descr;
			i++;
		} else {
			rhetFull += "\n" + rhet + " (" + rhetList.get(rhet).rank + ") - " + rhetList.get(rhet).descr;
		}
	}
	rhetoricField.setText(rhetFull);
	
	// Notes
	id = document.getElementById('notes');
	var notesFull = id.value;
	for(let trinket of trinketList) {
		notesFull += "\n" + trinket;
	}
	notesField.setText(notesFull);

	// Serialize the PDFDocument to bytes (a Uint8Array)
	const pdfBytes = await pdfDoc.save();

	// Trigger the browser to download the PDF document
	download(pdfBytes, "FDtS Character.pdf", "application/pdf");
}
