let monster = {};
monster.modules = {};

monster.modules.actions = (function(){
	let name = 'The monster';
	let life =0;
	let money = 0;
	let awake = false;
	
	// Retourne les propriétés du monster
	function showMe(){
		monster.modules.app.log("Life : " + life + ", Money : " + money +  ", Awake : " + awake );
       	monster.modules.app.displayStatus(life,money,awake);
	}

	// Initialise les propriétés du monster
	function init(initName, initLife, initMoney, initAwake){
		name = initName;
		life = initLife;
		money = initMoney;
		awake = initAwake;
        monster.modules.app.log("Life : " + life + ", Money : " + money +  ", Awake : " + awake );
        monster.modules.app.displayStatus(initLife, initMoney, initAwake);
	}

	
	function run(){
        if(life>=1){ // Si vivant
            if(awake) { // Si réveillé
                life--;
                monster.modules.app.log(name + " court rapidement");
                monster.modules.app.displayStatus(life, money, awake);
            }
            else{
                monster.modules.app.log(name + " ne court pas en dormant");
            }
        }
        else{
            monster.modules.app.log(name + " doit être vivant pour courir");
		}
	}

    function fight(){
		if(life>0) {	// Si vivant
            if (life >= 3) {	// Pour ne pas être dans le négatif
                if (awake) {	// Si réveiller
                    life = life - 3;
                    monster.modules.app.log(name + " se bat violemment");
                    monster.modules.app.displayStatus(life, money, awake);
                }
                else {
                    monster.modules.app.log(name + " ne se bat pas en dormant");
                }
            }
            else {
                monster.modules.app.log(name + " doit avoir 3 vies pour se battre");
            }
        }
        else{
            monster.modules.app.log(name + " doit être vivant pour se battre");
        }
    }

    function work(){	
        if(life>=1){	// Si vivant
            if(awake) {		// Si réveillé
                life--;
                money = money+2;
                monster.modules.app.log(name + " travaille d'arrache pied");
                monster.modules.app.displayStatus(life, money, awake);
            }
            else{
                monster.modules.app.log(name + " ne travaille pas en dormant");
            }
        }
        else{
            monster.modules.app.log(name + " doit être vivant pour travailler");
        }
    } 

    function eat(){
    	if(life>0) {	// Si vivant
            if (money >= 3) { 	// Pour ne pas être dans le négatif 
                if (awake) {	// Si réveillé
                    money = money - 3;
                    life = life + 2;
                    monster.modules.app.log(name + " mange goulûment des petits enfants");
                    monster.modules.app.displayStatus(life, money, awake);
                }
                else {
                    monster.modules.app.log(name + " ne mange pas en dormant");
                }
            }
            else {
                monster.modules.app.log(name + " est trop pauvre pour manger");
            }
        }
        else{
            monster.modules.app.log(name + " doit être vivant pour manger");
		}
    }

    function sleep(){
    	if ((money>0) && (life>0) ) {	// Si vivant
            if (awake) {		// Si réveillé
                awake = false;
                monster.modules.app.log("ZZZZzzzzZZzzzz");
                monster.modules.app.displayStatus(life, money, awake);

				// Réveillé au bout 10s
                setTimeout(function() {
                    awake = true;
                    life++;
                    monster.modules.app.log(name + " est maintenant bien reposé");
                    monster.modules.app.displayStatus(life, money, awake);
                }, 10000);
            }
            else {
                monster.modules.app.log(name + " est déjà en train de dormir");
            }
        }
        else{
            monster.modules.app.log(name + " doit être vivant pour dormir");
		}
    }

    function kill(){
        if(life>0){		//Si vivant
            life = 0;
            awake = false;
            money = 0;
            monster.modules.app.log( name  + " est mort");
            monster.modules.app.displayStatus(life, money, awake);
        }
        else{
            monster.modules.app.log("Arrête de t'acharner sur " + name);
        }
    }

	// Chiffre au hazard pour avoir une action aléa
    function getRandomIntInclusive(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        let resultAlea = Math.floor(Math.random() * (max - min + 1)) + min;
        return resultAlea;
    }

    // Toutes les 12 secondes, une action executée
    setInterval(
    	function(){
    		if (life>0) {		// Si vivant 
    			life--;
    			let nbActions = 5;

                let numAction = getRandomIntInclusive(1,nbActions);
				
               	switch(numAction){
					case 1 :
						run();
						break;
					case 2 :
						fight();
						break;
					case 3 :
						work();
						break;
                   	case 4 :
                       	sleep();
                      	break;
                   	case 5 :
                       	eat();
                       	break;
				}
                monster.modules.app.displayStatus(life, money, awake);
            }
		},
	12000);

	return{showMe, init,run, fight, work, eat, sleep, kill};
})();


