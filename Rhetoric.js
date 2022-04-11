/* Class for Rhetoric */
class Rhetoric {
	// Constructor that creates the Rhetoric
	constructor(name, rank, descr) {
		this.name = name;
		this.rank = rank;
		this.descr = descr;
	}
	
	// Returns the Rhetoric name
	get_name() {
		return this.name;
	}
	
	// Returns the Rhetoric Rank
	get_rank() {
		return this.rank;
	}
	
	// Returns the Rhetoric description
	get_descr() {
		return this.descr;
	}
	
	// Returns the Rhetoric as a String
	to_string() {
		// Name (Rank) - Description
		return "<u>" + this.name + " (" + this.rank + ")</u> - " + this.descr;
	}
}

// Creates the Archetype tabs
function openArchetype(evt, arch) {
	// Initialize local variables
	var i, tabcontent, tablink, rhet_list;
	
	// Get all elements with class="tabcontent" and hide them
	closeArchetype();
  
	// Show the current tab
	document.getElementById(arch).style.display = "block";
	evt.currentTarget.className += "active";
	
	// Create the table header
	var table = "<table class=\"even\">";
	table += "<th><u>Name (Rank)</u> - Ability</th>";
	
	// Determine which Archetype List to use
	switch(arch) {
		case("warrior"):
			rhet_list = WARRIOR_LIST;
			break;
		case("wizard"):
			rhet_list = WIZARD_LIST;
			break;
		case("tactician"):
			rhet_list = TACTICIAN_LIST;
			break;
		case("swashbuckler"):
			rhet_list = SWASHBUCKLER_LIST;
			break;
		case("hothead"):
			rhet_list = HOTHEAD_LIST;
			break;
		case("believer"):
			rhet_list = BELIEVER_LIST;
			break;
		case("diplomat"):
			rhet_list = DIPLOMAT_LIST;
			break;
		case("spy"):
			rhet_list = SPY_LIST;
			break;
		case("trickster"):
			rhet_list = TRICKSTER_LIST;
			break;
		case("leader"):
			rhet_list = LEADER_LIST;
			break;
		case("bully"):
			rhet_list = BULLY_LIST;
			break;
		case("mystic"):
			rhet_list = MYSTIC_LIST;
			break;
		case("explorer"):
			rhet_list = EXPLORER_LIST;
			break;
		case("thief"):
			rhet_list = THIEF_LIST;
			break;
		case("scholar"):
			rhet_list = SCHOLAR_LIST;
			break;
		case("healer"):
			rhet_list = HEALER_LIST;
			break;
		case("naturalist"):
			rhet_list = NATURALIST_LIST;
			break;
		case("artisan"):
			rhet_list = ARTISAN_LIST;
			break;
		case("fool"):
			rhet_list = FOOL_LIST;
			break;
	}

	// Loop through each Equipment and add it to the table
	for (let rhet of rhet_list) {
		// Add the Rhetoric
		table += "<tr>";
  		table += "<td>" + rhet.to_string() + "</td>";
  		// Create the Add Button
  		table += "<td><button type=\"button\" onclick=\"add_rhetoric(\'" + rhet.get_name() + "\', " + rhet.get_rank() + ", \'" + rhet.get_descr() + "\')\">Add</button></td>";
  		table += "</tr>";
    }
    
    // Close the table and add it to the page
    table += "</table>";
    var id = arch + "_list";
    document.getElementById(id).innerHTML = table;
	
	// Resize the collapsible content
	var cont = document.getElementById("rhetoric_content");
	cont.style.maxHeight = cont.scrollHeight + "px";
}

// Closes the Archetype tabs
function closeArchetype() {
	// Initialize local variables
	var i, tabcontent, tablink, rhet_list;
	
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
}

