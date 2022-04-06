/* Class for Equipment */
class Equipment {
    // Constructor that creates the Equipment
	constructor(name, abil, cost, descr, weight, wep){
		this.name = name;
		this.ability = abil;
		this.cost = cost;
		this.descr = descr;
		this.weight = weight;
		this.wep = wep;  // Flag to determine if it is a weapon (0=false, 1=true)
	}
	
	// Returns the name
	get_name() {
		return this.name;
	}
	
	// Returns the ability
	get_ability() {
		return this.ability;
	}
	
	// Returns the cost
	get_cost() {
		return this.cost;
	}
	
	// Returns the description
	get_description() {
		return this.descr;
	}
	
	// Returns the weight
	get_weight() {
		return this.weight;
	}
	
	// Returns the weapon flag
	get_wep() {
		return this.wep;
	}
	
	// Returns the Equipment as a string for the Character Sheet
	to_charsheet() {
		return this.name + " - " + this.ability; 
	}
	
	// Returns the Equipment as a string for the Equipment Section
	to_purchase() {
		return this.name + "【Cost: " + this.cost + " Wealth】【Weight: " + this.weight + " Capacity】\n" + this.ability; 
	}
}

// Creates the Equipment tabs
function openEquipment(evt, equip) {
	// Initialize local variables
	var i, tabcontent, tablink, equip_list;
	
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
	document.getElementById(equip).style.display = "block";
	evt.currentTarget.className += "active";
	
	// Create the table header
	var table = "<table class=\"even\">";
	table += "<th><u>Name</u> - Ability</th>";
	table += "<th>Cost (<span class=\"wealth_text\">Wealth</span>)</th>";
	table += "<th>Weight (<span class=\"capacity_text\">Capacity</span>)</th>";
	table += "<th>Description</th>";
	
	
	// Determine which Equipment List to use
	switch(equip) {
		case("melee"):
			equip_list = MELEE_LIST;
			break;
		case("ranged"):
			equip_list = RANGED_LIST;
			break;
		case("armor"):
			equip_list = ARMOR_LIST;
			break;
		case("items"):
			equip_list = ITEMS_LIST;
			break;
	}

	// Loop through each Equipment and add it to the table
	for (let equip of equip_list) {
		// Add the Equipment data
		table += "<tr>";
  		table += "<td><u>" + equip.get_name() + "</u>" + " - " + equip.get_ability() + "</td>";
  		table += "<td>" + equip.get_cost() + "</td>";
  		table += "<td>" + equip.get_weight() + "</td>";
  		table += "<td><i>" + equip.get_description() + "</i></td>";
  		// Create the Purchase Button
  		table += "<td><button type=\"button\" onclick=\"add_equipment(\'" + equip.get_name() + "\', \'" + equip.get_ability() + "\', " + equip.get_cost() + ", " + equip.get_weight() + ", " + equip.get_wep() + ")\">Add</button></td>";
  		table += "</tr>";
    }
    
    // Close the table and add it to the page
    table += "</table>";
    var id = equip + "_list";
    document.getElementById(id).innerHTML = table;
	
	// Resize the collapsible content
	var cont = document.getElementById("equip_content");
	cont.style.maxHeight = cont.scrollHeight + "px";
}

