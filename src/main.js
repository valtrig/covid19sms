window.onload = function () {
  // Message constants
  const MESSAGE_INSERT_INFO = 'Εισάγετε όνομα, επώνυμο και διεύθυνση κατοικίας (τα στοιχεία αποθηκεύονται και παραμένουν μόνο στη συσκευή σας):';
  const MESSAGE_DELETE_INFO = 'Να γίνει διαγραφή των αποθηκευμένων στοιχείων;';
  const MESSAGE_INFO_DELETED = 'Τα αποθηκευμένα στοιχεία διαγράφηκαν!';

  // Event handler for page buttons
  function handleOnclick(event) {
    const SMS_BODY_KEY = 'smsBody';
    var smsUri = event.currentTarget.value;

    // Determine whether the clicked button contained a specific SMS URI.
    if (!isEmpty(smsUri)) {
      // Retrieve the SMS body content from the browser's local storage and, if not found,
      // prompt the user for it.
      var smsBodyContent = localStorage.getItem(SMS_BODY_KEY);
      if (isEmpty(smsBodyContent)) {
        smsBodyContent = prompt(MESSAGE_INSERT_INFO);
      }

      // Determine whether a non-empty SMS body is available.
      if (!isEmpty(smsBodyContent)) {
        // (Re-)write the SMS body to local storage.
        localStorage.setItem(SMS_BODY_KEY, smsBodyContent);

        // Detect if the device is using 'iOS' or 'macos' and replace the default character
        // that separates the SMS number from the body with the Apple specific one.
        if (['iPad', 'iPhone', 'iPod'].includes(navigator.platform) || navigator.userAgent.includes('Mac')) {
          smsUri = smsUri.replace('?', '&');
        }

        // Create the appropriate URL and open it so that it can be picked up by
        // the device's SMS application.
        window.open(smsUri + encodeURIComponent(smsBodyContent));
      }
    } else if (confirm(MESSAGE_DELETE_INFO)) {
      // Clear the local storage, if the clicked button contains no SMS code,
      // i.e. it is the information erasure button.
      localStorage.clear();

      alert(MESSAGE_INFO_DELETED);
    }
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