// List of all Rhetoric sorted by Archetype
var WARRIOR_LIST = [new Rhetoric("Deflect", 1, "Gain 1 Extra Die when defending with a weapon in melee."),
	new Rhetoric("Deflect", 2, "Gain 1 Extra Die when defending with a weapon."),
	new Rhetoric("Improvised Master", 1, "Ignore the -1 damage and -1 Penalty for fighting barehanded or with improvised weapons."),
	new Rhetoric("Improvised Master", 2, "Treat fighting barehanded or with improvised weapons as a Mace that cannot be sundered."),
	new Rhetoric("Heavy Strike", 1, "Upon getting at least one roll of 1 on a melee attack, ignore one -1 Penalty."),
	new Rhetoric("Heavy Strike", 2, "Upon getting at least one roll of 1 on a melee attack, you may ignore two -1 Penalties."),
	new Rhetoric("Sword Master", 1, "You may use a sword as if it were a mace."),
	new Rhetoric("Sword Master", 2, "You may use a sword as if it were a mace or spear."),
	new Rhetoric("Push Back", 1, "Upon getting at least one roll of 1 on a melee attack, you may push the target to the Enemy Back Zone."),
	new Rhetoric("Push Back", 2, "Upon dealing at least 2 damage from a melee attack, you may push the target to the Enemy Back Zone.")];

var WIZARD_LIST = [new Rhetoric("Fireball", 1, "Take 1 Stress and make a ranged attack using Mind. For each roll of 1, deal 1 damage to one random participant nearby the target."),
	new Rhetoric("Fireball", 2, "Make a ranged attack using Mind. For each roll of 1, deal 1 damage to one random participant nearby the target."),
	new Rhetoric("Imbue Phlogiston", 1, "Mind Check to ignite a nearby small object."),
	new Rhetoric("Imbue Phlogiston", 2, "Mind Check to ignite a nearby object or denizen. Upon success, inflict the On Fire Status."),
	new Rhetoric("Livewire", 1, "Generate electrical sparks through your fingertips."),
	new Rhetoric("Livewire", 2, "Generate and control electricity through your fingertips."),
	new Rhetoric("Magic Dart", 1, "Make a Ranged Attack with Mind at a -1 Penalty."),
	new Rhetoric("Magic Dart", 2, "Make a Ranged Attack with Mind."),
	new Rhetoric("Pocket Portal", 1, "Your Capacity is equal to ((Mind + Body) / 2) + 1."),
	new Rhetoric("Pocket Portal", 2, "Your Capacity is equal to Mind + 1.")];
	
var TACTICIAN_LIST = [new Rhetoric("Apprehend", 1, "When you defeat a nearby enemy, make a Free Body Check. Upon success, the enemy is alive and captured."),
	new Rhetoric("Apprehend", 2, "When a nearby enemy is defeated, make a Free Body Check. Upon success, the enemy is alive and captured."),
	new Rhetoric("Force Pull", 1, "Choose a midrange target and make a Mind Check. Upon success, it is moved nearby you."),
	new Rhetoric("Force Pull", 2, "Choose a midrange or faraway target and make a Mind Check. Upon success, it is moved one Range / Zone closer to you."),
	new Rhetoric("Look out!", 1, "When a nearby ally takes any unavoided damage, you may redirect up to half of it to yourself as unavoidable damage."),
	new Rhetoric("Look out!", 2, "When a nearby ally takes any unavoided damage, you may redirect up to the full amount to yourself as unavoidable damage."),
	new Rhetoric("Scramble for Cover", 1, "At the start of Conflict, make a free Body Check. Upon success, you gain DR 2 Light Cover."),
	new Rhetoric("Scramble for Cover", 2, "You may start out any Conflict in DR 2 Light Cover."),
	new Rhetoric("Tactical Retreat", 1, "While in the Melee Zone, spend all 5 dice and make a Free Body Check. Upon success, you may leave the Conflict."),
	new Rhetoric("Tactical Retreat", 2, "While in the Melee Zone, spend all 5 dice and make a Free Body Check. Upon success, you and one nearby ally may leave the Conflict.")];

var SWASHBUCKLER_LIST = [new Rhetoric("Backstep", 1, "Upon getting at least one roll of 1 on a melee attack, you may change Combat Zones for free."),
	new Rhetoric("Backstep", 2, "Upon dealing 2 or more damage on a melee attack, you may change Combat Zones for free."),
	new Rhetoric("Flaunting Skill", 1, "Upon succeeding at a particularly difficult trick, you may recover 1 Stress. However, if you fail you take 1 Stress."),
	new Rhetoric("Flaunting Skill", 2, "Upon succeeding at a particularly difficult trick, you may recover 2 Stress. However, if you fail you take 1 Stress."),
	new Rhetoric("Lightning Reflexes", 1, "You may make Reactions even when surprised."),
	new Rhetoric("Lightning Reflexes", 2, "You can never be caught surprised."),
	new Rhetoric("Switch Hitter", 1, "Changing Combat Zones costs 1 die less than usual."),
	new Rhetoric("Switch Hitter", 2, "Changing Combat Zones costs 2 dice less than usual."),
	new Rhetoric("Riposte", 1, "When you successfully Avoid all damage from a melee attack, make a Free Teq Check. Upon success, you may immediately attack the aggressor if you have any remaining dice."),
	new Rhetoric("Riposte", 2, "When you successfully Avoid all damage from a melee attack, you may immediately attack the aggressor if you have any remaining dice.")];
	
