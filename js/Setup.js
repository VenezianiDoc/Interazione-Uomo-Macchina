	// SETUP: Impostazioni e Parametri

	// Gestione degli anni
	var YearSelected=2010; // Anno di partenza
	var YearsAvailable = new Array("2010", "2011", "2012"); // Anni disponibili
	
	// Ultima Area Selezionata (serve alla funzione ShowDiv() in Utils.js per
	// riaprire il contenuto informativo 
	// dell'area che si stava visualizzando prima del cambio anno)
	var LastAreaSelected = "";
	
	// Dati selezionati dal Gruppo
	var Gruppo="tpellegr";
	
	// Configurazione per le soglie, sotto forma di array, di ciascuna area
	// dal livello minimo al livello massimo.

	var thrAcqua = new Array(0.19,0.29,0.59);		// Minore è migliore
	var thrMateriali = new Array(23,26,100);	
	var thrEnergia = new Array(9000,10000,15000);	// Minore è migliore
	var thrInnovazione = new Array(25, 45, 100);
	var thrMobilita = new Array(25, 55, 100);				
	var thrPersonale = new Array(10,20, 100);
	var thrStudenti = new Array(3,5,10);
	var thrSupplyChain = new Array(10,20,100);
	var thrGovernance = new Array(3,5,10);
	var thrRifiuti = new Array(20, 40, 100);

	// Per comodità, si è scelto di includere in questa sezione anche la gestione
	// dei colori delle luci nelle loro varie soglie dal caso ottimale al caso
	// peggiore. 
	// es. Verde, Giallo, Rosso. Accetta una tripla di valori RGB da 0.00 a 1.00

	var thrColors = new Array("0 1 0", "1 0.843137 0", "1 0 0");
	
	// Tre impostazioni di velocità di rotazione della metafora dell'energia, 
	// hanno effetto sull'attributo cycleInterval. 
	// Vedere getEnergia() in Update.js 
	
	var velocita = new Array(1.5, 6, 24);

	// Array contenente tutti gli id degli oggetti dinamici che 
	// devono essere resettati 
	// al cambio anno.

	var arrOggDinamici = new Array("Studenti1", "Studenti2", "Studenti3","Personale1","Personale2","Personale3","Rifiuti1","Rifiuti2","Rifiuti3","Materiali1","Materiali2","Materiali3","Mobilita1","Mobilita2","Mobilita3");


	// Funzione di inizializzazione
	function init()
	{
		// Inizializza Telecamera a 2 secondi dalla creazione della pagina
		setTimeout(function ()
				{ document.getElementById("Telecamere__camGenerale").setAttribute("set_bind", "true");}, 
				2000);
						 
		// Inizializza Dati a 2.1 secondi dalla crazione della pagina
		setTimeout(function ()
				{ initializeData(YearSelected);}, 
				2100);
	}