window.onload = function () {
  // Message constants
  const MESSAGE_INSERT_INFO = 'Εισάγετε όνομα, επώνυμο και διεύθυνση κατοικίας (τα στοιχεία αποθηκεύονται και παραμένουν μόνο στη συσκευή σας):';
  const MESSAGE_DELETE_INFO = 'Να γίνει διαγραφή των αποθηκευμένων στοιχείων;';
  const MESSAGE_INFO_DELETED = 'Τα αποθηκευμένα στοιχεία διαγράφηκαν!';

  // Event handler for page buttons
  function handleOnclick(event) {
    const button = event.currentTarget;
    var smsUri = button.value;

    // Determine whether the clicked button contained a specific SMS URI.
    if (!isEmpty(smsUri)) {
      // Detect if the device is using 'iOS' or 'macos' and use the appropiate character
      // to append the SMS number part of the URL with the body content.
      const isAppleDevice = ['iPad', 'iPhone', 'iPod'].includes(navigator.platform) || 
        navigator.userAgent.includes('Mac');
      smsUri += (isAppleDevice ? '&' : '?') + button.dataset.body;

      // If additional details are required for the SMS body, use the specified attribute
      // to retrieve and append them to the URL. 
      if (button.dataset.details) {
        smsUri = appendSmsBodyDetails(button.dataset.details, smsUri);
      }

      // Open the URI, if valid, so that it can be picked up by the device's SMS application.
      if (smsUri) {
        window.open(smsUri);
      }
    } else if (confirm(MESSAGE_DELETE_INFO)) {
      // Clear the local storage, if the clicked button contains no SMS code,
      // i.e. it is the information erasure button.
      localStorage.clear();

      alert(MESSAGE_INFO_DELETED);
    }
  }

  function appendSmsBodyDetails(placeHolderName, smsUri) {
    // Retrieve the SMS body content from the browser's local storage and, if not found,
    // prompt the user for it.
    var smsBodyContent = localStorage.getItem(placeHolderName);
    if (isEmpty(smsBodyContent)) {
      // Display the user prompt asking for the SMS body content.
      smsBodyContent = prompt(MESSAGE_INSERT_INFO);
    }

    // Determine whether a non-empty SMS body is available.
    if (!isEmpty(smsBodyContent)) {
      // (Re-)write the SMS body to local storage.
      localStorage.setItem(placeHolderName, smsBodyContent);

      // Replace the placeholder in the URI with the SMS body content.
      smsUri += encodeURIComponent(smsBodyContent);
    } else {
      // Reset the URI variable, since the required SMS body was not provided.
      smsUri = null;
    }

    return smsUri;
  }

  function isEmpty(value) {
    return (!value) || (value.trim().length === 0);
  }

  // Add a click handler for all buttons in the application's page.
  Array.from(document.getElementsByTagName('button')).forEach(function (button) {
    button.onclick = handleOnclick;
  });

  // Determine if the browser supports the ServiceWorker API.
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/pwa.js').then(function (registration) {
      console.info('ServiceWorker registered with scope: ', registration.scope);
    }, function (err) {
      console.warn('ServiceWorker registration failed: ', err);
    });
  }
};