var HOTHEAD_LIST = [new Rhetoric("Bloodletting", 1, "Gain +1 Essence Die until the end of the current Conflict / Scene, after which you take 2 unavoidable damage."),
	new Rhetoric("Bloodletting", 2, "Gain +2 Essence Dice until the end of the current Conflict / Scene, after which you take 2 unavoidable damage."),
	new Rhetoric("Die Hard", 1, "Upon checking off all Stress Boxes, you may act if you have yet to take your turn this Round. After acting, you take 1 Decay if not healed."),
	new Rhetoric("Die Hard", 2, "Upon checking off all Stress Boxes, you may act if you have yet to take your turn this Round. At the end of the Round, you take 1 Decay if not healed."),
	new Rhetoric("Grin and Bear", 1, "Once per Session, you may ignore the effects of one injury related Setback."),
	new Rhetoric("Grin and Bear", 2, "Once per Scene, you may ignore the effects of one injury related Setback."),
	new Rhetoric("Loudmouth", 1, "Enemies tend to focus on you over your allies."),
	new Rhetoric("Loudmouth", 2, "Enemies tend to focus on you over your allies. Once per Round, you may redirect one nearby enemy’s attack to yourself."),
	new Rhetoric("Tremor", 1, "Take 2 Stress and make a Body Check. Upon success, deal 1 damage to all nearby enemies that are touching the ground."),
	new Rhetoric("Tremor", 2, "Take 2 Stress and make a Body Check. Upon success, deal 1 damage to all nearby and midrange enemies that are touching the ground.")];
	
var BELIEVER_LIST = [new Rhetoric("Divine Wind", 1, "Use (Soul + Body) / 2 on Avoid Reactions vs ranged attacks."),
	new Rhetoric("Divine Wind", 2, "Use Soul with a -1 Penalty on Avoid Reactions vs ranged attacks."),
	new Rhetoric("Gut Feeling", 1, "Once per Session, you may ask the GM for your gut feeling on a situation or denizen and get a helpful answer."),
	new Rhetoric("Gut Feeling", 2, "Once per Scene, you may ask the GM for your gut feeling on a situation or denizen and get a helpful answer."),
	new Rhetoric("Lightning Strike", 1, "Make a Soul Check. Upon success, deal 1 damage to a nearby or midrange target."),
	new Rhetoric("Lightning Strike", 2, "Make a Soul Check. Upon success, deal 1 damage to a target that is not Out of Range."),
	new Rhetoric("Shield of Faith", 1, "You are considered to have a weightless Buckler when only wielding a one-handed weapon."),
	new Rhetoric("Shield of Faith", 2, "You are considered to have a weightless Shield when only wielding a one-handed weapon."),
	new Rhetoric("Summon Rain", 1, "Soul Check to summon light clouds."),
	new Rhetoric("Summon Rain", 2, "Soul Check to summon a light rain.")];
	
var DIPLOMAT_LIST = [new Rhetoric("Convincing", 1, "Gain 1 Extra Die on Argue Actions when attempting to convince."),
	new Rhetoric("Convincing", 2, "Gain 1 Extra Die when attempting to convince."),
	new Rhetoric("Diplomatic", 1, "You easily gain audiences with minor leaders such as village elders."),
	new Rhetoric("Diplomatic", 2, "You easily gain audiences with leaders such as city mayors."),
	new Rhetoric("Essence Speak", 1, "You can ask any intelligent denizen basic questions regardless of language."),
	new Rhetoric("Essence Speak", 2, "You can make basic conversation with any intelligent denizen regardless of language."),
	new Rhetoric("Objection", 1, "Upon getting 2 or more successes on a Counterpoint Reaction, reduce damage taken by 2 instead of 1."),
	new Rhetoric("Objection", 2, "Upon getting 2 or more successes on a Counterpoint Reaction, reduce damage taken by [#successes] instead of 1."),
	new Rhetoric("Silver Tongued", 1, "Once per Session, when you make a slip of the tongue, you may take it back with no consequence."),
	new Rhetoric("Silver Tongued", 2, "Once per Scene, when you make a slip of the tongue, you may take it back with no consequence.")];
	
