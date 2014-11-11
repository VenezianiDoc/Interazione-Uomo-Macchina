<!doctype html>
<html>
<head>

<title>Veneziani DOC: Ca' Foscari Ecosostenibile</title>
<meta http-equiv="Content-Type" content="text/html;charset=utf-8" />

<!--Risorse per Mondo interattivo-->
<script type="text/javascript" src="js/Update.js"> </script>
<script type="text/javascript" src="js/Setup.js"> </script>
<script type="text/javascript" src="js/Utils.js"> </script>
<script type="text/javascript" src="js/SosLibrary.js"></script>
<script type="text/javascript" src="js/jquery-1.5.min.js" > </script>
<link rel="stylesheet" type="text/css" href="js/x3dom.css" />
<link href="styles/tutorial.css" rel="stylesheet" type="text/css" />
<link rel="stylesheet" type="text/css" href="style.css"/> <!-- foglio di stile del menu e select -->


<style>
.infoDiv
{
	float: right;
	font-size: 18px;
	text-align: center;
	padding-left: 40px;
    margin-left: 80%;
    margin-top: 10px;
    position:absolute;
    z-index: 1;
    padding-top: 20px;
    width: 20%;
    height: 600px;
    top: 3px;
    border: 0px;
    color: #000; 
    background-color: white;
}
</style>
</head>

<body>

<!-- Qui si riferisca alle telecamere. Un Id per telecamera -->
 <br clear="all" /> <!-- va a capo degli eventuali float precedenti -->
 <ul id="aree">   
    <li><button id="bGenerale" onclick="goToMenu();">Home</button></li>
    <li><button id="bGovernance" onclick="goTo('Governance');" >Governance</button></li>
    <li><button id="bStudenti" onclick="goTo('Studenti');">Studenti</button></li>
    <li><button id="bPersonale" onclick="goTo('Personale');">Personale</button></li>
    <li><button id="bSupplyChain" onclick="goTo('SupplyChain');">Supply Chain</button></li>
    <li><button id="bEnergia" onclick="goTo('Energia');">Energia</button></li>
    <li><button id="bAcqua" onclick="goTo('Acqua');">Acqua</button></li>
    <li><button id="bRifiuti" onclick="goTo('Rifiuti');">Rifiuti</button></li>   
    <li><button id="bMateriali" onclick="goTo('Materiali');">Materiali</button></li>
    <li><button id="bMobilita" onclick="goTo('Mobilita');">Mobilit&agrave;</button></li>
    <li><button id="bInnovazione" onclick="goTo('Innovazione');">Innovazione</button></li>
 </ul>

<div class="helpmenudiv" id="Intro">
       
