	// UPDATE: Integrazione con SosLibrary
		
	// Variabili di Output
	
	var ValoreAnnuoGovernance=0;		// Variabile di output Governance
		var ValoreAnnuoGovernancePRS=0;
		var ValoreAnnuoGovernancePDS=0;
		var ValoreAnnuoGovernanceFCS=0;
	
	var ValoreAnnuoStudenti=0;		// Variabile di output Politiche Studenti
		
	var ValoreAnnuoPersonale=0;		// Variabile di output Personale
	
	var ValoreAnnuoSupplyChain=0;		// Variabile di output Supply Chain
	
	var ValoreAnnuoInnovazione=0;		// Variabile di output Innovazione
		
	var ValoreAnnuoMateriali=0;		// Variabile di output Materiali
					
	var ValoreAnnuoRifiuti=0;		// Variabile di output Rifiuti
		
	var ValoreAnnuoAcqua=0;			// Variabile di output Acqua
		
	var ValoreAnnuoMobilita=0;		// Variabile di output Mobilita
		
	var ValoreAnnuoEnergia=0;		// Variabile di output Energia
	
	// Array di Flags per ciascuna area: 
	// 0 - Il dato dell&acute;area corrisposta non &eacute; stato ancora reperito , 
	// 1 - Il dato &eacute; stato reperito ed inserito nella corrispettiva variabile
	var arrDataReady = new Array(0,0,0,0,0,0,0,0,0,0);
	
	// Gestore cronometro per il controllo dei Flag per ciascuna area
	var IntervalHandler;
	
	
	// Inizializza i dati secondo l&acute;anno inserito in YearSelected.
	// Una volta che tutti i dati sono stati reperiti (ovvero l&acute;array 
	// arrDataReady &eacute; impostato tutto ad 1)esegue la funzione specificata nel
	// parametro onDataRetrieved.
	// Parametri:
	// 		YearSelected - Anno di cui reperire i dati relative le dieci aree
	// 				di intervento
	// 		onDataRetrieved - Funzione da eseguire una volta recuperate le 
	//				variabili.
	function initializeData(YearSelected, onDataRetrieved) 
	{ 	
		var arrDataReady = new Array(0,0,0,0,0,0,0,0,0,0);
		IntervalHandler = setInterval(function () {checkDataStatus(onDataRetrieved)}, 1000);
						
		getRowsInTimeBetween("VotoPRS", 
							YearSelected +"-01-01", YearSelected + "-12-31",
							Gruppo, "DESC", 
							getGovernancePRS, onErrorGovernance); 
							// valore PRS e in cascata PDS e FCS
		
		getRowsInTimeBetween("VotoStudenti",
							YearSelected +"-01-01", YearSelected + "-12-31",
							Gruppo, "DESC", 
							getStudenti, onErrorStudenti);
		
		getRowsInTimeBetween("Orelavoro", 
							YearSelected +"-01-01", YearSelected + "-12-31",
							Gruppo, "DESC", 
							getPersonale, onErrorPersonale);
		
		getRowsInTimeBetween("DocumentiDigitali",
							YearSelected +"-01-01", YearSelected + "-12-31", 
							Gruppo, "DESC", 
							getMateriali, onErrorMateriali);
		
		getRowsInTimeBetween("RifiutiRiciclati",
							YearSelected +"-01-01", YearSelected + "-12-31",
							Gruppo, "DESC", 
							getRifiuti, onErrorRifiuti);
		
		getRowsInTimeBetween("FondiInnovazione",
							YearSelected +"-01-01", YearSelected + "-12-31",
							Gruppo, "DESC", 
							getInnovazione, onErrorInnovazione);
		
		/* 
		Le aree con pi&uacute; variabili nel corso di un anno necessitano di una
		media annuale.
		In questo caso usiamo un passaggio intermedio per contare le 
		variabili ed effettuare la somma            
		*/
		
		getRowsInTimeBetween("TrasportoSostenibile",
							YearSelected +"-01-01", YearSelected + "-12-31", 
							Gruppo, "DESC", 
							countMobilitaVars, onErrorMobilita);
		
		getRowsInTimeBetween("AcquaConsumata",
							YearSelected +"-01-01", YearSelected + "-12-31", 
							Gruppo, "DESC", 
							countAcquaVars, onErrorAcqua);
		
		getRowsInTimeBetween("EnergiaConsumata",
							YearSelected +"-01-01", YearSelected + "-12-31", 
							Gruppo, "DESC", 
							countEnergiaVars, onErrorEnergia);
					
	   getRowsInTimeBetween("RifornimentiEco",
	   						YearSelected +"-01-01", YearSelected + "-12-31",
							Gruppo, "DESC", 
							countSupplyChainVars, onErrorSupplyChain);
	
	}
	
	function onErrorGovernance() 
		{ alert("Errore reperimento dati Governance"); }
	function onErrorStudenti() 
		{ alert("Errore reperimento dati Studenti"); }
	function onErrorPersonale() 
		{ alert("Errore reperimento dati Personale"); }
	function onErrorMateriali() 
		{ alert("Errore reperimento dati Materiali"); }
	function onErrorRifiuti() 
		{ alert("Errore reperimento dati Rifiuti"); }
	function onErrorInnovazione() 
		{ alert("Errore reperimento dati Innovazione"); }
	function onErrorMobilita() 
		{ alert("Errore reperimento dati Mobilit&aacute;"); }
	function onErrorAcqua() 
		{ alert("Errore reperimento dati Acqua"); }
	function onErrorEnergia() 
		{ alert("Errore reperimento dati Energia"); }
	function onErrorSupplyChain() 
		{ alert("Errore reperimento dati Supply Chain"); }
	
	
	// ### Funzioni di istanziazione
				
	// Prende il valore PRS
	function getGovernancePRS(xml)
	{
		// Voto da 1 a 10: Media dei voti ricavati dai questionari in materia
		// di Ricerca di Sostenibilit&aacute;. 1 valore per anno
		ValoreAnnuoGovernancePRS = $(xml).find("Valore").text();

		// Prende il valore PDS
	   getRowsInTimeBetween("VotoPDS", 
	   					YearSelected +"-01-01", YearSelected + "-12-31",
						Gruppo, "DESC", 
						getGovernancePDS, onErrorGovernance);
	}
	
	// Prende il valore PDS
	function getGovernancePDS(xml)
	{
		ValoreAnnuoGovernancePDS = $(xml).find("Valore").text();
		
		// Prende il valore FCS, crea la media e esegue lo switch
		getRowsInTimeBetween("VotoFCS", 
						YearSelected +"-01-01", YearSelected + "-12-31", 
						Gruppo, "DESC", 
						getGovernanceFCS, onErrorGovernance);    
	}
	
	// Prende valore FCS e esegue la media dei 3 valori 
	function getGovernanceFCS(xml)
	{
		ValoreAnnuoGovernanceFCS = $(xml).find("Valore").text();
		getGovernance();
	}
	
	//setter
	function getGovernance()
	{
		// Trasformazione da stringa ad intero dei parziali PRS, PDS, FCS 
		// per effettuare la media
		var tmpPRS=parseInt(ValoreAnnuoGovernancePRS,10);
		var tmpPDS=parseInt(ValoreAnnuoGovernancePDS,10);
		var tmpFCS=parseInt(ValoreAnnuoGovernanceFCS,10);
	
		// Calcolo del valore medio basato sui 3 valori PDS PRS FCS
		ValoreAnnuoGovernance=(tmpPRS+tmpPDS+tmpFCS)/3; 
	
		// Casistica di instanziazione.	

		/* DONE Formato del colore, RGB "0 1 0" */
		
		if(ValoreAnnuoGovernance <= thrGovernance[0])
		{	
			// Scarso - Rettore Rosso
				loadResource("Governance", "rettore1.xml");
		}
		else if (ValoreAnnuoGovernance <= thrGovernance[1])
		{	
			// Discreto - Rettore Giallo
				loadResource("Governance", "rettore2.xml");
		}
		else if (ValoreAnnuoGovernance <= thrGovernance[2])
		{	
			// Ottimo - Rettore Verde
				loadResource("Governance", "rettore3.xml");
		}
		
		// Il dato relativo alla Governance &eacute; pronto.
		arrDataReady[0] = 1;
	}
	
	//setter
	function getStudenti(xml)
	{
		ValoreAnnuoStudenti = $(xml).find("Valore").text();
	
		// Arrotonda il valore
		ValoreAnnuoStudenti=rounding(ValoreAnnuoStudenti);	
		
		/*DONE Nome file da controlloare*/
		if(ValoreAnnuoStudenti <= thrStudenti[0])
		{	
			// Scarso - Un elemento
			loadResource("Studenti1", "tavolo1.xml");
		}
		/*DONE Nome file da controlloare*/
		else if (ValoreAnnuoStudenti <= thrStudenti[1])
		{	
			// Discreto - 2 elementi
			loadResource("Studenti1", "tavolo1.xml");
			loadResource("Studenti2", "tavolo2.xml");

		}		
		/*DONE Nome file da controlloare*/
		else if (ValoreAnnuoStudenti <= thrStudenti[2])
		{	
			// Ottimo - 3 elementi
			loadResource("Studenti1", "tavolo1.xml");
			loadResource("Studenti2", "tavolo2.xml");
			loadResource("Studenti3", "tavolo3.xml");
		}
		
		arrDataReady[1] = 1;
	
	}
	
	//setter
	function getPersonale(xml)
	{
		ValoreAnnuoPersonale = $(xml).find("Valore").text();
		
		// Arrotonda il valore
		ValoreAnnuoPersonale=rounding(ValoreAnnuoPersonale);	
		
		/*DONE Nome file da controlloare*/

		if(ValoreAnnuoPersonale <= thrPersonale[0])
		{	
			// Scarso - Sedia scrausa
			loadResource("Personale1", "sgabello.xml");
		}
		/*DONE Nome file da controlloare*/
		else if (ValoreAnnuoPersonale <= thrPersonale[1])
		{	
			// Discreto - Sedia
			loadResource("Personale2", "sedia.xml");
		}
		/*DONE Nome file da controlloare*/
		else if (ValoreAnnuoPersonale <= thrPersonale[2])
		{	
			// Ottimo - Poltrona
			loadResource("Personale3", "poltrona.xml");
		}
	
		arrDataReady[2] = 1;
	}
		
	//setter	
	function getSupplyChain(xml, VarCount)
	{
		// Percentuale di rifornimenti di tipo equosolidale. 
		// Media in un anno. Val 0-100%. Mensile
		var SupplyChainSum = $(xml).find("Somma").text();

		/* Formato del colore, RGB "0 1 0" */
		/*DONE Definire colore*/
		var SupplyChainColor = new Array(".298 .6 0", ".6 .42 .239");

		ValoreAnnuoSupplyChain = SupplyChainSum/VarCount;
	
		// Arrotonda valore
		ValoreAnnuoSupplyChain = rounding(ValoreAnnuoSupplyChain);
	
		if(ValoreAnnuoSupplyChain <= thrSupplyChain[0])
			{ 
				// Scarso - 3 marroni
				changeMaterialColor("SupplyChain1__scat11", SupplyChainColor[1]);
				changeMaterialColor("SupplyChain1__scat12", SupplyChainColor[1]);
				changeMaterialColor("SupplyChain2__scat21", SupplyChainColor[1]);
				changeMaterialColor("SupplyChain2__scat22", SupplyChainColor[1]);
				changeMaterialColor("SupplyChain3__scat31", SupplyChainColor[1]);
                changeMaterialColor("SupplyChain3__scat32", SupplyChainColor[1]);

			}
			else if (ValoreAnnuoSupplyChain <= thrSupplyChain[1])
			{  
				// Discreto - 2 marroni
				changeMaterialColor("SupplyChain1__scat11", SupplyChainColor[1]);
				changeMaterialColor("SupplyChain1__scat12", SupplyChainColor[1]);
				changeMaterialColor("SupplyChain2__scat21", SupplyChainColor[1]);
				changeMaterialColor("SupplyChain2__scat22", SupplyChainColor[1]);
				changeMaterialColor("SupplyChain3__scat31", SupplyChainColor[0]);
                changeMaterialColor("SupplyChain3__scat32", SupplyChainColor[0]);
			}
			else if (ValoreAnnuoSupplyChain <= thrSupplyChain[2])
			{ 
				// Ottimo - 0 marroni
				changeMaterialColor("SupplyChain1__scat11", SupplyChainColor[0]);
				changeMaterialColor("SupplyChain1__scat12", SupplyChainColor[0]);
				changeMaterialColor("SupplyChain2__scat21", SupplyChainColor[0]);
				changeMaterialColor("SupplyChain2__scat22", SupplyChainColor[0]);
				changeMaterialColor("SupplyChain3__scat31", SupplyChainColor[0]);
                changeMaterialColor("SupplyChain3__scat32", SupplyChainColor[0]);
			 }			
	
		arrDataReady[3] = 1;		
	}
	
		//setter			
	function countSupplyChainVars(xml)
	{
		var SupplyChainCount = 0;
	
		$(xml).find("Riga").each(function(){SupplyChainCount++;})
		
		// Effettuo la somma, chiamo getSupplyChain e invio il numero di 
		// registrazioni come parametro
		getSumInTimeBetween("RifornimentiEco", 
							YearSelected +"-01-01", YearSelected + "-12-31", 
							Gruppo, 
							getSupplyChain, onErrorSupplyChain,
							SupplyChainCount);
	
	}
	
		//setter
	function getInnovazione(xml)
	{
	
	 	// Fondi finanziati per progetti aventi obiettivi ecosostenibili. 
		// Val 0-100%. Annuale
		ValoreAnnuoInnovazione = $(xml).find("Valore").text();
	
		// Arrotonda il valore
		ValoreAnnuoInnovazione=rounding(ValoreAnnuoInnovazione);
		
		/*DONE Nome file da controlloare*/
		if(ValoreAnnuoInnovazione <= thrInnovazione[0])
			{  
				// Scarso - Meridiana
				changeTexture("Innovazione__texture", "meridiana_campagna.jpg");
			}
			/*DONE Nome file da controlloare*/
			else if (ValoreAnnuoInnovazione <= thrInnovazione[1])
			{   
				// Discreto - Orologio analogico
				changeTexture("Innovazione__texture", "rologio_analogico.jpg");
			}
			/*DONE Nome file da controlloare*/
			else if (ValoreAnnuoInnovazione <= thrInnovazione[2])
			{	
				// Ottimo - Orologio Digitale			
				changeTexture("Innovazione__texture", "orologio_digitale.jpg");
			}
							
		arrDataReady[4] = 1;
	}
	
		//setter
	function getRifiuti(xml)
	{
	
	 // Fondi finanziati per progetti aventi obiettivi ecosostenibili. 
	 // Val 0-100%. Annuale
		ValoreAnnuoRifiuti = $(xml).find("Valore").text();
		
		// Arrotonda il valore
		ValoreAnnuoRifiuti=rounding(ValoreAnnuoRifiuti);

		/*DONE Settare colori*/
		var RifiutiColor = new Array("0 0 0", "0 0 1", "1 1 1");
	
		/*DONE Nome file da controlloare*/
		if(ValoreAnnuoRifiuti <= thrRifiuti[0])
			{	
				// Scarso - Un cestino
				loadResource("Rifiuti1", "cestino1.xml");
			}
			/*DONE Nome file da controlloare*/
			else if (ValoreAnnuoRifiuti <= thrRifiuti[1])
			{ 
				// Discreto - Due cestini 				
				loadResource("Rifiuti1", "cestino1.xml");
				loadResource("Rifiuti2", "cestino2.xml");
			}
			/*DONE Nome file da controlloare*/
			else if (ValoreAnnuoRifiuti <= thrRifiuti[2])
			{
				// Ottimo - Tre cestini
				loadResource("Rifiuti1", "cestino1.xml");
				loadResource("Rifiuti2", "cestino2.xml");
				loadResource("Rifiuti3", "cestino3.xml");
			}
		
		arrDataReady[5] = 1;											
	}
	
		//setter
	function getMateriali(xml)
	{
	
	 // Fondi finanziati per progetti aventi obiettivi ecosostenibili. 
	 // Val 0-100%. Annuale
		ValoreAnnuoMateriali = $(xml).find("Valore").text();
	
		// Arrotonda il valore
		ValoreAnnuoMateriali=rounding(ValoreAnnuoMateriali);
		
		/*DONE Nome file da controlloare*/
		if(ValoreAnnuoMateriali <= thrMateriali[0])
			{ 
				loadResource("Materiali1", "alberi1.xml");
			}
			/*DONE Nome file da controlloare*/
			else if (ValoreAnnuoMateriali <= thrMateriali[1])
			{
				loadResource("Materiali2", "alberi2.xml");
			}
			/*DONE Nome file da controlloare*/
			else if (ValoreAnnuoMateriali <= thrMateriali[2])
			{
				loadResource("Materiali1", "alberi1.xml");
				loadResource("Materiali2", "alberi2.xml");
				loadResource("Materiali3", "alberi3.xml");
			}
			
						
		arrDataReady[6] = 1;
					
	}
	
		//setter
	function getAcqua(xml, VarCount)
	{
		//Media in un anno. Val . Mensile
		var AcquaSum = $(xml).find("Somma").text();
		mediaVariabiliAcqua = AcquaSum/VarCount;
	
		// Arrotonda valore
		mediaVariabiliAcqua=mediaVariabiliAcqua/100;
		ValoreAnnuoAcqua=mediaVariabiliAcqua-(mediaVariabiliAcqua%0.001);
	
	//TODO Trovare id e valori compatibili con l'effetto desiderato (id, attrib, newvalue) per la trasformazione del cilindro interno
		if(ValoreAnnuoAcqua <= thrAcqua[0])
			{ 
				loadResource("Acqua", "pozzo3.xml");
			}
			else if (ValoreAnnuoAcqua <= thrAcqua[1])
			{ 	
				loadResource("Acqua", "pozzo2.xml");
			}
			else 
			{ 					
				loadResource("Acqua", "pozzo1.xml");
			}
	
		arrDataReady[7] = 1;
								
	}
	

	function countAcquaVars(xml)
	{
		var AcquaCount = 0;
		$(xml).find("Riga").each(function(){AcquaCount++;})

		// Effettuo la somma, chiamo getAcqua e invio il numero di 
		// registrazioni come parametro
		getSumInTimeBetween("AcquaConsumata",
						YearSelected +"-01-01", YearSelected + "-12-31", 
						Gruppo, 
						getAcqua, onErrorAcqua, 
						AcquaCount);
		
	}
	
		//setter
	function getMobilita(xml, VarCount)
	{
		//Media in un anno. Val . Mensile
		var MobilitaSum = $(xml).find("Somma").text();
		mediaVariabiliMobilita = MobilitaSum/VarCount;
	
		// Arrotonda valore
		ValoreAnnuoMobilita = rounding(mediaVariabiliMobilita);
		
		/*DONE Nome file da controlloare*/
		if(ValoreAnnuoMobilita <= thrMobilita[0])
			{
				loadResource("Mobilita2", "taxi.xml");
			}
			/*DONE Nome file da controlloare*/
		else if(ValoreAnnuoMobilita <= thrMobilita[1])
			{
				loadResource("Mobilita1", "gondola.xml");
				loadResource("Mobilita2", "taxi.xml");
			}
			/*DONE Nome file da controlloare*/
		else if (ValoreAnnuoMobilita <= thrMobilita[2])
			{ 
				loadResource("Mobilita1", "gondola.xml");
				loadResource("Mobilita3", "vaporetto.xml");
			}
					
		arrDataReady[8] = 1;
	
	}
	
	function countMobilitaVars(xml)
	{
		var MobilitaCount = 0;
		$(xml).find("Riga").each(function(){MobilitaCount++;})

		// Effettuo la somma, chiamo getMobilita e invio il numero di 
		// registrazioni come parametro
		getSumInTimeBetween("TrasportoSostenibile",
						YearSelected +"-01-01", YearSelected + "-12-31",
						Gruppo, 
						getMobilita, onErrorMobilita, 
						MobilitaCount);
		
		
	}
	
		//setter
	function getEnergia(xml, VarCount)
	{
		//Media in un anno. Val . Mensile
		var EnergiaSum = $(xml).find("Somma").text();
		mediaVariabiliEnergia = EnergiaSum/VarCount;
		
		// Arrotonda valore
		ValoreAnnuoEnergia = rounding(mediaVariabiliEnergia);
	
		var EnergiaColor = new Array("0 1 0", "1 0.843137 0", "1 0 0");

		if(ValoreAnnuoEnergia <= thrEnergia[0])
			{ 	
				changeMaterialColor("Energia__palla", EnergiaColor[0]);

			}
			else if (ValoreAnnuoEnergia <= thrEnergia[1])
			{ 
				changeMaterialColor("Energia__palla", EnergiaColor[1]);
			}
			else 
			{	
				changeMaterialColor("Energia__palla", EnergiaColor[2]);
			}
				
				
		arrDataReady[9] = 1;
	}
			
	 
	function countEnergiaVars(xml)
	{
		var EnergiaCount = 0;
		$(xml).find("Riga").each(function(){EnergiaCount++;})

		// Effettuo la somma, chiamo getEnergia e invio il numero di 
		// registrazioni come parametro
		getSumInTimeBetween("EnergiaConsumata",
							YearSelected +"-01-01", YearSelected + "-12-31",
							Gruppo, 
							getEnergia, onErrorEnergia, 
							EnergiaCount);
		
	}
	
	
	// Funzione di controllo dei flag delle aree di intervento (arrDataReady)
	// Quando tutti i flag sono a 1 viene 	
	function checkDataStatus(func)
	{
	var ready=1;
	
	for (var i=0; i<9; i++)
	{ if(arrDataReady[i] == 0) ready=0; }
	
	if(ready==1)
	{ 	
		// Viene terminato il controllo dei flag
		clearInterval(IntervalHandler);
		
		// Se specificata, viene eseguita una funzione una volta che tutti 
		// i dati sono pronti
		if(func != null) func();
	}	
	}