var SPY_LIST = [new Rhetoric("Blend In", 1, "Make a Free Teq Check to gain the Hidden Status when in a crowd that you do not stand out from."),
	new Rhetoric("Blend In", 2, "You may instantly gain the Hidden Status when in a crowd that you do not stand out from."),
	new Rhetoric("Change Persona", 1, "When you rest at an Essence Spring, you may tweak your Concept."),
	new Rhetoric("Change Persona", 2, "When you rest at an Essence Spring, you may tweak your Concept or Flaw."),
	new Rhetoric("Cover Up", 1, "Make a Soul Check to cover up a recent, minor event such as a petty theft."),
	new Rhetoric("Cover Up", 2, "Make a Soul Check to cover up a recent event such as a fight."),
	new Rhetoric("Fast Talker", 1, "Gain 1 Extra Die when attempting to deceive a friendly or neutral target."),
	new Rhetoric("Fast Talker", 2, "Gain 1 Extra Die when attempting to deceive."),
	new Rhetoric("Master of Disguise", 1, "Once per Session, choose an unimportant human character in a Scene you are not in; reveal it was you in disguise."),
	new Rhetoric("Master of Disguise", 2, "Once per Session, choose an unimportant human or human-like character in a Scene you are not in; reveal it was you in disguise.")];
	
var TRICKSTER_LIST = [new Rhetoric("Hard to Fool", 1, "You are immune to minor illusions such as 2D visual effects."),
	new Rhetoric("Hard to Fool", 2, "You are immune to wider illusions such as disembodied voices."),
	new Rhetoric("Hedge Magic", 1, "Teq Check to perform basic magic tricks such as making small objects disappear."),
	new Rhetoric("Hedge Magic", 2, "Teq Check to perform magic tricks such as pulling a rabbit from an empty hat."),
	new Rhetoric("Illustrious Illusion", 1, "Teq Check to make simple audio and 2D visual illusions."),
	new Rhetoric("Illustrious Illusion", 2, "Teq Check to make simple audio and 3D visual illusions."),
	new Rhetoric("Self-Portrait", 1, "Teq Check to create an illusory duplicate of yourself that disappears after a few moments."),
	new Rhetoric("Self-Portrait", 2, "Teq Check to create an illusory duplicate of yourself that disappears upon taking any damage."),
	new Rhetoric("Sleep", 1, "Mind Check to put a nearby shade to sleep."),
	new Rhetoric("Sleep", 2, "Mind Check to put a nearby shade or deficient to sleep.")];
	
var LEADER_LIST = [new Rhetoric("Call to Arms", 1, "Make a Decay Check. Upon success, 1 friendly shade appears to assist you for the remainder of the Scene."),
	new Rhetoric("Call to Arms", 2, "Make a Decay Check. Upon success, [#success] friendly shades appear to assist you for the remainder of the Scene."),
	new Rhetoric("Friend in Every Port", 1, "You have a contact in most Major Settlements."),
	new Rhetoric("Friend in Every Port", 2, "You have a contact in all Major Settlements."),
	new Rhetoric("Inspiring", 1, "Gain 1 Extra Die on Assist Actions towards a nearby ally."),
	new Rhetoric("Inspiring", 2, "Gain 1 Extra Die on Assist Actions towards an ally within earshot."),
	new Rhetoric("On My Word", 1, "Spend 5 dice and choose one nearby ally. That ally may freely move one Range / Zone in regular terrain."),
	new Rhetoric("On My Word", 2, "Spend 5 dice and choose one ally that can hear you. That ally may freely move one Range / Zone in regular terrain."),
	new Rhetoric("Rumor Has It", 1, "A minor, incidental rumor you spread will become true if enough believe in it, such as a ghost living in a well."),
	new Rhetoric("Rumor Has It", 2, "A rumor you spread will become true if enough believe in it, such as a merchant who secretly sells Rarities.")];
	
