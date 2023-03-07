// Update the emergency services
const updateServices = (services) => {
    $.ajax({
      url: '/emergency',
      type: 'PUT',
      contentType: 'application/json',
      data: JSON.stringify({ services }),
      headers: { Authorization: 'mySecretKey' },
      success: () => {
        alert('Emergency services updated successfully');
      },
      error: () => {
        alert('Error updating emergency services');
      }
    });
  };
  
  // Example usage: update the list of services when the form is submitted
  $('#updateForm').submit((event) => {
    event.preventDefault();
    const services = [
      { name: 'Police', number: '911' },
      { name: 'Fire department', number: '555-1234' },
      { name: 'Medical', number: '555-5678' }
      // add or remove services as needed
    ];
    updateServices(services);
  });
  