	// UTILS: Funzioni ausiliarie per lo sviluppo
	
	// Avvia la riproduzione dell&acute;effetto sonoro HTML5 
	// Parametri: idsound - l&acute;identificativo del tag &lt;audio&gt; 
	// da riprodurre
	function playSound(idsound)
	{
		document.getElementById(idsound).play()		
	}
	
	// Ferma la riproduzione dell&acute;effetto sonoro HTML5 
	// Parametri: idsound - l&acute;identificativo del tag &lt;audio&gt; 
	// da fermare
	function stopSound(idsound)
	{
		var sound= 	document.getElementById(idsound);

		// Mette in pausa
		sound.pause(); 
		// Porta all'instante 0 la riproduzione audio.
		sound.currentTime=0;
		
	}
	
	
	// RENDERING
	
	// Rimuove una risorsa senza rimuoverne il transform. 
	// Viene utilizzata per rimuovere i modelli 3D a partire 
	// dal nome del Transform che contiene l&acute;Inline.
	// Parametri:
	// idtransinline - Identificativo del nodo Transform 
	// 			contenente l&acute;Inline da rimuovere, se impostato 
	// 			ad "all" rimuove tutti gli elementi nell&acute;array
	//			dinamico "arrDinamici" specificato.
	// arrDinamici - Array degli oggetti dinamici da rimuovere.
	function unloadResource(idtransinline, arrDinamici)
	{
		if(idtransinline=="all")
		{	
			
			for (var id in arrDinamici) 
			{  
				document.getElementById(arrDinamici[id]).innerHTML="";
				
			}  
	
		}
		else{	document.getElementById(idtransinline).innerHTML=""};
		
	}
	
	// Carica una risorsa a partire dal nodo Transform che 
	// dovrà contenere l&acute;Inline del modello.
	// Parametri:
	// idtransform - Identificatore del nodo Transform che dovrà
	// 			contenere l&acute;Inline
	// mUrl - Url dove recuperare la risorsa. dUrl cerca la risorsa 
	// 		nel percorso Modelli/&lt;stringa inserita in dUrl&gt;.
	// 		Ad esempio una chiamata 
	//		loadResource(Energia, "Energia/Sole.x3d") farà riferimento
	//		alla cartella Modelli/Energia/Sole.x3d.
	function loadResource(idtransform, mUrl)
	{
		var string = "<Inline DEF=\""+idtransform+"\"nameSpaceName=\"ns"+idtransform+"\" url=\"Modelli/"+mUrl+"\" >";
		document.getElementById(idtransform).innerHTML=string;
	}
	
	// Istanzia una risorsa generando il nodo Transform con gli
	// attributi di translation, scale, rotation e l&acute;inline.
	// Non viene utilizzata in questa esercitazione, ma interessante 
	// ai fini didattici.
	// Parametri:
	// idtransform - Identificatore del nodo Transform che dovrà
	// 		contenere l&acute;Inline
	// translation - Tripla XYZ di coordinate dove allocare la risorsa
	// scale - Tripla XYZ per il ridimensionamento
	// rotation - XYZW Assi di rotazione XYZ e Angolo W
	// mUrl - Url dove recuperare la risorsa. dUrl cerca la risorsa
	//		nel percorso <stringa inserita in dUrl>. 
	//		Ad esempio una chiamata loadResource(Energia, "Energia/Sole.x3d") 
	//		farà riferimento alla cartella Energia/Sole.x3d 
	//		e non più a Modelli/Energia/Sole.x3d.
	function instanceResource(idgroup, idtransform, translation, scale, rotation, mUrl)
	{
			var grouproot = document.getElementById(idgroup); 
		
			if(grouproot != null)
			{
				// Creiamo la struttura del nodo Transform con gli
				// attributi translation, scale e rotation secondo i
				// parametri della funzione
				var trans = document.createElement("Transform"); 
					trans.setAttribute("translation", translation ); 
					trans.setAttribute("scale", scale ); 
					trans.setAttribute("rotation", rotation ); 
		
				// Creiamo la struttura del nodo Inline
				var inline = document.createElement("Inline"); 
					inline.setAttribute("DEF", idtransform);
					inline.setAttribute("nameSpaceName", "ns"+idtransform);
					inline.setAttribute("url", mUrl);
				
				// Appendiamo il nodo Inline al nodo padre Transform
				trans.appendChild(inline);
				// Appendiamo a sua volta il nodo Transform al gruppo
				grouproot.appendChild(trans); 
		
			}
	}
	
	// Cambia la texture all&acute;oggetto avente ImageTexture indicato da
	// idimgtexture.
	// Parametri:
	// idimgtexture - Identificativo del nodo <ImageTexture>
	// tUrl - Indirizzo della risorsa
	function changeTexture(idimgtexture, tUrl)
	{
	document.getElementById(idimgtexture).setAttribute("url", tUrl);
	}
	
	function changeLightColor(idlight, color)
	{
			document.getElementById(idlight).setAttribute("color", color);
	}
	
	function changeMaterialColor(idmaterial, color)
	{
			document.getElementById(idmaterial).setAttribute("diffuseColor", color);
	}
	
	function changeTransparency(idmaterial, value)
	{
			document.getElementById(idmaterial).setAttribute("transparency", value);
	}
	
	function changeCycleInterval(idtimer, newcycleInterval)
	{
			document.getElementById(idtimer).setAttribute("enabled", "false");
			document.getElementById(idtimer).setAttribute("cycleInterval", newcycleInterval);
					document.getElementById(idtimer).setAttribute("enabled", "true");
	}
	
	function changeAttribute(id, attrib, newvalue)
	{
		document.getElementById(id).setAttribute(attrib, newvalue);
	}
	
	
	// Dopo aver verificato la disponibilità nell&acute;array
	// YearsAvailable, imposta i dati per il nuovo anno selezionato
	// rimuovendo tutti i modelli elencati nell&acute;array arrOggDinamici e
	// reinizializzando i dati della SosLibrary secondo il nuovo anno.
	// Parametri: 
	// year - Anno da impostare
	function changeYear(year)
	{
		for(var i=0; i<YearsAvailable.length; i++)
		if(YearsAvailable[i] == year) 
		{	
			YearSelected=year;
			unloadResource("all", arrOggDinamici);
			initializeData(YearSelected, showDiv);
	
		}
		
	}
	
	
	// Funzione correlata alla visita di ciascuna area, funge da
	// attivatore a tutte le funzioni che scaturiscono
	// dall&acute;interazione con una metafora (sia essa per mezzo di click
	// sul tasto dell&acute;interfaccia o click sull&acute;oggetto
	// tridimensionale).
	// Cambia la telecamera in cam&lt;NomeArea&gt;, ne mostra il relativo
	// riquadro informativo info&lt;NomeArea&gt; e si annota quale area 
	// stia visitando l&acute;utente.
	// Parametri:
	// area - Area da visitare
	function goTo(area)
	{
		document.getElementById("Telecamere__cam"+area).setAttribute("set_bind", "true");
		showDiv(area);
		LastAreaSelected = area;
	}
	
	// Funzione correlata alla vista panoramica del sistema
	// informativo. Similmente alla funzione goTo(area) cambia la
	// telecamera in quella Generale e tutte le schede informative
	// vengono nascoste.
	function goToMenu()
	{
		$(".infoDiv").hide();   
		document.getElementById("Telecamere__camGenerale").setAttribute("set_bind", "true");
		LastAreaSelected = "";
	}
	
	function rounding(num)
	{
		if (num%1==0) return num;
			else if (num%0.01 >0.005)
					num=num+0.01-(num%0.01);
					else num=num-(num%0.01);
					
		return num;
	}
	
	// Mostra il riquadro informativo relativo all&acute;area scelta: 
	// il corrispettivo div viene fatto comparire a schermo.
	// Il valore della variabile associata alla metafora viene 
	// prelevata da ValoreAnnuo&lt;NomeArea&gt; e mostrata a schermo 
	// tramite la modifica (con innerHTML) del contenuto del 
	// corrispettivo <span> avente id="valore&lt;NomeArea&gt;".
	// Ricordiamo che i nomi dei div devono avere prefisso "info" 
	// (senza virgolette, ad esempio infoEnergia, infoGovernance, 
	// infoPersonale)
	// Gestisce inoltre il caso in cui venga cambiato l&acute;anno mentre 
	// una scheda è visualizzata a video aggiornando coerentemente gli
	// indicatori a quelli dell&acute;anno selezionato. Per effettuare un
	// aggiornamento della variabile dell&acute;ultima scheda aperta.
	// Parametri: 
	// 		area - Area da visualizzare (opzionale, se mancante
	//			aggiorna il contenuto dell&acute;ultima scheda visualizzata 
	// 			in LastAreaSelected)
	// Parametri globali:
	// 		LastAreaSelected - Contiene l&acute;ultima area visitata, se 
	// 			uguale a "" allora l&acute;utente è nella panoramica 
	//			generale
	//		ValoreAnnuo&lt;NomeArea&gt; - Contiene il valore reperito
	// 			dal database.
	//		valore&lt;NomeArea&gt; - nodo <span> che funge da 
	//			segnaposto nella scheda del contenuto informativo 
	//			dove mostrare il dato
	function showDiv(area)
	{
		// jQuery: Ricerca e nasconde tutti i div nel documento 
		// aventi class="infoDiv". 
		// In altre parole, chiudiamo tutte le schede informative 
		// precedentemente aperte.
		$(".infoDiv").hide();   
				
		// Distinguiamo due casi, quello in cui si faccia un 
		// aggiornamento del contenuto come conseguenza del fatto 
		// che è stato effettuato un cambio dell&acute;anno con la scheda 
		// aperta e il caso generico in cui l&acute;utente seleziona una 
		// metafora.
		if(area == null && LastAreaSelected != "") 
		{	
			//  CASO AGGIORNAMENTO ULTIMA SCHEDA VISITATA:
					
			// LastAreaSelected è una stringa contenente l&acute;ultima 
			// area visitata (es. Governance, Materiali).
			// Recupero il nodo &lt;span&gt;&lt;/span&gt; segnaposto, 
			// ha per nome valore&lt;LastAreaSelected&gt;.
			// Al suo interno scrivo con .innerHTML il valore di 
			// ValoreAnnuo&lt;LastAreaSelected&gt;.
			document.getElementById("valore"+LastAreaSelected).innerHTML=eval("ValoreAnnuo"+LastAreaSelected);
					
			// Rendiamo visibile il relativo div info&lt;LastAreaSelected&gt; 
			// cambiando l&acute;attributo CSS display
			var infowindow = document.getElementById("info"+LastAreaSelected);
			infowindow.style.display = "block";
		}                   		
		else if (area != null) 
		{
			// CASO GENERICO, SELEZIONE DI UNA METAFORA:
					
			// Il parametro area contiene il nome dell&acute;area che 
			// l&acute;utente intende visionare (es. Governance, 
			// Materiali).
			// Recupero il nodo &lt;span&gt;&lt;/span&gt; segnaposto,
			// ha per nome valore&lt;area&gt;.
			// Al suo interno scrivo con .innerHTML il valore di 	
			// ValoreAnnuo&lt;area&gt;.
			document.getElementById("valore"+area).innerHTML=eval("ValoreAnnuo"+area); 
					
			// Rendiamo visibile il relativo div info&lt;area&gt; 
			// cambiando l&acute;attributo CSS display
			var infowindow = document.getElementById("info"+area);
			infowindow.style.display = "block";
		}
			   
	}
	
	// Cambia telecamera in Telecamere__<idcamera>, altrimenti in 
	// &lt;idcamera&gt;
	// Parametri: 
	// - idcamera, id del nodo Viewpoint richiesto
	function changeCamera(idcamera)
	{
	if(document.getElementById("Telecamere__"+idcamera) != null)
		document.getElementById("Telecamere__"+idcamera).setAttribute("set_bind","true");
		else 	document.getElementById(idcamera).setAttribute("set_bind","true");
	}
	
	// ANIMAZIONE
	
	// Avvia animazione collegata al nodo &lt;Timesensor&gt; 
	// con nome idtimer.
	// Se specificato, il parametro fromTime permette di avviare 
	// l&acute;animazione a partire dal secondo indicato.
	// Parametri:
	// - idtimer, id del nodo &lt;Timesensor&gt; a cui è collegata 
	// 		l&acute;animazione
	// - fromTime (opzionale), specifica il secondo di partenza della
	// 		animazione. Se negativo fromTime ritarda la riproduzione 		
	// 		dell&acute;animazione.
	// 		Ricordiamo che l&acute;attributo cycleInterval di 
	//		&lt;Timesensor&gt; regola la durata dell&acute;animazione.
	function startAnimation(idtimer, fromTime )
		{
			var tim = document.getElementById(idtimer);
		
			var now = new Date; 
			var unixtime_ms = now.getTime(); 
			var unixtime = parseInt(unixtime_ms / 1000);
					
			tim.setAttribute("enabled", "true");
		
			if(fromTime != null)
				tim.setAttribute("startTime", unixtime - fromTime);
				else 	tim.setAttribute("startTime", unixtime);
				
		}
		
		
	// Termina la riproduzione dell&acute;animazione correlata al nodo 
	// &lt;Timesensor&gt; specificato in idtimer
	// Parametri:
	// idtimer - Nodo &lt;Timesensor&gt; a cui è collegata 
	// 		l&acute;animazione.
		function stopAnimation(idtimer)
		{
			var tim = document.getElementById(idtimer);
			
			var now = new Date; 
					var unixtime_ms = now.getTime(); 
					var unixtime = parseInt(unixtime_ms / 1000);
					
			tim.setAttribute("enabled", "false");
			tim.setAttribute("startTime", unixtime);
		}