var BULLY_LIST = [new Rhetoric("Amateur Author", 1, "Decay Check to put a twist on the Concept of a shade."),
	new Rhetoric("Amateur Author", 2, "Decay Check to put a twist on the Concept of a non-wretched denizen."),
	new Rhetoric("Confession", 1, "When you ask a shade about a minor guilt they bear, they will answer honestly."),
	new Rhetoric("Confession", 2, "When you ask a shade or deficient about a minor guilt they bear, they will answer honestly."),
	new Rhetoric("Forceful", 1, "Use (Body + Soul) / 2 on Checks to intimidate."),
	new Rhetoric("Forceful", 2, "Use Soul at a -1 Penalty on Checks to intimidate."),
	new Rhetoric("Impel", 1, "Decay Check to control a nearby shade’s next Action."),
	new Rhetoric("Impel", 2, "Decay Check to control a nearby shade or deficient’s next Action."),
	new Rhetoric("Intimidating", 1, "Gain 1 Extra Die on Argue Actions to intimidate."),
	new Rhetoric("Intimidating", 2, "Gain 1 Extra Die on Checks to intimidate.")];
	
var MYSTIC_LIST = [new Rhetoric("Baleful Curse", 1, "Spend 5 dice to place a curse on a shade. When the target makes an Action, make a Free Decay Check. Upon success, you may describe how the Action fails due to unnaturally bad luck. Only one target may be cursed at a time."),
	new Rhetoric("Baleful Curse", 2, "Spend 5 dice to place a curse on a shade or deficient. When the target makes an Action, make a Free Decay Check. Upon success, you may describe how the Action fails due to unnaturally bad luck. Only one target may be cursed at a time."),
	new Rhetoric("Foresight", 1, "Once per Session, before you act you may ask the GM for the consequences of failure and get an honest answer."),
	new Rhetoric("Foresight", 2, "Once per Scene, before you act you may ask the GM for the consequences of failure and get an honest answer."),
	new Rhetoric("Read Aura", 1, "You may read the Concept of any nearby denizen."),
	new Rhetoric("Read Aura", 2, "You may read the Concept and Gear of any nearby denizen."),
	new Rhetoric("Retcon", 1, "Decay Check to tweak the outcome of the previous Check."),
	new Rhetoric("Retcon", 2, "Decay Check to tweak the outcome of the previous Check or reroll it."),
	new Rhetoric("Steal Essence", 1, "Make a Free Decay Check when your attack defeats an enemy. Upon success, recover 1 Stress Box."),
	new Rhetoric("Steal Essence", 2, "Make a Free Decay Check with a +1 Bonus when your attack defeats an enemy. Upon success, recover 1 Stress Box.")];
	
var EXPLORER_LIST = [new Rhetoric("Unknown Explorer", 1, "You do not get lost in mundane areas in the Unknown Spiral."),
	new Rhetoric("Unknown Explorer", 2, "You do not get lost in mundane areas in the Unknown Spiral, and know the general location of the way ahead."),
	new Rhetoric("Expressive", 1, "You may communicate simple nonverbal messages with any denizen, such as one word directions."),
	new Rhetoric("Expressive", 2, "You may communicate advanced nonverbal messages with any denizen, such as explaining enemy positions."),
	new Rhetoric("Lightning Jump", 1, "Body Check to leap to a nearby location you can see."),
	new Rhetoric("Lightning Jump", 2, "Body Check to leap to a midrange location you can see."),
	new Rhetoric("Set Camp", 1, "Once per Scene, when you rest with a Camping Set, you and up to 2 allies may uncheck 1 Stress Box."),
	new Rhetoric("Set Camp", 2, "Once per Scene, when you rest with a Camping Set, you and up to 2 allies may uncheck 2 Stress Boxes."),
	new Rhetoric("Spiralform", 1, "Decay Check to create, change, or remove a minor terrain feature, such as a short wall or pond."),
	new Rhetoric("Spiralform", 2, "Decay Check to create, change, or remove a medium terrain feature, such as a hill or stream.")];
	