// List of all Melee Weapons
MELEE_LIST = [new Equipment("Free Dagger", "Take a -1 Penalty on attacks. Easily concealed. [Light] [Versatile]", 0, "While not as deadly as a sword, this long knife can be easily hidden.", 0.5, 1),
	new Equipment("Dagger", "Take a -1 Penalty on attacks. Easily concealed. [Light] [Versatile]", 1, "While not as deadly as a sword, this long knife can be easily hidden.", 0.5, 1),
	new Equipment("Brass Knuckles", "Take a -1 Penalty on attacks, but can never be disarmed. [Light]", 1, "Metal rings used to protect one's fist.", 0.5, 1),
	new Equipment("Quarterstaff", "Take a -1 Penalty on attacks, but gain a +1 Bonus on Avoid Reactions vs melee. [Two-Hands] [Versatile]", 1, "Long staves and walking sticks that offer better defense than offense.", 1, 1),
	new Equipment("Club", "Cannot be sundered.", 1, "Primitive weapon used for bashing skulls. Easy to craft and maintain.", 1, 1),
	new Equipment("Spear", "When you are declared the target of a melee attack and haven’t yet taken your turn, you may use your turn to immediately attack the aggressor. [Versatile]", 1, "A simple yet effective weapon used for thrusting. Its reach allows the wielder to keep enemies at arm’s length.", 1, 1),
	new Equipment("Sword", "May use Teq on Avoid Reactions vs melee attacks. [Versatile]", 1, "Versatile weapon often associated with heroes. Certain techniques allow it to be used similarly to spears and maces.", 1, 1),
	new Equipment("Curved Sword", "You may split your attack to target multiple nearby enemies, but take a -1 Penalty when you do so. [Finesse]", 1, "Curved blades specialized in slashing, allowing its wielder to easily target multiple enemies.", 1, 1),
	new Equipment("Rapier", "Take a -1 Penalty on attacks, but upon getting at least one roll of 1, deal 1 extra damage. [Finesse]", 1, "Thin blades used for swift thrusting attacks.", 1, 1),
	new Equipment("Axe", "Gain a +1 Bonus when you spend your maximum Essence Dice on a single attack.", 1, "Battle axes that can deliver single devastating blows.", 1, 1),
	new Equipment("Mace", "Upon getting at least one roll of 1, the target loses 1 Threat Point.", 1, "Blunt weapon with a heavy top that increases its striking power.", 1, 1),
	new Equipment("Warhammer", "Your attacks ignore 1 damage reduction from any All-Out Defense Actions", 1, "Capable of dealing bludgeoning or piercing hits, making it deadly and versatile.", 1, 1),
	new Equipment("Great Sword/Axe", "Upon getting at least one roll of 1, deal 1 extra damage. Additionally you may split your attack to target multiple nearby enemies, but take a -1 Penalty when you do so. [Two-Hands] [Heavy]", 2, "Large two-handed weapons used to take out multiple targets in a single stroke.", 2, 1),
	new Equipment("Polearm", "When a nearby aggressor moves to midway Range and you haven't yet taken your turn, you may use your turn to immediately attack the aggressor. [Two-Hands] [Heavy]", 2, "Long weapons with a hooked blade at the end used to tear riders from their mounts.", 2, 1),
	new Equipment("Lance", "Gain a +1 Bonus on attacks while riding a Mount. [Heavy]", 1, "Thrusting weapons mostly used by cavalry to deliver devastating blows.", 2, 1),
	new Equipment("Whip", "Doesn't deal damage, but can be used to grapple. [Finesse]", 1, "More of a tool than a weapon, but has a variety of uses.", 1, 1),
	new Equipment("Gunblade", "Can make melee and ranged attacks. [Finesse] [Unconventional]", 2, "Combines close combat with firepower. Comes in many forms such as a long pistol attached to a sword or a rifle with a bayonet.", 1, 1),
	new Equipment("Caneblade", "Easily concealed as a cane / walking stick. [Finesse] [Unconventional]", 1, "Weapon concealed inside of a cane. Popular among nobility.", 1, 1),
	new Equipment("Whip Sword", "Can be used to grapple. [Finesse] [Unconventional]", 1, "Thin sword that lashes when swung and curls around itself when lax.", 1, 1),
	new Equipment("Sword Catcher", "Deal 1 less damage, but gain 1 Extra Die on Checks to disarm. [Finesse] [Unconventional]", 1, "Dagger with serrated teeth used for catching blades and disarming opponents.", 1, 1),
	new Equipment("Chain Sickle", "Deal 1 less damage, but gain a +1 Bonus on Checks to disarm. [Finesse] [Unconventional]", 1, "Sickle chained to a metal weight used to wrap around enemy weapons.", 1, 1),
	new Equipment("War Fan", "Gain a +1 Bonus on Avoid Reactions vs ranged attacks. [Finesse] [Unconventional]", 2, "Folding fan made of iron. Useful for deflecting projectiles, cutting unarmored enemies, and assisting with swimming.", 1, 1),
	new Equipment("Iron Claw", "Ignore all damage reduction from the target's All-Out Defense. [Unconventional]", 1, "A heavy metal claw used for ripping shields and armor away from its target.", 1, 1)];