monster.modules.app = (function(){
    let show = document.querySelector("#show");
    let run = document.querySelector("#run");
    let fight = document.querySelector("#fight");
    let work = document.querySelector("#work");
    let eat = document.querySelector("#eat");
	let sleep = document.querySelector("#sleep");
	let kill = document.querySelector("#kill");
	let reset = document.querySelector("#reset");
    let monsterBlock = document.querySelector("#monster");

	// Valeur d'initialisation
    function start(){
		
		monster.modules.actions.init('Thomas', 100, 100, true);
	
		// Quand appui sur show affiche les valeurs des propriétés
		show.onclick = () => {
			
			monster.modules.actions.showMe();
		};
	}
	
	// Quand recharge la page initialise les prop du monster
	window.onload = () => {
		start();
	};

    // Quand appuie sur run enleve une life
    run.onclick = () => {
        monster.modules.actions.run();
    };

    // Quand appuie sur fight sur enleve 3 life
    fight.onclick = () => {
        monster.modules.actions.fight();
	};

    // Quand appuie sur work sur enleve 1 life gagne 2 money
    work.onclick = () =>{
    	monster.modules.actions.work();
	};

    // Quand appuie sur eat sur gagne 2 life et perd 3 money
    eat.onclick = () => {
        monster.modules.actions.eat();
	};

    // Quand appuie sur sleep le monstre dort 10s
    sleep.onclick = () => {
        monster.modules.actions.sleep();
	};

    // Quand appuie sur kill =0 life = 0, awake = false
    kill.onclick = () => {
        monster.modules.actions.kill();
    };

    reset.onclick = () =>{
		start();
	}

	// Affiche message
	function log(message){
		//recupère le premier P de actionBox
		let actionBox = document.querySelector("#actionbox");
		let actP = actionBox.firstChild;
		
		let pMessage = document.createElement("p");
		let tMessage = document.createTextNode(message)
		pMessage.appendChild(tMessage);
		
		actionBox.insertBefore(pMessage, actP);
	}
	
	//afficher les prop du monstre dans status
	function displayStatus(life, money, awake){
		//recupère les 3 li de status
		let status = document.querySelector("#status");
		let statLife = status.childNodes[1];
		let statMoney = status.childNodes[2];
		let statAwake = status.childNodes[3];
		
		statLife.innerHTML="Life : " + life;
		statMoney.innerHTML= "Money : " + money
		statAwake.innerHTML="Awake : " + awake;

        monsterBlock.style.textAlign ="center";

        // Couleur du vert au noir du monstre
		if (life>100){
            monsterBlock.style.background ="MediumSeaGreen";
		}else if (life>80){
            monsterBlock.style.background ="LimeGreen";
        }else if (life>50){
            monsterBlock.style.background ="Lime";
        }else if (life>30){
            monsterBlock.style.background ="LightSalmon";
        }else if (life>5){
            monsterBlock.style.background ="LightCoral";
        }else{
            monsterBlock.style.background ="black";
            monsterBlock.style.color="White";
        }

        // Couleur et largeur du monstre
        if (money>100){
            monsterBlock.style.border ="yellow solid 15px";
        }else if (money>80){
            monsterBlock.style.border ="gold solid 13px";
        }else if (money>50){
            monsterBlock.style.border ="orange solid 10px";
        }else if (money>30){
            monsterBlock.style.border ="GoldenRod solid 8px";
        }else if (money>5){
            monsterBlock.style.border ="darkGoldenRod solid 5px";
        }else{
            monsterBlock.style.border ="black solid 1px";
        }
	}

	return {log, displayStatus};
})();