var THIEF_LIST = [new Rhetoric("Backstab", 1, "Gain 1 Extra Die when you attack while hiding."),
	new Rhetoric("Backstab", 2, "Gain 1 Extra Die when you attack while hiding or attack a surprised enemy."),
	new Rhetoric("Escape Artist", 1, "Gain 1 Extra Die when trying to escape from a trap."),
	new Rhetoric("Escape Artist", 2, "Gain 1 Extra Die when trying to escape from an enemy or trap."),
	new Rhetoric("Hideaway", 1, "Gain 1 Extra Die when attempting to hide in Conflict."),
	new Rhetoric("Hideaway", 2, "Gain 1 Extra Die when attempting to hide."),
	new Rhetoric("One With Shadow", 1, "Soul Check to enter a shadow that is stationary and larger than yourself. You are considered Hidden until you exit or otherwise reveal yourself."),
	new Rhetoric("One With Shadow", 2, "Soul Check to enter a shadow that is larger than yourself. You are considered Hidden until you exit or otherwise reveal yourself."),
	new Rhetoric("Phantom Pickpocket", 1, "Teq Check to use a phantom hand to take a small, light object, such as a key ring, from a nearby or midrange denizen without being noticed."),
	new Rhetoric("Phantom Pickpocket", 2, "Teq Check to use a phantom hand to take a light object, such as a dagger, from a nearby or midrange denizen without being noticed.")];
	
var SCHOLAR_LIST = [new Rhetoric("Break Physics", 1, "Decay Check to bend physics, such as lowering gravity."),
	new Rhetoric("Break Physics", 2, "Decay Check to break or ignore physics, such as temporarily removing friction."),
	new Rhetoric("Create Familiar", 1, "Instantly create a Follower if you do not already have one. You may choose its appearance and one Follower Rhetoric."),
	new Rhetoric("Create Familiar", 2, "Instantly create a Follower if you do not already have one. You may choose its appearance and up to two Follower Rhetoric."),
	new Rhetoric("Geomancer", 1, "Once per Session, upon entering a Locale you haven’t visited before, you may create one minor, incidental fact about it."),
	new Rhetoric("Geomancer", 2, "Once per Session, upon entering a Locale you haven’t visited before, you may create one general fact about it."),
	new Rhetoric("Machine Knack", 1, "Know basic functionality of most machines."),
	new Rhetoric("Machine Knack", 2, "Know basic functionality of most machines and how they function."),
	new Rhetoric("Well Read", 1, "Upon entering a new area, you may ask the GM for a general fact about it."),
	new Rhetoric("Well Read", 2, "Upon entering a new area, you may ask the GM for a specific, useful fact about it.")];
	
var HEALER_LIST = [new Rhetoric("Healing Touch", 1, "You have a regeneration pool equal to your Soul / 2. You may restore a nearby ally’s Stress Boxes at the cost of 1 box for 1 point and 1 die. The pool refreshes every Session."),
	new Rhetoric("Healing Touch", 2, "You have a regeneration pool equal to your Soul + 1. You may restore a nearby ally’s Stress Boxes at the cost of 1 box for 1 point and 1 die. The pool refreshes every Session."),
	new Rhetoric("Master Medic", 1, "Make a Mind Check to treat a nearby ally’s injury related Setback. Upon success, your ally may ignore its effects on their next Check."),
	new Rhetoric("Master Medic", 2, "Make a Mind Check to treat a nearby ally’s injury related Setback. Upon success, your ally may ignore its effects for the rest of the Scene."),
	new Rhetoric("Meditate", 1, "Once per Session, you may recover 4 Stress Boxes. Cannot be used in Conflict."),
	new Rhetoric("Meditate", 2, "Once per Session, you may recover 6 Stress Boxes. Cannot be used in Conflict."),
	new Rhetoric("Restore", 1, "You may spend 3 dice to cure a nearby ally of the Poisoned Status."),
	new Rhetoric("Restore", 2, "You may spend 3 dice to cure a nearby ally of the Poisoned or On Fire Status."),
	new Rhetoric("Transfer Injury", 1, "You may transfer one injury related Setback from a nearby ally to yourself. Cannot be used again until that Setback is resolved."),
	new Rhetoric("Transfer Injury", 2, "You may transfer one injury related Setback from a nearby ally to yourself or vice versa. Cannot be used again until that Setback is resolved.")];
	
var NATURALIST_LIST = [new Rhetoric("Beast Form", 1, "Soul Check to transform into a medium sized beast and gain one ability from your new form. For example, turning into a wolf grants scent tracking."),
	new Rhetoric("Beast Form", 2, "Soul Check to transform into a small or medium sized beast and gain one ability from your new form. For example, turning into a mouse allows you to squeeze through tight areas."),
	new Rhetoric("Charming Tune", 1, "You can control one small non-hostile animal through music."),
	new Rhetoric("Charming Tune", 2, "You can control small non-hostile animals through music."),
	new Rhetoric("Draconic Echo", 1, "You are resistant to high temperatures."),
	new Rhetoric("Draconic Echo", 2, "You are resistant to high temperatures and open flames."),
	new Rhetoric("Expert Swimmer", 1, "Make a Body Check to swim in rapids as if it were calm water."),
	new Rhetoric("Expert Swimmer", 2, "Make a Body Check to swim in rapids or through whirlpools as if it were calm water."),
	new Rhetoric("Plant Whisperer", 1, "You may ask plants simple questions."),
	new Rhetoric("Plant Whisperer", 2, "You may hold basic conversations with plants.")];
	