// List of all Ranged Weapons
RANGED_LIST = [new Equipment("Free Sling", "Take a -1 Penalty to attack. [Light]", 0, "Simple weapons used to hurl rocks.", 0.5, 1),
	new Equipment("Sling", "Take a -1 Penalty to attack. [Light]", 1, "Simple weapons used to hurl rocks.", 0.5, 1),
	new Equipment("Bolas", "Doesn't deal damage, but upon success inflicts the Immobile Status. One use.", 1, "Two weights attached with a rope used to tie down targets.", 1, 1),
	new Equipment("Blowgun", "Deal 1 less damage, but attacking while Hidden does not reveal yourself. [Light]", 1, "Low profile weapon that allows its user to remain hidden even after attacking.", 0.5, 1),
	new Equipment("Javelin", "Must use Body and cannot target faraway enemies.", 1, "Throwing spears useful for sticking into shields or attacking targets at range.", 1, 1),
	new Equipment("Longbow", "Ignore the Penalty for targeting faraway enemies. [Two-Hands] ", 1, "Ranged weapon that can accurately hit even faraway enemies.", 1, 1),
	new Equipment("Composite Bow", "You may use (Body + Teq) / 2 to attack. [Two-Hands] ", 1, "Bows that require more strength to draw, but can potentially release more damage.", 1, 1),
	new Equipment("Crossbow", "Gain a +1 Bonus to attack. [Two-Hands] [Reload 3■]", 2, "Advanced bows that can easily penetrate but require some time to reload.", 1, 1),
	new Equipment("Repeating Crossbow", "Can split your attack to target multiple enemies, but take a -1 Penalty when you do so. [Two-Hands] [Reload 3■]", 2, "Crossbows that can fire multiple bolts at the cost of power.", 1, 1),
	new Equipment("Pistol", "Take a -1 Penalty to attack, but upon getting at least one roll of 1, deal 1 extra damage. [Reload 3■]", 2, "A small firearm useful for piercing armor. Takes some time to reload.", 1, 1),
	new Equipment("Arquebus", "Upon getting at least one roll of 1, deal 1 extra damage. [Two-Hands] [Heavy] [Reload 5■]", 2, "More accurate than a pistol, this long firearm uses a stand to assist with aiming.", 2, 1),
	new Equipment("Bombs", "Cannot target faraway enemies, but each roll of 1 inflicts 1 damage to one random participant nearby the target.", 2, "Alchemical mixtures that explode on contact. Bad choice for a close combat weapon.", 1, 1),
	new Equipment("Greek Fire", "Cannot target faraway enemies. Deals no damage, but upon success inflicts the On Fire Status. [Reload 3■]", 2, "A container filled with an alchemical mixture that shoots flames from its opening.", 1, 1),
	new Equipment("Projectile Coins / Cards", "Ranged Weapon. Gain 1 Extra Die, but deal 1 less damage. Easy to hide. [Light] [Unconventional]", 1, "Coins or bladed cards that are launched at incredible speeds. Best not to use any made of precious metals unless you have money to burn.", 0.5, 1),
	new Equipment("Chakram", "Gain 1 Extra Die upon taking the All Out Defense Reaction. [Unconventional]", 1, "Bladed disks that are thrown. Can be worn on the head or arms for protection.", 1, 1),
	new Equipment("Boomerang", "Ranged Weapon. Upon getting one or more rolls of 1, the target loses one Threat Point. [Unconventional]", 1, "Strange curved weapon that returns to its wielder after being thrown.", 1, 1)];