<X3D xmlns="http://www.web3d.org/specifications/x3d-namespace" showStat='false' showLog='false' width="1024px" height="600px" style="border: 0; margin-left: 10%";>

		<div id="infoInnovazione" class="infoDiv">  
                <font color="blue"><b>Innovazione:</b></font>
				<p>"Tutte le attività atte a supportare la ricerca per sviluppare e valorizzare l’ecosostenibilità a livello economico, ambientale e sociale. Questo viene fatto sostenendo ricerche che possono portare a una riduzione dell’impatto dell’uomo nell’ecosistema."</p>
                <p>Indice di Innovazione: <b><span id="valoreInnovazione"></span>%</b></p>
                
                <input type="button" value="Chiudi" onclick="$('.infoDiv').hide();" />
		</div>
        
        <div id="infoGovernance" class="infoDiv">  
                <font color="blue"><b>Governance:</b></font>
				<p>"Sono tutte le linee strategiche di Ca’ Foscari  per integrare la promozione della sostenibilità all’interno dell’ateneo. Sono per lo più legate all’area istituzionale dell’ateneo."</p>
                <p>Media Voti: <b><span id="valoreGovernance"></span> / 10</b></p>
                
                <input type="button" value="Chiudi" onclick="$('.infoDiv').hide();" />
		</div>
        
        <div id="infoPersonale" class="infoDiv">  
                <font color="blue"><b>Politiche per il Personale:</b></font>
				<p>"Tutte le azioni dedicate ai tecnici amministrativi e ai docenti. Sono per lo più azioni di interventi formativi del personale per diffondere la cultura dell’ecosostenibilità tra i dipendenti e azioni che mirano a migliorare la condizione di lavoro dei dipendenti."</p>
                <p>Ore di telelavoro / part time (in % sul totale): <b><span id="valorePersonale"></span>%</b></p>
                
                <input type="button" value="Chiudi" onclick="$('.infoDiv').hide();" />
		</div>
        
        <div id="infoStudenti" class="infoDiv">  
                <font color="blue"><b>Politiche per gli Studenti:</b></font>
				<p>"Sono tutte le azioni che mirano a migliorare il benessere degli studenti e migliorare l’efficacia dei servizi erogati agli studenti. Inoltre si impegnano a diffondere la cultura dell’ecosostenibilità tra gli studenti."</p>
                <p>Media Voti: <b><span id="valoreStudenti"></span> / 10</b></p>
                
                <input type="button" value="Chiudi" onclick="$('.infoDiv').hide();" />
		</div>
        
        <div id="infoMateriali" class="infoDiv">  
                <font color="blue"><b>Materiali:</b></font>
				<p>"Tutti i documenti e le procedure che sono state dematerializzate o digitalizzate. In oltre viene anche valutato la velicizzazione e la facilità di uso delle nuove procedure digitalizzate."</p>
                <p>Documenti Digitali (in % sul totale): <b><span id="valoreMateriali"></span>%</b></p>
                
                <input type="button" value="Chiudi" onclick="$('.infoDiv').hide();" />
		</div>
        
        <div id="infoEnergia" class="infoDiv">  
                <font color="blue"><b>Energia:</b></font>
				<p>"Tutti i progetti di ecosostenibilità della gestione dell’energia di Ca’ Foscari. In particolare il progetto Carbon Manager che mira alla riduzione di consumo dell’energia ricavata dal carbone."</p>
                <p>Consumi Elettrici: <b><span id="valoreEnergia"></span> KW/h</b></p>
                
                <input type="button" value="Chiudi" onclick="$('.infoDiv').hide();" />
        </div>
        
        <div id="infoAcqua" class="infoDiv">  
                <font color="blue"><b>Acqua:</b></font>
				<p>"Tutte le azioni di gestione del consumo dell’acqua all’interno dell’ateneo. Prevede anche un piano di sensibilizazzione delle tematiche legate al consumo dell’acqua nel personale e negli studenti."</p>
                <p>Media consumo d'acqua mensile: <b><span id="valoreAcqua"></span> m3/m2</b></p>
                
                <input type="button" value="Chiudi" onclick="$('.infoDiv').hide();" />
		</div>
                
        <div id="infoRifiuti" class="infoDiv">  
                <font color="blue"><b>Rifiuti:</b></font>
				<p>"Sono tutte le attività per la riduzione dei rifiuti e razionalizzazione della raccolta differenziata. In oltre c’è un progetto di sensibilizzazione degli studenti e del personale."</p>
                <p>Rifiuti riciclati/differenziati (in % sul totale): <b><span id="valoreRifiuti"></span>%</b></p>
                
                <input type="button" value="Chiudi" onclick="$('.infoDiv').hide();" />
		</div>
		
        <div id="infoSupplyChain" class="infoDiv">  
                <font color="blue"><b>Supply Chain:</b></font>
				<p>"Sono tutti gli acquisti fatti da Ca’ Foscari e le corrsipondenti azioni logistiche. Infatti Ca’Foscari si impegna a avere dei criteri di selezione sociale e ambiantale oltre a quelli puramente economici per la scelta di forniture e servizi."</p>
                <p>Beni e servizi sostenibili (in % sul totale): <b><span id="valoreSupplyChain"></span>%</b></p>
                
                <input type="button" value="Chiudi" onclick="$('.infoDiv').hide();" />
		</div>
        
        <div id="infoMobilita" class="infoDiv">  
                <font color="blue"><b>Mobilità:</b></font>
				<p>"Tutte le attività che permettano un minor spostamento del personale e una riduzione di consumo dei carburanti fossili. Questo per consentire una maggior mobilità aziendale all’interno dell’ateneo."</p>
                <p>Km percorsi su trasporto pubblico in % sul totale: <b><span id="valoreMobilita"></span>%</b></p>
                
                <input type="button" value="Chiudi" onclick="$('.infoDiv').hide();" />
		</div>