var ARTISAN_LIST = [new Rhetoric("Art Dimension", 1, "You may leap into the worlds of paintings and other 2D art. "),
	new Rhetoric("Art Dimension", 2, "You may leap into the worlds of paintings and other 2D art. When you do so, you may bring 1 companion."),
	new Rhetoric("Critical Eye", 1, "Gain 1 Extra Die when looking for flaws in a nearby object."),
	new Rhetoric("Critical Eye", 2, "Gain 1 Extra Die when looking for flaws in an object."),
	new Rhetoric("Make Malleable", 1, "Mind Check to bend but not break a small object such as a dagger."),
	new Rhetoric("Make Malleable", 2, "Mind Check to bend but not break a medium sized object such as a longsword."),
	new Rhetoric("Quick Fix", 1, "Make a Teq Check on one piece of sundered Equipment. Upon success, you may ignore the Sundered Setback for one Action."),
	new Rhetoric("Quick Fix", 2, "Make a Teq Check on one piece of sundered Equipment. Upon success, you may ignore the Sundered Setback for the rest of the Scene."),
	new Rhetoric("Sculpt Ether", 1, "Spend 5 dice to make one mundane item out of ether. It is clearly not real and vanishes after one use or upon using this Rhetoric again."),
	new Rhetoric("Sculpt Ether", 2, "Spend 5 dice to make one mundane item out of ether. It is clearly not real and vanishes after a few uses or upon using this Rhetoric again.")];
	
var FOOL_LIST = [new Rhetoric("Air Dancer", 1, "You can fall up to twice as far without taking any damage."),
	new Rhetoric("Air Dancer", 2, "You fall as gently as a feather and can summon a light breeze."),
	new Rhetoric("Coin Flip", 1, "Once per Scene, you may roll a D10. On a 5 or under, some minor lucky thing happens to you, such as finding a shortcut or narrowly avoiding harm. On a 6 or over, you suffer some minor misfortune, such as getting lost or taking a -1 Penalty."),
	new Rhetoric("Coin Flip", 2, "On your turn, you may roll a D10. On a 5 or under, some minor lucky thing happens to you, such as finding a shortcut or narrowly avoiding harm. On a 6 or over, you suffer some minor misfortune, such as getting lost or taking a -1 Penalty. You must wait 2 Rounds to use this ability again."),
	new Rhetoric("Epic Endurance", 1, "Gain 1 Light Stress Box."),
	new Rhetoric("Epic Endurance", 2, "Gain 1 Heavy Stress Box."),
	new Rhetoric("Own Destiny", 1, "Whenever you take a Setback, you may ask the GM for two options and choose one."),
	new Rhetoric("Own Destiny", 2, "Whenever you take a Setback, you may ask the GM for two options and choose one. Additionally, you may do the same when your Concept / Flaw is corrupted."),
	new Rhetoric("Resist Entropy", 1, "Upon checking off all Stress Boxes, make a Free Decay Check. Upon success, you recover 2 Stress Boxes and gain no Decay, but you cannot act for the rest of the Scene."),
	new Rhetoric("Resist Entropy", 2, "Upon checking off all Stress Boxes, make a Free Decay Check with a +1 Bonus. Upon success, you recover half of your Stress Boxes and gain no Decay, but you cannot act for the rest of the Scene.")];

var MASTER_LIST = [WARRIOR_LIST, WIZARD_LIST, TACTICIAN_LIST, SWASHBUCKLER_LIST, HOTHEAD_LIST, BELIEVER_LIST, DIPLOMAT_LIST, SPY_LIST, TRICKSTER_LIST, LEADER_LIST, BULLY_LIST, MYSTIC_LIST, EXPLORER_LIST, THIEF_LIST, SCHOLAR_LIST, HEALER_LIST, NATURALIST_LIST, ARTISAN_LIST, FOOL_LIST];