// List of all Armor and Shields
ARMOR_LIST = [new Equipment("Buckler", "Gain a +1 Bonus on Avoid Reactions vs melee. [Light]", 1, "Small shield useful for blocking in melee.", 0.5, 0),
	new Equipment("Shield", "Gain a +1 Bonus on Avoid Reactions vs melee and ranged attacks.", 1, "Medium sized shield that can be used to defend against both melee and ranged attacks.", 1, 0),
	new Equipment("Tower Shield", "Gain a +2 Bonus on Avoid Reactions vs melee and ranged attacks. [Heavy]", 2, "Large shield that protects the entire body.", 2, 0),
	new Equipment("Light Armor", "+1 Extra Die on Avoid Reactions.", 1, "Cheap and lightweight armor that grants minor protection, such as leather or cloth.", 1, 0),
	new Equipment("Heavy Armor", "Gain 1 automatic success on Avoid Reactions, but suffer a -1 Penalty to any Check related to stealth, acrobatics, speed, and swimming. [Heavy]", 2, "Heavy and loud armor that offers the most protection, such as plate or chainmail.", 2, 0),
	new Equipment("Spiked Armor", "Gain 1 Extra Die on Avoid Reactions. Upon successfully grappling a target, make a Free Body Check. Upon success, deal 1 damage. [Unconventional]", 2, "Light armor covered in metal spikes. Can easily harm the wearer if not careful.", 1, 0)];

// List of all Items
ITEMS_LIST = [new Equipment("Medicine", "Spend 1 die to recover 2 Stress Boxes. 5 uses.", 1, "Medicine that comes in a variety of forms.", 1, 0),
	new Equipment("Essence Shard", "Spend 5 dice to instantly recover all Stress Boxes. Must be recharged at an Essence Spring after use.", 2, "Crystallized Essence that can be used to revitalize a wretched.", 1, 0),
	new Equipment("Weapon Repair Kit", "Can be used with a Teq Check to repair a sundered weapon.", 1, "Portable tools that allow you to perform simple repairs on weapons.", 1, 0),
	new Equipment("Armor Repair Kit", "Can be used with a Teq Check to repair broken armor.", 1, "Portable tools that allow you to perform simple repairs on armor.", 1, 0),
	new Equipment("Surgical Tools", "Can be used with a Mind Check to treat injury related Setbacks.", 1, "Splits, sutures, and other medical supplies that may help treat injuries.", 1, 0),
	new Equipment("Camping Set", "Contains rope, sleeping bag, tent, pitons, a hammer, and flint.", 1, "Tools that make enduring the elements slightly more comfortable.", 1, 0),
	new Equipment("Map Tools", "Compass and parchment used to prevent getting lost in mundane areas.", 1, "Tools useful for keeping track of your journey and prevent getting lost.", 1, 0),
	new Equipment("Grappling Hook", "Can be used for climbing, traversing pits, or as a melee weapon at a -1 Penalty.", 1, "Rope with an iron claw used for climbing.", 1, 0),
	new Equipment("Firefly Lantern", "Lights up dark areas within midway Range. [Light]", 1, "Magical fireflies placed inside of a lantern, granting a source of infinite light. The fireflies sleep when the shutter closes.", 1, 0),
	new Equipment("Spyglass", "Magnifies distant areas. [Light]", 1, "A glass that magnifies distant objects and landscapes.", 0.5, 0),
	new Equipment("Sextant", "Gain a +1 Bonus on Checks relating to navigation. [Light]", 1, "Tool that uses the stars to guide its user.", 1, 0),
	new Equipment("Bear Trap", "When stepped on, inflicts 1 damage and the Immobilized Status.", 1, "Trap with metal teeth that snap shut on whatever steps upon it.", 1, 0),
	new Equipment("Venom", "Spend 3 dice to apply to a weapon. Upon dealing any unavoided damage, inflict the Poisoned Status. 5 uses.", 1, "Charges of venom used to inflict poison.", 1, 0),
	new Equipment("Caltrops", "Spend 3 dice to spread. Aggressor loses half of its Threat Points upon making a melee attack against the user or otherwise moving through the area. 5 uses. ", 1, "Barbed metallic spikes that point upwards no matter how they land.", 1, 0),
	new Equipment("Smokebombs", "Spend 3 dice to create the Smokescreen status for 2 Rounds. 5 uses.", 1, "Upon being thrown, this bomb erupts into a cloud of thick smoke.", 1, 0)];