<div id="infoIntro" class="infoDiv">
<font color="blue"><b>Eco Foscari:</b></font> <p>"Benvenuto nel mondo 3D di Ca' Foscari sostenibile."</p> <input type="button" value="Chiudi" onclick="$('.infoDiv').hide();" /> </div>

    <scene>
    <navigationInfo headlight='false' type='"NONE"'></navigationInfo>


	<Transform translation='-25 -60 -100' >
		<Inline DEF="Telecamere" nameSpaceName="Telecamere" url="Modelli/telecamere.xml" />
	</Transform>

	<Transform translation='0 0 0' >
		<Inline DEF="Tot" nameSpaceName="Tot" url="Modelli/SOLE.xml" />
	</Transform>

    <Transform translation='5943.15 -159.715 -3726.37' rotation='-1 0 0 1.571' scale='1.422 1.253 1.693'>
	<Inline DEF="chiosco" nameSpaceName="chiosco" url="Modelli/chiosco.xml" />
	</Transform>

	<Transform translation='5374.02 181.546 -3942.72' rotation='-1 0 0 1.571' scale='3.144 .672 3.145' id="Governance">
	</Transform>

	<Transform translation='-30 -150 -50' >
	<Inline DEF="sfondo" nameSpaceName="sfondo" url="Modelli/fondale.xml" />
	</Transform>

    <Transform translation='4100.96 -1742.83 -2579.36' rotation='-1 0 0 1.571' scale='2.258 2.258 2.258' >
        <Transform translation='271.113 -181.832 715.112'>
        <Inline DEF="Energia" nameSpaceName="Energia" url="Modelli/palla_lampione.xml" />
        </Transform>
	</Transform>

	<Transform translation='4733.16 -148.878 -2190.7' rotation='-1 0 0 1.571' scale='2.258 2.258 2.258' >
	<Inline DEF="Energia" nameSpaceName="Energia0" url="Modelli/bastone_lampione.xml" />
	</Transform>
	
	<Transform translation='5320.65 -107.289 -3009.69' rotation='-1 0 0 1.571' id="Acqua">
	</Transform>

	<Transform translation='6294.88 -160.648 -2570.67' rotation='-1 0 0 1.571' scale='.672 .672 .672'>

        <Transform translation='0 0 0' rotation='0 0 1 1.571' scale='4.87 4.87 4.87' id="Rifiuti1" />
        </Transform>

        <Transform translation='150 -100 0' scale='4.87 4.87 4.87' id="Rifiuti2" />
        </Transform>

        <Transform translation='translation='0 0 0' scale='4.87 4.87 4.87'' id="Rifiuti3" />
        </Transform>

    </Transform>

	<Transform translation='4726.13 -51.9583 -4032.89' rotation='1 0 0 1.571' scale='4.919 4.919 4.919'>

        <Transform translation='-840 -668 -300' scale='.18 .18 .18'>
            <Inline DEF="Innovazione" nameSpaceName="Innovazione" url="Modelli/orologio.xml" />
        </Transform>


        <Transform translation='450 190 25' rotation='-1 0 0 3.1416' scale='.07 .07 .07'>

            <Transform translation='0 0 0' id="Materiali1" >
            </Transform>

            <Transform translation='0 0 0' id="Materiali2" >
            </Transform>

            <Transform translation='0 0 0' id="Materiali3" >
            </Transform>

        </Transform>


        <Transform translation='-80 99.114 30' rotation='-1 0 0 3.1416' scale='0.5 0.5 0.5' id="Mobilita1" >
        </Transform>

        <Transform translation='-240 99.114 30' rotation='1 0 0 -1.5944' scale='0.5 0.5 0.5'>

            <Transform translation='120 0 400' scale='0.5 0.5 0.5' id="Mobilita2" >
            </Transform>

            <Transform  id="Mobilita3" >
            </Transform>

        </Transform>

    </Transform>


    <Transform translation='6100 -150 -3100' rotation='-1 0 0 1.5708' scale='2 2 2' >

        <Transform translation='0 0 0' id="Studenti1" >
        </Transform>

        <Transform translation='100 0 0' id="Studenti2" >
        </Transform>

        <Transform translation='200 0 0' id="Studenti3" >
        </Transform>
        
    </Transform>


    <Transform translation='5843.15 -159.715 -4206.37'  rotation='-1 -0 0 1.571' scale='.672 .672 .672'>
        <Transform translation='0 0 0' id="Personale1">
        </Transform>

        <Transform translation='0 0 0' id="Personale2" >
        </Transform>

        <Transform translation='0 0 0'id="Personale3" >
        </Transform>
    </Transform>

    <Transform translation='4700 -150 -4050' scale='4 4 4'>

            <Transform translation='0 0 0'/>
                    <Inline DEF="SupplyChain1" nameSpaceName="SupplyChain1" url="Modelli/scatolone1.xml" />
            </Transform>

            <Transform translation='0 17.5 0'/>
                    <Inline DEF="SupplyChain2" nameSpaceName="SupplyChain2" url="Modelli/scatolone2.xml" />
            </Transform>

            <Transform translation='0 28.5 0'/>
                    <Inline DEF="SupplyChain3" nameSpaceName="SupplyChain3" url="Modelli/scatolone3.xml" />
            </Transform>
    </Transform>


    </scene>

    <br />

    <div style="margin-left:26%">
    <label>
    <select onchange="changeYear(this.options[this.selectedIndex].value);">
	  <option value="2010" selected>2010</option>
	  <option value="2011">2011</option>
	  <option value="2012">2012</option>
	</select>
    </label>
    </div>

</x3d>

	 <br clear="all" />

	

<br clear="all" />


<script type='text/javascript' src='js/x3dom.js'></script>

<script type="text/javascript">
   
	 init();
	 
</script>


</body>

</html>