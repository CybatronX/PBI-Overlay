// http://i.snag.gy/DADO3.jpg - Up arrow
// 
// 
	
	$('.dashboard .dashboardTile:nth-child(11)').css("opacity",0);
	$('.dashboard .dashboardTile:nth-child(11)').css("opacity",0);
	$('.dashboard .dashboardTile:nth-child(11)').css("opacity",0);

$(document).ready(function() {

	$('.dashboard .dashboardTile:nth-child(11)').css("opacity",0);
	
	// Helper Functions
	String.format = function(stringToFormat, argsForFormat) {

	    for (var i = 0; i < argsForFormat.length; i++) {
	        var regex = new RegExp('\{(' + i + ')}', 'g');
	        stringToFormat = stringToFormat.replace(regex, argsForFormat[i]);
	    }

    return stringToFormat;    
	};

	fadeInTime = 500;

	// Exit Functions
	function exitGettingStarted()
	{
		$(".gettingStarted").css("visibility", "hidden");
	};

	function exitTour()
	{
		$(".tour").css("visibility", "hidden");
	};


	// Overlay Functions
	function createOverlay()
	{
		$('.overlay').remove();
		overlay = "<div class=\"gettingStarted tour overlay\"> </div>";
		$('body').append(overlay);

		$( ".overlay" ).click(function() {
  			exitGettingStarted();
  			exitTour();
		});
	};

	function removeOverlay()
	{
		$('.overlay').remove();
	};

	// ************************ Tour ******************************

	function positionCarat(element, position)
	{
		if(position === "right")
		{
			elementLeft		= element.offset().left;
			elementTop		= element.offset().top;
			elementHeight	= element.height();

			caratString  	= '<div class=\"carat gettingStarted currentStep tour\"></div>';
			element.parent().append(caratString);
			$(".carat").hide();

			caratURL		= "url(\'" + chrome.extension.getURL("Resources/caret_stroke.png") + "\')";;
			$(".carat").css("background-image", caratURL); 

			caratTop		= (elementHeight)/2 - 30;

			$(".carat").css("top",caratTop);
			$(".carat").css("transform","rotate(180deg)");

			$(".carat").fadeIn(fadeInTime);
		}
		else if(position ==="top")
		{
			alert("carat top");
		}
		else if(position === "left")
		{
			elementLeft		= element.offset().left;
			elementTop		= element.offset().top;
			elementHeight	= element.height();
			elementWidth	= element.width();

			caratString  	= '<div class=\"carat gettingStarted currentStep tour\"></div>';
			element.parent().append(caratString);
			$(".carat").hide();

			caratURL		= "url(\'" + chrome.extension.getURL("Resources/caret_stroke.png") + "\')";;
			$(".carat").css("background-image", caratURL); 

			caratTop		= (elementHeight)/2 - 30;

			$(".carat").css("top",caratTop);
			$(".carat").css("left", "350px");

			$(".carat").fadeIn(fadeInTime);
		}
		else if (position === "bottom")
		{
			alert("carat bottom");
		}
	}
	function getPosition(anchorElement, targetElement, position, forcedLeftOffset, forcedTopOffset)
	{
		targetOffset = {top:0, left:0};

		if(position === "right")
		{
			anchorTop 				= anchorElement.offset().top;
			anchorLeft 				= anchorElement.offset().left;
			anchorHeight			= anchorElement.height();
			anchorWidth				= anchorElement.width();

			targetVerticalCenter	= (anchorTop) + (anchorHeight/2);
			targetTop 				= targetVerticalCenter - (targetElement.height()/2) + 20 ;

			targetLeft 				= anchorLeft + anchorWidth ;
			targetOffset 			= {top:targetTop, left:targetLeft};
		}
		else if(position === "left")
		{
			anchorTop 				= anchorElement.offset().top;
			anchorLeft 				= anchorElement.offset().left;
			anchorHeight			= anchorElement.height();
			anchorWidth				= anchorElement.width();

			targetVerticalCenter	= (anchorTop) + (anchorHeight/2);
			targetTop 				= targetVerticalCenter - (targetElement.height()/2) ;

			targetLeft 				= anchorLeft - targetElement.width() ;
			targetOffset 			= {top:targetTop, left:targetLeft};
		}
		else if(position === "top")
		{
			anchorTop 				= anchorElement.offset().top;
			anchorLeft 				= anchorElement.offset().left;
			anchorHeight			= anchorElement.height();
			anchorWidth				= anchorElement.width();

			targetTop 				= anchorTop - targetElement.height();

			targetHorizontalCenter 	= (anchorLeft + anchorWidth)/2;
			targetLeft 				= targetHorizontalCenter - (targetElement.width()/2);

			targetOffset 			= {top:targetTop, left:targetLeft};
		}
		else if(position === "bottom")
		{
			alert("bottom");
		}

		targetOffset.top = targetOffset.top + forcedTopOffset;
		targetOffset.left = targetOffset.left + forcedLeftOffset;

		return targetOffset;
	}

	function createMessage(element, messageText, stepNumber, position, forcedLeftOffset, forcedTopOffset, buttonText)
	{
		buttonText = typeof buttonText !== 'undefined' ? buttonText : "Next";

		forcedLeftOffset 	= forcedLeftOffset 	|| 0;
		forcedTopOffset		= forcedTopOffset 	|| 0;

		messageOverallContainerString = '<div class="tour currentStep messageOverallContainer" > </div>';
		$('body').append(messageOverallContainerString);

		$(".messageOverallContainer").hide();

		messageOverallContainerPosition = getPosition(element, $('.messageOverallContainer'), position, forcedLeftOffset, forcedTopOffset);

		messageOverallContainerDiv = $('.messageOverallContainer');
		messageOverallContainerDiv.css({top:messageOverallContainerPosition.top, left:messageOverallContainerPosition.left});

		messageContainerString 	= '<div class="tour currentStep messageContainer" > </div>';
		$('.messageOverallContainer').append(messageContainerString);

		messageContainerDiv = $('.messageContainer');

		messageString = '<span class="tour message">{0}</span>';
		args = [messageText];
		messageSpan = String.format(messageString, args)
		messageContainerDiv.append(messageSpan);

		tempMessageNextButtonString = '<div class="tour messageNextButton">{0}</div>';
		args = [buttonText];
		messageNextButtonString = String.format(tempMessageNextButtonString, args)
		messageContainerDiv.append(messageNextButtonString);

		messageStepNumberString = '<span class="tour messageStepNumber">{0}</span>';
		tempStepNumberString = stepNumber + "/" + maxStepNumber;
		args = [tempStepNumberString];
		messageStepNumberSpan = String.format(messageStepNumberString, args);
		messageContainerDiv.append(messageStepNumberSpan);

		crossURL = "url(\'" + chrome.extension.getURL("Resources/cross.png") + "\')";
		closeButtonString = '<div class="tour closeButton"></div>';
		messageContainerDiv.append(closeButtonString);
		$(".closeButton").css("background-image", crossURL); 

		$(".messageOverallContainer").fadeIn(fadeInTime);
		positionCarat(messageContainerDiv, position);

		$(".closeButton").click(function() {
  			exitGettingStarted();
  			exitTour();
		});
	}

	function createElementMask(element, imageURL, forcedWidth, forcedHeight, forcedLeftOffset, forcedTopOffset )
	{
		forcedHeight 	= forcedHeight || 0;
		forcedWidth		= forcedWidth || 0;

		forcedLeftOffset 	= forcedLeftOffset || 0;
		forcedTopOffset		= forcedTopOffset || 0;

		thisTop 	= element.offset().top + forcedTopOffset;
		thisLeft 	= element.offset().left + forcedLeftOffset;
		thisHeight	= element.height() + forcedHeight;
		thisWidth	= element.width() + forcedWidth;
		// formattedImageURL 	= "url(\'" + imageURL + "\')";
		formattedImageURL	= "url(\'" + chrome.extension.getURL(imageURL) + "\')";;

		tempString = "<div class=\"tour elementMask currentStep\" style=\"top:{0}px;left:{1}px;height:{2}px;width:{3}px;background-image:{4}\"> </div>"
		args = [thisTop, thisLeft, thisHeight, thisWidth, formattedImageURL];
		highlightDiv = String.format(tempString, args);

		$('body').append(highlightDiv);
		$('.elementMask').hide();
		$('.elementMask').fadeIn(10);
	};

	maxStepNumber = 5;

	function startTour()
	{
		step0();
	}

	function step0()
	{
		createOverlay();

		messageContainerString 	= '<div class="tour currentStep welcomeMessageBox" > </div>';
		$('body').append(messageContainerString);
		$('.welcomeMessageBox').hide();

		messageContainerDiv = $('.welcomeMessageBox');

		// Welcome Heading
		headingString = '<span class="tour welcomeHeading">Welcome to your Power BI Dashboard!</span><br><br>';
		messageContainerDiv.append(headingString);

		// Welcome Content
		contentString = '<span class="tour welcomeContent">In less that five minutes, bring your important data into a live, interactive dashboard.  Let\'s take a short tour.</span>';
		messageContainerDiv.append(contentString);

		// Get Started Button
		welcomeButtonString = '<div class="tour welcomeButton"></div>';
		messageContainerDiv.append(welcomeButtonString);

		welcomeButtonMessageString = '<span class="welcomeMessage">Get Started</span>';
		$('.welcomeButton').append(welcomeButtonMessageString);
		
		// Draw line
		lineURL = "url(\'" + chrome.extension.getURL("Resources/line.png") + "\')";
		lineString = '<div class="tour line"></div>';
		messageContainerDiv.append(lineString);
		$(".line").css("background-image", lineURL); 

		// Text Below the line
		welcomeFooterString = '<div class="tour welcomeFooter">You can also watch the getting started video tutorial <a href="http://youtu.be/M8lJY8gJmIk" target="_blank">here</a>.</div>';
		messageContainerDiv.append(welcomeFooterString);

		// Cross
		crossURL = "url(\'" + chrome.extension.getURL("Resources/cross.png") + "\')";
		closeButtonString = '<div class="tour welcomeCrossButton"></div>';
		messageContainerDiv.append(closeButtonString);
		$(".welcomeCrossButton").css("background-image", crossURL); 

		$('.welcomeMessageBox').fadeIn(fadeInTime);

		$(".welcomeCrossButton").click(function() {
  			exitGettingStarted();
  			exitTour();
		});

		$('.welcomeButton').click(function(){
			// cleanup
			$(".currentStep").remove();
			step1();
		});
	}

	function step1()
	{
		createOverlay();

		// Create Element Mask
		element 	= $('.dashboard .dashboardTile:nth-child(3)');
		imageURL = "Resources/tile.png";
		createElementMask(element, imageURL);

		// Create Message Text
		messageText 		= "Your dashboard is made up of tiles that provide a live view of your data.  You can click a tile to deeply explore the data behind it.";
		stepNumber 			= 1;
		position 			= "right";
	
		createMessage(element, messageText, stepNumber, position, 0, 0, buttonText="Try it!");

		$(".messageNextButton").click(function(){
			tileClickImageURL =  "url(\'" + chrome.extension.getURL("Resources/TileClickExperience.gif")+ "\')";
			$(".elementMask").css("background-image", tileClickImageURL);
			$(".messageOverallContainer").remove();

			setTimeout(function() {
      			// cleanup
      			$(".tour").remove();

      			// Trigger the click for the next element
      			$('.dashboard .dashboardTile:nth-child(3) .compositeTile').click();

      			// call the next step
      			setTimeout(function() {
      				step2();
      			},1000);
			}, 2200);
		});

		$(".elementMask").css("cursor", "pointer");

		$(".elementMask").click(function(){
			      			// cleanup
      			$(".tour").remove();

      			// Trigger the click for the next element
      			$('.dashboard .dashboardTile:nth-child(3) .compositeTile').click();

      			// call the next step
      			setTimeout(function() {
      				step2();
      			},1000);
		})
	}

	function step2()
	{
		createOverlay();
		setTimeout(function() {
			

			element 	= $("div[data-vrmname='CategoryChart:Chart7']");
			imageURL 	= "Resources/TopBar.png";
			createElementMask(element, imageURL);

			element 	= $("div[data-vrmname='Map:Chart1']");
			imageURL 	= "Resources/Map.png";
			createElementMask(element, imageURL);

			messageText 		= "Reports provide a detailed set of insights for a collected set of data.  This sample report describes the year to date trend of units manufactured.";
			stepNumber 			= 2;
			position 			= "right";
			createMessage(element, messageText, stepNumber, position);

			$(".messageNextButton").click(function(){

      			// cleanup
      			$(".currentStep").remove();
      			step4();
			});

	    },3000);


	}

	function step4()
	{
		element 	= $("div[data-vrmname='Map:Chart1']");
		imageURL 	= "Resources/Map.png";
		createElementMask(element, imageURL);

		// Create the pin icon
		element 	= $("div[data-vrmname='Map:Chart1']");
		pinTop		= element.offset().top;
		pinLeft		= element.offset().left + element.width() + 20;
		pinURL	 	= "url(\'" + chrome.extension.getURL("Resources/pin.png") + "\')";

		pinDivString	= "<div class=\"tour pin currentStep\" style=\"top:{0}px;left:{1}px\"></div>";
		args = [pinTop, pinLeft];
		pinDiv = String.format(pinDivString, args);
		$('body').append(pinDiv);
		$('.pin').css("background-image", pinURL); 

		element 			= $("div.pin");
		messageText 		= "If there is a particular visual you want to monitor, you can click this button to pin it as a tile to your dashboard.  ";
		stepNumber 			= 3;
		position 			= "right";
		createMessage(element, messageText, stepNumber, position);

		$(".messageNextButton").click(function(){
			$(".currentStep").hide("slow").remove();
			$(".gettingStarted").hide("slow").remove();
			step5(); 	
		});

		$("div.pin").click(function(){
			$(".currentStep").hide("slow").remove();
			$(".gettingStarted").hide("slow").remove();
			step5(); 
		})
	}

	function step5()
	{
		createOverlay();
		$(".overlay").css("opacity","0.95");
		parent.history.back();

		setTimeout(function() {
			
			$(".bottomBar").css("z-index","9003");

			// Create Element Mask
			element 		= $('.dashboard .dashboardTile:nth-child(11)');
			imageURL 		= "Resources/pinnedTile.png";
			createElementMask(element, imageURL);

			$(".overlay").css("opacity","0.85");

			// Create Message Text
			messageText 		= "Pinned visuals are added as new tiles to the bottom of your dashboard.  Now you can easily monitor your most important data.";
			stepNumber 			= 4;
			position 			= "left";

			createMessage(element, messageText, stepNumber, position);	

			backgroundImage = $(".elementMask");
			backgroundImage.addClass("elementMaskTemp");
			backgroundImage.removeClass("currentStep");
			backgroundImage.removeClass("gettingStarted");
			backgroundImage.removeClass("elementMask");
			
			$(".messageNextButton").click(function(){
				$(".currentStep").hide("slow");
				$(".gettingStarted").hide("slow");

				backgroundImage.removeClass("tour");
				backgroundImage.removeClass("currentStep");
				backgroundImage = $(".elementMaskTemp");
				backgroundImage.css("z-index","200");

				backgroundImage.click(function(){
					$('.dashboard .dashboardTile:nth-child(11)').trigger("click");
				});


				step6(); 	
			});

		}, 600);
	}

	function step6()
	{
			createOverlay();

			element 		= $('.ms-Icon--upload');
			imageURL 		= "Resources/upload.png";
			createElementMask(element, imageURL, 0, -7, 0, 0);

			// Create Message Text
			element 			= $(".elementMask");
			messageText 		= "Now it’s time to add your own data to Power BI.  Click the Connect icon to get started.";
			stepNumber 			= 5;
			position 			= "left";

			createMessage(element, messageText, stepNumber, position, 0, 27, "Try it!");		

			$(".messageNextButton").click(function(){
				$(".currentStep").remove();
				$(".gettingStarted").remove();
				$(".elementMaskTemp").remove();
				connectToData();
			});

			$(".elementMask").click(function(){
				$(".currentStep").remove();
				$(".elementMaskTemp").remove();
				$(".gettingStarted").remove();
				$(".bottomBar").css("z-index	","0");
				connectToData();
			});

			$(".elementMask").css("cursor","pointer");

	}

	function connectToData()
	{
		element 		= $('.ms-Icon--upload');
		element.trigger("click");
	}

	

	// **************************** Main ****************************
	
	// Register the exit functions
	$(document).keyup(function(e) {
		if (e.keyCode == 27) { 
			exitGettingStarted(); 
			exitTour();
		}   // esc
	});

			// hide the bottom image
	element 		= $('.dashboard .dashboardTile:nth-child(11)');



	setTimeout(function() {
      				startTour();
    },300);
	
	// createDataSourcesOverlay();

	// createElementMask(element);
});


	// // ******************** Data Sources Overlay *******************

	// function createDataSourcesOverlay()
	// {
	// 	dataSourcesOverlayDiv = "<div class=\"gettingStarted dataSourcesOverlay\"> </div>";

	// 	$('body').append(dataSourcesOverlayDiv);

	// 	dataSourcesMenu = "<div class=\"gettingStarted dataSourcesMenu\"> </div>";
	// 	$('.dataSourcesOverlay').append(dataSourcesMenu);

	// 	// ** Buttons **
	// 	dataSourcesExcelButton = "<div class=\"gettingStarted dataSourcesButtonHover dataSourcesExcelButton\"> </div>";
	// 	$('.dataSourcesMenu').append(dataSourcesExcelButton);

	// 	dataSourcesSalesForceButton = "<div class=\"gettingStarted dataSourcesButtonHover dataSourcesSalesForceButton\"> </div>";
	// 	$('.dataSourcesMenu').append(dataSourcesSalesForceButton);

	// 	// Make changes on hover
	// 	$('.dataSourcesButtonHover').hover(
	// 		function() {
	// 			$(this).addClass("border");
	// 		},
	// 		function(){
	// 			$(this).removeClass("border");
	// 		}
	// 	);

	// 	// Bind the buttons to the actual links
	// 	$('.dataSourcesExcelButton').click(function(){
	// 		$('.uploadIcon').trigger("click");
	// 		exitGettingStarted();
	// 	});

	// 	$('.dataSourcesSalesForceButton').click(function(){
	// 		$('.uploadIcon').trigger("click");
	// 		setTimeout(function(){$(".dataSourceList ul li").eq(2).trigger("click");}, 1000);
	// 		exitGettingStarted();
	// 	});

	// 	// ** Links **
	// 	dataSourcesOtherLink = "<div class=\"gettingStarted dataSourcesOtherLink\"> </div>";
	// 	dataSourcesHowToLink = "<div class=\"gettingStarted dataSourcesHowToLink\"> </div>";
	// 	dataSourcesTourLink = "<div class=\"gettingStarted dataSourcesTourLink\"> </div>";
	// 	$('.dataSourcesMenu').append(dataSourcesOtherLink);
	// 	$('.dataSourcesMenu').append(dataSourcesHowToLink);
	// 	$('.dataSourcesMenu').append(dataSourcesTourLink);

	// 	$('.dataSourcesOtherLink').click(function(){
	// 		$('.uploadIcon').trigger("click");
	// 		exitGettingStarted();
	// 	});

	// 	$('.dataSourcesTourLink').click(function(){
	// 		exitGettingStarted();
	// 		startTour();
	// 	});
	// }
